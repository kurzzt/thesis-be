import { Module } from '@nestjs/common';
import { PlacePhotosService } from './place-photos.service';
import { PlacePhotosController } from './place-photos.controller';

@Module({
  controllers: [PlacePhotosController],
  providers: [PlacePhotosService],
})
export class PlacePhotosModule {}
