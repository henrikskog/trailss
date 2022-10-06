import { ApiProperty } from "@nestjs/swagger"

export class Vehicle {
    @ApiProperty()
    id: number

    @ApiProperty()
    model: string
}