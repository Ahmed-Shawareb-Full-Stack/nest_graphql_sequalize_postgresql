import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailResolver } from './email.resolver';
import { EmailSchedulingServiceService } from './email-scheduling-service/email-scheduling-service.service';
import { EmailProducerService } from './email-producer/email-producer.service';
import { SendEmailProcessor } from './email.processor';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'sendEmail',
    }),
  ],
  providers: [
    EmailService,
    EmailResolver,
    EmailSchedulingServiceService,
    EmailProducerService,
    SendEmailProcessor,
  ],
  exports: [EmailService, SendEmailProcessor, EmailProducerService],
})
export class EmailModule {}
