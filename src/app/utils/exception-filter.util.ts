import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { HttpExceptionFilter } from '../filters/http-exception.filter';

/**
 * Configures global exception handling for the application.
 * Registers the HttpExceptionFilter to handle and format HTTP exceptions
 * in a consistent way across the application.
 *
 * @param app The NestJS Fastify application instance
 */
export const addExceptionFilter = (app: NestFastifyApplication): void => {
  app.useGlobalFilters(new HttpExceptionFilter());
};
