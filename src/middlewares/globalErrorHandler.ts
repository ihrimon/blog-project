import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import CustomError from '../utils/CustomError';
import config from '../config';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong!';

  // handle zod validation error
  if (error instanceof ZodError) {
    statusCode = 400;
    message = 'Validation Error';
    res.status(statusCode).json({
      success: false,
      message,
      statusCode,
      error: error.issues,
      stack: config.NODE_ENV === 'development' ? error.stack : null,
    });
    return;
  }
  // handle mongoose validation error
  if (error?.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
  }
  // handle cast error
  if (error?.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid Input';
  }
  // handle duplicate error
  if (error?.code === 11000) {
    const matchedValue = error.message.match(/"([^"]*)"/);
    const extractedMessage = matchedValue && matchedValue[1];
    statusCode = 409;
    message = `${extractedMessage} is already exists`;
  }
  // handle AppError
  if (error instanceof CustomError) {
    statusCode = error?.statusCode;
    message = error?.message;
  }
  // handle global error
  if (error instanceof Error) {
    message = error?.message;
  }

  // send error response and status
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error,
    stack: config.NODE_ENV === 'development' ? error?.stack : null,
  });
};

export default globalErrorHandler;
