import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { CompanyVehiclesService } from './company-vehicles.service';
import { CompanyVehiclesController } from './company-vehicles.controller';
import { CompanyVehiclesSchema } from './company-vehicles.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: "companyFleets", schema: CompanyVehiclesSchema }])],
  controllers: [CompanyVehiclesController],
  providers: [CompanyVehiclesService],
  exports: [CompanyVehiclesService, MongooseModule],
})
export class CompanyVehiclesModule {}
