import { z } from 'zod';
import { errorDestinationEnum } from '../common/capture-error';
import { serverSchema } from './server.config';
import { authTokenSchema } from './auth-token.config';

export const envEnum = {
  LOCAL: 'local',
  DEVELOPMENT: 'development',
  STAGE: 'stage',
  PRODUCTION: 'production',
} as const;

export type ENV = (typeof envEnum)[keyof typeof envEnum];

export const nodeEnvEnum = {
  LOCAL: 'local',
  DEVELOPMENT: 'development',
  STAGE: 'stage',
  PRODUCTION: 'production',
} as const;

export type NODE_ENV = (typeof nodeEnvEnum)[keyof typeof nodeEnvEnum];

export const envVarsSchema = z.object({
  ...serverSchema.shape,
  ...authTokenSchema.shape,
  NODE_ENV: z.nativeEnum(nodeEnvEnum),
  ENV: z.nativeEnum(envEnum),
  SLACK_ERROR_BOT_TOKEN: z.string(),
  SLACK_ERROR_NOTIFICATION_CHANNEL: z.string(),
  ERROR_DESTINATION: z.nativeEnum(errorDestinationEnum),
  TELEGRAM_BOT_TOKEN: z.string(),
  TELEGRAM_ERROR_NOTIFICATION_CHAT_ID: z.string(),
});

export type ENV_VARS = z.infer<typeof envVarsSchema>;
