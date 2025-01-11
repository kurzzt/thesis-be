import { Module } from '@nestjs/common';
import { PlaceReviewsService } from './place-reviews.service';
import { PlaceReviewsController } from './place-reviews.controller';

@Module({
  controllers: [PlaceReviewsController],
  providers: [PlaceReviewsService],
})
export class PlaceReviewsModule {}
