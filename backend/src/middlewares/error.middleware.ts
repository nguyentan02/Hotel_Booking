import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  res.status(500).json({ message: 'Đã xảy ra lỗi server!' });
};
