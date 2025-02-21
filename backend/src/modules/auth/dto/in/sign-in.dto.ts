import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { SignUpDto } from './sign-up.dto';

export class SignInDto extends PickType(SignUpDto, ['email']) {
  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
  })
  @IsString()
  password: string;
}
