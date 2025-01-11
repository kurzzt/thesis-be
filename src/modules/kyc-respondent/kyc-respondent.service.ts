import { Injectable } from '@nestjs/common';
import { CreateKycRespondentDto } from './dto/create-kyc-respondent.dto';
import { GetKycRespondentDto } from './dto/get-kyc-respondent.dto';
import { Prisma } from '@prisma/client';
import { findManyHelper } from 'src/common/helpers/find-many.helper';
import { DatabaseService } from 'src/database/database';
import { UpdateKycRespondentDto } from './dto/update-kyc-respondent.dto';

@Injectable()
export class KycRespondentService {
  constructor(private readonly db: DatabaseService) {}

  async createUpdateBulk(options: { data: CreateKycRespondentDto[] }) {
    const datas = [];

    for (const d of options.data) {
      let newData;
      if (d.id) {
        newData = await this.update(d.id, d);
      } else {
        newData = await this.create(d);
      }
      datas.push(newData);
    }

    return datas;
  }

  async create(body: CreateKycRespondentDto) {
    const data = await this.db.kycRespondent.create({
      data: body,
    });
    return data;
  }

  async findAll(options: GetKycRespondentDto) {
    const where: Prisma.KycRespondentWhereInput = {};

    const query: Prisma.KycRespondentFindManyArgs = {
      where,
      ...findManyHelper(options),
      select: {
        user: {
          select: {
            name: true,
          },
        },
        question: {
          select: {
            text: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    };

    const [data, count] = await this.db.$transaction([
      this.db.client.kycRespondent.findMany(query),
      this.db.client.kycRespondent.count({ where }),
    ]);

    return { data, count };
  }

  async findOne(id: string) {
    const data = await this.db.kycRespondent.findUniqueOrThrow({
      where: { id },
    });

    return data;
  }

  async update(id: string, body: UpdateKycRespondentDto) {
    await this.db.kycRespondent.findUniqueOrThrow({
      where: { id },
    });

    const data = await this.db.kycRespondent.update({
      where: {
        id,
      },
      data: body,
    });

    return data;
  }

  async remove(id: string) {
    const data = await this.db.client.kycRespondent.delete({
      id,
    });

    return data;
  }
}
