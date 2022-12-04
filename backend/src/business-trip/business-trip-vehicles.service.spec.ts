import { Test, TestingModule } from '@nestjs/testing';
import { BusinessTripService } from './business-trip.service';

describe('BusinessTripVehiclesService', () => {
  let service: BusinessTripService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessTripService],
    }).compile();

    service = module.get<BusinessTripService>(BusinessTripService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
