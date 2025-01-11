import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsArray,
  IsEnum,
  IsInt,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { PlaceTypeA } from 'src/types/google-api/google-place-type.enum';

export class GetNearbyPlaceDto {
  @ApiProperty()
  @IsLatitude()
  @IsNumber()
  latitude: number;

  @ApiProperty()
  @IsLongitude()
  @IsNumber()
  longitude: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @Max(50000)
  radius: number;

  @ApiPropertyOptional()
  @IsArray()
  @ArrayMaxSize(50)
  @IsEnum(PlaceTypeA, { each: true })
  @IsOptional()
  includedTypes?: PlaceTypeA[];

  @ApiPropertyOptional()
  @IsArray()
  @ArrayMaxSize(50)
  @IsEnum(PlaceTypeA, { each: true })
  @IsOptional()
  excludedTypes?: PlaceTypeA[];

  @ApiPropertyOptional()
  @IsArray()
  @ArrayMaxSize(50)
  @IsEnum(PlaceTypeA, { each: true })
  @IsOptional()
  includedPrimaryTypes?: PlaceTypeA[];

  @ApiPropertyOptional()
  @IsArray()
  @ArrayMaxSize(50)
  @IsEnum(PlaceTypeA, { each: true })
  @IsOptional()
  excludedPrimaryTypes?: PlaceTypeA[];
}
