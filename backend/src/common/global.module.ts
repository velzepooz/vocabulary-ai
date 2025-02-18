import { Global, Module } from '@nestjs/common';
import { CaptureError } from './capture-error';

@Global()
@Module({
  providers: [CaptureError],
  exports: [CaptureError],
})
export class GlobalModule {}
