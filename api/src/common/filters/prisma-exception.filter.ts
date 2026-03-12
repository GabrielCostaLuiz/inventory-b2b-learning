import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError) // Captura ERROS PUROS do Prisma
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Mapeamento de códigos do Prisma para Status HTTP
    const errorMapping: Record<string, { status: number; message: string }> = {
      P2002: {
        status: HttpStatus.CONFLICT,
        message: 'Este registro já existe.',
      },
      P2025: {
        status: HttpStatus.NOT_FOUND,
        message: 'Registro não encontrado no banco de dados.',
      },
    };

    const errorDetails = errorMapping[exception.code] || {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Erro interno no banco de dados.',
    };

    response.status(errorDetails.status).json({
      statusCode: errorDetails.status,
      message: errorDetails.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
