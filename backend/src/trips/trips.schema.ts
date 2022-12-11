import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Vehicle } from 'src/vehicles/vehicles.schema';
import { z } from 'zod';

export type TripDocument = HydratedDocument<Trip>;

export const vehicleFuelSchema = z
  .literal("diesel")
  .or(z.literal("petrol"))
  .or(z.literal("LPG"));
export type VehicleFuelType = z.infer<typeof vehicleFuelSchema>;


@Schema()
export class Trip {
  @Prop()
  origin: string;

  @Prop()
  destination: string;

  @Prop()
  distance: number;

  @Prop()
  total_emissions: number;

  @Prop()
  date: Date;

  @Prop()
  passengers: number;

  @Prop()
  vehicle: Vehicle;

}

export const TripSchema = SchemaFactory.createForClass(Trip);

