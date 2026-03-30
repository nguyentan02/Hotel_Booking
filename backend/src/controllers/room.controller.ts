import { Request, Response, NextFunction } from 'express';
import { roomService } from '../services/room.service';

export class RoomController {
  async getRoomsByHotel(req: Request, res: Response, next: NextFunction) {
    try {
      const { check_in, check_out } = req.query;
      const rooms = await roomService.getByHotel(
        parseInt(req.params.hotelId as string),
        check_in as string,
        check_out as string,
      );
      res.json(rooms);
    } catch (err) { next(err); }
  }

  async getRoomById(req: Request, res: Response, next: NextFunction) {
    try {
      const room = await roomService.getById(parseInt(req.params.id as string));
      res.json(room);
    } catch (err) { next(err); }
  }

  async checkAvailability(req: Request, res: Response, next: NextFunction) {
    try {
      const { room_id, check_in, check_out } = req.query;
      if (!room_id || !check_in || !check_out) {
        return res.status(400).json({ message: 'Thiếu thông tin' });
      }
      const result = await roomService.checkAvailability(
        parseInt(room_id as string),
        check_in as string,
        check_out as string,
      );
      res.json(result);
    } catch (err) { next(err); }
  }
}

export const roomController = new RoomController();
