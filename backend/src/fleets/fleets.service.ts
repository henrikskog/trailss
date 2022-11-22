import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateFleetDto } from './dto/create-fleet.dto';
import { UpdateFleetDto } from './dto/update-fleet.dto';
import { Fleet, FleetDocument } from './fleets.schema';

@Injectable()
export class FleetsService {
  constructor(
    @InjectModel(Fleet.name) private readonly fleetModel: Model<FleetDocument>,
  ) {}

  async create(company: any, createFleetDto: CreateFleetDto) {
    const vehicle = await this.fleetModel.create(createFleetDto);
    company.fleets.push(vehicle);
    company.save();
    return "Added a new fleet";
  }

  async findAll(company: any) {
    const fleets = await company.populate("fleets").then(p => p.fleets)
    return fleets;
  }

  async findOne(company: any, id: string) {
    const fleet = await company.populate("fleets", null, {_id : id}).then(p => p.fleets)
    if (!fleet) {
      throw new NotFoundException("No fleet with the given arguments was found");
    }
    return fleet[0];
  }

  async update(
    fleetIds: [mongoose.Schema.Types.ObjectId],
    id: string,
    updateCompanyVehicleDto: UpdateFleetDto
  ) {
    const fleet = fleetIds.filter((fleet) => fleet.toString() == id);

    if (!fleet)
      throw new NotFoundException("No car with the given id was found");

    await this.fleetModel.findByIdAndUpdate(fleet[0], updateCompanyVehicleDto);
    return "Fleet updated successfully";
  }

  async remove(user: any, id: string) {
    const fleet = user.fleets.filter((fleet) => fleet.toString() == id);

    if (!fleet) {
      throw new NotFoundException("No vehicle with the given id was found");
    }
    user.fleet.pull({ _id: fleet[0] });
    user.save();
    await this.fleetModel.findByIdAndDelete(fleet[0]);    

    return "Fleet removed successfully";
  }
}
