import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PlacesService } from './places.service';
import { GetPlacesDto } from './dto/get-places.dto';
import { CreateBulkPlaceDto, CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { GetNearbyPlaceDto } from '../google-api/dto/get-google-api.dto';
import { SetTimeout } from 'src/decorators/settimeout.decorator';

@Controller({ version: '1', path: 'places' })
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Post('bulk')
  async createUpdateBulk(@Body() options: { data: CreatePlaceDto[] }) {
    const data = await this.placesService.createUpdateBulk(options);
    return { data };
  }

  @Post()
  async create(@Body() body: CreatePlaceDto) {
    const data = await this.placesService.create(body);
    return { data };
  }

  @Get()
  async findAll(@Query() options: GetPlacesDto) {
    const { data, count } = await this.placesService.findAll(options);
    return { data, count };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.placesService.findOne(id);
    return { data };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdatePlaceDto) {
    const data = await this.placesService.update(id, body);
    return { data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.placesService.remove(id);
    return { data };
  }

  @Post('nearby')
  async findNearby(@Body() body: GetNearbyPlaceDto) {
    const data = await this.placesService.findNearby(body);
    return { data };
  }

  @Post('autoBulk')
  @SetTimeout(18000)
  async dumpBulk(@Body() body: CreateBulkPlaceDto) {
    const data = await this.placesService.createAutoBulk(body);
    return { data };
  }
}
