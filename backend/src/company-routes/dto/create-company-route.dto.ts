import mongoose from "mongoose";
import { CompanyVehicle } from "src/company-vehicles/company-vehicles.schema";

export class CreateCompanyRouteDto {
    from: string;
    to: string;
    distance: number;
    emissions: number;
    capacity: number;
    employee: number;
    date: Date;
    vehicle: CompanyVehicle;
    company: mongoose.Schema.Types.ObjectId;
}
