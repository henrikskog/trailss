import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Vehicle } from 'src/vehicles/vehicles.schema';

export type TripDocument = HydratedDocument<Trip>;

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
  emissions: number;

  @Prop()
  carModel?: string;

  @Prop()
  carMake?: string;

  @Prop()
  carYear?: number;

}

export const TripSchema = SchemaFactory.createForClass(Trip);

