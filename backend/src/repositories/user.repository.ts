import prisma from '../config/database';
import { Prisma } from '@prisma/client';

export class UserRepository {
  async findById(id: number) {
    return prisma.user.findUnique({ where: { id } });
  }

  async findByIdSelect(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, phone: true, role: true, avatarUrl: true },
    });
    if (!user) return null;
    return { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role, avatar_url: user.avatarUrl };
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async create(data: Prisma.UserCreateInput) {
    return prisma.user.create({ data });
  }

  async updateProfile(id: number, data: { name: string; phone?: string | null }) {
    return prisma.user.update({ where: { id }, data });
  }

  async updatePassword(id: number, password: string) {
    return prisma.user.update({ where: { id }, data: { password } });
  }

  async findAll() {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, phone: true, role: true, isActive: true, avatarUrl: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    });
    return users.map((u) => ({
      id: u.id,
      full_name: u.name,
      email: u.email,
      phone: u.phone,
      role: u.role,
      is_active: u.isActive,
      avatar_url: u.avatarUrl,
      created_at: u.createdAt,
    }));
  }

  async findByIdForAdmin(id: number) {
    const u = await prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, phone: true, role: true, isActive: true, avatarUrl: true, createdAt: true, updatedAt: true },
    });
    if (!u) return null;
    return {
      id: u.id,
      full_name: u.name,
      email: u.email,
      phone: u.phone,
      role: u.role,
      is_active: u.isActive,
      avatar_url: u.avatarUrl,
      created_at: u.createdAt,
      updated_at: u.updatedAt,
    };
  }

  async toggleActive(id: number, isActive: boolean) {
    return prisma.user.update({ where: { id }, data: { isActive } });
  }

  async adminResetPassword(id: number, hashedPassword: string) {
    return prisma.user.update({ where: { id }, data: { password: hashedPassword } });
  }

  async updateRole(id: number, role: string) {
    return prisma.user.update({ where: { id }, data: { role } });
  }

  async delete(id: number) {
    return prisma.user.delete({ where: { id } });
  }

  async countCustomers() {
    return prisma.user.count({ where: { role: 'customer' } });
  }
}

export const userRepository = new UserRepository();
