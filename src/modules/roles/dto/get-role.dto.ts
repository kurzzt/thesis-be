import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';

export class GetRolesDto extends PageOptionsDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;
}
