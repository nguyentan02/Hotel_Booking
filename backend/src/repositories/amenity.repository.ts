import prisma from '../config/database';

export class AmenityRepository {
  async findAll() {
    return prisma.amenity.findMany({ orderBy: { name: 'asc' } });
  }
}

export const amenityRepository = new AmenityRepository();
