import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type VehicleDocument = Vehicle & Document;

@Schema()
export class Vehicle {
  @Prop()
  type: string;

  @Prop()
  brand: string;

  @Prop()
  model: string;

  @Prop()
  emissions: number;

  @Prop()
  capacity: number;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);