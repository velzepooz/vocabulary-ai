import { Module } from '@nestjs/common';
import { WordModule } from '../word/word.module';
import { AiModule } from '../ai/ai.module';
import { UserModule } from '../user/user.module';
import { VocabularyService } from './vocabulary.service';

@Module({
  imports: [WordModule, UserModule, AiModule],
  controllers: [],
  providers: [VocabularyService],
  exports: [VocabularyService],
})
export class VocabularyModule {}
