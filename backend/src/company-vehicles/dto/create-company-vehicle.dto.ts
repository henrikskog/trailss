import { TemplateCompanyRoute } from "src/company-routes/dto/template-company-route.dto";

export class CreateCompanyVehicleDto{
    type: string;
    brand: string;
    model: string;
    emissions: number;
    consumption: number;
    capacity: number;
    routes: TemplateCompanyRoute[];
}
