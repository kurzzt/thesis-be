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
import { KycCategoryService } from './kyc-category.service';
import { CreateKycCategoryDto } from './dto/create-kyc-category.dto';
import { GetKycCategoryDto } from './dto/get-kyc-category.dto';
import { UpdateKycCategoryDto } from './dto/update-kyc-category.dto';

@Controller({ version: '1', path: 'kyc-categories' })
export class KycCategoryController {
  constructor(private readonly kycCategoryService: KycCategoryService) {}

  @Post('bulk')
  async createUpdateBulk(@Body() options: { data: CreateKycCategoryDto[] }) {
    const data = await this.kycCategoryService.createUpdateBulk(options);
    return { data };
  }

  @Post()
  async create(@Body() body: CreateKycCategoryDto) {
    const data = await this.kycCategoryService.create(body);
    return { data };
  }

  @Get()
  async findAll(@Query() options: GetKycCategoryDto) {
    const { data, count } = await this.kycCategoryService.findAll(options);
    return { data, count };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.kycCategoryService.findOne(id);
    return { data };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateKycCategoryDto) {
    const data = await this.kycCategoryService.update(id, body);
    return { data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.kycCategoryService.remove(id);
    return { data };
  }
}
