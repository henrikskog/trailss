import { TemplateCompanyRoute } from "src/company-routes/dto/template-company-route.dto";

export class CreateCompanyVehicleDto{
    type: string;
    make: string;
    model: string;
    year: number;
    emissions: number;
    consumption: number;
    capacity: number;
    routes: TemplateCompanyRoute[];
}
