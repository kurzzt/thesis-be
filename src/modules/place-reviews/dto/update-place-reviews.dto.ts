import { PartialType } from '@nestjs/swagger';
import { CreatePlaceReviewDto } from './create-place-reviews.dto';

export class UpdatePlaceReviewDto extends PartialType(CreatePlaceReviewDto) {}
