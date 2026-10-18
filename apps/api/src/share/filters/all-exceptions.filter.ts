import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import type { Request, Response } from 'express';

export type ErrorBody = {
  statusCode: number;
  message: string;
  issues?: { path: string; message: string }[];
  path: string;
  timestamp: string;
};

// Mọi lỗi đều trả về cùng một dạng ErrorBody, để frontend chỉ phải xử lý một kiểu.
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Lỗi máy chủ';
    let issues: ErrorBody['issues'];

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const response = exception.getResponse();
      if (typeof response === 'string') {
        message = response;
      } else {
        const body = response as { message?: string | string[]; issues?: ErrorBody['issues'] };
        message = Array.isArray(body.message) ? body.message.join('; ') : (body.message ?? exception.message);
        issues = body.issues;
      }
    } else {
      // Lỗi không lường trước: ghi log đầy đủ, không lộ chi tiết ra ngoài
      this.logger.error(exception instanceof Error ? exception.stack : exception);
    }

    const body: ErrorBody = { statusCode, message, issues, path: req.originalUrl, timestamp: new Date().toISOString() };
    res.status(statusCode).json(body);
  }
}
