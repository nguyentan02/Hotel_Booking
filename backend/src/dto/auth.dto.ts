import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(1, 'Tên không được để trống').max(100),
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu ít nhất 6 ký tự'),
  phone: z.string().max(20).optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(1, 'Mật khẩu không được để trống'),
});

export const updateProfileSchema = z.object({
  name: z.string().min(1).max(100),
  phone: z.string().max(20).nullable().optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(6, 'Mật khẩu mới ít nhất 6 ký tự'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
