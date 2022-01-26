import { BaseException } from './base.exception';
import { HttpStatus } from '@nestjs/common';

export class ValidationFailedException extends BaseException {
  constructor(...args) {
    super(...args);
    // this.status = HttpStatus.NOT_ACCEPTABLE;
  }
}
