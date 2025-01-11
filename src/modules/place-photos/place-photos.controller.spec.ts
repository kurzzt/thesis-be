import { Test, TestingModule } from '@nestjs/testing';
import { PlacePhotosController } from './place-photos.controller';
import { PlacePhotosService } from './place-photos.service';

describe('PlacePhotosController', () => {
  let controller: PlacePhotosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlacePhotosController],
      providers: [PlacePhotosService],
    }).compile();

    controller = module.get<PlacePhotosController>(PlacePhotosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
