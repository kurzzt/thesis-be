import { ApiProperty } from '@nestjs/swagger';
import { Prisma, Status } from '@prisma/client';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateKycCategoryDto implements Prisma.KycCategoryCreateInput {
  @ApiProperty({ required: false })
  @IsMongoId()
  @IsOptional()
  id?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false })
  @IsEnum(Status)
  @IsOptional()
  status: Status;
}
