import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { BusinessTrip } from 'src/business-trip/business-trip-vehicles.schema';
import { Fleet } from 'src/fleets/fleets.schema';
import { Trip } from 'src/trips/trips.schema';

export type CompanyDocument = Company & Document;

@Schema()
export class Company {
  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Fleet', default: []})
  fleets: Fleet[]

  @Prop()
  subscription_start: Date;

  @Prop()
  subscription_type: string;

  @Prop()
  subscription: number
  
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'BusinessTrip', default: []})
  business_trips: BusinessTrip[]
}

export const CompanySchema = SchemaFactory.createForClass(Company);