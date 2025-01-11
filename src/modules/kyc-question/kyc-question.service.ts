import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database';
import { CreateKycQuestionDto } from './dto/create-kyc-question.dto';
import { GetKycQuestionDto } from './dto/get-kyc-question.dto';
import { Prisma } from '@prisma/client';
import { findManyHelper } from 'src/common/helpers/find-many.helper';
import { UpdateKycQuestionDto } from './dto/update-kyc-question.dto';

@Injectable()
export class KycQuestionService {
  constructor(private readonly db: DatabaseService) {}

  async createUpdateBulk(options: { data: CreateKycQuestionDto[] }) {
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

  async create(body: CreateKycQuestionDto) {
    const data = await this.db.kycQuestion.create({
      data: body,
    });
    return data;
  }

  async findAll(options: GetKycQuestionDto) {
    const where: Prisma.KycQuestionWhereInput = {};

    const query: Prisma.KycQuestionFindManyArgs = {
      where,
      ...findManyHelper(options),
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    };

    const [data, count] = await this.db.$transaction([
      this.db.client.kycQuestion.findMany(query),
      this.db.client.kycQuestion.count({ where }),
    ]);

    return { data, count };
  }

  async findOne(id: string) {
    const data = await this.db.kycQuestion.findUniqueOrThrow({
      where: { id },
    });

    return data;
  }

  async update(id: string, body: UpdateKycQuestionDto) {
    await this.db.kycQuestion.findUniqueOrThrow({
      where: { id },
    });

    const data = await this.db.kycQuestion.update({
      where: {
        id,
      },
      data: body,
    });

    return data;
  }

  async remove(id: string) {
    const data = await this.db.client.kycQuestion.delete({
      id,
    });

    return data;
  }
}
