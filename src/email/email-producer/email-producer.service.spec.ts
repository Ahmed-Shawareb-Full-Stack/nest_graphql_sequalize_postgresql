import { Test, TestingModule } from '@nestjs/testing';
import { EmailProducerService } from './email-producer.service';

describe('EmailProducerService', () => {
  let service: EmailProducerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailProducerService],
    }).compile();

    service = module.get<EmailProducerService>(EmailProducerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
