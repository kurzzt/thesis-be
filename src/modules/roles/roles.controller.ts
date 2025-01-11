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
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { GetRolesDto } from './dto/get-role.dto';

@Controller({ version: '1', path: 'roles' })
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('bulk')
  async createUpdateBulk(@Body() options: { data: CreateRoleDto[] }) {
    const data = await this.rolesService.createUpdateBulk(options);
    return { data };
  }

  @Post()
  async create(@Body() body: CreateRoleDto) {
    const data = await this.rolesService.create(body);
    return { data };
  }

  @Get()
  async findAll(@Query() options: GetRolesDto) {
    const { data, count } = await this.rolesService.findAll(options);
    return { data, count };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.rolesService.findOne(id);
    return { data };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateRoleDto) {
    const data = await this.rolesService.update(id, body);
    return { data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.rolesService.remove(id);
    return { data };
  }
}
