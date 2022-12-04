import { PartialType } from '@nestjs/swagger';
import { CreateCompanyRouteDto } from './create-company-route.dto';

export class UpdateCompanyRouteDto extends PartialType(CreateCompanyRouteDto) {
    from: string;  
    to: string;  
    distance: number;  
    emissions: number;    
    capacity: number;  
    employee: number;  
    date: Date;
}
