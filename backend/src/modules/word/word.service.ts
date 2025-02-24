import { Injectable } from '@nestjs/common';
import { WordRepository } from './word.repository';
import { createWord, Word } from './type/word-repository.type';

@Injectable()
export class WordService {
  constructor(private readonly wordRepository: WordRepository) {}

  async bulkCreate(words: createWord[]): Promise<Word[]> {
    if (words.length === 0) {
      return [];
    }

    return this.wordRepository.bulkCreate(words as Word[]);
  }
}
