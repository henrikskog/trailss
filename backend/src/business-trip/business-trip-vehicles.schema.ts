import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { TemplateCompanyRoute } from 'src/company-routes/dto/template-company-route.dto';

export type BusinessTripVehicleDocument = BusinessTripVehicle & Document;
export type BusinessTripDocument = BusinessTrip & Document;

@Schema()
export class BusinessTrip {
  @Prop()
  name: string;

  @Prop()
  date: Date;

  @Prop()
  description: string;

  @Prop()
  vehicles: BusinessTripVehicle[];
}

@Schema()
export class BusinessTripVehicle {
  @Prop()
  type: string;

  @Prop()
  brand: string;

  @Prop()
  model: string;

  @Prop()
  emissions: number;
  
  @Prop()
  consumption: number;

  @Prop()
  routes: TemplateCompanyRoute;

  @Prop()
  passengers: string[];

}

export const BusinessTripVehiclesSchema = SchemaFactory.createForClass(BusinessTripVehicle);
export const BusinessTripSchema = SchemaFactory.createForClass(BusinessTrip);