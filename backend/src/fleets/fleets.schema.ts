import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { CompanyVehicle } from 'src/company-vehicles/company-vehicles.schema';

export type FleetDocument = Fleet & Document;

@Schema()
export class Fleet {
  @Prop({required: true})
  name: string;

  @Prop({default: true})
  active: boolean;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'CompanyVehicle', default: []})
  vehicles: CompanyVehicle[]

}

export const FleetsSchema = SchemaFactory.createForClass(Fleet);