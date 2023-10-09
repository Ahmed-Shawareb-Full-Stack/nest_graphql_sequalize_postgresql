import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class EmailService {
  private nodemailerTransporter: Mail;
  constructor(private configService: ConfigService) {
    this.nodemailerTransporter = createTransport({
      host: configService.get('EMAIL_HOST'),
      port: configService.get('EMAIL_PORT'),
      auth: {
        user: configService.get('EMAIL_USER'),
        pass: configService.get('EMAIL_PASS'),
      },
    });
  }

  sendEmail(options: Mail.Options) {
    console.log('second');
    return this.nodemailerTransporter.sendMail(options);
  }
}
