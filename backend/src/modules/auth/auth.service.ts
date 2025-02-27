import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { omit } from '@velzepooz/coding-utils';
import { UserService } from '../user/user.service';
import { User } from '../user/type/user-repository.type';
import { ApplicationError } from '../../common/application-error';
import { signInDataType, signUpDataType } from './type/auth-service.type';
import { AUTH_ERRORS } from './constants/auth-errors.constant';
import { hashPassword, validatePassword } from './utils/password.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async authenticateTelegramUser(telegramId: number): Promise<User | null> {
    const user = await this.userService.getByTelegramId(telegramId);

    return user;
  }

  async linkTelegramIdToEmail(
    email: string,
    telegramId: number,
  ): Promise<User | null> {
    const user = await this.userService.getByEmail(email);
    if (!user) {
      return null;
    }

    await this.userService.linkTelegramId(user.id, telegramId);

    return user;
  }

  async signUp(signUpData: signUpDataType): Promise<{ token: string }> {
    const user = await this.userService.getOne({
      email: signUpData.email,
    });
    if (user) {
      throw new ApplicationError(AUTH_ERRORS.EMAIL_EXISTS);
    }
    if (signUpData.password !== signUpData.confirmPassword) {
      throw new ApplicationError(AUTH_ERRORS.PASSWORDS_DO_NOT_MATCH);
    }
    const hashedPassword = await hashPassword(signUpData.password);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...createdUserData } = await this.userService.create({
      ...(omit(signUpData, ['confirmPassword']) as any),
      password: hashedPassword,
    });
    const accessToken = await this.jwtService.signAsync(createdUserData);

    return { token: accessToken };
  }

  async signIn(signInData: signInDataType): Promise<{ token: string }> {
    const user = await this.userService.getOne({
      email: signInData.email,
    });
    if (!user) {
      throw new ApplicationError(AUTH_ERRORS.BAD_CREDENTIALS);
    }
    const { password, ...userData } = user;
    const isPasswordValid = validatePassword(signInData.password, password);
    if (!isPasswordValid) {
      throw new ApplicationError(AUTH_ERRORS.BAD_CREDENTIALS);
    }

    return {
      token: await this.jwtService.signAsync(userData),
    };
  }
}
