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
import { KycQuestionService } from './kyc-question.service';
import { CreateKycQuestionDto } from './dto/create-kyc-question.dto';
import { GetKycQuestionDto } from './dto/get-kyc-question.dto';
import { UpdateKycQuestionDto } from './dto/update-kyc-question.dto';

@Controller({ version: '1', path: 'kyc-questions' })
export class KycQuestionController {
  constructor(private readonly kycQuestionService: KycQuestionService) {}

  @Post('bulk')
  async createUpdateBulk(@Body() options: { data: CreateKycQuestionDto[] }) {
    const data = await this.kycQuestionService.createUpdateBulk(options);
    return { data };
  }

  @Post()
  async create(@Body() body: CreateKycQuestionDto) {
    const data = await this.kycQuestionService.create(body);
    return { data };
  }

  @Get()
  async findAll(@Query() options: GetKycQuestionDto) {
    const { data, count } = await this.kycQuestionService.findAll(options);
    return { data, count };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.kycQuestionService.findOne(id);
    return { data };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateKycQuestionDto) {
    const data = await this.kycQuestionService.update(id, body);
    return { data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.kycQuestionService.remove(id);
    return { data };
  }
}
