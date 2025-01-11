import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database';
import { CreatePlaceReviewDto } from './dto/create-place-reviews.dto';
import { GetPlaceReviewDto } from './dto/get-place-reviews.dto';
import { Prisma } from '@prisma/client';
import { findManyHelper } from 'src/common/helpers/find-many.helper';
import { UpdatePlaceReviewDto } from './dto/update-place-reviews.dto';

@Injectable()
export class PlaceReviewsService {
  constructor(private db: DatabaseService) {}

  async createUpdateBulk(options: { data: CreatePlaceReviewDto[] }) {
    const data = [];

    for (const d of options.data) {
      let newData;
      if (d.id) {
        newData = await this.update(d.id, d);
      } else {
        newData = await this.create(d);
      }
      data.push(newData);
    }

    return data;
  }

  async create(body: CreatePlaceReviewDto) {
    const data = await this.db.placeReview.create({
      data: body,
    });
    return data;
  }

  async findAll(options: GetPlaceReviewDto) {
    const where: Prisma.PlaceReviewWhereInput = {};

    const query: Prisma.PlaceReviewFindManyArgs = {
      where,
      ...findManyHelper(options),
      include: {
        place: {
          select: {
            placeAPI: true,
            displayName: true,
          },
        },
      },
    };

    const [data, count] = await this.db.$transaction([
      this.db.client.placeReview.findMany(query),
      this.db.client.placeReview.count({ where }),
    ]);
    return { data, count };
  }

  async findOne(id: string) {
    const data = await this.db.placeReview.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        place: {
          select: {
            placeAPI: true,
            displayName: true,
          },
        },
      },
    });
    return data;
  }

  async update(id: string, body: UpdatePlaceReviewDto) {
    await this.db.placeReview.findUniqueOrThrow({
      where: {
        id,
      },
    });

    const data = await this.db.placeReview.update({
      where: {
        id,
      },
      data: body,
    });
    return data;
  }

  async remove(id: string) {
    const data = await this.db.client.placeReview.delete({
      id: id,
    });
    return data;
  }
}
