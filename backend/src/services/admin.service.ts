import { hotelRepository } from '../repositories/hotel.repository';
import { roomRepository } from '../repositories/room.repository';
import { bookingRepository } from '../repositories/booking.repository';
import { userRepository } from '../repositories/user.repository';
import { AppError } from '../utils/appError';
import { uploadToCloudinary } from '../utils/upload';

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
      starRating: data.star_rating || 3,
      imageUrl,
      phone: data.phone || null,
      email: data.email || null,
      isFeatured: data.is_featured || false,
    });

    if (data.amenity_ids) {
      const ids: number[] = JSON.parse(data.amenity_ids);
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
    if (data.star_rating) updateData.starRating = data.star_rating;
    if (imageUrl) updateData.imageUrl = imageUrl;
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.is_featured !== undefined) updateData.isFeatured = data.is_featured;

    if (Object.keys(updateData).length > 0) {
      await hotelRepository.update(id, updateData);
    }

    if (data.amenity_ids) {
      const ids: number[] = JSON.parse(data.amenity_ids);
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
      hotelId: data.hotel_id,
      name: data.name,
      description: data.description || null,
      price: data.price,
      capacity: data.capacity || 2,
      totalRooms: data.total_rooms || 1,
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
    if (data.price) updateData.price = data.price;
    if (data.capacity) updateData.capacity = data.capacity;
    if (data.total_rooms) updateData.totalRooms = data.total_rooms;
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

    const mapped = bookings.map((b) => ({
      ...b,
      room_name: b.room.name,
      hotel_name: b.room.hotel.name,
      city: b.room.hotel.city,
      user_name: b.user?.name || null,
      user_email: b.user?.email || null,
    }));

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

  async updateUserRole(id: number, role: string) {
    await userRepository.updateRole(id, role);
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
