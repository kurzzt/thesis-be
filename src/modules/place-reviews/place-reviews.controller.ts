import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PlaceReviewsService } from './place-reviews.service';
import { CreatePlaceReviewDto } from './dto/create-place-reviews.dto';
import { GetPlaceReviewDto } from './dto/get-place-reviews.dto';
import { UpdatePlaceReviewDto } from './dto/update-place-reviews.dto';

@Controller({ version: '1', path: 'place-reviews' })
export class PlaceReviewsController {
  constructor(private readonly placeReviewsService: PlaceReviewsService) {}

  @Post('bulk')
  async createUpdateBulk(@Body() options: { data: CreatePlaceReviewDto[] }) {
    const data = await this.placeReviewsService.createUpdateBulk(options);
    return { data };
  }

  @Post()
  async create(@Body() body: CreatePlaceReviewDto) {
    const data = await this.placeReviewsService.create(body);
    return { data };
  }

  @Get()
  async findAll(@Query() options: GetPlaceReviewDto) {
    const { data, count } = await this.placeReviewsService.findAll(options);
    return { data, count };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.placeReviewsService.findOne(id);
    return { data };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdatePlaceReviewDto) {
    const data = await this.placeReviewsService.update(id, body);
    return { data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.placeReviewsService.remove(id);
    return { data };
  }
}
