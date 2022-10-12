import { ApiProperty } from "@nestjs/swagger"

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
    personalName?: string

}