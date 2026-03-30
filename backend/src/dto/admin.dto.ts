import { z } from 'zod';

export const createHotelSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().optional(),
  address: z.string().min(1).max(500),
  city: z.string().min(1).max(100),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  star_rating: z.number().int().min(1).max(5).default(3),
  image_url: z.string().optional(),
  phone: z.string().max(20).optional(),
  email: z.string().email().optional(),
  is_featured: z.boolean().default(false),
  amenity_ids: z.string().optional(), // JSON string of number[]
});

export const createRoomSchema = z.object({
  hotel_id: z.number().int().positive(),
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  price: z.number().positive(),
  capacity: z.number().int().positive().default(2),
  total_rooms: z.number().int().positive().default(1),
  image_url: z.string().optional(),
  status: z.enum(['available', 'unavailable']).default('available'),
});

export const updateBookingStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled', 'completed']).optional(),
  payment_status: z.enum(['pending', 'paid', 'refunded']).optional(),
});

export const updateUserRoleSchema = z.object({
  role: z.enum(['customer', 'admin']),
});

export type CreateHotelInput = z.infer<typeof createHotelSchema>;
export type CreateRoomInput = z.infer<typeof createRoomSchema>;
export type UpdateBookingStatusInput = z.infer<typeof updateBookingStatusSchema>;
export type UpdateUserRoleInput = z.infer<typeof updateUserRoleSchema>;
