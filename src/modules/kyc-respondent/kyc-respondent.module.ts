import { Module } from '@nestjs/common';
import { KycRespondentService } from './kyc-respondent.service';
import { KycRespondentController } from './kyc-respondent.controller';

@Module({
  controllers: [KycRespondentController],
  providers: [KycRespondentService],
})
export class KycRespondentModule {}
