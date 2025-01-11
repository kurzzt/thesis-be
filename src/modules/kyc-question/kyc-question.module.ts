import { Module } from '@nestjs/common';
import { KycQuestionService } from './kyc-question.service';
import { KycQuestionController } from './kyc-question.controller';

@Module({
  controllers: [KycQuestionController],
  providers: [KycQuestionService],
})
export class KycQuestionModule {}
