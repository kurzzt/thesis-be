import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsLongitude,
  IsLatitude,
  IsOptional,
  IsMongoId,
} from 'class-validator';

export class CreateProvinceDto implements Prisma.ProvinceCreateInput {
  @ApiProperty({ required: false })
  @IsMongoId()
  @IsOptional()
  id?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  kodeBps: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsLatitude()
  @IsNumber()
  latitude: number;

  @ApiProperty()
  @IsLongitude()
  @IsNumber()
  longitude: number;
}

export class CreateRegencyDto implements Prisma.RegencyCreateInput {
  @ApiProperty({ required: false })
  @IsMongoId()
  @IsOptional()
  id?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  kodeBps: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsLatitude()
  @IsNumber()
  latitude: number;

  @ApiProperty()
  @IsLongitude()
  @IsNumber()
  longitude: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  parentId: string;
}

export class CreateDistrictDto implements Prisma.DistrictCreateInput {
  @ApiProperty({ required: false })
  @IsMongoId()
  @IsOptional()
  id?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  kodeBps: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsLatitude()
  @IsNumber()
  latitude: number;

  @ApiProperty()
  @IsLongitude()
  @IsNumber()
  longitude: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  parentId: string;
}

export class CreateVillageDto implements Prisma.VillageCreateInput {
  @ApiProperty({ required: false })
  @IsMongoId()
  @IsOptional()
  id?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  kodeBps: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsLatitude()
  @IsNumber()
  latitude: number;

  @ApiProperty()
  @IsLongitude()
  @IsNumber()
  longitude: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  parentId: string;
}
