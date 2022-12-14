import { HttpService } from "@nestjs/axios";
import {
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { lastValueFrom } from "rxjs";
import { VehicleFuelType } from "src/trips/trips.service";
import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";
import { Vehicle, VehicleDocument } from "./vehicles.schema";

@Injectable()
export class VehiclesService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(Vehicle.name) private readonly vehicleModel: Model<VehicleDocument>,
  ) {}

  async create(user: any, createVehicleDto: CreateVehicleDto) {
    const vehicle = await this.vehicleModel.create(createVehicleDto);
    user.vehicles.push(vehicle);
    user.save();
    return vehicle
  }

  async findAll(user: any) {
    const vehicles = await user.populate("vehicles").then(p => p.vehicles)
    return vehicles;
  }

  async findOne(user: any, id: string) {
    const vehicle = await user.populate("vehicles", null, {_id : id}).then(p => p.vehicles)
    if (!vehicle.length) {
      throw new NotFoundException("No car with the given arguments was found");
    }
    return vehicle[0];
  }

  async update(
    vehicleIds: [mongoose.Schema.Types.ObjectId],
    id: string,
    updateVehicleDto: UpdateVehicleDto
  ) {
    const vehicle = vehicleIds.filter((vehicle) => vehicle.toString() == id);

    if (!vehicle.length)
      throw new NotFoundException("No car with the given id was found");

    const updatedVehicle = await this.vehicleModel.findByIdAndUpdate(vehicle[0], updateVehicleDto);
    return updatedVehicle
  }

  async remove(user: any, id: string) {
    const vehicle = user.vehicles.filter((vehicle) => vehicle.toString() == id);

    if (!vehicle.length) {
      throw new NotFoundException("No vehicle with the given id was found");
    }
    user.vehicles.pull({ _id: vehicle[0] });
    user.save();
    const removedVehicle = await this.vehicleModel.findByIdAndDelete(vehicle[0]);    

    return removedVehicle;
  }

  /**
   * Fetch the fuel consumption for a given car
   * Note: Gives the consumptions for the car with the minimum consumption should the API return multiple models
   * Uses API: https://www.fueleconomy.gov/feg/ws/
   * @param make
   * @param model
   */
  async fetchFuelConsumption(
    make: string,
    model: string,
    year: number
  ): Promise<number> {
    const apiRoot = "https://www.fueleconomy.gov/";

    const carsUrl = `ws/rest/vehicle/menu/options?year=${year}&make=${make}&model=${model}`;

    const carsResponse = this.httpService.get(apiRoot + carsUrl);
    const cars = await lastValueFrom(carsResponse);

    const vehicleId = cars.data?.menuItem[0]?.value;

    if (!vehicleId) {
      throw new NotFoundException("No car with the given arguments was found");
    }

    const carInfoUrl = `ws/rest/vehicle/${vehicleId}`;

    const promiseId = this.httpService.get(apiRoot + carInfoUrl);
    const car = await lastValueFrom(promiseId);

    const emissions = car.data?.comb08;

    if (!emissions) {
      throw new NotFoundException(
        "There was an error handling data from the CAR API"
      );
    }

    return Number(emissions);
  }

  /**
   * Get the CO2 emmisions
   * @param fuelType Type of fuel
   * @param consumption The average fuel consumption per 100km
   * @returns Grams of CO2 emitted per km
   */
  getEmissions(fuelType: VehicleFuelType, consumption: number) {
    //         Diesel:
    //         1 liter of diesel weighs 835 grammes. Diesel consist for 86,2% of carbon, or 720 grammes of carbon per liter diesel. In order to combust this carbon to CO2, 1920 grammes of oxygen is needed. The sum is then 720 + 1920 = 2640 grammes of CO2/liter diesel.
    //         An average consumption of 5 liters/100 km then corresponds to 5 l x 2640 g/l / 100 (per km) = 132 g CO2/km.
    if (fuelType === "diesel") return (consumption * 2640) / 100;

    //         Petrol:
    //         1 liter of petrol weighs 750 grammes. Petrol consists for 87% of carbon, or 652 grammes of carbon per liter of petrol. In order to combust this carbon to CO2, 1740 grammes of oxygen is needed. The sum is then 652 + 1740 = 2392 grammes of CO2/liter of petrol.
    //         An average consumption of 5 liters/100 km then corresponds to 5 l x 2392 g/l / 100 (per km) = 120 g CO2/km.
    if (fuelType === "petrol") return (consumption * 2392) / 100;

    //         LPG:
    //         1 liter of LPG weighs 550 grammes. LPG consists for 82,5% of carbon, or 454 grammes of carbon per liter of LPG. In order to combust this carbon to CO2, 1211 grammes of oxygen is needed. The sum is then 454 + 1211 = 1665 grammes of CO2/liter of LPG.
    //         An average consumption of 5 liters / 100 km then corresponds to 5 l x 1665 g/l / 100 (per km) = 83 g of CO2/km.
    if (fuelType === "LPG") return (consumption * 1665) / 100;
  }
}
