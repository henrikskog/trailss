import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CompanyVehicle, CompanyVehicleDocument } from './company-vehicles.schema';
import { CreateCompanyVehicleDto } from './dto/create-company-vehicle.dto';
import { UpdateCompanyVehicleDto } from './dto/update-company-vehicle.dto';

@Injectable()
export class CompanyVehiclesService {
  constructor(
    @InjectModel(CompanyVehicle.name) private readonly companyVehicleModel: Model<CompanyVehicleDocument>,
  ) {}

  async ownsVehicle(company: any, id: string) {
    const vehicle = await company.populate("fleets").then(p => p.fleets.populate("vehicles", null, {_id : id}).then(p => p.vehicles))
  }

  async create(fleet: any, createCompanyVehicleDto: CreateCompanyVehicleDto) {
    const vehicle = await this.companyVehicleModel.create(createCompanyVehicleDto);
    fleet.vehicles.push(vehicle);
    fleet.save();
    return "Added a new vehicle to the fleet";
  }

  async findAll(fleet: any) {
    const vehicles = await fleet.populate("vehicles").then(p => p.vehicles)
    return vehicles;
  }

  async findOne(fleet: any, id: string) {
    const vehicle = await fleet.populate("vehicles", null, {_id : id}).then(p => p.vehicles)
    if (!vehicle) {
      throw new NotFoundException("No car with the given arguments was found");
    }
    return vehicle[0];
  }

  async update(
    fleetIds: [mongoose.Schema.Types.ObjectId],
    id: string,
    updateCompanyVehicleDto: UpdateCompanyVehicleDto
  ) {
    const vehicle = fleetIds.filter((vehicle) => vehicle.toString() == id);

    if (!vehicle)
      throw new NotFoundException("No car with the given id was found");

    await this.companyVehicleModel.findByIdAndUpdate(vehicle[0], updateCompanyVehicleDto);
    return "Vehicle updated successfully";
  }

  async remove(user: any, id: string) {
    const vehicle = user.vehicles.filter((vehicle) => vehicle.toString() == id);

    if (!vehicle) {
      throw new NotFoundException("No vehicle with the given id was found");
    }
    user.vehicles.pull({ _id: vehicle[0] });
    user.save();
    await this.companyVehicleModel.findByIdAndDelete(vehicle[0]);    

    return "Vehicle removed successfully";
  }
}