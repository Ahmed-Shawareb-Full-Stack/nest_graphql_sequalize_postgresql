import { Process, Processor } from '@nestjs/bull';
import { EmailService } from './email.service';
import { Job } from 'bull';
import { EmailDTO } from './dto/email.dto';

@Processor('sendEmail')
export class SendEmailProcessor {
  constructor(private readonly emailService: EmailService) {}

  @Process('test-email')
  async processSendingEmailInQueue(job: Job<EmailDTO>) {
    console.log('first');
    const { data } = job;
    await this.emailService.sendEmail({
      from: data.from,
      to: data.to,
      subject: data.subject,
      text: data.content,
    });
  }
}
