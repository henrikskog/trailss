import { Module } from "@nestjs/common";
import { CompanyMetricsController } from "./company-metrics.controller";
import { CompanyMetricsService } from "./company-metrics.service";

@Module({
  imports: [],
  providers: [CompanyMetricsService],
  controllers: [CompanyMetricsController],
  exports: [CompanyMetricsService]
})
export class CompanyMetricsModule { }