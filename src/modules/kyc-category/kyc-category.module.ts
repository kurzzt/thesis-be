import { Module } from '@nestjs/common';
import { KycCategoryService } from './kyc-category.service';
import { KycCategoryController } from './kyc-category.controller';

@Module({
  controllers: [KycCategoryController],
  providers: [KycCategoryService],
})
export class KycCategoryModule {}
