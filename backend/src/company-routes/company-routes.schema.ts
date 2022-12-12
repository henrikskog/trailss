import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { CompanyVehicle } from 'src/company-vehicles/company-vehicles.schema';
import { SummaryCompanyVehicleDto } from 'src/company-vehicles/dto/summary-company-vehicle.dto';
import { Company } from 'src/company/company.schema';

export type CompanyRouteDocument = CompanyRoute & Document;

@Schema()
export class CompanyRoute {
  @Prop()
  origin: string;

  @Prop()
  destination: string;

  @Prop()
  distance: number;

  @Prop()
  emissions: number;
  
  @Prop()
  capacity: number;

  @Prop()
  employee: string;

  @Prop()
  date: Date;

  @Prop()
  vehicle: SummaryCompanyVehicleDto;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Company'})
  company: Company;
}

export const CompanyRoutesSchema = SchemaFactory.createForClass(CompanyRoute);