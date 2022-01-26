import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';

@Catch()
export class AppErrorFilter implements ExceptionFilter {
  catch(error: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = error.status || 500;
    const errors = [];
    const responseData = {
      message:
        typeof error.message === 'string'
          ? error.message
          : error.message.message || '',
      errors,
    };
    if (Array.isArray(error.errors) && error.errors.length) {
      errors.push(...error.errors);
    } else {
      errors.push(error.message.message || error.message);
    }
    Logger.error(responseData.message, error.stack.toString());
    response.status(status).json(responseData);
  }
}
