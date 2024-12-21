import { Response } from 'express';

type TResponse<T> = {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
};

// custom response sent to server
const sendResponse = <T>(res: Response, resData: TResponse<T>) => {
  res.status(resData?.statusCode).json({
    success: resData?.success,
    message: resData?.message,
    statusCode: resData?.statusCode,
    data: resData?.data,
  });
};

export default sendResponse;
