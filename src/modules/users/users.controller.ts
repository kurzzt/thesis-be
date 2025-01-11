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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller({ version: '1', path: 'users' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('bulk')
  async createUpdateBulk(@Body() options: { data: CreateUserDto[] }) {
    const data = await this.usersService.createUpdateBulk(options);
    return { data };
  }

  @Post()
  async create(@Body() body: CreateUserDto) {
    const data = await this.usersService.create(body);
    return { data };
  }

  @Get()
  async findAll(@Query() options: GetUsersDto) {
    const { data, count } = await this.usersService.findAll(options);
    return { data, count };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.usersService.findOne(id);
    return { data };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const data = await this.usersService.update(id, body);
    return { data };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.usersService.remove(id);
    return { data };
  }
}
