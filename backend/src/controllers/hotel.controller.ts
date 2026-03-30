import { Request, Response, NextFunction } from 'express';
import { hotelService } from '../services/hotel.service';

export class HotelController {
  async getHotels(req: Request, res: Response, next: NextFunction) {
    try {
      const { city, check_in, check_out, min_price, max_price, star_rating, amenities, search, page = '1', limit = '12' } = req.query;
      const result = await hotelService.search({
        city: city as string,
        search: search as string,
        starRating: star_rating ? parseInt(star_rating as string) : undefined,
        minPrice: min_price ? parseFloat(min_price as string) : undefined,
        maxPrice: max_price ? parseFloat(max_price as string) : undefined,
        amenityIds: amenities ? (amenities as string).split(',').map(Number).filter(Boolean) : undefined,
        checkIn: check_in as string,
        checkOut: check_out as string,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
      });
      res.json(result);
    } catch (err) { next(err); }
  }

  async getFeaturedHotels(_req: Request, res: Response, next: NextFunction) {
    try {
      const hotels = await hotelService.getFeatured();
      res.json(hotels);
    } catch (err) { next(err); }
  }

  async getHotelById(req: Request, res: Response, next: NextFunction) {
    try {
      const hotel = await hotelService.getById(parseInt(req.params.id as string));
      res.json(hotel);
    } catch (err) { next(err); }
  }

  async getCities(_req: Request, res: Response, next: NextFunction) {
    try {
      const cities = await hotelService.getCities();
      res.json(cities);
    } catch (err) { next(err); }
  }

  async getAmenities(_req: Request, res: Response, next: NextFunction) {
    try {
      const amenities = await hotelService.getAmenities();
      res.json(amenities);
    } catch (err) { next(err); }
  }
}

export const hotelController = new HotelController();
