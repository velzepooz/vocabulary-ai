import { NestFastifyApplication } from '@nestjs/platform-fastify';

export const addCorsPolicy = (app: NestFastifyApplication): void => {
  app.enableCors({
    origin: ['*'],
  });
};
