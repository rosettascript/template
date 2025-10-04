import nodemailer from 'nodemailer';
import { config } from '../config';
import { logger } from '../utils/logger';

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: config.email.user,
        pass: config.email.pass
      }
    });
  }

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    try {
      const verificationUrl = `${config.cors.origin}/verify-email?token=${token}`;
      
      const mailOptions = {
        from: config.email.from,
        to: email,
        subject: 'Verify Your Email Address',
        html: `
          <h2>Welcome to Template App!</h2>
          <p>Please click the link below to verify your email address:</p>
          <a href="${verificationUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p>${verificationUrl}</p>
          <p>This link will expire in 24 hours.</p>
        `
      };

      await this.transporter.sendMail(mailOptions);
      logger.info(`Verification email sent to: ${email}`);
    } catch (error) {
      logger.error('Error sending verification email:', error);
      throw error;
    }
  }

  async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    try {
      const resetUrl = `${config.cors.origin}/reset-password?token=${token}`;
      
      const mailOptions = {
        from: config.email.from,
        to: email,
        subject: 'Password Reset Request',
        html: `
          <h2>Password Reset Request</h2>
          <p>You requested to reset your password. Click the link below to reset it:</p>
          <a href="${resetUrl}" style="background-color: #dc3545; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p>${resetUrl}</p>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, please ignore this email.</p>
        `
      };

      await this.transporter.sendMail(mailOptions);
      logger.info(`Password reset email sent to: ${email}`);
    } catch (error) {
      logger.error('Error sending password reset email:', error);
      throw error;
    }
  }

  async sendWelcomeEmail(email: string, firstName: string): Promise<void> {
    try {
      const mailOptions = {
        from: config.email.from,
        to: email,
        subject: 'Welcome to Template App!',
        html: `
          <h2>Welcome ${firstName}!</h2>
          <p>Thank you for joining Template App. We're excited to have you on board!</p>
          <p>If you have any questions, feel free to contact our support team.</p>
          <p>Best regards,<br>The Template App Team</p>
        `
      };

      await this.transporter.sendMail(mailOptions);
      logger.info(`Welcome email sent to: ${email}`);
    } catch (error) {
      logger.error('Error sending welcome email:', error);
      throw error;
    }
  }
}

export const emailService = new EmailService();
