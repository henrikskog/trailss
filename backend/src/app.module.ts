import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { VehiclesModule } from './vehicles/vehicles.module';
import { TripsModule } from './trips/trips.module';
import { CompanyModule } from './company/company.module';

const createMongoConnectionString = () => `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER_URL}/halla?retryWrites=true&w=majority`


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(createMongoConnectionString()),
    UsersModule,
    AuthModule,
    VehiclesModule,
    TripsModule,
    CompanyModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
