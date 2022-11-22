import { Test, TestingModule } from '@nestjs/testing';
import { CompanyRoutesController } from './company-routes.controller';
import { CompanyRoutesService } from './company-routes.service';

describe('CompanyRoutesController', () => {
  let controller: CompanyRoutesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyRoutesController],
      providers: [CompanyRoutesService],
    }).compile();

    controller = module.get<CompanyRoutesController>(CompanyRoutesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
