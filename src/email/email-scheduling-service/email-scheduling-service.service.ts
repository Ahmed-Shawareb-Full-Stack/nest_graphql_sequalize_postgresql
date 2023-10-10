import { Injectable } from '@nestjs/common';
import { EmailService } from '../email.service';
import { SchedulerRegistry } from '@nestjs/schedule';
import { EmailScheduleDTO } from '../dto/EmailSech.dto';
import { CronJob } from 'cron';

@Injectable()
export class EmailSchedulingServiceService {
  constructor(
    private readonly emailService: EmailService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  scheduleEmail(emailSchedule: EmailScheduleDTO) {
    const emailDate = new Date(emailSchedule.date);
    const now = Date.now().toLocaleString();
    const cronName = `${now}-${emailSchedule.subject}`;
    const sendEmailJob = new CronJob(emailDate, () => {
      this.emailService.sendEmail({
        to: emailSchedule.recipient,
        subject: emailSchedule.subject,
        text: emailSchedule.content,
      });
    });
    this.schedulerRegistry.addCronJob(
      cronName,
      sendEmailJob,
    );

    sendEmailJob.start();

    return cronName
  }
}
