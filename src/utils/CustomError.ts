// custom error class
class CustomError extends Error {
  public statusCode: number;
  public errorMessage: string;

  constructor(errorMessage: string, statusCode: number, message: string, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default CustomError;
