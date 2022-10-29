import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Vehicle } from 'src/vehicles/vehicles.schema';

export type TripDocument = Trip & Document;

@Schema()
export class Trip {
  @Prop()
  from: string;

  @Prop()
  to: string;

  @Prop()
  distance: number;

  @Prop()
  total_emissions: number;

  @Prop()
  date: Date;

  @Prop()
  passengers: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' })
  vehicle: Vehicle;

}

export const TripSchema = SchemaFactory.createForClass(Trip);