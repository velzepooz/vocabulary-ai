import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import {
  addSwagger,
  addExceptionFilter,
  addMultipart,
  addCookie,
  addHelmet,
  applyAppUtils,
} from './app/utils';
import { ENV_VARS } from './config/env-vars.config';

const appUtils = [
  addSwagger,
  addExceptionFilter,
  addMultipart,
  addCookie,
  addHelmet,
];

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  const config = app.get<ConfigService>(ConfigService);
  await applyAppUtils(app, appUtils);

  await app.listen(
    config.get<ENV_VARS['PORT']>('server.port'),
    config.get<ENV_VARS['HOST']>('server.host'),
  );
}
bootstrap();
