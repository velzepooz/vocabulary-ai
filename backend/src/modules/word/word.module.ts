import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { WordService } from './word.service';
import { WordRepository } from './word.repository';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [WordService, WordRepository],
  exports: [WordService],
})
export class WordModule {}
