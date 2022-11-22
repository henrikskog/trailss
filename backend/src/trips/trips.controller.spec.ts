import { HttpService } from '@nestjs/axios';
import { Controller, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiTags } from '@nestjs/swagger';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { TripsController } from './trips.controller';
import { TripDocument } from './trips.schema';

describe('TripsController', () => {
  let controller: TripsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripsController],
      providers: [TripsService],
    }).compile();

    controller = module.get<TripsController>(TripsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

@ApiTags("Trip")
@Controller("trips")
export class TripsService {
  constructor(@InjectModel('vehicle') private readonly tripModel: Model<TripDocument>) {}

}
