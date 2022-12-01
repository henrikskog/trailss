import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { CompanyRoutesService } from './company-routes.service';
import { CompanyRoutesController } from './company-routes.controller';
import { CompanyRoute, CompanyRoutesSchema } from './company-routes.schema';
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports: [CompanyModule, MongooseModule.forFeature([{ name: CompanyRoute.name, schema: CompanyRoutesSchema }])],
  controllers: [CompanyRoutesController],
  providers: [CompanyRoutesService],
  exports: [CompanyRoutesService, MongooseModule],
})
export class CompanyRoutesModule {}
