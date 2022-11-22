import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { CompanyRoutesService } from './company-routes.service';
import { CompanyRoutesController } from './company-routes.controller';
import { CompanyRoutesSchema } from './company-routes.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: "companyRoutes", schema: CompanyRoutesSchema }])],
  controllers: [CompanyRoutesController],
  providers: [CompanyRoutesService],
  exports: [CompanyRoutesService, MongooseModule],
})
export class CompanyRoutesModule {}
