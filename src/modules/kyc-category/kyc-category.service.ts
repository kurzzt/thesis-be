import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database';
import { CreateKycCategoryDto } from './dto/create-kyc-category.dto';
import { Prisma } from '@prisma/client';
import { findManyHelper } from 'src/common/helpers/find-many.helper';
import { GetKycCategoryDto } from './dto/get-kyc-category.dto';
import { UpdateKycCategoryDto } from './dto/update-kyc-category.dto';

@Injectable()
export class KycCategoryService {
  constructor(private readonly db: DatabaseService) {}

  async createUpdateBulk(options: { data: CreateKycCategoryDto[] }) {
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

  async create(body: CreateKycCategoryDto) {
    const data = await this.db.kycCategory.create({
      data: body,
    });
    return data;
  }

  async findAll(options: GetKycCategoryDto) {
    const where: Prisma.KycCategoryWhereInput = {};

    const query: Prisma.KycCategoryFindManyArgs = {
      where,
      ...findManyHelper(options),
    };

    const [data, count] = await this.db.$transaction([
      this.db.client.kycCategory.findMany(query),
      this.db.client.kycCategory.count({ where }),
    ]);

    return { data, count };
  }

  async findOne(id: string) {
    const data = await this.db.kycCategory.findUniqueOrThrow({
      where: { id },
    });

    return data;
  }

  async update(id: string, body: UpdateKycCategoryDto) {
    await this.db.kycCategory.findUniqueOrThrow({
      where: { id },
    });

    const data = await this.db.kycCategory.update({
      where: {
        id,
      },
      data: body,
    });

    return data;
  }

  async remove(id: string) {
    const data = await this.db.client.kycCategory.delete({
      id,
    });

    return data;
  }
}
