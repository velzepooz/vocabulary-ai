import { Module } from '@nestjs/common';
import { VocabularyAiService } from './services/vocabulary-ai.service';

@Module({
  providers: [VocabularyAiService],
  exports: [VocabularyAiService],
})
export class AiModule {}
