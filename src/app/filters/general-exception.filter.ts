import { ExceptionFilter, Catch, Logger } from '@nestjs/common';
import { CaptureError } from '../../common/capture-error';

/**
 * Filter to catch and handle all unhandled exceptions across the application.
 * Logs the error and sends it to error tracking service.
 */
@Catch()
export class GeneralExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GeneralExceptionFilter.name);

  constructor(private readonly _captureError: CaptureError) {}

  /**
   * Catches and processes any unhandled exception.
   *
   * @param exception The caught Error
   */
  async catch(exception: Error) {
    this.logger.error(
      `Exception occurred: ${exception.message}`,
      exception.stack,
    );
    await this._captureError.captureException(exception);
  }
}
