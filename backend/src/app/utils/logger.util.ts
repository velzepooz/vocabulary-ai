import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { Logger } from 'nestjs-pino';

/**
 * Configures the application to use nestjs-pino logger.
 * This replaces the default http logger with a Pino logger instance for better logging capabilities.
 * @param app The NestJS Fastify application instance
 */
export const addLogger = (app: NestFastifyApplication): void => {
  app.useLogger(app.get(Logger));
};
