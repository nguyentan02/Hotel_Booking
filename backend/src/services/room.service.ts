import { roomRepository } from '../repositories/room.repository';
import { AppError } from '../utils/appError';

export class RoomService {
  private mapRoom(room: any, extra: Record<string, any> = {}) {
    const { hotelId, totalRooms, imageUrl, createdAt, updatedAt, ...rest } = room;
    return {
      ...rest,
      hotel_id: hotelId,
      total_rooms: totalRooms,
      image_url: imageUrl,
      created_at: createdAt,
      updated_at: updatedAt,
      ...extra,
    };
  }

  async getByHotel(hotelId: number, checkIn?: string, checkOut?: string) {
    const rooms = await roomRepository.findByHotel(hotelId);

    if (checkIn && checkOut) {
      const roomsWithAvailability = await Promise.all(
        rooms.map(async (room) => {
          const booked = await roomRepository.getBookedCount(room.id, checkIn, checkOut);
          return this.mapRoom(room, { available_rooms: room.totalRooms - booked });
        })
      );
      return roomsWithAvailability.filter((r) => r.status === 'available');
    }

    return rooms.map((r) => this.mapRoom(r, { available_rooms: r.totalRooms }));
  }

  async getById(id: number) {
    const room = await roomRepository.findById(id);
    if (!room) throw new AppError('Không tìm thấy phòng', 404);

    const { hotel, ...rest } = room;
    return { ...this.mapRoom(rest), hotel_name: hotel.name, city: hotel.city, address: hotel.address };
  }

  async checkAvailability(roomId: number, checkIn: string, checkOut: string) {
    const room = await roomRepository.findByIdSimple(roomId);
    if (!room) throw new AppError('Không tìm thấy phòng', 404);

    const booked = await roomRepository.getBookedCount(roomId, checkIn, checkOut);
    const available = Math.max(0, room.totalRooms - booked);

    return { available, total: room.totalRooms };
  }
}

export const roomService = new RoomService();
