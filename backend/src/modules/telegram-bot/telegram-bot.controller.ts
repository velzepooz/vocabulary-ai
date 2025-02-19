import { Update, Start, On, Ctx } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { Logger } from '@nestjs/common';
import { TelegramMessage } from './decorators/telegram-message.decorator';
import { TelegramBotService } from './services/telegram-bot.service';

@Update()
export class TelegramBotController {
  private readonly _logger = new Logger(TelegramBotController.name);

  constructor(private readonly _botService: TelegramBotService) {}

  @Start()
  @TelegramMessage()
  async startCommand(@Ctx() ctx: Context): Promise<void> {
    await this._botService.handleStartCommand(ctx);
  }

  @On('message')
  @TelegramMessage()
  async onMessage(@Ctx() ctx: Context): Promise<void> {
    await this._botService.handleMessage(ctx);
  }
}
