import { Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';
import { AuthRequest } from '../types';

export class AuthController {
  async register(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await authService.register(req.body);
      res.status(201).json({ message: 'Đăng ký thành công', ...result });
    } catch (err) { next(err); }
  }

  async login(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await authService.login(req.body);
      res.json({ message: 'Đăng nhập thành công', ...result });
    } catch (err) { next(err); }
  }

  async getMe(req: AuthRequest, res: Response) {
    res.json({ user: req.user });
  }

  async updateProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const user = await authService.updateProfile(req.user!.id, req.body);
      res.json({ message: 'Cập nhật thành công', user });
    } catch (err) { next(err); }
  }

  async changePassword(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await authService.changePassword(req.user!.id, req.body);
      res.json({ message: 'Đổi mật khẩu thành công' });
    } catch (err) { next(err); }
  }
}

export const authController = new AuthController();
