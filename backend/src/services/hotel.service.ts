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

    const { amenities, _count, ...rest } = hotel;
    return {
      ...rest,
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
