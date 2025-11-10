import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

export const prisma = new PrismaClient({
  log: [
    { emit: 'event', level: 'query' },
    { emit: 'event', level: 'error' },
    { emit: 'event', level: 'warn' },
  ],
});

prisma.$on('query' as any, (e: any) => {
  logger.debug(`Query: ${e.query}`);
});

prisma.$on('error' as any, (e: any) => {
  logger.error(`Database error: ${e.message}`);
});

prisma.$on('warn' as any, (e: any) => {
  logger.warn(`Database warning: ${e.message}`);
});
