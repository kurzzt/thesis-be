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
import { KycRespondentService } from './kyc-respondent.service';
import { CreateKycRespondentDto } from './dto/create-kyc-respondent.dto';
import { GetKycRespondentDto } from './dto/get-kyc-respondent.dto';
import { UpdateKycRespondentDto } from './dto/update-kyc-respondent.dto';

@Controller({ version: '1', path: 'kyc-respondents' })
export class KycRespondentController {
  constructor(private readonly kycRespondentService: KycRespondentService) {}

  @Post('bulk')
  async createUpdateBulk(@Body() options: { data: CreateKycRespondentDto[] }) {
    const data = await this.kycRespondentService.createUpdateBulk(options);
    return { data };
  }

  @Post()
  async create(@Body() body: CreateKycRespondentDto) {
    const data = await this.kycRespondentService.create(body);
    return { data };
  }

  @Get()
  async findAll(@Query() options: GetKycRespondentDto) {
    const { data, count } = await this.kycRespondentService.findAll(options);
    return { data, count };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.kycRespondentService.findOne(id);
    return { data };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateKycRespondentDto) {
    const data = await this.kycRespondentService.update(id, body);
    return { data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.kycRespondentService.remove(id);
    return { data };
  }
}
