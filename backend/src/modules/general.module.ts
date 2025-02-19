import { Module } from '@nestjs/common';
import { TelegramBotModule } from './telegram-bot/telegram-bot.module';
import { AiModule } from './ai/ai.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TelegramBotModule, AiModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class GeneralModule {}
