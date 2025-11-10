import nodemailer from 'nodemailer';
import { config } from '../config';
import { logger } from '../utils/logger';

class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      secure: false,
      auth: {
        user: config.email.user,
        pass: config.email.password,
      },
    });
  }

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    try {
      const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;

      await this.transporter.sendMail({
        from: config.email.from,
        to: email,
        subject: 'Verify Your Email',
        html: `
          <h1>Email Verification</h1>
          <p>Please click the link below to verify your email address:</p>
          <a href="${verificationUrl}">${verificationUrl}</a>
          <p>This link will expire in 24 hours.</p>
        `,
      });

      logger.info(`Verification email sent to ${email}`);
    } catch (error) {
      logger.error(`Failed to send verification email to ${email}:`, error);
      throw error;
    }
  }

  async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    try {
      const resetUrl = `${process.env.APP_URL}/reset-password?token=${token}`;

      await this.transporter.sendMail({
        from: config.email.from,
        to: email,
        subject: 'Reset Your Password',
        html: `
          <h1>Password Reset</h1>
          <p>You requested to reset your password. Click the link below to proceed:</p>
          <a href="${resetUrl}">${resetUrl}</a>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, please ignore this email.</p>
        `,
      });

      logger.info(`Password reset email sent to ${email}`);
    } catch (error) {
      logger.error(`Failed to send password reset email to ${email}:`, error);
      throw error;
    }
  }

  async sendPasswordChangedEmail(email: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: config.email.from,
        to: email,
        subject: 'Password Changed Successfully',
        html: `
          <h1>Password Changed</h1>
          <p>Your password has been successfully changed.</p>
          <p>If you didn't make this change, please contact support immediately.</p>
        `,
      });

      logger.info(`Password changed confirmation sent to ${email}`);
    } catch (error) {
      logger.error(`Failed to send password changed email to ${email}:`, error);
      throw error;
    }
  }
}

export const emailService = new EmailService();
