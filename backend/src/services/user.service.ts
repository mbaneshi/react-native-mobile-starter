import bcrypt from 'bcrypt';
import { prisma } from '../config/database';
import { AppError } from '../utils/errors';
import { emailService } from './email.service';
import { S3 } from 'aws-sdk';
import { config } from '../config';

const s3 = new S3({
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
  region: config.aws.region,
});

class UserService {
  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return { user };
  }

  async updateProfile(userId: string, data: { name?: string; avatarUrl?: string }) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.avatarUrl && { avatarUrl: data.avatarUrl }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return { user };
  }

  async uploadAvatar(userId: string, file: Express.Multer.File) {
    try {
      const fileName = `avatars/${userId}-${Date.now()}.${file.originalname.split('.').pop()}`;

      const uploadParams = {
        Bucket: config.aws.s3Bucket,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      };

      const result = await s3.upload(uploadParams).promise();

      await prisma.user.update({
        where: { id: userId },
        data: { avatarUrl: result.Location },
      });

      return { avatarUrl: result.Location };
    } catch (error) {
      throw new AppError('Failed to upload avatar', 500);
    }
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash);

    if (!isPasswordValid) {
      throw new AppError('Current password is incorrect', 400);
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { passwordHash },
    });

    // Invalidate all refresh tokens (logout from all devices)
    await prisma.refreshToken.deleteMany({
      where: { userId },
    });

    await emailService.sendPasswordChangedEmail(user.email);

    return { message: 'Password changed successfully' };
  }

  async deleteAccount(userId: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new AppError('Password is incorrect', 400);
    }

    // Delete user (cascade will delete all related data)
    await prisma.user.delete({
      where: { id: userId },
    });

    return { message: 'Account deleted successfully' };
  }
}

export const userService = new UserService();
