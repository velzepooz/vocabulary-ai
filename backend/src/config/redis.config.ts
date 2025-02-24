import { registerAs } from '@nestjs/config';
import { z } from 'zod';
import { TELEGRAM_BOT_REDIS_CLIENT } from '../modules/telegram-bot/constants/redis.constant';

export const redisSchema = z.object({
  REDIS_HOST: z.string().nonempty(),
  REDIS_PORT: z.coerce.number().nonnegative(),
});

export type RedisConfig = z.infer<typeof redisSchema>;

export default registerAs('redis', () => ({
  config: [
    {
      namespace: TELEGRAM_BOT_REDIS_CLIENT.NAME,
      host: process.env.REDIS_HOST ?? 'localhost',
      port: process.env.REDIS_PORT ?? 6379,
      db: TELEGRAM_BOT_REDIS_CLIENT.DB,
    },
  ],
}));
