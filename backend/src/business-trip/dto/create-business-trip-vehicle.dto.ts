import { TemplateCompanyRoute } from "src/company-routes/dto/template-company-route.dto";

export class CreateBusinessTripVehicleDto{
    type: string;
    brand: string;
    model: string;
    emissions: number;
    consumption: number;
    year: number;
    route: TemplateCompanyRoute;
    passengers: string[];
}