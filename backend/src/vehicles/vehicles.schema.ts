import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type VehicleDocument = Vehicle & Document;

@Schema()
export class Vehicle {
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
  capacity: number;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);