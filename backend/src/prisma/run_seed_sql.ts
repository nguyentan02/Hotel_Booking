import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
import { PrismaClient } from '@prisma/client';
import { PrismaMssql } from '@prisma/adapter-mssql';

const adapter = new PrismaMssql(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Cleaning database...');
  const tables = [
    'reviews',
    'bookings',
    'hotel_amenities',
    'hotel_images',
    'rooms',
    'amenities',
    'hotels',
    'users'
  ];

  for (const table of tables) {
    try {
      await prisma.$executeRawUnsafe(`DELETE FROM [dbo].[${table}];`);
      try {
        await prisma.$executeRawUnsafe(`DBCC CHECKIDENT ('[dbo].[${table}]', RESEED, 0);`);
      } catch (e) {}
    } catch (e) {}
  }
  console.log('Database cleaned. Reading and executing seed.sql as a single batch...');

  const sqlPath = path.join(process.cwd(), 'database', 'seed.sql');
  let sql = fs.readFileSync(sqlPath, 'utf8');

  // Remove "USE hotel_booking;" if present, as it is not needed and sometimes causes issues in batch executions
  sql = sql.replace(/USE\s+hotel_booking\s*;?/gi, '');

  try {
    await prisma.$executeRawUnsafe(sql);
    console.log('Successfully applied seed.sql!');
  } catch (err: any) {
    console.error('Failed to execute seed.sql:');
    console.error(err.message);
    process.exit(1);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
