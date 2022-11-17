import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CompanyController } from "./company.controller";
import { CompanySchema } from "./company.schema";
import { CompanyService } from "./company.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: "company", schema: CompanySchema }])],
    providers: [CompanyService],
    controllers: [CompanyController],
    exports: [CompanyService]
  })
  export class CompanyModule {}