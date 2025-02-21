import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AUTH_ROUTES } from './constants/auth-routes.constant';
import { SignUpDto } from './dto/in/sign-up.dto';
import { AuthResponseDto } from './dto/out/auth-response.dtp';
import { SignInDto } from './dto/in/sign-in.dto';

@ApiTags(AUTH_ROUTES.MAIN)
@UsePipes(new ValidationPipe({ transform: true }))
@Controller(AUTH_ROUTES.MAIN)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({ type: AuthResponseDto })
  @Post(AUTH_ROUTES.SIGN_UP)
  async signUpWeb(@Body() signUpData: SignUpDto): Promise<AuthResponseDto> {
    return this.authService.signUp(signUpData);
  }

  @ApiCreatedResponse({ type: AuthResponseDto })
  @Post(AUTH_ROUTES.SIGN_IN)
  async signIn(@Body() signInData: SignInDto): Promise<AuthResponseDto> {
    return this.authService.signIn(signInData);
  }
}
