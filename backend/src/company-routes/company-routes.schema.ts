import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type companyRouteDocument = companyRoute & Document;

@Schema()
export class companyRoute {
  @Prop()
  from: string;

  @Prop()
  to: string;

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