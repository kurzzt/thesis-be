import { PartialType } from '@nestjs/swagger';
import { CreateKycCategoryDto } from './create-kyc-category.dto';

export class UpdateKycCategoryDto extends PartialType(CreateKycCategoryDto) {}
