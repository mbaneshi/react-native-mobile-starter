import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // Create test user
  const passwordHash = await bcrypt.hash('Password123', 10);

  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      passwordHash,
      name: 'Test User',
      emailVerified: true,
    },
  });

  console.log('Created test user:', user);

  // Create user settings
  const settings = await prisma.userSettings.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      darkMode: false,
      language: 'en',
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
    },
  });

  console.log('Created user settings:', settings);

  // Create sample notifications
  const notification = await prisma.notification.create({
    data: {
      userId: user.id,
      title: 'Welcome!',
      body: 'Welcome to the app! This is your first notification.',
      read: false,
    },
  });

  console.log('Created notification:', notification);

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
