import { PrismaClient } from '@prisma/client';
import { PrismaMssql } from '@prisma/adapter-mssql';
import { env } from './env.js';

const adapter = new PrismaMssql(env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

export default prisma;
