import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@apexpro.com' },
    update: {},
    create: {
      email: 'admin@apexpro.com',
      password: hashedPassword,
      name: 'Admin',
    },
  });
  
  console.log('Admin created:', admin.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
