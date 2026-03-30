import { z } from 'zod';

export const createBookingSchema = z.object({
  room_id: z.number().int().positive(),
  check_in: z.string().refine((d) => !isNaN(Date.parse(d)), 'Ngày không hợp lệ'),
  check_out: z.string().refine((d) => !isNaN(Date.parse(d)), 'Ngày không hợp lệ'),
  num_rooms: z.number().int().positive().default(1),
  guest_name: z.string().min(1, 'Tên khách không được để trống'),
  guest_email: z.string().email('Email không hợp lệ'),
  guest_phone: z.string().max(20).optional(),
  payment_method: z.enum(['credit_card', 'bank_transfer', 'cash']).default('credit_card'),
  special_requests: z.string().optional(),
});

export const updateBookingSchema = z.object({
  check_in: z.string().refine((d) => !isNaN(Date.parse(d)), 'Ngày không hợp lệ').optional(),
  check_out: z.string().refine((d) => !isNaN(Date.parse(d)), 'Ngày không hợp lệ').optional(),
  guest_name: z.string().min(1).optional(),
  guest_phone: z.string().max(20).optional(),
  special_requests: z.string().optional(),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type UpdateBookingInput = z.infer<typeof updateBookingSchema>;
