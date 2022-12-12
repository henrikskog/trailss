import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VehicleDocument = HydratedDocument<Vehicle>;

@Schema()
export class Vehicle {
  @Prop()
  name?: string;

  @Prop()
  type: string;

  @Prop()
  make: string;

  @Prop()
  model: string;

  @Prop()
  year: number;

  @Prop()
  emissions: number;

  @Prop()
  consumption: number;

  @Prop()
  capacity: number;

  @Prop()
  color: string;
  
  @Prop()
  licensePlate: string;
  
  @Prop()
  mileage: number;
  
  @Prop()
  status: string;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);