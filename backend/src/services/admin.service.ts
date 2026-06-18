import { hotelRepository } from '../repositories/hotel.repository';
import { roomRepository } from '../repositories/room.repository';
import { bookingRepository } from '../repositories/booking.repository';
import { userRepository } from '../repositories/user.repository';
import { AppError } from '../utils/appError';
import { uploadToCloudinary } from '../utils/upload';
import bcrypt from 'bcryptjs';

export class AdminService {
  // ===== HOTELS =====
  async createHotel(data: any, imageFile?: Express.Multer.File) {
    let imageUrl = data.image_url || null;
    if (imageFile) {
      imageUrl = await uploadToCloudinary(imageFile, 'hotels');
    }
    const hotel = await hotelRepository.create({
      name: data.name,
      description: data.description || null,
      address: data.address,
      city: data.city,
      latitude: data.latitude || null,
      longitude: data.longitude || null,
      starRating: parseInt(data.star_rating) || 3,
      imageUrl,
      phone: data.phone || null,
      email: data.email || null,
      isFeatured: data.is_featured === true || data.is_featured === 'true',
    });

    if (data.amenity_ids) {
      const ids: number[] = typeof data.amenity_ids === 'string' ? JSON.parse(data.amenity_ids) : data.amenity_ids;
      await hotelRepository.setAmenities(hotel.id, ids);
    }

    return hotel;
  }

  async updateHotel(id: number, data: any, imageFile?: Express.Multer.File) {
    let imageUrl = data.image_url;
    if (imageFile) {
      imageUrl = await uploadToCloudinary(imageFile, 'hotels');
    }
    const updateData: any = {};

    if (data.name) updateData.name = data.name;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.address) updateData.address = data.address;
    if (data.city) updateData.city = data.city;
    if (data.latitude !== undefined) updateData.latitude = data.latitude;
    if (data.longitude !== undefined) updateData.longitude = data.longitude;
    if (data.star_rating) {
      const sr = parseInt(data.star_rating);
      if (!isNaN(sr)) updateData.starRating = sr;
    }
    if (imageUrl) updateData.imageUrl = imageUrl;
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.is_featured !== undefined) updateData.isFeatured = data.is_featured === true || data.is_featured === 'true';

    if (Object.keys(updateData).length > 0) {
      await hotelRepository.update(id, updateData);
    }

    if (data.amenity_ids) {
      const ids: number[] = typeof data.amenity_ids === 'string' ? JSON.parse(data.amenity_ids) : data.amenity_ids;
      await hotelRepository.setAmenities(id, ids);
    }
  }

  async deleteHotel(id: number) {
    await hotelRepository.delete(id);
  }

  // ===== ROOMS =====
  async createRoom(data: any, imageFile?: Express.Multer.File) {
    let imageUrl = data.image_url || null;
    if (imageFile) {
      imageUrl = await uploadToCloudinary(imageFile, 'rooms');
    }
    return roomRepository.create({
      hotelId: parseInt(data.hotel_id),
      name: data.name,
      description: data.description || null,
      price: parseFloat(data.price),
      capacity: parseInt(data.capacity) || 2,
      totalRooms: parseInt(data.total_rooms) || 1,
      imageUrl,
    });
  }

  async updateRoom(id: number, data: any, imageFile?: Express.Multer.File) {
    let imageUrl = data.image_url;
    if (imageFile) {
      imageUrl = await uploadToCloudinary(imageFile, 'rooms');
    }
    const updateData: any = {};

    if (data.name) updateData.name = data.name;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.price) updateData.price = parseFloat(data.price);
    if (data.capacity) updateData.capacity = parseInt(data.capacity);
    if (data.total_rooms) updateData.totalRooms = parseInt(data.total_rooms);
    if (data.status) updateData.status = data.status;
    if (imageUrl) updateData.imageUrl = imageUrl;

    if (Object.keys(updateData).length > 0) {
      await roomRepository.update(id, updateData);
    }
  }

  async deleteRoom(id: number) {
    await roomRepository.delete(id);
  }

  // ===== BOOKINGS =====
  async getAllBookings(status?: string, page = 1, limit = 20) {
    const { bookings, total } = await bookingRepository.findAll(status, page, limit);

    const mapped = bookings.map((b) => {
      const { userId, roomId, checkIn, checkOut, numRooms, totalPrice, guestName, guestEmail, guestPhone, paymentMethod, paymentStatus, specialRequests, createdAt, updatedAt, room, user, ...rest } = b;
      return {
        ...rest,
        user_id: userId,
        room_id: roomId,
        check_in_date: checkIn,
        check_out_date: checkOut,
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
        room_name: room.name,
        hotel_name: room.hotel.name,
        city: room.hotel.city,
        user_name: user?.name || null,
        user_email: user?.email || null,
      };
    });

    return {
      bookings: mapped,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async updateBookingStatus(id: number, data: { status?: string; payment_status?: string }) {
    const updateData: any = {};
    if (data.status) updateData.status = data.status;
    if (data.payment_status) updateData.paymentStatus = data.payment_status;

    if (Object.keys(updateData).length > 0) {
      await bookingRepository.update(id, updateData);
    }
  }

  // ===== USERS =====
  async getAllUsers() {
    return userRepository.findAll();
  }

  async getUserDetail(id: number) {
    const user = await userRepository.findByIdForAdmin(id);
    if (!user) throw new AppError('Không tìm thấy người dùng', 404);
    return user;
  }

  async updateUserRole(id: number, role: string) {
    const validRoles = ['customer', 'admin'];
    if (!validRoles.includes(role)) throw new AppError('Vai trò không hợp lệ', 400);
    await userRepository.updateRole(id, role);
  }

  async toggleUserActive(id: number, currentUserId: number, isActive: boolean) {
    if (id === currentUserId) throw new AppError('Không thể khóa chính mình', 400);
    await userRepository.toggleActive(id, isActive);
  }

  async resetUserPassword(id: number, newPassword: string) {
    if (!newPassword || newPassword.length < 6) throw new AppError('Mật khẩu phải có ít nhất 6 ký tự', 400);
    const hashed = await bcrypt.hash(newPassword, 10);
    await userRepository.adminResetPassword(id, hashed);
  }

  async deleteUser(id: number, currentUserId: number) {
    if (id === currentUserId) throw new AppError('Không thể xóa chính mình', 400);
    await userRepository.delete(id);
  }

  // ===== DASHBOARD =====
  async getDashboardStats() {
    const [totalHotels, totalRooms, totalBookings, totalUsers, totalRevenue, pendingBookings, monthlyRevenue, occupancyRates, bookingsByStatus] =
      await Promise.all([
        hotelRepository.count(),
        roomRepository.count(),
        bookingRepository.count(),
        userRepository.countCustomers(),
        bookingRepository.totalRevenue(),
        bookingRepository.countByStatus('pending'),
        bookingRepository.monthlyRevenue(),
        bookingRepository.occupancyRates(),
        bookingRepository.bookingsByStatus(),
      ]);

    return {
      stats: { totalHotels, totalRooms, totalBookings, totalUsers, totalRevenue, pendingBookings },
      monthlyRevenue,
      occupancyRates,
      bookingsByStatus,
    };
  }
}

export const adminService = new AdminService();
