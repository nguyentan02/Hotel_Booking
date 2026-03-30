import prisma from '../config/database';
import { Prisma } from '@prisma/client';

export class BookingRepository {
  async create(data: Prisma.BookingUncheckedCreateInput) {
    return prisma.booking.create({ data });
  }

  async findByIdFull(id: number) {
    return prisma.booking.findUnique({
      where: { id },
      include: {
        room: {
          include: { hotel: { select: { id: true, name: true, city: true, address: true, phone: true, imageUrl: true } } },
        },
        user: { select: { name: true, email: true } },
      },
    });
  }

  async findByIdSimple(id: number) {
    return prisma.booking.findUnique({ where: { id } });
  }

  async findByUser(userId: number, status?: string) {
    const where: Prisma.BookingWhereInput = { userId };
    if (status) where.status = status;

    return prisma.booking.findMany({
      where,
      include: {
        room: {
          select: { name: true, imageUrl: true, price: true, hotel: { select: { id: true, name: true, city: true, imageUrl: true } } },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: number, data: Prisma.BookingUpdateInput) {
    return prisma.booking.update({ where: { id }, data });
  }

  async findAll(status?: string, page = 1, limit = 20) {
    const where: Prisma.BookingWhereInput = {};
    if (status) where.status = status;

    const [total, bookings] = await Promise.all([
      prisma.booking.count({ where }),
      prisma.booking.findMany({
        where,
        include: {
          room: { select: { name: true, hotel: { select: { name: true, city: true } } } },
          user: { select: { name: true, email: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    return { bookings, total };
  }

  async count() {
    return prisma.booking.count();
  }

  async countByStatus(status: string) {
    return prisma.booking.count({ where: { status } });
  }

  async totalRevenue() {
    const result = await prisma.booking.aggregate({
      where: { paymentStatus: 'paid' },
      _sum: { totalPrice: true },
    });
    return Number(result._sum.totalPrice) || 0;
  }

  async monthlyRevenue() {
    // Prisma doesn't easily do DATE_FORMAT groupBy, use raw query
    const result = await prisma.$queryRaw<Array<{ month: string; revenue: number; bookings: number }>>`
      SELECT FORMAT(created_at, 'yyyy-MM') as month,
        SUM(total_price) as revenue, COUNT(*) as bookings
      FROM bookings
      WHERE payment_status = 'paid'
        AND created_at >= DATEADD(MONTH, -12, GETDATE())
      GROUP BY FORMAT(created_at, 'yyyy-MM')
      ORDER BY month ASC
    `;
    return result;
  }

  async bookingsByStatus() {
    const result = await prisma.booking.groupBy({
      by: ['status'],
      _count: { status: true },
    });
    return result.map((r) => ({ status: r.status, count: r._count.status }));
  }

  async occupancyRates() {
    const result = await prisma.$queryRaw<Array<{ hotel_name: string; hotel_id: number; total_rooms: number; occupied: number }>>`
      SELECT h.name as hotel_name, h.id as hotel_id,
        COALESCE(SUM(r.total_rooms), 0) as total_rooms,
        COALESCE((
          SELECT COUNT(*) FROM bookings b
          JOIN rooms r2 ON b.room_id = r2.id
          WHERE r2.hotel_id = h.id AND b.status IN ('confirmed', 'completed')
          AND b.check_in <= CAST(GETDATE() AS DATE) AND b.check_out > CAST(GETDATE() AS DATE)
        ), 0) as occupied
      FROM hotels h LEFT JOIN rooms r ON r.hotel_id = h.id
      GROUP BY h.id, h.name
    `;
    return result;
  }
}

export const bookingRepository = new BookingRepository();
