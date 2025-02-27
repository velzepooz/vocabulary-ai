import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthenticatedUser } from '../auth/type/auth-service.type';
import { User } from '../../common/decorator/user.decorator';
import { WordService } from './word.service';
import { WORD_ROUTES } from './constants/word-routes.constant';

@UseGuards(AuthGuard)
@ApiTags(WORD_ROUTES.MAIN)
@Controller(WORD_ROUTES.MAIN)
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Get()
  async getWords(@User() user: AuthenticatedUser) {
    return this.wordService.getWords(user.id);
  }
}
