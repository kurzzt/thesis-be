import { Test, TestingModule } from '@nestjs/testing';
import { PlaceReviewsService } from './place-reviews.service';

describe('PlaceReviewsService', () => {
  let service: PlaceReviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaceReviewsService],
    }).compile();

    service = module.get<PlaceReviewsService>(PlaceReviewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
