import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomError extends Error {
  private status: number;
  private messageError: string;
  constructor(status: keyof typeof HttpStatus, message: string) {
    super(`${status} : ${message}`);
  }

  public static createCustomError(message: string = 'Server error') {
    const statusName = message.split(' : ')[0];
    if (message !== '') {
      throw new HttpException(message, HttpStatus[statusName]);
    }
    throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
