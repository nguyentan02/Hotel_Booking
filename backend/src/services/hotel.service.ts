import { hotelRepository, HotelSearchParams } from '../repositories/hotel.repository';
import { amenityRepository } from '../repositories/amenity.repository';
import { AppError } from '../utils/appError';

export class HotelService {
  async search(params: HotelSearchParams) {
    const { hotels, total } = await hotelRepository.search(params);
    return {
      hotels,
      pagination: {
        page: params.page,
        limit: params.limit,
        total,
        totalPages: Math.ceil(total / params.limit),
      },
    };
  }

  async getFeatured() {
    return hotelRepository.findFeatured();
  }

  async getById(id: number) {
    const hotel = await hotelRepository.findById(id);
    if (!hotel) throw new AppError('Không tìm thấy khách sạn', 404);

    const { amenities, _count, starRating, imageUrl, isFeatured, createdAt, updatedAt, ...rest } = hotel;
    return {
      ...rest,
      star_rating: starRating,
      image_url: imageUrl,
      is_featured: isFeatured,
      created_at: createdAt,
      updated_at: updatedAt,
      rooms: hotel.rooms.map((r: any) => {
        const { hotelId, totalRooms, imageUrl: rImgUrl, createdAt: rCAt, updatedAt: rUAt, ...rRest } = r;
        return { ...rRest, hotel_id: hotelId, total_rooms: totalRooms, image_url: rImgUrl, created_at: rCAt, updated_at: rUAt };
      }),
      reviews: hotel.reviews.map((rv: any) => {
        const { hotelId, userId, createdAt: rvCAt, updatedAt: rvUAt, ...rvRest } = rv;
        return { ...rvRest, hotel_id: hotelId, user_id: userId, created_at: rvCAt, updated_at: rvUAt };
      }),
      min_price: hotel.rooms.length > 0 ? Math.min(...hotel.rooms.map((r) => Number(r.price))) : null,
      review_count: _count.reviews,
      amenities: amenities.map((a) => a.amenity),
    };
  }

  async getCities() {
    return hotelRepository.getCities();
  }

  async getAmenities() {
    return amenityRepository.findAll();
  }
}

export const hotelService = new HotelService();
