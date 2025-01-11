import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { GoogleApiModule } from '../google-api/google-api.module';

@Module({
  imports: [GoogleApiModule],
  controllers: [PlacesController],
  providers: [PlacesService],
})
export class PlacesModule {}
