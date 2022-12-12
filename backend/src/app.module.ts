import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TripsModule } from './trips/trips.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { AuthCompanyModule } from './authCompany/auth-company.module';
import { CompanyRoutesModule } from './company-routes/company-routes.module';
import { CompanyVehiclesModule } from './company-vehicles/company-vehicles.module';
import { FleetsModule } from './fleets/fleets.module';import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { BusinessTripModule } from './business-trip/business-trip.module';


const createMongoConnectionString = () => `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER_URL}/halla?retryWrites=true&w=majority`


@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(createMongoConnectionString()),
    UsersModule,
    TripsModule,
    VehiclesModule,
    AuthModule,
    AuthCompanyModule,
    CompanyModule,
    FleetsModule,
    CompanyVehiclesModule,
    CompanyRoutesModule,
    BusinessTripModule

  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
