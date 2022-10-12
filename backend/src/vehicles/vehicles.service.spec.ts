import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesService } from './vehicles.service';

describe('VehiclesService', () => {
  let service: VehiclesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehiclesService],
    }).compile();

    service = module.get<VehiclesService>(VehiclesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Fetches fuel consuptions', () => {
    service.fetchFuelConsumption("Honda", "Civic", "2000")
    expect(service).toBe(27);
  });

  it('Correctly calculates emissions for Petrol', () => {
    const fuelConsumption = 5;
    const emissions = service.getEmissions("petrol", fuelConsumption);
    expect(emissions).toBe(119.6);
  });

  it('Correctly calculates emissions for Diesel', () => {
    const fuelConsumption = 5;
    const emissions = service.getEmissions("diesel", fuelConsumption);
    expect(emissions).toBe(119.6);
  });

  it('Correctly calculates emissions for LPG', () => {
    const fuelConsumption = 5;
    const emissions = service.getEmissions("LPG", fuelConsumption);
    expect(emissions).toBe(119.6);
  });
});
