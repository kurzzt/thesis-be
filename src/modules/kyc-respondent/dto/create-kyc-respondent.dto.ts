import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsOptional, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateKycRespondentDto implements Prisma.KycRespondentCreateInput {
  @ApiProperty({ required: false })
  @IsMongoId()
  @IsOptional()
  id?: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  questionId: string;
}
