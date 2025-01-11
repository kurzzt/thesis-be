import { PartialType } from '@nestjs/swagger';
import { CreateKycRespondentDto } from './create-kyc-respondent.dto';

export class UpdateKycRespondentDto extends PartialType(
  CreateKycRespondentDto,
) {}
