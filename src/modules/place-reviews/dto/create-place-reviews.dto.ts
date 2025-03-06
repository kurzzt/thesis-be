import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma, Provider } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { AuthorAttribution } from 'src/modules/places/dto/place-related.dto';

export class CreatePlaceReviewDto implements Prisma.PlaceReviewCreateInput {
  @ApiProperty({ required: false })
  @IsMongoId()
  @IsOptional()
  id?: string;

  @Expose()
  @ApiPropertyOptional()
  @ValidateIf((o) => o.provider == Provider.GOOGLE)
  @IsString()
  reviewApi?: string;

  @Expose()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  text: string;

  @Expose()
  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  placeId: string;

  @Expose()
  @IsEnum(Provider)
  provider: Provider;

  @Expose()
  @ApiPropertyOptional()
  @ValidateIf((o) => o.provider == Provider.GOOGLE)
  @ValidateNested()
  @Type(() => AuthorAttribution)
  @IsObject()
  authorAttribution?: AuthorAttribution;

  @Expose()
  @ApiProperty()
  @ValidateIf((o) => o.provider == Provider.USER)
  @IsMongoId()
  @IsNotEmpty()
  userId?: string;

  @Expose()
  createdAt?: Date;
}
