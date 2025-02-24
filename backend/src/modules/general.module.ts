import { Module } from '@nestjs/common';
import { TelegramBotModule } from './telegram-bot/telegram-bot.module';
import { AiModule } from './ai/ai.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { WordModule } from './word/word.module';

@Module({
  imports: [TelegramBotModule, AiModule, UserModule, AuthModule, WordModule],
  controllers: [],
  providers: [],
})
export class GeneralModule {}
