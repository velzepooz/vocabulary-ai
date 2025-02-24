import { ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { Module } from '@nestjs/common';
import { ENV_VARS } from '../../config/env-vars.config';
import { AiModule } from '../ai/ai.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { VocabularyModule } from '../vocabulary/vocabulary.module';
import { TelegramBotController } from './telegram-bot.controller';
import { TelegramBotService } from './services/telegram-bot.service';
import { TelegramBotRedisRepository } from './repositories/telegram-bot-redis.repository';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        token:
          configService.get<ENV_VARS['TELEGRAM_BOT_TOKEN']>(
            'TELEGRAM_BOT_TOKEN',
          ) ?? '',
      }),
      inject: [ConfigService],
    }),
    AiModule,
    AuthModule,
    UserModule,
    VocabularyModule,
  ],
  controllers: [],
  providers: [
    TelegramBotController,
    TelegramBotService,
    TelegramBotRedisRepository,
  ],
})
export class TelegramBotModule {}
