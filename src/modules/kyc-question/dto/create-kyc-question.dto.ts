import { ApiProperty } from '@nestjs/swagger';
import { Prisma, Status } from '@prisma/client';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateKycQuestionDto implements Prisma.KycQuestionCreateInput {
  @ApiProperty({ required: false })
  @IsMongoId()
  @IsOptional()
  id?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ required: false })
  @IsEnum(Status)
  @IsOptional()
  status: Status;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  categoryId: string;
}
