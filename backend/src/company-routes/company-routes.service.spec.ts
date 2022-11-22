import { Test, TestingModule } from '@nestjs/testing';
import { CompanyRoutesService } from './company-routes.service';

describe('CompanyRoutesService', () => {
  let service: CompanyRoutesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyRoutesService],
    }).compile();

    service = module.get<CompanyRoutesService>(CompanyRoutesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
