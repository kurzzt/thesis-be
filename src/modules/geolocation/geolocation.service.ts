import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database';
import {
  CreateDistrictDto,
  CreateProvinceDto,
  CreateRegencyDto,
  CreateVillageDto,
} from './dto/create-geoloc.dto';
import { GetGeoLocDto } from './dto/get-geoloc.dto';
import { findManyHelper } from 'src/common/helpers/find-many.helper';
import {
  UpdateDistrictDto,
  UpdateProvinceDto,
  UpdateRegencyDto,
  UpdateVillageDto,
} from './dto/update-geoloc.dto';
import { GeoLocLevel } from 'src/types/global.enum';

@Injectable()
export class GeolocationService {
  constructor(private db: DatabaseService) {}

  // ==============================================
  // FIND ALL
  // ==============================================
  async findAll(options: GetGeoLocDto) {
    const where: any = {};

    if (options.name)
      where.name = { contains: options.name, mode: 'insensitive' };
    if (options.parentId && options.parentId !== '0')
      where.parentId = { equals: options.parentId };

    const query: any = {
      where,
      ...findManyHelper(options),
      include:
        options.level != GeoLocLevel.PROVINCE
          ? {
              parent: {
                select: {
                  kodeBps: true,
                  name: true,
                },
              },
            }
          : {},
    };

    const [data, count] = await this.db.$transaction([
      this.db.client[options.level].findMany(query),
      this.db.client[options.level].count({ where }),
    ]);
    return { data, count };
  }

  // ==============================================
  // PROVINCE
  // ==============================================
  async createUpdateBulkProvince(options: { data: CreateProvinceDto[] }) {
    const data = [];

    for (const d of options.data) {
      let newData;
      if (d.id) {
        const { id, ...rest } = d;
        newData = await this.updateProvince(id, rest);
      } else {
        newData = await this.createProvince(d);
      }
      data.push(newData);
    }

    return data;
  }

  async createProvince(body: CreateProvinceDto) {
    const data = await this.db.province.create({
      data: body,
    });
    return data;
  }

  async findOneProvince(id: string) {
    const data = await this.db.client.province.findUniqueOrThrow({
      where: { id },
    });
    return data;
  }

  async updateProvince(id: string, body: UpdateProvinceDto) {
    await this.db.client.province.findUniqueOrThrow({
      where: { id },
    });

    const data = await this.db.province.update({
      where: { id },
      data: body,
    });
    return data;
  }

  async removeProvince(id: string) {
    const data = await this.db.client.province.delete({ id });
    return data;
  }

  // ==============================================
  // REGENCY
  // ==============================================
  async createUpdateBulkRegency(options: { data: CreateRegencyDto[] }) {
    const data = [];

    for (const d of options.data) {
      let newData;
      if (d.id) {
        const { id, ...rest } = d;
        newData = await this.updateRegency(id, rest);
      } else {
        newData = await this.createRegency(d);
      }
      data.push(newData);
    }

    return data;
  }

  async createRegency(body: CreateRegencyDto) {
    const data = await this.db.regency.create({
      data: body,
    });
    return data;
  }

  async findOneRegency(id: string) {
    const data = await this.db.client.regency.findUniqueOrThrow({
      where: { id },
      include: {
        parent: {
          select: {
            kodeBps: true,
            name: true,
          },
        },
      },
    });
    return data;
  }

  async updateRegency(id: string, body: UpdateRegencyDto) {
    await this.db.client.regency.findUniqueOrThrow({
      where: { id },
    });

    const data = await this.db.regency.update({
      where: { id },
      data: body,
    });
    return data;
  }

  async removeRegency(id: string) {
    const data = await this.db.client.regency.delete({ id });
    return data;
  }

  // ==============================================
  // DISTRICT
  // ==============================================
  async createUpdateBulkDistrict(options: { data: CreateDistrictDto[] }) {
    const data = [];

    for (const d of options.data) {
      let newData;
      if (d.id) {
        const { id, ...rest } = d;
        newData = await this.updateDistrict(id, rest);
      } else {
        newData = await this.createDistrict(d);
      }
      data.push(newData);
    }

    return data;
  }

  async createDistrict(body: CreateDistrictDto) {
    const data = await this.db.district.create({
      data: body,
    });
    return data;
  }

  async findOneDistrict(id: string) {
    const data = await this.db.client.district.findUniqueOrThrow({
      where: { id },
      include: {
        parent: {
          select: {
            kodeBps: true,
            name: true,
          },
        },
      },
    });
    return data;
  }

  async updateDistrict(id: string, body: UpdateDistrictDto) {
    await this.db.client.district.findUniqueOrThrow({
      where: { id },
    });

    const data = await this.db.district.update({
      where: { id },
      data: body,
    });
    return data;
  }

  async removeDistrict(id: string) {
    const data = await this.db.client.district.delete({ id });
    return data;
  }

  // ==============================================
  // VILLAGE
  // ==============================================
  async createUpdateBulkVillage(options: { data: CreateVillageDto[] }) {
    const data = [];

    for (const d of options.data) {
      let newData;
      if (d.kodeBps) {
        const { id, ...rest } = d;
        newData = await this.updateVillage(id, rest);
      } else {
        newData = await this.createVillage(d);
      }
      data.push(newData);
    }

    return data;
  }

  async createVillage(body: CreateVillageDto) {
    const data = await this.db.village.create({
      data: body,
    });
    return data;
  }

  async findOneVillage(id: string) {
    const data = await this.db.client.village.findUniqueOrThrow({
      where: { id },
      include: {
        parent: {
          select: {
            kodeBps: true,
            name: true,
          },
        },
      },
    });
    return data;
  }

  async updateVillage(id: string, body: UpdateVillageDto) {
    await this.db.client.village.findUniqueOrThrow({
      where: { id },
    });

    const data = await this.db.village.update({
      where: { id },
      data: body,
    });
    return data;
  }

  async removeVillage(id: string) {
    const data = await this.db.client.village.delete({ id });
    return data;
  }
}
