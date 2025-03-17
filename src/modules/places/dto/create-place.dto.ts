import {
  ApiProperty,
  ApiPropertyOptional
} from '@nestjs/swagger';
import {
  BussinessStatus,
  PriceLevel,
  Prisma
} from '@prisma/client';
import {
  Expose,
  Type
} from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { PlaceType } from 'src/types/google-api/google-place-type.enum';
import {
  AccessibilityOptions,
  AddressComponent,
  LatLng,
  OpeningHour,
  ParkingOptions,
  PaymentOptions,
  PlusCode,
} from './place-related.dto';

export class CreatePlaceDto implements Prisma.PlaceCreateInput {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  id?: string;

  @Expose()
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  placeAPI?: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  displayName: string;

  @Expose()
  @ApiProperty()
  @IsEnum(PlaceType, { each: true })
  @IsArray()
  types: string[];

  @Expose()
  @ApiProperty()
  @IsEnum(PlaceType)
  primaryType: string;

  @Expose()
  @ApiProperty()
  @IsPhoneNumber()
  @IsNotEmpty()
  internationalPhoneNumber: string;

  @Expose()
  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => AddressComponent)
  @IsArray()
  addressComponents: AddressComponent[];

  @Expose()
  @ApiPropertyOptional()
  @ValidateNested()
  @Type(() => PlusCode)
  @IsObject()
  @IsOptional()
  plusCode?: PlusCode;

  @Expose()
  @ApiProperty()
  @ValidateNested()
  @Type(() => LatLng)
  @IsObject()
  location: LatLng;

  @Expose()
  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @Expose()
  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  googleMapsUri: string;

  @Expose()
  @ApiPropertyOptional()
  @IsUrl()
  @IsOptional()
  websiteUri: string;

  @Expose()
  @ApiPropertyOptional()
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  reviewId?: string[];

  @Expose()
  @ApiProperty()
  @ValidateNested()
  @Type(() => OpeningHour)
  @IsObject()
  regularOpeningHours: OpeningHour;

  @Expose()
  @ApiPropertyOptional()
  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  photoId?: string[];

  @Expose()
  @ApiProperty()
  @IsEnum(BussinessStatus)
  @IsString()
  businessStatus: BussinessStatus;

  @Expose()
  @ApiProperty()
  @IsEnum(PriceLevel)
  @IsString()
  @IsOptional()
  priceLevel?: PriceLevel;

  @Expose()
  @ApiProperty()
  @ValidateNested()
  @Type(() => OpeningHour)
  @IsObject()
  currentOpeningHours: OpeningHour;

  @Expose()
  @ApiPropertyOptional()
  @ValidateNested({ each: true })
  @Type(() => OpeningHour)
  @IsArray()
  @IsOptional()
  currentSecondaryOpeningHours?: OpeningHour[];

  @Expose()
  @ApiPropertyOptional()
  @ValidateNested({ each: true })
  @Type(() => OpeningHour)
  @IsArray()
  @IsOptional()
  regularSecondaryOpeningHours?: OpeningHour[];

  @Expose()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  editorialSummary: string;

  @Expose()
  @ApiPropertyOptional()
  @ValidateNested()
  @Type(() => PaymentOptions)
  @IsObject()
  @IsOptional()
  paymentOptions?: PaymentOptions;

  @Expose()
  @ApiPropertyOptional()
  @ValidateNested()
  @Type(() => ParkingOptions)
  @IsObject()
  @IsOptional()
  parkingOptions?: ParkingOptions;

  @Expose()
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  utcOffsetMinutes?: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  userRatingCount: number;

  @Expose()
  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  takeout?: boolean;

  @Expose()
  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  delivery?: boolean;

  @Expose()
  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  dineIn?: boolean;

  @Expose()
  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  curbsidePickup?: boolean;

  @Expose()
  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  reservable?: boolean;

  @Expose()
  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  servesBreakfast?: boolean;

  @Expose()
  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  servesLunch?: boolean;

  @Expose()
  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  servesDinner?: boolean;

  @Expose()
  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  servesBeer?: boolean;

  @Expose()
  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  servesWine?: boolean;

  @Expose()
  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  servesBrunch?: boolean;

  @Expose()
  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  servesVegetarianFood?: boolean;

  @Expose()
  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  outdoorSeating?: boolean;

  @Expose()
  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  liveMusic?: boolean;

  @Expose()
  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  menuForChildren?: boolean;

  @Expose()
  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  servesCocktails?: boolean;

  @Expose()
  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  servesDessert?: boolean;

  @Expose()
  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  servesCoffee?: boolean;

  @Expose()
  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  goodForChildren?: boolean;

  @Expose()
  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  allowsDogs?: boolean;

  @Expose()
  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  restroom?: boolean;

  @Expose()
  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  goodForGroups?: boolean;

  @Expose()
  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  goodForWatchingSports?: boolean;

  @Expose()
  @ApiPropertyOptional()
  @ValidateNested()
  @Type(() => AccessibilityOptions)
  @IsObject()
  @IsOptional()
  accessibilityOptions?: AccessibilityOptions;
}

export class CreateBulkPlaceDto {
  @Expose()
  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  ids: string[];
}
