import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { EmailDTO } from '../dto/email.dto';

@Injectable()
export class EmailProducerService {
  constructor(@InjectQueue('sendEmail') private emailQueue: Queue) {}

  async addSendEmailJobToQueue(data: EmailDTO) {
    const job = await this.emailQueue.add('test-email', data);
    return {
      jobID: job.id,
    };
  }
}
