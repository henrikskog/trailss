import { Controller, Get, UseGuards, Request, Param } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth-guard.guard";
import { UserMetricsService } from "./user-metrics.service";

@ApiTags("User-metrics")
@Controller("user-metrics")
export class UsersMetricsController {
  constructor(private readonly usersMetricsService: UserMetricsService) {}

  @UseGuards(JwtAuthGuard)  
  @Get(':year/:month')
  @ApiBearerAuth()
  calculateStatsPerMonth(@Request() req: any, @Param("year") year: Date, @Param("month") month: Date) {
    return this.usersMetricsService.calculateStatsPerMonth(req.user, year, month);
  }

  @UseGuards(JwtAuthGuard)  
  @Get(':year/By Month')
  @ApiBearerAuth()
  calculateStatsPerYearByMonth(@Request() req: any, @Param("year") year: Date) {
    return this.usersMetricsService.calculateStatsPerYearByMonth(req.user, year)
  }@UseGuards(JwtAuthGuard)  
  @Get(':year/By Day')
  @ApiBearerAuth()
  calculateStatsPerYearByDay(@Request() req: any, @Param("year") year: Date) {
    return this.usersMetricsService.calculateStatsPerYearByDay(req.user, year)
  }
}