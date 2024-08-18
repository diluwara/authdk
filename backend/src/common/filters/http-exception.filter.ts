import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) { 
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse = this.getExceptionResponse(exception);
    const message = this.getErrorMessage(exceptionResponse, status);

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message, // This is now always an array of strings
    };

    response.status(status).json(errorResponse);
  }

  private getExceptionResponse(exception: any) {
    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'string') {
        return { message: exceptionResponse };
      }
      return exceptionResponse;
    } else {
      return { message: exception.message || 'Internal server error' };
    }
  }

  private getErrorMessage(exceptionResponse: any, status: number): string[] {
    if (exceptionResponse?.message) {
      return Array.isArray(exceptionResponse.message)
        ? exceptionResponse.message
        : [exceptionResponse.message];
    }
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      return ['Internal server error'];
    }
    return [exceptionResponse.message || 'Unknown error occurred'];
  }
}
