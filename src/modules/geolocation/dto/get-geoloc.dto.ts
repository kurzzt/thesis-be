import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { GeoLocLevel } from 'src/types/global.enum';

export class GetGeoLocDto extends PageOptionsDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsEnum(GeoLocLevel)
  @IsString()
  level: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  parentId?: string;
}
