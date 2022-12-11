import { Module } from "@nestjs/common";
import { UsersMetricsController } from "./user-metrics.controller";
import { UserMetricsService } from "./user-metrics.service";

@Module({
  imports: [],
  providers: [UserMetricsService],
  controllers: [UsersMetricsController],
  exports: [UserMetricsService]
})
export class UserMetricsModule { }