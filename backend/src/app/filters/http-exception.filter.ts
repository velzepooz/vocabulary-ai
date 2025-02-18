import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ApplicationError } from '../../common/application-error';

/**
 * Filter to handle HTTP exceptions across the application.
 * Catches HttpException and its subclasses to provide consistent error responses.
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * Catches and processes HTTP exceptions.
   *
   * @param exception The caught HttpException
   * @param host ArgumentsHost containing the HTTP context
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const status = exception.getStatus();

    if (exception instanceof ApplicationError) {
      response.status(status).send({
        statusCode: status,
        message: [exception.message],
      });

      return;
    }

    const errorResponse = exception.getResponse() as { message: string[] };

    response.status(status).send({
      statusCode: status,
      message: Array.isArray(errorResponse.message)
        ? errorResponse.message
        : [errorResponse.message],
    });
  }
}
