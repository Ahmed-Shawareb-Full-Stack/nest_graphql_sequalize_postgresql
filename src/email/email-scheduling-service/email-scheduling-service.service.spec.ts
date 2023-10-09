import { Test, TestingModule } from '@nestjs/testing';
import { EmailSchedulingServiceService } from './email-scheduling-service.service';

describe('EmailSchedulingServiceService', () => {
  let service: EmailSchedulingServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailSchedulingServiceService],
    }).compile();

    service = module.get<EmailSchedulingServiceService>(EmailSchedulingServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
