import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { WordService } from './word.service';
import { WordRepository } from './word.repository';
import { WordController } from './word.controller';

@Module({
  imports: [UserModule],
  controllers: [WordController],
  providers: [WordService, WordRepository],
  exports: [WordService],
})
export class WordModule {}
