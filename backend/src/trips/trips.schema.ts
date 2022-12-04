import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Vehicle } from 'src/vehicles/vehicles.schema';

export type TripDocument = HydratedDocument<Trip>;

@Schema()
export class Trip {
  @Prop()
  from: string;

  @Prop()
  to: string;

  @Prop()
  distance: number;

  @Prop()
  date: Date;

  @Prop()
  passengers: number;

  @Prop()
  vehicle: Vehicle;

}

export const TripSchema = SchemaFactory.createForClass(Trip);

