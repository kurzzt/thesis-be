import {
  Controller,
  Get,
  Query
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { GetDashboardDto } from './dto/get-dasboard.dto';

@Controller({ version: '1', path: 'dashboard' })
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  async find(
    @Query() options: GetDashboardDto
  ) {
    const data = await this.dashboardService.countAll(options);
    return { data };
  }
}
