import prisma from '../config/database';
import { Prisma } from '@prisma/client';

export class UserRepository {
  async findById(id: number) {
    return prisma.user.findUnique({ where: { id } });
  }

  async findByIdSelect(id: number) {
    return prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, phone: true, role: true, avatarUrl: true },
    });
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
    return prisma.user.findMany({
      select: { id: true, name: true, email: true, phone: true, role: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    });
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
