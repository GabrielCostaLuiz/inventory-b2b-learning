import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  // Criamos um Logger do Nest para o terminal ficar com cores bonitas
  private readonly logger = new Logger('HttpException');

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // const messageContent =
    //   typeof exceptionResponse === 'object'
    //     ? (() => {
    //         // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //         const { statusCode, message, ...rest } =
    //           exceptionResponse as Record<string, unknown>;
    //         return rest;
    //       })()
    //     : { message: exceptionResponse };

    // 1. Recuperamos a CAUSA (o erro do Prisma, se houver)
    const cause = exception.cause as Prisma.PrismaClientKnownRequestError;

    // 2. Logamos o erro no terminal para você debugar
    this.logger.error(
      `Route: ${request.method} ${request.url} - Status: ${status}`,
      cause ? cause : 'No detailed cause provided',
    );

    const causeCodes = [
      {
        code: 'P2002',
        statusCode: 409,
        message: 'This record already exists (duplicate conflict)',
      },
      {
        code: 'P2025',
        statusCode: 404,
        message: 'Record not found',
      },
    ];
    const causeCode = causeCodes.find((code) => code.code === cause?.code);

    // 3. Enviamos a resposta padronizada para o Frontend
    response.status(causeCode ? causeCode.statusCode : status).json({
      statusCode: causeCode ? causeCode.statusCode : status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: causeCode ? causeCode.message : exceptionResponse,
      // ...messageContent,
    });
  }
}
