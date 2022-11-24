import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { FleetsService } from './fleets.service';
import { Fleet, FleetsSchema } from "./fleets.schema";
import { FleetsController } from './fleets.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Fleet.name, schema: FleetsSchema }])],
  controllers: [FleetsController],
  providers: [FleetsService],
  exports: [FleetsService, MongooseModule],
})
export class FleetsModule {}
