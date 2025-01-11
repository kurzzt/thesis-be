import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { DatabaseService } from 'src/database/database';
import { GetRolesDto } from './dto/get-role.dto';
import { Prisma } from '@prisma/client';
import { findManyHelper } from 'src/common/helpers/find-many.helper';

@Injectable()
export class RolesService {
  constructor(private db: DatabaseService) {}

  async createUpdateBulk(options: { data: CreateRoleDto[] }) {
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

  async create(body: CreateRoleDto) {
    const role = await this.db.role.create({
      data: body,
    });
    return role;
  }

  async findAll(options: GetRolesDto) {
    const where: Prisma.RoleWhereInput = {};

    if (options.name) {
      where.name = { contains: options.name, mode: 'insensitive' };
    }

    const query: Prisma.RoleFindManyArgs = {
      where,
      ...findManyHelper(options),
    };

    const [data, count] = await this.db.$transaction([
      this.db.client.role.findMany(query),
      this.db.client.role.count({ where }),
    ]);
    return { data, count };
  }

  async findOne(id: string) {
    const role = await this.db.role.findUniqueOrThrow({
      where: {
        id,
      },
    });
    return role;
  }

  async update(id: string, body: UpdateRoleDto) {
    await this.db.role.findUniqueOrThrow({
      where: {
        id,
      },
    });
    const role = await this.db.role.update({
      where: {
        id,
      },
      data: body,
    });
    return role;
  }

  async remove(id: string) {
    const role = await this.db.client.role.delete({
      id: id,
    });
    return role;
  }
}
