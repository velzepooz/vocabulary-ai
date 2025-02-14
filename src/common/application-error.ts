import { HttpException } from '@nestjs/common';

export type ApplicationErrorType = {
  statusCode: number;
  message: string;
};

/**
 * Custom application error class that extends NestJS HttpException.
 * Provides a standardized way to create HTTP exceptions with status codes and messages.
 */
export class ApplicationError extends HttpException {
  /**
   * Creates a new ApplicationError instance.
   *
   * @param error Object containing status code and error message
   * @param error.statusCode HTTP status code for the error
   * @param error.message Error message to be displayed
   */
  constructor(error: ApplicationErrorType) {
    super(error.message, error.statusCode);
  }
}
