import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './type/user-repository.type';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findByTelegramId(telegramId: number): Promise<User | null> {
    return this.userRepository.findByTelegramId(telegramId);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async linkTelegramId(userId: number, telegramId: number): Promise<void> {
    await this.userRepository.updateTelegramId(userId, telegramId);
  }
}
