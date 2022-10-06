import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class VehiclesService {
    private vehicles: Vehicle[] = [{ id: 0, model: "volvo" }, { id: 1, model: "ford" }]

    findAll(model?: string) {
        if(model) {
            return this.vehicles.filter(vehicle => vehicle.model === model)
        }
        return this.vehicles;
    }

    findById(id: number) {
        return this.vehicles.filter(vehicle => vehicle.id === id)[0] || null
    }

    createVehicle(vehicle: CreateVehicleDto) {
        const newVehicle = { id: this.vehicles.length, model: vehicle.model }
        console.log(newVehicle)
        this.vehicles.push(newVehicle)

        return newVehicle;
    }
}
