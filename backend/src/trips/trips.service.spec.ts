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

  it('should return 43295,2', () => {
    expect(service.calculateTripEmissions(100,"petrol","Ferrari","F430",2008,18.1)).toBe('43295,2');
  });
  
  it('should return 15548', () => {
    expect(service.calculateTripEmissions(100,"petrol","Audi","A4",2015)).toBe('15548');
  });

  it('should return 21331.2', () => {
    expect(service.calculateTripEmissions(80,"diesel","Chevrolet","Suburban",2023, 10.1)).toBe('21331.2');
  });

  it('should return Exception', () => {
    expect(service.calculateTripEmissions(80,"diesel","","Suburban",2023)).toBe('21331.2');
  });

  it('should return Exception', () => {
    expect(service.calculateTripEmissions(80,"diesel","Chevrolet","",2023)).toBe('21331.2');
  });

  it('should return Exception', () => {
    expect(service.calculateTripEmissions(80,"diesel","Chevrolet","Suburban",0)).toBe('21331.2');
  });

});
