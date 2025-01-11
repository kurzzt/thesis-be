import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersDto } from './dto/get-user.dto';
import { Prisma } from '@prisma/client';
import { findManyHelper } from 'src/common/helpers/find-many.helper';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private db: DatabaseService) {}

  async createUpdateBulk(options: { data: CreateUserDto[] }) {
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

  async create(body: CreateUserDto) {
    const { password: initialPass } = body;
    body.password = await bcrypt.hash(initialPass, 10);

    const user = await this.db.user.create({
      data: body,
    });
    return user;
  }

  async findAll(options: GetUsersDto) {
    const where: Prisma.UserWhereInput = {};

    if (options.name) {
      where.name = { contains: options.name, mode: 'insensitive' };
    }

    const query: Prisma.UserFindManyArgs = {
      where,
      ...findManyHelper(options),
      include: {
        role: {
          select: {
            name: true,
          },
        },
      },
    };

    const [data, count] = await this.db.$transaction([
      this.db.client.user.findMany(query),
      this.db.client.user.count({ where }),
    ]);
    return { data, count };
  }

  async findOne(id: string) {
    const user = await this.db.user.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        role: {
          select: {
            name: true,
          },
        },
      },
    });
    return user;
  }

  async update(id: string, body: UpdateUserDto) {
    await this.db.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
    const user = await this.db.user.update({
      where: {
        id,
      },
      data: body,
      include: { role: true },
    });
    return user;
  }

  async remove(id: string) {
    const user = await this.db.client.user.delete({
      id: id,
    });
    return user;
  }
}
