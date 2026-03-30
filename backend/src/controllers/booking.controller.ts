import { Response, NextFunction } from 'express';
import { bookingService } from '../services/booking.service';
import { AuthRequest } from '../types';

export class BookingController {
  async createBooking(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user ? req.user.id : null;
      const booking = await bookingService.create(req.body, userId);
      res.status(201).json({ message: 'Đặt phòng thành công', booking });
    } catch (err) { next(err); }
  }

  async getMyBookings(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { status } = req.query;
      const bookings = await bookingService.getMyBookings(req.user!.id, status as string);
      res.json(bookings);
    } catch (err) { next(err); }
  }

  async getBookingById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const booking = await bookingService.getById(parseInt(req.params.id as string), req.user!.id, req.user!.role);
      res.json(booking);
    } catch (err) { next(err); }
  }

  async cancelBooking(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await bookingService.cancel(parseInt(req.params.id as string), req.user!.id, req.user!.role);
      res.json({ message: 'Hủy đặt phòng thành công' });
    } catch (err) { next(err); }
  }

  async updateBooking(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await bookingService.updateBooking(parseInt(req.params.id as string), req.body, req.user!.id, req.user!.role);
      res.json({ message: 'Cập nhật đặt phòng thành công' });
    } catch (err) { next(err); }
  }
}

export const bookingController = new BookingController();
