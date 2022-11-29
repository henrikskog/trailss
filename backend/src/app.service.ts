import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { Model } from 'mongoose';
import { CompanyRoute, CompanyRouteDocument } from './company-routes/company-routes.schema';
import { CreateCompanyRouteDto } from './company-routes/dto/create-company-route.dto';
import { TemplateCompanyRoute } from './company-routes/dto/template-company-route.dto';
import { CompanyVehicle, CompanyVehicleDocument } from './company-vehicles/company-vehicles.schema';
import { Company, CompanyDocument } from './company/company.schema';
import { Fleet, FleetDocument } from './fleets/fleets.schema';


@Injectable()
export class AppService {
    constructor(
        @InjectModel(CompanyVehicle.name) private readonly companyVehicleModel: Model<CompanyVehicleDocument>,
        @InjectModel(CompanyRoute.name) private readonly companyRouteModel: Model<CompanyRouteDocument>,
        @InjectModel(Company.name) private readonly companyModel: Model<CompanyDocument>,
        @InjectModel(Fleet.name) private readonly fleetModel: Model<FleetDocument>,
    ) { }
    private readonly logger = new Logger(AppService.name);

/*     @Cron('1 * * * * *')
    async handleCron() {
        const currentDay = new Date().getDay()
        const vehicles = await this.companyVehicleModel.find()
        vehicles.forEach(async vehicle => {
            try {
                const fleetId = await this.fleetModel.find({ vehicles: { "$in": [vehicle._id] } })
                console.log(fleetId)
                const companyId = await this.companyModel.find({ fleets: { "$in": [fleetId[0]._id] } })

                vehicle.routes.forEach(route => {

                    //check if route is scheduled for today
                    if (route.frequency.indexOf(currentDay) != -1) {
                        const newRoute = {
                            to: route.to,
                            from: route.from,
                            distance: route.distance,
                            emissions: route.emissions,
                            capacity: route.capacity,
                            employee: route.employee,
                            date: route.date,
                            vehicle: vehicle,
                            company: companyId[0]._id
                        }
                        console.log(newRoute)

                        this.companyRouteModel.create(newRoute);
                    }
                    //create route instance


                    //create route
                }
                )
            } catch {

            }
        })
    }

    parseTemplateToObject(route: CreateCompanyRouteDto) {
        return route
    } */

}