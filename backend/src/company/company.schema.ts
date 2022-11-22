import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
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

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Fleets', default: []})
  fleets: Fleet[]

  @Prop()
  subscription_start: Date;

  @Prop()
  subscription_type: string;

  @Prop()
  subscription: number
  //TODO: create TripCompany and change the type
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Trip', default: []})
  company_trips: Trip[]
}

export const CompanySchema = SchemaFactory.createForClass(Company);