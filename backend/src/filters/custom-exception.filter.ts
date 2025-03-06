import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import BaseError from 'src/exceptions/BaseError';

type ErrorResponse = {
  error: string | object;
  data: unknown;
};

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorResponse: ErrorResponse = {
      error: {
        message: 'An error occurred',
        error: 'Internal Server Error',
        statusCode: status,
        data: null,
      },
      data: null,
    };

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      let exceptionResponse = exception.getResponse();

      if (exceptionResponse instanceof BaseError) {
        exceptionResponse = {
          message: exceptionResponse.message,
          error: exceptionResponse.name,
          statusCode: status,
          errorData: exceptionResponse.errorData,
        };
      }
      errorResponse = {
        error: exceptionResponse, // Can be string or object
        data: null,
      };
    }

    response.status(status).json(errorResponse);
  }
}
