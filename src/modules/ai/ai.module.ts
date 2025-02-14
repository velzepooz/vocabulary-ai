import { Module } from '@nestjs/common';
import { ParseWordsService } from './services/parse-words.service';

@Module({
  providers: [ParseWordsService],
  exports: [ParseWordsService],
})
export class AiModule {}
