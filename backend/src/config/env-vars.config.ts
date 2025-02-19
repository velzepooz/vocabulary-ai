import { z } from 'zod';
import { ErrorDestinationEnum } from '../common/capture-error';
import { serverSchema } from './server.config';
import { authTokenSchema } from './auth-token.config';
import { redisSchema } from './redis.config';

export const EnvEnum = {
  LOCAL: 'local',
  DEVELOPMENT: 'development',
  STAGE: 'stage',
  PRODUCTION: 'production',
} as const;

export type ENV = (typeof EnvEnum)[keyof typeof EnvEnum];

export const NodeEnvEnum = {
  LOCAL: 'local',
  DEVELOPMENT: 'development',
  STAGE: 'stage',
  PRODUCTION: 'production',
} as const;

export type NODE_ENV = (typeof NodeEnvEnum)[keyof typeof NodeEnvEnum];

export const envVarsSchema = z.object({
  ...serverSchema.shape,
  ...authTokenSchema.shape,
  ...redisSchema.shape,
  NODE_ENV: z.nativeEnum(NodeEnvEnum),
  ENV: z.nativeEnum(EnvEnum),
  ERROR_DESTINATION: z.nativeEnum(ErrorDestinationEnum),
  TELEGRAM_BOT_TOKEN: z.string(),
  TELEGRAM_BOT_ERROR_TOKEN: z.string(),
  TELEGRAM_ERROR_NOTIFICATION_CHAT_ID: z.string(),
  OPENAI_API_KEY: z.string(),
  DATABASE_URL: z.string().nonempty(),
});

export type ENV_VARS = z.infer<typeof envVarsSchema>;
