import { PartialType } from '@nestjs/swagger';
import { CreateCompanyRouteDto } from './create-company-route.dto';

export class UpdateCompanyRouteDto extends PartialType(CreateCompanyRouteDto) {
    origin: string;  
    destination: string;  
    distance: string;  
    emissions: number;    
    capacity: number;  
    employee: number;  
    date: Date;
}
