import { Test, TestingModule } from '@nestjs/testing';
import { CompanyVehiclesService } from './company-vehicles.service';

describe('CompanyVehiclesService', () => {
  let service: CompanyVehiclesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyVehiclesService],
    }).compile();

    service = module.get<CompanyVehiclesService>(CompanyVehiclesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
