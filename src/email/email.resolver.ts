import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { EmailScheduleDTO } from './dto/EmailSech.dto';
import { EmailSchedulingServiceService } from './email-scheduling-service/email-scheduling-service.service';
import { EmailDTO } from './dto/email.dto';
import { EmailProducerService } from './email-producer/email-producer.service';
import { I18nValidationExceptionFilter } from 'nestjs-i18n';
import { UseFilters, UsePipes } from '@nestjs/common';
import { CustomValidation } from 'src/pipes/custom-validation.pipe';

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

  // @UsePipes(new CustomValidation())
  @Mutation(() => String, { name: 'sendEmailByQueue' })
  async sendEmailByQueue(@Args('emailOptions') emailOptions: EmailDTO) {
    const job = await this.emailProducer.addSendEmailJobToQueue(emailOptions);
    return job.jobID.toString();
  }
}
