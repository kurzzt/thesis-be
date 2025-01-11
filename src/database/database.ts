import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClientExtended } from './db-client-extend';

@Injectable()
export class DatabaseService
  extends PrismaClientExtended
  implements OnModuleInit
{
  async onModuleInit() {
    await this.$connect();
  }
}