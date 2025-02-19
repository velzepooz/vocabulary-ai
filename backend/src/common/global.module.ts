import { Global, Module } from '@nestjs/common';
import { DrizzlePostgresModule } from '@knaadh/nestjs-drizzle-postgres';
import { ConfigService } from '@nestjs/config';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { CaptureError } from './capture-error';

@Global()
@Module({
  imports: [
    DrizzlePostgresModule.registerAsync({
      useFactory: (configService: ConfigService) =>
        configService.get('database'),
      inject: [ConfigService],
    }),
    RedisModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.get('redis'),
      inject: [ConfigService],
    }),
  ],
  providers: [CaptureError],
  exports: [CaptureError],
})
export class GlobalModule {}
