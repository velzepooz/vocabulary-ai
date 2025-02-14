import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ServerConfig from './config/server.config';
import JwtConfig from './config/auth-token.config';
import { GeneralExceptionFilter } from './app/filters';
import { GlobalModule } from './common/global.module';
import { envVarsSchema } from './config/env-vars.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ServerConfig, JwtConfig],
      isGlobal: true,
      validate: (config) => envVarsSchema.parse(config),
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService) => ({
        ...configService.get('auth-token'),
      }),
      inject: [ConfigService],
    }),
    GlobalModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GeneralExceptionFilter,
    },
  ],
})
export class AppModule {}
