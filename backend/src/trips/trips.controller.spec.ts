import { HttpService } from '@nestjs/axios';
import { Controller, Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiTags } from '@nestjs/swagger';
import { Test, TestingModule } from '@nestjs/testing';
import exp from 'constants';
import { Model } from 'mongoose';
import mod from 'zod/lib';
import { TripsController } from './trips.controller';
import { TripDocument } from './trips.schema';
import { TripsService } from './trips.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('TripsController', () => {
  let controller: TripsController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [TripsController],
    })
    .useMocker((token) => {
        const result = 43295.2;
        if (token === TripsService) {
          return { calculateTripEmissions: jest.fn().mockResolvedValue(result) };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    controller = module.get<TripsController>(TripsController);
  });

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });      
  
  // describe('calculateTripEmissions', async () => {
  //   const result = 43295.2;
  //   jest.spyOn(service, 'calculateTripEmissions').mockImplementation(async () => result);

  //   expect(await service.calculateTripEmissions(100,"petrol","Ferrari","F430",2008,18.1)).toBe(result)
  // })
});
