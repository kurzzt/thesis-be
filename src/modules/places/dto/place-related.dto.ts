import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma, SecondaryHoursType } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  IsEnum,
  IsObject,
  IsBoolean,
  ValidateNested,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsArray,
} from 'class-validator';
import { LanguageCode } from 'src/types/google-api/google-place-lang-code.enum';
import { AddressType } from 'src/types/google-api/google-place-type.enum';

export class AddressComponent implements Prisma.AddressComponentCreateInput {
  @Expose()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  longText: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  shortText: string;

  @Expose()
  @ApiProperty()
  @IsEnum(AddressType, { each: true })
  @IsArray()
  types?: AddressType[];

  @Expose()
  @ApiPropertyOptional()
  @IsEnum(LanguageCode)
  @IsOptional()
  languageCode?: string;
}

export class PlusCode implements Prisma.PlusCodeCreateInput {
  @Expose()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  globalCode: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  compoundCode: string;
}

export class LatLng implements Prisma.LatLngCreateInput {
  @Expose()
  @ApiProperty()
  @IsLongitude()
  @IsNumber()
  longitude: number;

  @Expose()
  @ApiProperty()
  @IsLatitude()
  @IsNumber()
  latitude: number;
}

export class DateInfo implements Prisma.DateInfoCreateInput {
  @Expose()
  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(9999)
  year: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(12)
  month: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(31)
  day: number;
}

export class Point implements Prisma.PointCreateInput {
  @Expose()
  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(6)
  day: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(23)
  hour: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(59)
  minute: number;

  @Expose()
  @ApiPropertyOptional()
  @ValidateNested()
  @Type(() => DateInfo)
  @IsObject()
  @IsOptional()
  date?: DateInfo;
}

export class Periode implements Prisma.PeriodeCreateInput {
  @Expose()
  @ApiProperty()
  @ValidateNested()
  @Type(() => Point)
  @IsObject()
  open: Point;

  @Expose()
  @ApiPropertyOptional()
  @ValidateNested()
  @Type(() => Point)
  @IsObject()
  @IsOptional()
  close?: Point;
}

export class SpecialDay implements Prisma.SpecialDayCreateInput {
  @Expose()
  @ApiProperty()
  @ValidateNested()
  @Type(() => DateInfo)
  @IsObject()
  date: DateInfo;
}

export class OpeningHour implements Prisma.OpeningHourCreateInput {
  @Expose()
  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => Periode)
  @IsArray()
  periods: Periode[];

  @Expose()
  @ApiPropertyOptional()
  @IsEnum(SecondaryHoursType)
  @IsOptional()
  secondaryHoursType?: SecondaryHoursType;

  @Expose()
  @ApiPropertyOptional()
  @ValidateNested({ each: true })
  @Type(() => SpecialDay)
  @IsArray()
  @IsOptional()
  specialDays?: SpecialDay[];
}

export class PaymentOptions implements Prisma.PaymentOptionsCreateInput {
  @Expose()
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  acceptsCreditCards?: boolean;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  acceptsDebitCards?: boolean;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  acceptsCashOnly?: boolean;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  acceptsNfc?: boolean;
}

export class ParkingOptions implements Prisma.ParkingOptionsCreateInput {
  @Expose()
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  freeParkingLot?: boolean;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  paidParkingLot?: boolean;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  freeStreetParking?: boolean;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  paidStreetParking?: boolean;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  valetParking?: boolean;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  freeGarageParking?: boolean;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  paidGarageParking?: boolean;
}

export class AccessibilityOptions
  implements Prisma.AccessibilityOptionsCreateInput
{
  @Expose()
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  wheelchairAccessibleParking?: boolean;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  wheelchairAccessibleEntrance?: boolean;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  wheelchairAccessibleRestroom?: boolean;

  @Expose()
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  wheelchairAccessibleSeating?: boolean;
}

export class AuthorAttribution implements Prisma.AuthorAttributionCreateInput {
  @Expose()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  displayName: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  uri: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  photoUri: string;
}
