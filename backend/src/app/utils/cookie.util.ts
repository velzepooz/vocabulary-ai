import { NestFastifyApplication } from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';

/**
 * Configures cookie handling for the application using @fastify/cookie.
 * Enables support for cookies in the application.
 *
 * @param app The NestJS Fastify application instance
 */
export const addCookie = async (app: NestFastifyApplication): Promise<void> => {
  await app.register(fastifyCookie);
};
