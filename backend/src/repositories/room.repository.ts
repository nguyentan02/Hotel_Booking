import prisma from '../config/database';
import { Prisma } from '@prisma/client';

export class RoomRepository {
  async findByHotel(hotelId: number) {
    return prisma.room.findMany({
      where: { hotelId },
      orderBy: { price: 'asc' },
    });
  }

  async findById(id: number) {
    return prisma.room.findUnique({
      where: { id },
      include: {
        hotel: { select: { name: true, city: true, address: true } },
      },
    });
  }

  async findByIdSimple(id: number) {
    return prisma.room.findUnique({ where: { id } });
  }

  async getBookedCount(roomId: number, checkIn: string, checkOut: string) {
    const result = await prisma.booking.aggregate({
      where: {
        roomId,
        status: { in: ['pending', 'confirmed'] },
        checkIn: { lt: new Date(checkOut) },
        checkOut: { gt: new Date(checkIn) },
      },
      _sum: { numRooms: true },
    });
    return result._sum.numRooms || 0;
  }

  async create(data: Prisma.RoomUncheckedCreateInput) {
    return prisma.room.create({ data });
  }

  async update(id: number, data: Prisma.RoomUpdateInput) {
    return prisma.room.update({ where: { id }, data });
  }

  async delete(id: number) {
    return prisma.room.delete({ where: { id } });
  }

  async count() {
    return prisma.room.count();
  }
}

export const roomRepository = new RoomRepository();
