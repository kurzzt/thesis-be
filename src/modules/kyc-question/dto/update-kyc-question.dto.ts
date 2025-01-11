import { PartialType } from '@nestjs/swagger';
import { CreateKycQuestionDto } from './create-kyc-question.dto';

export class UpdateKycQuestionDto extends PartialType(CreateKycQuestionDto) {}
