import { Test, TestingModule } from '@nestjs/testing';
import { TripsService } from './trips.service';

describe('TripsService', () => {
  let service: TripsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TripsService],
    }).compile();

    service = module.get<TripsService>(TripsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return x,x', () => {
    expect(service.calculateTripEmissions(20,"diesel","","",2000)).toBe('x,x');
  });

  it('should return x,x', () => {
    expect(service.calculateTripEmissions(20,"diesel","","",2000,5)).toBe('x,x');
  });

});
