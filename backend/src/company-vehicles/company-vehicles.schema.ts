import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { TemplateCompanyRoute } from 'src/company-routes/dto/template-company-route.dto';

export type CompanyVehicleDocument = CompanyVehicle & Document;

@Schema()
export class CompanyVehicle {
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
  capacity: number;

  @Prop()
  routes: TemplateCompanyRoute[];

}

export const CompanyVehiclesSchema = SchemaFactory.createForClass(CompanyVehicle);