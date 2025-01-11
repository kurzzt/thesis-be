import {
  Body,
  Controller,
  Get,
  Query,
  Param,
  Patch,
  Delete,
  Post,
} from '@nestjs/common';
import { PlacePhotosService } from './place-photos.service';
import { CreatePlacePhotoDto } from './dto/create-place-photo.dto';
import { GetPlacePhotoDto } from './dto/get-place-photo.dto';
import { UpdatePlacePhotoDto } from './dto/update-place-photo.dto';

@Controller({ version: '1', path: 'place-photos' })
export class PlacePhotosController {
  constructor(private readonly placePhotosService: PlacePhotosService) {}

  @Post('bulk')
  async createUpdateBulk(@Body() options: { data: CreatePlacePhotoDto[] }) {
    const data = await this.placePhotosService.createUpdateBulk(options);
    return { data };
  }

  @Post()
  async create(@Body() body: CreatePlacePhotoDto) {
    const data = await this.placePhotosService.create(body);
    return { data };
  }

  @Get()
  async findAll(@Query() options: GetPlacePhotoDto) {
    const { data, count } = await this.placePhotosService.findAll(options);
    return { data, count };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.placePhotosService.findOne(id);
    return { data };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdatePlacePhotoDto) {
    const data = await this.placePhotosService.update(id, body);
    return { data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.placePhotosService.remove(id);
    return { data };
  }
}
