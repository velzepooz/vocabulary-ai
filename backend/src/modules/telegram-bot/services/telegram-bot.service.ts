import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Context } from 'telegraf';
import { ENV_VARS } from '../../../config/env-vars.config';
import { ParseWordsService } from '../../ai/services/parse-words.service';
import { ApplicationError } from '../../../common/application-error';
import { PARSE_WORDS_ERRORS } from '../../ai/constants/parse-words-errors.constant';

@Injectable()
export class TelegramBotService {
  private readonly _logger = new Logger(TelegramBotService.name);

  constructor(
    private readonly _configService: ConfigService,
    private readonly _parseWordsService: ParseWordsService,
  ) {}

  async handlePhoto(ctx: Context) {
    const photoUrl = await this._getPhotoUrl(ctx);
    const extractedWords =
      await this._parseWordsService.parseWordsFromPhoto(photoUrl);

    console.log(extractedWords);

    if (!extractedWords.length) {
      throw new ApplicationError(PARSE_WORDS_ERRORS.NO_WORDS_FOUND);
    }

    // TODO: add logic to save somewhere
    await ctx.reply('Words saved successfully!');
  }

  private async _getPhotoUrl(ctx: Context): Promise<string> {
    const photos = (ctx.message as any).photo;
    // Get the highest quality photo
    const photo = photos[photos.length - 1];
    const file = await ctx.telegram.getFile(photo.file_id);
    const photoUrl = `https://api.telegram.org/file/bot${this._configService.get<
      ENV_VARS['TELEGRAM_BOT_TOKEN']
    >('TELEGRAM_BOT_TOKEN')}/${file.file_path}`;

    return photoUrl;
  }
}
