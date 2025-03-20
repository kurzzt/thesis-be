import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';
import { randomBytes } from 'crypto';
import { findRawHelper } from 'src/common/helpers/find-raw.helper';
import { DatabaseService } from 'src/database/database';
import { GooDetailFieldMask } from 'src/types/google-api/google-detail-fieldmask';
import { GooNearbyFieldMask } from 'src/types/google-api/google-nearby-fieldmask';
import { GetNearbyPlaceDto } from '../google-api/dto/get-google-api.dto';
import { GoogleApiService } from '../google-api/google-api.service';
import { CreateBulkPlaceDto, CreatePlaceDto } from './dto/create-place.dto';
import { GetPlacesDto } from './dto/get-places.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';

@Injectable()
export class PlacesService {
  constructor(
    private db: DatabaseService,
    private googleApi: GoogleApiService,
  ) {}

  // ==============================================
  // AUTO
  // ==============================================
  async findNearby(body: GetNearbyPlaceDto) {
    const fieldMask: GooNearbyFieldMask[] = [
      'places.addressComponents',
      'places.adrFormatAddress',
      'places.businessStatus',
      'places.displayName',
      'places.formattedAddress',
      'places.googleMapsUri',
      'places.id',
      'places.location',
      'places.name',
      'places.photos',
      'places.displayName',
    ];
    const data = await this.googleApi.nearbySearch(body, fieldMask);
    return data;
  }

  async createAutoBulk(body: CreateBulkPlaceDto) {
    const { ids } = body;
    const fieldMask: GooDetailFieldMask[] = ['*'];
    let placeCount = 0,
      reviewCount = 0,
      photoCount = 0;

    for (const id of ids) {
      const response = await this.googleApi.placeDetail(id, fieldMask);
      const { reviews, photos, place } =
        await this.googleApi.mapGooResponseToPlaceDto(response);
      
      const checkIfExist = await this.db.place.findFirst({
        where: {
          placeAPI: id
        }
      })
      if(checkIfExist) continue;

      const [placeRes, reviewRes, photoRes] = await this.db.$transaction([
        this.db.place.create({ data: place }),
        this.db.placeReview.createMany({ data: reviews }),
        this.db.placePhoto.createMany({ data: photos }),
      ]);
      placeCount += 1;
      reviewCount += reviewRes.count;
      photoCount += photoRes.count;
    }

    return { placeCount, reviewCount, photoCount };
  }

  // ==============================================
  // MANUAL
  // ==============================================

  async createUpdateBulk(options: { data: CreatePlaceDto[] }) {
    const data = [];

    for (const d of options.data) {
      let newData;
      if (d.id) {
        const { id, ...rest } = d;
        newData = await this.update(id, rest);
      } else {
        newData = await this.create(d);
      }
      data.push(newData);
    }

    return data;
  }

  async create(body: CreatePlaceDto) {
    if (!body.placeAPI) {
      const randUUID = randomBytes(12).toString('hex');
      body.id = randUUID;
      body.placeAPI = randUUID;
    }

    const place = await this.db.place.create({
      data: body,
    });

    return place;
  }

  // MONGODB GEOSPATIAL QUERY REFERENCE
  // https://github.com/prisma/prisma/discussions/22392
  async findAll(options: GetPlacesDto) {
    const filter: JsonValue = {
      deletedAt: null
    };

    if (options.latitude && options.longitude) {
      let radius = 300;
      if (options.radius >= radius) radius = options.radius;
      filter['location'] = {
        $geoWithin: {
          $center: [[options.latitude, options.longitude], radius],
        },
      };
    }

    if (options.priceLevel) {
      filter['priceLevel'] = options.priceLevel;
    }

    if (options.displayName) {
      filter['displayName'] = {
        $regex: options.displayName,
        $options: 'i',
      };
    }

    if (options.facilities) {
      const facilities = options.facilities.split(',');
      facilities.forEach((d) => {
        filter[d] = true;
      });
    }

    if(options.ambiences) {
      const ambiences = options.ambiences.split(',');
      ambiences.forEach((d) => {
        filter[d] = true;
      });
    }

    const query: Prisma.PlaceFindRawArgs = {
      filter,
      options: {
        projection: {
          currentSecondaryOpeningHours: false,
        },
        ...findRawHelper(options),
      },
    };

    // Cannot run 'count' in a multi-document transaction.
    // Please see http://dochub.mongodb.org/core/transaction-count for a recommended alternative.
    const count = await this.db.$runCommandRaw({
      count: 'Place',
      query: { ...filter },
    });

    const data = await this.db.client.place.findRaw(query);

    // gk bisa populate photo, harus manual :(
    for (const i in data) {
      const d = data[i];
      const photo = await this.db.placePhoto.findFirst({
        where: { placeId: d['placeAPI'] },
      });
      d['photo'] = photo;
    }

    return { data, count: count.n };
  }

  async findOne(id: string) {
    const place = await this.db.client.place.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        reviews: true,
        photos: true,
      },
    });

    return place;
  }

  async update(id: string, updatePlaceDto: UpdatePlaceDto) {
    await this.db.place.findUniqueOrThrow({
      where: {
        id,
      },
    });
    const place = await this.db.place.update({
      where: {
        id,
      },
      data: updatePlaceDto,
    });
    return place;
  }

  async remove(id: string) {
    const place = await this.db.client.place.delete({
      id,
    });
    return place;
  }
}
