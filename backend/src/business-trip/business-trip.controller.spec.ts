import { Test, TestingModule } from '@nestjs/testing';
import { BusinessTripController } from './business-trip.controller';
import { BusinessTripService } from './business-trip.service';

describe('BusinessTripController', () => {
  let controller: BusinessTripController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessTripController],
      providers: [BusinessTripService],
    }).compile();

    controller = module.get<BusinessTripController>(BusinessTripController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
