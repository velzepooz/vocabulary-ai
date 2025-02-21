import { HttpStatus } from '@nestjs/common';
import { ApplicationErrorType } from '../../../common/application-error';

export const AUTH_ERRORS: { [errorName: string]: ApplicationErrorType } = {
  EMAIL_EXISTS: {
    errorCode: HttpStatus.BAD_REQUEST,
    message:
      'Oops! Looks like this email is already taken. Want to try signing in instead? 🤔',
  },
  PASSWORDS_DO_NOT_MATCH: {
    errorCode: HttpStatus.BAD_REQUEST,
    message:
      'Hmm... your passwords are playing hide and seek! Make sure they match perfectly! 🙈',
  },
  BAD_CREDENTIALS: {
    errorCode: HttpStatus.UNAUTHORIZED,
    message:
      "Uh-oh! Either your email or password isn't quite right. Want to give it another shot? 🔑",
  },
};
