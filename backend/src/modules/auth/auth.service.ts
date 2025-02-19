import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/type/user-repository.type';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async authenticateTelegramUser(telegramId: number): Promise<User | null> {
    const user = await this.userService.findByTelegramId(telegramId);

    return user;
  }

  async linkTelegramIdToEmail(
    email: string,
    telegramId: number,
  ): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return null;
    }

    await this.userService.linkTelegramId(user.id, telegramId);

    return user;
  }
}
