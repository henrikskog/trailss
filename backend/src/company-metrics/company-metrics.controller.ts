import { Controller, Get, UseGuards, Request, Param } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth-guard.guard";
import { CompanyMetricsService } from "./company-metrics.service";

@ApiTags("Company-metrics")
@Controller("company-metrics")
export class CompanyMetricsController {
  constructor(private readonly companyMetricsService: CompanyMetricsService) {}

  @UseGuards(JwtAuthGuard)  
  @Get(':year/:month/Fleet')
  @ApiBearerAuth()
  calculateFleetStatsPerMonth(@Request() req: any, @Param("year") year: Date, @Param("month") month: Date) {
    return this.companyMetricsService.calculateFleetStatsPerMonth(req.user, year, month);
  }
 
  @Get(':year/Fleet')
  @ApiBearerAuth()
  calculateFleetStatsPerYear(@Request() req: any, @Param("year") year: Date) {
    return this.companyMetricsService.calculateFleetStatsPerYearByDay(req.user, year)
  }

  @UseGuards(JwtAuthGuard)  
  @Get(':year/:month/Business Trip')
  @ApiBearerAuth()
  calculateBusinessTripStatsPerMonth(@Request() req: any, @Param("year") year: Date, @Param("month") month: Date) {
    return this.companyMetricsService.calculateBusinessTripStatsPerMonth(req.user, year, month);
  }
 
  @Get(':year/Business Trip')
  @ApiBearerAuth()
  calculateBusinessTripStatsPerYear(@Request() req: any, @Param("year") year: Date) {
    return this.companyMetricsService.calculateBusinessTripStatsPerYearByDay(req.user, year)
  }
}