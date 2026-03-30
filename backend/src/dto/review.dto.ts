import { z } from 'zod';

export const createReviewSchema = z.object({
  hotel_id: z.number().int().positive(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().optional(),
});

export type CreateReviewInput = z.infer<typeof createReviewSchema>;
