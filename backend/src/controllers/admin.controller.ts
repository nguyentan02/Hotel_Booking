import { Response, NextFunction } from 'express';
import { adminService } from '../services/admin.service';
import { AuthRequest } from '../types';

export class AdminController {
  // Hotels
  async createHotel(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const hotel = await adminService.createHotel(req.body, req.file);
      res.status(201).json({ message: 'Thêm khách sạn thành công', id: hotel.id });
    } catch (err) { next(err); }
  }

  async updateHotel(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await adminService.updateHotel(parseInt(req.params.id as string), req.body, req.file);
      res.json({ message: 'Cập nhật khách sạn thành công' });
    } catch (err) { next(err); }
  }

  async deleteHotel(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await adminService.deleteHotel(parseInt(req.params.id as string));
      res.json({ message: 'Xóa khách sạn thành công' });
    } catch (err) { next(err); }
  }

  // Rooms
  async createRoom(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const room = await adminService.createRoom(req.body, req.file);
      res.status(201).json({ message: 'Thêm phòng thành công', id: room.id });
    } catch (err) { next(err); }
  }

  async updateRoom(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await adminService.updateRoom(parseInt(req.params.id as string), req.body, req.file);
      res.json({ message: 'Cập nhật phòng thành công' });
    } catch (err) { next(err); }
  }

  async deleteRoom(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await adminService.deleteRoom(parseInt(req.params.id as string));
      res.json({ message: 'Xóa phòng thành công' });
    } catch (err) { next(err); }
  }

  // Bookings
  async getAllBookings(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { status, page = '1', limit = '20' } = req.query;
      const result = await adminService.getAllBookings(status as string | undefined, parseInt(page as string), parseInt(limit as string));
      res.json(result);
    } catch (err) { next(err); }
  }

  async updateBookingStatus(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await adminService.updateBookingStatus(parseInt(req.params.id as string), req.body);
      res.json({ message: 'Cập nhật trạng thái thành công' });
    } catch (err) { next(err); }
  }

  // Users
  async getAllUsers(_req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const users = await adminService.getAllUsers();
      res.json(users);
    } catch (err) { next(err); }
  }

  async getUserDetail(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const user = await adminService.getUserDetail(parseInt(req.params.id as string));
      res.json(user);
    } catch (err) { next(err); }
  }

  async updateUserRole(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await adminService.updateUserRole(parseInt(req.params.id as string), req.body.role);
      res.json({ message: 'Cập nhật quyền thành công' });
    } catch (err) { next(err); }
  }

  async toggleUserActive(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const isActive = req.body.is_active as boolean;
      await adminService.toggleUserActive(parseInt(req.params.id as string), req.user!.id, isActive);
      res.json({ message: isActive ? 'Mở khóa tài khoản thành công' : 'Khóa tài khoản thành công' });
    } catch (err) { next(err); }
  }

  async resetUserPassword(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await adminService.resetUserPassword(parseInt(req.params.id as string), req.body.new_password);
      res.json({ message: 'Đặt lại mật khẩu thành công' });
    } catch (err) { next(err); }
  }

  async deleteUser(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await adminService.deleteUser(parseInt(req.params.id as string), req.user!.id);
      res.json({ message: 'Xóa người dùng thành công' });
    } catch (err) { next(err); }
  }

  // Dashboard
  async getDashboardStats(_req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await adminService.getDashboardStats();
      res.json(result);
    } catch (err) { next(err); }
  }
}

export const adminController = new AdminController();
