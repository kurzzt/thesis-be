import { Test, TestingModule } from '@nestjs/testing';
import { PlacePhotosService } from './place-photos.service';

describe('PlacePhotosService', () => {
  let service: PlacePhotosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlacePhotosService],
    }).compile();

    service = module.get<PlacePhotosService>(PlacePhotosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
