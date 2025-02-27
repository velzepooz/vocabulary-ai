import { Injectable } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { BaseRedisRepository } from '../../../common/repository/base-redis.repository';
import { TELEGRAM_BOT_REDIS_CLIENT } from '../constants/redis.constant';

@Injectable()
export class TelegramBotRedisRepository extends BaseRedisRepository {
  constructor(private readonly _redisService: RedisService) {
    super(_redisService.getOrThrow(TELEGRAM_BOT_REDIS_CLIENT.NAME));
  }

  async addEmailVerificationAwaitingUser(telegramId: number): Promise<void> {
    await this.add(
      TELEGRAM_BOT_REDIS_CLIENT.EMAIL_VERIFICATION_AWAITING_USERS,
      telegramId,
    );
  }

  async removeEmailVerificationAwaitingUser(telegramId: number): Promise<void> {
    await this.remove(
      TELEGRAM_BOT_REDIS_CLIENT.EMAIL_VERIFICATION_AWAITING_USERS,
      telegramId,
    );
  }

  async isEmailVerificationAwaitingUser(telegramId: number): Promise<boolean> {
    return await this.isMember(
      TELEGRAM_BOT_REDIS_CLIENT.EMAIL_VERIFICATION_AWAITING_USERS,
      telegramId,
    );
  }
}
