import { ApiProperty } from "@nestjs/swagger"
import {z} from 'zod'

export const vehicleFuelSchema = z.literal("diesel").or(z.literal("petrol")).or(z.literal("LPG"));
export type VehicleFuelType = z.infer<typeof vehicleFuelSchema>;


export class Vehicle {
    @ApiProperty()
    id: number

    @ApiProperty()
    make: string

    @ApiProperty()
    model: string

    @ApiProperty()
    year: number;

    @ApiProperty()
    consumptions?: number;

    @ApiProperty()
    fuelType?: VehicleFuelType;

    @ApiProperty()
    personalName?: string

}