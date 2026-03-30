import bcrypt from 'bcryptjs';
import jwt, { type SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';
import { userRepository } from '../repositories/user.repository';
import { AppError } from '../utils/appError';
import { RegisterInput, LoginInput, ChangePasswordInput } from '../dto/auth.dto';

const jwtOptions: SignOptions = { expiresIn: env.JWT_EXPIRES_IN as any };

export class AuthService {
  async register(input: RegisterInput) {
    const existing = await userRepository.findByEmail(input.email);
    if (existing) throw new AppError('Email đã được sử dụng', 400);

    const hashedPassword = await bcrypt.hash(input.password, 10);
    const user = await userRepository.create({
      name: input.name,
      email: input.email,
      password: hashedPassword,
      phone: input.phone || null,
    });

    const token = jwt.sign({ id: user.id }, env.JWT_SECRET, jwtOptions);

    return {
      token,
      user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role },
    };
  }

  async login(input: LoginInput) {
    const user = await userRepository.findByEmail(input.email);
    if (!user) throw new AppError('Email hoặc mật khẩu không đúng', 401);

    const isMatch = await bcrypt.compare(input.password, user.password);
    if (!isMatch) throw new AppError('Email hoặc mật khẩu không đúng', 401);

    const token = jwt.sign({ id: user.id }, env.JWT_SECRET, jwtOptions);

    return {
      token,
      user: {
        id: user.id, name: user.name, email: user.email,
        phone: user.phone, role: user.role, avatar_url: user.avatarUrl,
      },
    };
  }

  async updateProfile(userId: number, data: { name: string; phone?: string | null }) {
    const user = await userRepository.updateProfile(userId, data);
    return { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role, avatarUrl: user.avatarUrl };
  }

  async changePassword(userId: number, input: ChangePasswordInput) {
    const user = await userRepository.findById(userId);
    if (!user) throw new AppError('Người dùng không tồn tại', 404);

    const isMatch = await bcrypt.compare(input.currentPassword, user.password);
    if (!isMatch) throw new AppError('Mật khẩu hiện tại không đúng', 400);

    const hashedPassword = await bcrypt.hash(input.newPassword, 10);
    await userRepository.updatePassword(userId, hashedPassword);
  }
}

export const authService = new AuthService();
