import { Injectable, Logger } from '@nestjs/common';
import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { PARSE_WORDS_PROMPT } from '../constants/parse-words-promt.constant';
import { wordPairSchema } from '../schemas/parsed-words.schema';
import { ParsedWordPair } from '../types/parse-words-service.types';
import { ApplicationError } from '../../../common/application-error';
import { PARSE_WORDS_ERRORS } from '../constants/parse-words-errors.constant';
import { CaptureError } from '../../../common/capture-error';

@Injectable()
export class ParseWordsService {
  private readonly _logger = new Logger(ParseWordsService.name);
  private readonly _model = openai('gpt-4o-mini');

  constructor(private readonly _captureErrors: CaptureError) {}

  async parseWordsFromPhoto(photoUrl: string): Promise<ParsedWordPair[]> {
    try {
      const response = await generateObject({
        model: this._model,
        system: PARSE_WORDS_PROMPT,
        output: 'array',
        schema: wordPairSchema,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                image: new URL(photoUrl),
              },
            ],
          },
        ],
      });

      return response.object;
    } catch (e) {
      this._logger.error(e.data);
      this._captureErrors.captureError(e);

      throw new ApplicationError(PARSE_WORDS_ERRORS.OPENAI_ERROR);
    }
  }
}
