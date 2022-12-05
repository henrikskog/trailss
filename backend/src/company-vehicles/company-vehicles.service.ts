import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TripsService, vehicleFuelSchema } from 'src/trips/trips.service';
import { CompanyVehicle, CompanyVehicleDocument } from './company-vehicles.schema';
import { CreateCompanyVehicleDto } from './dto/create-company-vehicle.dto';
import { UpdateCompanyVehicleDto } from './dto/update-company-vehicle.dto';

@Injectable()
export class CompanyVehiclesService {
  constructor(
    @InjectModel(CompanyVehicle.name) private readonly companyVehicleModel: Model<CompanyVehicleDocument>,
    private readonly tripsService: TripsService
  ) { }

  async getFleet(company: any, id: string) {
    try {
      const fleet = await company.populate("fleets", null, { _id: id }).then(p => p.fleets)
      if (!fleet.length) {
        throw new NotFoundException("No fleet with the given id was found");
      }
      return fleet[0]
    } catch {
      throw new NotFoundException("No fleet with the given arguments was found");
    }
  }

  async calculateTotalEmissions(vehicle: CreateCompanyVehicleDto | UpdateCompanyVehicleDto) {
    for (let index = 0; index < vehicle.routes.length; index++) {
      //parse the fuel type to enum
      const fuelType = vehicleFuelSchema.safeParse(vehicle.type);

      // Fuel types are restricted, therefore validate value
      if (!fuelType.success) {
        throw new BadRequestException("Illegal value given for fuel type");
      }

      // Calculate the emissions
      const emissions = await this.tripsService.calculateTripEmissions(
        fuelType.data,
        vehicle.make,
        vehicle.model,
        vehicle.year,
        vehicle.consumption
      )
      // Add the emissions to the vehicle
      vehicle.emissions = emissions;
      return vehicle;
    }

  }

  async create(company: any, fleetId: string, createCompanyVehicleDto: CreateCompanyVehicleDto) {
    const fleet = await this.getFleet(company, fleetId)

    //calculate the emissions of a vehicle
    const completedVehicle = await this.calculateTotalEmissions(createCompanyVehicleDto);

    //la matraca buena
    const vehicle = await this.companyVehicleModel.create(completedVehicle);
    fleet.vehicles.push(vehicle);
    fleet.save();
    return "Added a new vehicle to the fleet";
  }

  async findAll(company: any, fleetId: string) {
    const fleet = await this.getFleet(company, fleetId)
    const vehicles = await fleet.populate("vehicles").then(p => p.vehicles)
    return vehicles;
  }

  async findOne(company: any, fleetId: string, id: string) {
    const fleet = await this.getFleet(company, fleetId)
    try {
      const vehicle = await fleet.populate("vehicles", null, { _id: id }).then(p => p.vehicles)
      if (!vehicle.length) {
        throw new NotFoundException("No car with the given arguments was found");
      }
      return vehicle[0];
    } catch {
      throw new NotFoundException("No car with the given arguments was found");
    }

  }

  async update(
    company: any,
    fleetId: string,
    id: string,
    updateCompanyVehicleDto: UpdateCompanyVehicleDto
  ) {
    const fleet = await this.getFleet(company, fleetId)
    try {
      const vehicle = fleet.vehicles.filter((vehicle) => vehicle.toString() == id);

      if (!vehicle.length) {
        throw new NotFoundException("No car with the given id was found");
      }
      updateCompanyVehicleDto = await this.calculateTotalEmissions(updateCompanyVehicleDto);
      await this.companyVehicleModel.findByIdAndUpdate(vehicle[0], updateCompanyVehicleDto);
      return "Vehicle updated successfully";
    } catch {
      throw new NotFoundException("No car with the given arguments was found");
    }
  }

  async remove(company: any, fleetId: string, id: string) {
    const fleet = await this.getFleet(company, fleetId)
    try {
      const vehicle = fleet.vehicles.filter((vehicle) => vehicle.toString() == id);

      if (!vehicle.length) {
        throw new NotFoundException("No vehicle with the given id was found");
      }
      fleet.vehicles.pull({ _id: vehicle[0] });
      fleet.save();
      await this.companyVehicleModel.findByIdAndDelete(vehicle[0]);

      return "Vehicle removed successfully";
    } catch {
      throw new NotFoundException("No car with the given arguments was found");
    }
  }
}