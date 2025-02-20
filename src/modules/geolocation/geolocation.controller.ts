import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { GeolocationService } from './geolocation.service';
import {
  CreateDistrictDto,
  CreateProvinceDto,
  CreateRegencyDto,
  CreateVillageDto,
} from './dto/create-geoloc.dto';
import {
  UpdateDistrictDto,
  UpdateProvinceDto,
  UpdateRegencyDto,
  UpdateVillageDto,
} from './dto/update-geoloc.dto';
import { GetGeoLocDto } from './dto/get-geoloc.dto';

@Controller({ version: '1' })
export class GeolocationController {
  constructor(private readonly geolocationService: GeolocationService) {}

  // ==============================================
  // FIND ALL
  // ==============================================
  @Get('geoloc')
  async findAll(@Query() options: GetGeoLocDto) {
    const data = await this.geolocationService.findAll(options);
    return data;
  }

  // ==============================================
  // PROVINCE
  // ==============================================
  @Post('provinces/bulk')
  async createUpdateBulkProvince(
    @Body() options: { data: CreateProvinceDto[] },
  ) {
    const data =
      await this.geolocationService.createUpdateBulkProvince(options);
    return { data };
  }

  @Post('provinces')
  async createProvince(@Body() body: CreateProvinceDto) {
    const data = await this.geolocationService.createProvince(body);
    return { data };
  }

  @Get('provinces/:id')
  async findOneProvince(@Param('id') id: string) {
    const data = await this.geolocationService.findOneProvince(id);
    return { data };
  }

  @Patch('provinces/:id')
  async updateProvince(
    @Param('id') id: string,
    @Body() body: UpdateProvinceDto,
  ) {
    const data = await this.geolocationService.updateProvince(id, body);
    return { data };
  }

  @Delete('provinces/:id')
  async removeProvince(@Param('id') id: string) {
    const data = await this.geolocationService.removeProvince(id);
    return { data };
  }

  // ==============================================
  // REGENCY
  // ==============================================
  @Post('regencies/bulk')
  async createUpdateBulkRegency(@Body() options: { data: CreateRegencyDto[] }) {
    const data = await this.geolocationService.createUpdateBulkRegency(options);
    return { data };
  }

  @Post('regencies')
  async createRegency(@Body() body: CreateRegencyDto) {
    const data = await this.geolocationService.createRegency(body);
    return { data };
  }

  @Get('regencies/:id')
  async findOneRegency(@Param('id') id: string) {
    const data = await this.geolocationService.findOneRegency(id);
    return { data };
  }

  @Patch('regencies/:id')
  async updateRegency(@Param('id') id: string, @Body() body: UpdateRegencyDto) {
    const data = await this.geolocationService.updateRegency(id, body);
    return { data };
  }

  @Delete('regencies/:id')
  async removeRegency(@Param('id') id: string) {
    const data = await this.geolocationService.removeRegency(id);
    return { data };
  }

  // ==============================================
  // DISTRICT
  // ==============================================
  @Post('districts/bulk')
  async createUpdateBulkDistrict(
    @Body() options: { data: CreateDistrictDto[] },
  ) {
    const data =
      await this.geolocationService.createUpdateBulkDistrict(options);
    return { data };
  }

  @Post('districts')
  async createDistrict(@Body() body: CreateDistrictDto) {
    const data = await this.geolocationService.createDistrict(body);
    return { data };
  }

  @Get('districts/:id')
  async findOneDistrict(@Param('id') id: string) {
    const data = await this.geolocationService.findOneDistrict(id);
    return { data };
  }
  @Patch('districts/:id')
  async updateDistrict(
    @Param('id') id: string,
    @Body() body: UpdateDistrictDto,
  ) {
    const data = await this.geolocationService.updateDistrict(id, body);
    return { data };
  }

  @Delete('districts/:id')
  async removeDistrict(@Param('id') id: string) {
    const data = await this.geolocationService.removeDistrict(id);
    return { data };
  }

  // ==============================================
  // VILLAGE
  // ==============================================
  @Post('villages/bulk')
  async createUpdateBulkVillage(@Body() options: { data: CreateVillageDto[] }) {
    const data = await this.geolocationService.createUpdateBulkVillage(options);
    return { data };
  }

  @Post('villages')
  async createVillage(@Body() body: CreateVillageDto) {
    const data = await this.geolocationService.createVillage(body);
    return { data };
  }

  @Get('villages/:id')
  async findOneVillage(@Param('id') id: string) {
    const data = await this.geolocationService.findOneVillage(id);
    return { data };
  }
  @Patch('villages/:id')
  async updateVillage(@Param('id') id: string, @Body() body: UpdateVillageDto) {
    const data = await this.geolocationService.updateVillage(id, body);
    return { data };
  }

  @Delete('villages/:id')
  async removeVillage(@Param('id') id: string) {
    const data = await this.geolocationService.removeVillage(id);
    return { data };
  }
}
