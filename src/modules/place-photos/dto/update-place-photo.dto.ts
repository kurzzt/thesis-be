import { PartialType } from '@nestjs/swagger';
import { CreatePlacePhotoDto } from './create-place-photo.dto';

export class UpdatePlacePhotoDto extends PartialType(CreatePlacePhotoDto) {}
