export class BaseException extends Error {
  message: string;
  errors = [];
  status = 400;

  constructor(message = '', status = 400, errors = []) {
    super(message);

    console.log('>>>message= %s', message);
    console.log('>>>status= %s', status);
    console.log('>>>errors= %o', errors);

    this.errors = errors;

    if (message && !errors.length) {
      this.errors.push(message);
    }
    this.status = status;
  }
  getStatus(): number {
    return this.status;
  }
  setStatus(status: number): void {
    this.status = status;
  }
}
