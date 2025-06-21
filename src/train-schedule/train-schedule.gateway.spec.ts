import { Test, TestingModule } from '@nestjs/testing';
import { TrainScheduleGateway } from './train-schedule.gateway';

describe('TrainScheduleGateway', () => {
  let gateway: TrainScheduleGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainScheduleGateway],
    }).compile();

    gateway = module.get<TrainScheduleGateway>(TrainScheduleGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
