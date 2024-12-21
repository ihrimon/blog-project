import { NextFunction, Request, Response } from 'express';
import { statusCodes } from 'http-status-kit';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(statusCodes.NOT_FOUND).json({
    success: false,
    message: 'API Not Found!',
    statusCode: statusCodes.NOT_FOUND,
    error: 'Not Found',
    stack: null
  });
};

export default notFound;
