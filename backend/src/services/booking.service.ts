import { bookingRepository } from '../repositories/booking.repository';
import { roomRepository } from '../repositories/room.repository';
import { AppError } from '../utils/appError';
import { CreateBookingInput, UpdateBookingInput } from '../dto/booking.dto';

export class BookingService {
  async create(input: CreateBookingInput, userId: number | null) {
    const { room_id, check_in, check_out, num_rooms, guest_name, guest_email, guest_phone, payment_method, special_requests } = input;

    const checkInDate = new Date(check_in);
    const checkOutDate = new Date(check_out);
    if (checkInDate >= checkOutDate) throw new AppError('Ngày trả phòng phải sau ngày nhận phòng', 400);

    const room = await roomRepository.findByIdSimple(room_id);
    if (!room || room.status !== 'available') throw new AppError('Phòng không tồn tại hoặc không khả dụng', 404);

    const booked = await roomRepository.getBookedCount(room_id, check_in, check_out);
    const available = room.totalRooms - booked;
    if (available < num_rooms) throw new AppError(`Chỉ còn ${Math.max(0, available)} phòng trống`, 400);

    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = Number(room.price) * nights * num_rooms;

    const booking = await bookingRepository.create({
      userId,
      roomId: room_id,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      numRooms: num_rooms,
      totalPrice,
      guestName: guest_name,
      guestEmail: guest_email,
      guestPhone: guest_phone || null,
      paymentMethod: payment_method,
      specialRequests: special_requests || null,
    });

    const fullBooking = await bookingRepository.findByIdFull(booking.id);
    if (!fullBooking) throw new AppError('Không tìm thấy đặt phòng sau khi tạo', 500);

    return {
      ...this.mapBooking(fullBooking),
      room_name: fullBooking.room.name,
      room_image: fullBooking.room.imageUrl,
      price: fullBooking.room.price,
      hotel_name: fullBooking.room.hotel.name,
      hotel_id: fullBooking.room.hotel.id,
      city: fullBooking.room.hotel.city,
      address: fullBooking.room.hotel.address,
      hotel_phone: fullBooking.room.hotel.phone,
      hotel_image: fullBooking.room.hotel.imageUrl,
    };
  }

  private mapBooking(b: any) {
    const { userId, roomId, checkIn, checkOut, numRooms, totalPrice, guestName, guestEmail, guestPhone, paymentMethod, paymentStatus, specialRequests, createdAt, updatedAt, room, user, ...rest } = b;
    return {
      ...rest,
      user_id: userId,
      room_id: roomId,
      check_in: checkIn,
      check_out: checkOut,
      num_rooms: numRooms,
      total_price: Number(totalPrice),
      guest_name: guestName,
      guest_email: guestEmail,
      guest_phone: guestPhone,
      payment_method: paymentMethod,
      payment_status: paymentStatus,
      special_requests: specialRequests,
      created_at: createdAt,
      updated_at: updatedAt,
    };
  }

  async getMyBookings(userId: number, status?: string) {
    const bookings = await bookingRepository.findByUser(userId, status);
    return bookings.map((b) => ({
      ...this.mapBooking(b),
      room_name: b.room.name,
      room_image: b.room.imageUrl,
      price: b.room.price,
      hotel_name: b.room.hotel.name,
      hotel_id: b.room.hotel.id,
      city: b.room.hotel.city,
      hotel_image: b.room.hotel.imageUrl,
    }));
  }

  async getById(id: number, userId: number, role: string) {
    const booking = await bookingRepository.findByIdFull(id);
    if (!booking) throw new AppError('Không tìm thấy đặt phòng', 404);
    if (role !== 'admin' && booking.userId !== userId) throw new AppError('Không có quyền', 403);

    return {
      ...this.mapBooking(booking),
      room_name: booking.room.name,
      room_image: booking.room.imageUrl,
      price: booking.room.price,
      hotel_name: booking.room.hotel.name,
      hotel_id: booking.room.hotel.id,
      city: booking.room.hotel.city,
      address: booking.room.hotel.address,
      hotel_phone: booking.room.hotel.phone,
      hotel_image: booking.room.hotel.imageUrl,
    };
  }

  async cancel(id: number, userId: number, role: string) {
    const booking = await bookingRepository.findByIdSimple(id);
    if (!booking) throw new AppError('Không tìm thấy đặt phòng', 404);
    if (role !== 'admin' && booking.userId !== userId) throw new AppError('Không có quyền', 403);
    if (booking.status === 'cancelled') throw new AppError('Đặt phòng đã được hủy trước đó', 400);
    if (booking.status === 'completed') throw new AppError('Không thể hủy đặt phòng đã hoàn thành', 400);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(booking.checkIn) <= today && role !== 'admin') {
      throw new AppError('Không thể hủy sau ngày nhận phòng', 400);
    }

    await bookingRepository.update(id, {
      status: 'cancelled',
      paymentStatus: booking.paymentStatus === 'paid' ? 'refunded' : booking.paymentStatus,
    });
  }

  async updateBooking(id: number, input: UpdateBookingInput, userId: number, role: string) {
    const booking = await bookingRepository.findByIdSimple(id);
    if (!booking) throw new AppError('Không tìm thấy đặt phòng', 404);
    if (role !== 'admin' && booking.userId !== userId) throw new AppError('Không có quyền', 403);
    if (['cancelled', 'completed'].includes(booking.status)) {
      throw new AppError('Không thể sửa đặt phòng đã hủy hoặc hoàn thành', 400);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(booking.checkIn) <= today && role !== 'admin') {
      throw new AppError('Không thể sửa sau ngày nhận phòng', 400);
    }

    let totalPrice = Number(booking.totalPrice);
    const newCheckIn = input.check_in ? new Date(input.check_in) : booking.checkIn;
    const newCheckOut = input.check_out ? new Date(input.check_out) : booking.checkOut;

    if (input.check_in || input.check_out) {
      const room = await roomRepository.findByIdSimple(booking.roomId);
      if (room) {
        const nights = Math.ceil((newCheckOut.getTime() - newCheckIn.getTime()) / (1000 * 60 * 60 * 24));
        totalPrice = Number(room.price) * nights * booking.numRooms;
      }
    }

    await bookingRepository.update(id, {
      checkIn: newCheckIn,
      checkOut: newCheckOut,
      guestName: input.guest_name || booking.guestName,
      guestPhone: input.guest_phone ?? booking.guestPhone,
      specialRequests: input.special_requests ?? booking.specialRequests,
      totalPrice,
    });
  }
}

export const bookingService = new BookingService();
