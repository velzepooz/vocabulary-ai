import { Module } from '@nestjs/common';
import { TelegramBotModule } from './telegram-bot/telegram-bot.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [TelegramBotModule, AiModule],
  controllers: [],
  providers: [],
})
export class GeneralModule {}
