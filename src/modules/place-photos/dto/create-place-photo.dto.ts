import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma, Provider } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { AuthorAttribution } from 'src/modules/places/dto/place-related.dto';

export class CreatePlacePhotoDto implements Prisma.PlacePhotoCreateInput {
  @ApiProperty({ required: false })
  @IsMongoId()
  @IsOptional()
  id?: string;

  @Expose()
  @ApiPropertyOptional()
  @ValidateIf((o) => o.provider == Provider.GOOGLE)
  @IsString()
  photoApi?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @Expose()
  @ApiProperty()
  @IsEnum(Provider)
  provider: Provider;

  @Expose()
  @ApiProperty()
  @ValidateIf((o) => o.provider == Provider.GOOGLE)
  @IsNumber()
  @Min(0)
  widthPx?: number;

  @Expose()
  @ApiProperty()
  @ValidateIf((o) => o.provider == Provider.GOOGLE)
  @IsNumber()
  @Min(0)
  heightPx?: number;

  @Expose()
  @ApiProperty()
  @ValidateIf((o) => o.provider == Provider.GOOGLE)
  @ValidateNested({ each: true })
  @Type(() => AuthorAttribution)
  @IsArray()
  authorAttributions?: AuthorAttribution[];

  @Expose()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  placeId: string;

  @ApiProperty()
  @ValidateIf((o) => o.provider == Provider.USER)
  @IsString()
  @IsNotEmpty()
  userId: string;
}
