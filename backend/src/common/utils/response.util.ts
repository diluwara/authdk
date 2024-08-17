import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseService {
  handleSuccess<T>(
    message: string,
    data?: T,
  ): { success: true; message: string; data?: T } {
    return { success: true, message, data };
  }

  handleError(message: string): { success: false; message: string } {
    return { success: false, message };
  }
}
