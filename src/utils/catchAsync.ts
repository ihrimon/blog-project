import { NextFunction, Request, RequestHandler, Response } from 'express';

// custom async middleware function
const catchAsync = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((err) => next(err));
    }
}

export default catchAsync;