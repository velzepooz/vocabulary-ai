import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Context } from 'telegraf';
import { ENV_VARS } from '../../../config/env-vars.config';
import { ParseWordsService } from '../../ai/services/parse-words.service';
import { ApplicationError } from '../../../common/application-error';
import { PARSE_WORDS_ERRORS } from '../../ai/constants/parse-words-errors.constant';
import {
  TELEGRAM_ID_NOT_FOUND_MESSAGE,
  START_MESSAGE,
  INVALID_MESSAGE_TYPE_MESSAGE_FOR_PHOTO,
  EMAIL_VERIFICATION_SUCCESS_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  USER_UNAUTHORIZED_MESSAGE,
} from '../constants/telegram-message-templates.constant';
import { AuthService } from '../../auth/auth.service';
import { TelegramBotRedisRepository } from '../repositories/telegram-bot-redis.repository';
import { isValidEmail } from '../../../utils/email-validation.util';

@Injectable()
export class TelegramBotService {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _parseWordsService: ParseWordsService,
    private readonly _authService: AuthService,
    private readonly _telegramBotRedisRepository: TelegramBotRedisRepository,
  ) {}

  async handleStartCommand(ctx: Context): Promise<void> {
    await ctx.reply(START_MESSAGE);
    const telegramId = ctx.from.id;
    const user = await this._authService.authenticateTelegramUser(telegramId);

    if (!user) {
      await this._telegramBotRedisRepository.addEmailVerificationAwaitingUser(
        ctx.from.id,
      );
      await ctx.reply(TELEGRAM_ID_NOT_FOUND_MESSAGE);
    }
  }

  async handleMessage(ctx: Context): Promise<void> {
    const telegramId = ctx.from.id;

    if (await this._handleEmailVerification(ctx, telegramId)) {
      return;
    }

    // Handle photo messages only for authenticated users
    const user = await this._authService.authenticateTelegramUser(telegramId);

    if (!user) {
      await ctx.reply(USER_UNAUTHORIZED_MESSAGE);

      return;
    }

    // Existing message handling logic
    const messageHandlers = {
      photo: async () => this._handlePhoto(ctx),
      document: () => ctx.reply(INVALID_MESSAGE_TYPE_MESSAGE_FOR_PHOTO),
      text: () => ctx.reply(INVALID_MESSAGE_TYPE_MESSAGE_FOR_PHOTO),
    };

    const messageType = Object.keys(messageHandlers).find(
      (type) => type in ctx.message,
    );

    if (messageType) {
      await messageHandlers[messageType]();

      return;
    }

    await ctx.reply(INVALID_MESSAGE_TYPE_MESSAGE_FOR_PHOTO);
  }

  private async _handleEmailVerification(
    ctx: Context,
    telegramId: number,
  ): Promise<boolean> {
    const isEmailVerificationAwaitingUser =
      await this._telegramBotRedisRepository.isEmailVerificationAwaitingUser(
        telegramId,
      );

    if (isEmailVerificationAwaitingUser) {
      if ('text' in ctx.message) {
        const email = ctx.message.text;

        if (!isValidEmail(email)) {
          await ctx.reply(INVALID_EMAIL_MESSAGE);

          return true;
        }

        const user = await this._authService.linkTelegramIdToEmail(
          email,
          telegramId,
        );

        if (user) {
          await this._telegramBotRedisRepository.removeEmailVerificationAwaitingUser(
            telegramId,
          );
          await ctx.reply(EMAIL_VERIFICATION_SUCCESS_MESSAGE);

          return true;
        } else {
          await ctx.reply(USER_NOT_FOUND_MESSAGE);

          return true;
        }
      } else {
        await ctx.reply(INVALID_EMAIL_MESSAGE);

        return true;
      }
    }

    return false;
  }

  async _handlePhoto(ctx: Context) {
    await ctx.reply('Processing photo.... Please wait.');
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
