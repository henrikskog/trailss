import mongoose from "mongoose";
import { CompanyVehicle } from "src/company-vehicles/company-vehicles.schema";

export class CreateCompanyRouteDto {
<<<<<<< HEAD
=======
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
>>>>>>> 06f53c6219b5ae572635dfd814b193202ff036c7
    from: string;
    to: string;
    distance: number;
    capacity: number;
    employee: number;
    date: Date;
    vehicle: CompanyVehicle;
    company: mongoose.Schema.Types.ObjectId;
}
