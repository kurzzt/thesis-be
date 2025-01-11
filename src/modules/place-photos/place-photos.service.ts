import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database';
import { CreatePlacePhotoDto } from './dto/create-place-photo.dto';
import { GetPlacePhotoDto } from './dto/get-place-photo.dto';
import { Prisma } from '@prisma/client';
import { findManyHelper } from 'src/common/helpers/find-many.helper';
import { UpdatePlacePhotoDto } from './dto/update-place-photo.dto';

@Injectable()
export class PlacePhotosService {
  constructor(private db: DatabaseService) {}

  async createUpdateBulk(options: { data: CreatePlacePhotoDto[] }) {
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

  async create(body: CreatePlacePhotoDto) {
    const data = await this.db.placePhoto.create({ data: body });

    return data;
  }

  async findAll(options: GetPlacePhotoDto) {
    const where: Prisma.PlacePhotoWhereInput = {};

    const query: Prisma.PlacePhotoFindManyArgs = {
      where,
      ...findManyHelper(options),
    };

    const [data, count] = await this.db.$transaction([
      this.db.client.placePhoto.findMany(query),
      this.db.client.placePhoto.count({ where }),
    ]);

    return { data, count };
  }

  async findOne(id: string) {
    const data = await this.db.placePhoto.findUniqueOrThrow({
      where: { id },
    });

    return data;
  }

  async update(id: string, body: UpdatePlacePhotoDto) {
    await this.db.placePhoto.findUniqueOrThrow({
      where: { id },
    });

    const data = await this.db.placePhoto.update({
      where: {
        id,
      },
      data: body,
    });

    return data;
  }

  async remove(id: string) {
    const data = await this.db.client.placePhoto.delete({
      id,
    });
    return data;
  }
}
