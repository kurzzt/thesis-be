import { Test, TestingModule } from '@nestjs/testing';
import { PlaceReviewsController } from './place-reviews.controller';
import { PlaceReviewsService } from './place-reviews.service';

describe('PlaceReviewsController', () => {
  let controller: PlaceReviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaceReviewsController],
      providers: [PlaceReviewsService],
    }).compile();

    controller = module.get<PlaceReviewsController>(PlaceReviewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
