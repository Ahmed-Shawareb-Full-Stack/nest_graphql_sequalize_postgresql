import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { EmailScheduleDTO } from './dto/EmailSech.dto';
import { EmailSchedulingServiceService } from './email-scheduling-service/email-scheduling-service.service';
import { EmailDTO } from './dto/email.dto';
import { EmailProducerService } from './email-producer/email-producer.service';

@Resolver()
export class EmailResolver {
  constructor(
    private readonly emailSchedulingService: EmailSchedulingServiceService,
    private readonly emailProducer: EmailProducerService,
  ) {}
  @Mutation(() => String, { name: 'sendEmailAtTime' })
  sendEmailAtTime(@Args('emailOptions') emailOptions: EmailScheduleDTO) {
    return this.emailSchedulingService.scheduleEmail(emailOptions);
  }

  @Mutation(() => Int, { name: 'sendEmailByQueue' })
  async sendEmailByQueue(@Args('emailOptions') emailOptions: EmailDTO) {
    const job = await this.emailProducer.addSendEmailJobToQueue(emailOptions);
    return job.jobID
  }
}
