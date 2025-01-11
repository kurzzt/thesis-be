import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { FastifyReply } from 'fastify';

// catch prisma error
@Catch(PrismaClientKnownRequestError)
export default class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<FastifyReply>();

    console.error(exception);

    // HttpException Error
    if (exception instanceof HttpException) {
      // set httpException res to res
      const response: any = exception.getResponse();
      if ((response as any).message?.[0]?.message) {
        response.message = response.message?.[0]?.message;
      }

      res.status(exception.getStatus()).send(response);
      return;
    }

    let message = exception?.message || exception.meta?.message;
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    switch (exception.code) {
      // Unique violation error
      case 'P2002':
        // Extract the field causing the uniqueness violation from the error message
        const field = (
          Array.isArray(exception.meta.target)
            ? exception.meta.target[0]
            : exception.meta.target
        ).split('.')[Array.isArray(exception.meta.target) ? 1 : 0];
        // Assuming the error message follows Prisma's convention

        message = `The ${field} already exists. Please provide a unique ${field}.`;
        statusCode = HttpStatus.CONFLICT;
        break;
      // Not found error
      case 'P2025':
        message = `ID's Not found`; //exception?.message;
        statusCode = HttpStatus.NOT_FOUND;
        break;
      // Invalid input ID params
      case 'P2023':
        message = `Please input a correct ID's`;
        statusCode = HttpStatus.NOT_FOUND;
        break;
    }

    // returns the shape of ApiError
    res.status(statusCode).send({
      statusCode,
      code: statusCode,
      message: message || 'Internal Server Error',
    });
  }
}
