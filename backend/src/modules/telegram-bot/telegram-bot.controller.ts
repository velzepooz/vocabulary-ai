import { Update, Start, On, Ctx } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { Logger } from '@nestjs/common';
import {
  INVALID_MESSAGE_TYPE_MESSAGE_FOR_PHOTO,
  START_MESSAGE,
} from './constants/telegram-message-templates.constant';
import { TelegramMessage } from './decorators/telegram-message.decorator';
import { TelegramBotService } from './services/telegram-bot.service';

@Update()
export class TelegramBotController {
  private readonly _logger = new Logger(TelegramBotController.name);

  constructor(private readonly _botService: TelegramBotService) {}

  @Start()
  @TelegramMessage()
  async startCommand(@Ctx() ctx: Context) {
    await ctx.reply(START_MESSAGE);
  }

  @On('message')
  @TelegramMessage()
  async onMessage(@Ctx() ctx: Context) {
    const messageHandlers = {
      photo: async () => {
        await ctx.reply('Processing photo.... Please wait.');
        await this._botService.handlePhoto(ctx);
      },
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
}
