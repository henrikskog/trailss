import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { CompanyVehicle } from 'src/company-vehicles/company-vehicles.schema';

export type FleetDocument = Fleet & Document;

@Schema()
export class Fleet {
  @Prop()
  name: string;

  @Prop()
  active: boolean;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'VehiclesCompany', default: []})
  vehicles: CompanyVehicle[]

}

export const FleetsSchema = SchemaFactory.createForClass(Fleet);