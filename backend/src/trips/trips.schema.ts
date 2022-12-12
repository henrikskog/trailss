import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
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
  duration: number;

  @Prop()
  date: Date;

  @Prop()
  passengers: number;

  @Prop()
  car: Vehicle;

  @Prop()
  total_emissions: number;

  @Prop()
  carModel?: string;

  @Prop()
  carMake?: string;

  @Prop()
  carYear?: number;

}

export const TripSchema = SchemaFactory.createForClass(Trip);

