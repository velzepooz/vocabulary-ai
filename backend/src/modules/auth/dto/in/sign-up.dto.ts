import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AUTH_CONSTRAINTS } from '../../constants/auth-constraints.constant';

export class SignUpDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'test@test.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  @IsString()
  @MinLength(AUTH_CONSTRAINTS.FIRST_NAME.MIN_LENGTH)
  @MaxLength(AUTH_CONSTRAINTS.FIRST_NAME.MAX_LENGTH)
  @Matches(AUTH_CONSTRAINTS.FIRST_NAME.REGEX)
  firstName: string;

  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
  })
  @IsString()
  @MinLength(AUTH_CONSTRAINTS.LAST_NAME.MIN_LENGTH)
  @MaxLength(AUTH_CONSTRAINTS.LAST_NAME.MAX_LENGTH)
  @Matches(AUTH_CONSTRAINTS.LAST_NAME.REGEX)
  lastName: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
  })
  @IsString()
  @MinLength(AUTH_CONSTRAINTS.PASSWORD.MIN_LENGTH)
  @MaxLength(AUTH_CONSTRAINTS.PASSWORD.MAX_LENGTH)
  @Matches(AUTH_CONSTRAINTS.PASSWORD.REGEX)
  password: string;

  @ApiProperty({
    description: 'The confirm password of the user',
    example: 'password',
  })
  @IsString()
  @MinLength(AUTH_CONSTRAINTS.PASSWORD.MIN_LENGTH)
  @MaxLength(AUTH_CONSTRAINTS.PASSWORD.MAX_LENGTH)
  @Matches(AUTH_CONSTRAINTS.PASSWORD.REGEX)
  confirmPassword: string;
}
