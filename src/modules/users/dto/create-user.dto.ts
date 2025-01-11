import { ApiProperty } from '@nestjs/swagger';
import { Prisma, Status } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto implements Prisma.UserCreateInput {
  @ApiProperty({ required: false })
  @IsMongoId()
  @IsOptional()
  id?: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  roleId: string;

  @ApiProperty({ required: false })
  @IsEnum(Status)
  @IsOptional()
  status: Status;
}
