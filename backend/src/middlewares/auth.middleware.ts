import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { userRepository } from '../repositories/user.repository';
import { AuthRequest } from '../types';

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Chưa đăng nhập' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, env.JWT_SECRET) as { id: number };

    const user = await userRepository.findByIdSelect(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Người dùng không tồn tại' });
    }

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: 'Token không hợp lệ' });
  }
};

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Không có quyền truy cập' });
  }
  next();
};

export const optionalAuth = async (req: AuthRequest, _res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, env.JWT_SECRET) as { id: number };
      const user = await userRepository.findByIdSelect(decoded.id);
      if (user) req.user = user;
    }
  } catch {
    // Ignore token errors for optional auth
  }
  next();
};
