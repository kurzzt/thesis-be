import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PriceLevel } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';

export class GetPlacesDto extends PageOptionsDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  displayName?: string;

  @ApiProperty()
  @Type(() => Number)
  @IsLatitude()
  @IsNumber()
  @IsOptional()
  latitude?: number;

  @ApiProperty()
  @Type(() => Number)
  @IsLongitude()
  @IsNumber()
  @IsOptional()
  longitude?: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(50000)
  @IsOptional()
  radius?: number;

  @ApiProperty()
  @IsEnum(PriceLevel)
  @IsOptional()
  priceLevel?: PriceLevel;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  facilities?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  ambiences?: string;
}
