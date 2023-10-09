import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { EmailScheduleDTO } from './dto/EmailSech.dto';
import { EmailSchedulingServiceService } from './email-scheduling-service/email-scheduling-service.service';

@Resolver()
export class EmailResolver {
  constructor(
    private readonly emailSchedulingService: EmailSchedulingServiceService,
  ) {}
  @Mutation(() => String, { name: 'sendEmailAtTime' })
  sendEmail(@Args('emailOptions') emailOptions: EmailScheduleDTO) {
    return this.emailSchedulingService.scheduleEmail(emailOptions);
  }
}
