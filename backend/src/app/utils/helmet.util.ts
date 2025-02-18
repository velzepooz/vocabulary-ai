import { NestFastifyApplication } from '@nestjs/platform-fastify';
import helmet from '@fastify/helmet';

/**
 * Configures security headers for the application using @fastify/helmet.
 * Adds various HTTP headers to help protect the app against common web vulnerabilities.
 *
 * @param app The NestJS Fastify application instance
 */
export const addHelmet = async (app: NestFastifyApplication) => {
  await app.register(helmet);
};
