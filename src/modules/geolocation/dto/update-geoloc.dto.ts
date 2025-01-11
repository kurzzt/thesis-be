import { PartialType } from '@nestjs/swagger';
import {
  CreateDistrictDto,
  CreateProvinceDto,
  CreateRegencyDto,
  CreateVillageDto,
} from './create-geoloc.dto';

export class UpdateProvinceDto extends PartialType(CreateProvinceDto) {}

export class UpdateRegencyDto extends PartialType(CreateRegencyDto) {}

export class UpdateDistrictDto extends PartialType(CreateDistrictDto) {}

export class UpdateVillageDto extends PartialType(CreateVillageDto) {}
