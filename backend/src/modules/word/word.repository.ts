import { Injectable } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { InjectDrizzle } from '@knaadh/nestjs-drizzle-postgres';
import { BaseRepository } from '../../common/base.repository';
import { word } from '../../db/schema';
import { Word } from './type/word-repository.type';

@Injectable()
export class WordRepository extends BaseRepository<Word> {
  constructor(@InjectDrizzle() protected readonly db: PostgresJsDatabase) {
    super(db, word);
  }
}
