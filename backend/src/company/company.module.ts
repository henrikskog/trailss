import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CompanyController } from "./company.controller";
import { CompanySchema } from "./company.model";
import { ComapnyService } from "./company.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: "company", schema: CompanySchema }])],
    providers: [ComapnyService],
    controllers: [CompanyController],
    exports: [ComapnyService]
  })
  export class CompanyModule {}