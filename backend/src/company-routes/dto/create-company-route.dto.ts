import mongoose from "mongoose";
import { CompanyVehicle } from "src/company-vehicles/company-vehicles.schema";

export class CreateCompanyRouteDto {
    constructor(
        from: string,
        to: string,
        distance: string,
        emissions: number,
        capacity: number,
        employee: number,
        date: Date,
        vehicle: CompanyVehicle,
        company: mongoose.Schema.Types.ObjectId
    ) {
        from = from,
        to = to,
        distance = distance,
        emissions = emissions,
        capacity = capacity,
        employee = employee,
        date = date,
        vehicle = vehicle,
        company = company
    }
    from: string;
    to: string;
    distance: string;
    emissions: number;
    capacity: number;
    employee: number;
    date: Date;
    vehicle: CompanyVehicle;
    company: mongoose.Schema.Types.ObjectId;
}
