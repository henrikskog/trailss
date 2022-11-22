import { Test, TestingModule } from '@nestjs/testing';
import { CompanyVehiclesController } from './company-vehicles.controller';
import { CompanyVehiclesService } from './company-vehicles.service';

describe('CompanyVehiclesController', () => {
  let controller: CompanyVehiclesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyVehiclesController],
      providers: [CompanyVehiclesService],
    }).compile();

    controller = module.get<CompanyVehiclesController>(CompanyVehiclesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
