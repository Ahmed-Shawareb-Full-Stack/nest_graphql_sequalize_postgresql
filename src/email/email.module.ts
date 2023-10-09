import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailResolver } from './email.resolver';
import { EmailSchedulingServiceService } from './email-scheduling-service/email-scheduling-service.service';

@Module({
  providers: [EmailService, EmailResolver, EmailSchedulingServiceService],
  exports : [EmailService]
})
export class EmailModule {}
