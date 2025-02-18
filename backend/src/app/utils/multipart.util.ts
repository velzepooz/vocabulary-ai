import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { contentParser } from 'fastify-file-interceptor';

/**
 * Configures multipart form data parsing for the application.
 * Registers the fastify-file-interceptor content parser to handle file uploads
 * and multipart/form-data requests.
 *
 * @param app The NestJS Fastify application instance
 */
export const addMultipart = async (
  app: NestFastifyApplication,
): Promise<void> => {
  await app.register(contentParser);
};
