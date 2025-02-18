export type ApplicationErrorType = {
  errorCode: number;
  message: string;
};

/**
 * Custom application error class that extends Error.
 * Provides a standardized way to create errors with status codes and messages.
 */
export class ApplicationError extends Error {
  public readonly errorCode: number;
  /**
   * Creates a new ApplicationError instance.
   *
   * @param error Object containing status code and error message
   * @param error.statusCode HTTP status code for the error
   * @param error.message Error message to be displayed
   */
  constructor(error: ApplicationErrorType) {
    super(error.message);
    this.errorCode = error.errorCode;
  }
}
