import { Injectable } from '@nestjs/common';
import { WordService } from '../word/word.service';
import { VocabularyAiService } from '../ai/services/vocabulary-ai.service';
import { Word } from '../word/type/word-repository.type';

@Injectable()
export class VocabularyService {
  constructor(
    private readonly _wordService: WordService,
    private readonly _vocabularyAiService: VocabularyAiService,
  ) {}

  async parseVocabularyFromPhoto(
    photoUrl: string,
    userId: number,
  ): Promise<Word[]> {
    const words = await this._vocabularyAiService.parseWordsFromPhoto(photoUrl);

    return this._wordService.bulkCreate(
      words.map((word) => ({
        ...word,
        userId,
      })),
    );
  }
}
