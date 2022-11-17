import { Trip } from "src/trips/trips.model";

export class CreateCompanyDto {
    name: string;
    password: string;
    email: string;
    fleet: number;
    subscription_start: Date;
    subscription_type: string;
    subscription: number;
    company_trips: [Trip]
}