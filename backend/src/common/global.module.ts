import { Global, Module } from '@nestjs/common';
import {
  DrizzlePostgresConfig,
  DrizzlePostgresModule,
} from '@knaadh/nestjs-drizzle-postgres';
import { ConfigService } from '@nestjs/config';
import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis';
import { CaptureError } from './capture-error';

@Global()
@Module({
  imports: [
    DrizzlePostgresModule.registerAsync({
      useFactory: (configService: ConfigService) =>
        configService.get('database') as DrizzlePostgresConfig,
      inject: [ConfigService],
    }),
    RedisModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.get('redis') as RedisModuleOptions,
      inject: [ConfigService],
    }),
  ],
  providers: [CaptureError],
  exports: [CaptureError],
})
export class GlobalModule {}
