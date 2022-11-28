import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type companyRouteDocument = companyRoute & Document;

@Schema()
export class companyRoute {
  @Prop()
  origin: string;

  @Prop()
  destination: string;

  @Prop()
  distance: string;

  @Prop()
  emissions: number;
  
  @Prop()
  capacity: number;

  @Prop()
  employee: number;

  @Prop()
  date: Date;
}

export const CompanyRoutesSchema = SchemaFactory.createForClass(companyRoute);