import {
  ExceptionFilter,
  Catch,
  Logger,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { CaptureError } from '../../common/capture-error';
import { ApplicationError } from '../../common/application-error';

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
  async catch(exception: Error, host: ArgumentsHost) {
    this.logger.error(
      `Exception occurred: ${exception.message}`,
      exception.stack,
    );
    const ctxType = host.getType();

    if (ctxType === 'http') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<FastifyReply>();

      if (exception instanceof ApplicationError) {
        response.status(exception.errorCode).send({
          statusCode: exception.errorCode,
          message: [exception.message],
        });

        return;
      }

      if (exception instanceof BadRequestException) {
        const errorResponse = (exception as HttpException).getResponse() as {
          message: string[];
        };

        response.status(exception.getStatus()).send({
          statusCode: exception.getStatus(),
          message: Array.isArray(errorResponse.message)
            ? errorResponse.message
            : [errorResponse.message],
        });

        return;
      }

      response.status(500).send({
        statusCode: 500,
        message: [exception.message],
      });

      return;
    }
    await this._captureError.captureError(exception);
  }
}
