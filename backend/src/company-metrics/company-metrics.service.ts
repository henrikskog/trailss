import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class CompanyMetricsService {
    constructor() { }

    async getAllFleetTrips(company: any) {
        const trips = await company.populate("fleets").then((p) => p.trips);
        if (!trips.length) {
            throw new NotFoundException("No trips yet");
        }
        return trips
    }

    async getAllBusinessTrips(company: any) {
        const trips = await company.populate("businesstrips").then((p) => p.trips);
        if (!trips.length) {
            throw new NotFoundException("No trips yet");
        }
        return trips
    }

    async getMonthFleetTrips(company: any, year, month: number) {
        const trips = await this.getAllFleetTrips(company)
        let monthTrips = []
        trips.forEach(trip => {
            if (trip.date.getMonth() == month && trip.date.getFullYear() == year) {
                monthTrips.push(trip)
            }
        });
        if (!monthTrips.length) {
            throw new NotFoundException("No trips yet at this month");
        }
        return monthTrips
    }

    async getYearFleetTrips(company: any, year: number) {
        const trips = await this.getAllFleetTrips(company)
        let yearTrips = []

        trips.forEach(trip => {
            if (trip.date.getFullYear() == year) {
                yearTrips.push(trip)
            }
        });
        if (!yearTrips.length) {
            throw new NotFoundException("No trips yet at this year");
        }
        return yearTrips
    }

    async getMonthBusinessTrips(company: any, year, month: number) {
        const trips = await this.getAllBusinessTrips(company)
        let monthTrips = []
        trips.forEach(trip => {
            if (trip.date.getMonth() == month && trip.date.getFullYear() == year) {
                monthTrips.push(trip)
            }
        });
        if (!monthTrips.length) {
            throw new NotFoundException("No trips yet at this month");
        }
        return monthTrips
    }

    async getYearBusinessTrips(company: any, year: number) {
        const trips = await this.getAllBusinessTrips(company)
        let yearTrips = []

        trips.forEach(trip => {
            if (trip.date.getFullYear() == year) {
                yearTrips.push(trip)
            }
        });
        if (!yearTrips.length) {
            throw new NotFoundException("No trips yet at this year");
        }
        return yearTrips
    }

    async calculateFleetStatsPerMonth(company: any, yearSelected: Date, monthSelected: Date) {
        const emissionsMonth = []
        const year = new Date(yearSelected).getFullYear()
        const month = new Date(monthSelected).getMonth()
        const monthTrips = await this.getMonthFleetTrips(company, year, month)


        monthTrips.forEach(trip => {
            const tripVehicles = trip.vehicles;
            const tripName = trip.name
            tripVehicles.forEach(tripVehicle => {
                const tripEmissions = tripVehicle.total_emissions;
                emissionsMonth.push({ tripName, tripVehicle, tripEmissions })
            });
        });
        return emissionsMonth;
    }

    async calculateFleetStatsPerYearByDay(company: any, yearSelected: Date) {
        const emissionsYear = []
        const year = new Date(yearSelected).getFullYear()
        const yearTrips = await this.getYearFleetTrips(company, year)

        yearTrips.forEach(trip => {
            const tripVehicles = trip.vehicles;
            const tripName = trip.name
            tripVehicles.forEach(tripVehicle => {
                const tripEmissions = tripVehicle.total_emissions;
                emissionsYear.push({ tripName, tripVehicle, tripEmissions })
            });
        });
    }

    async calculateBusinessTripStatsPerMonth(company: any, yearSelected: Date, monthSelected: Date) {
        const emissionsMonth = []
        const year = new Date(yearSelected).getFullYear()
        const month = new Date(monthSelected).getMonth()
        const monthTrips = await this.getMonthBusinessTrips(company, year, month)


        monthTrips.forEach(trip => {
            const tripVehicles = trip.vehicles;
            const tripName = trip.name
            const tripDay = trip.date.getDate()
            tripVehicles.forEach(tripVehicle => {
                const tripEmissions = tripVehicle.total_emissions;
                emissionsMonth.push({ tripName, tripDay, tripVehicle, tripEmissions })
            });
        });
        return emissionsMonth;
    }

    async calculateBusinessTripStatsPerYearByDay(company: any, yearSelected: Date) {
        const emissionsYear = []
        const year = new Date(yearSelected).getFullYear()
        const yearTrips = await this.getYearBusinessTrips(company, year)

        yearTrips.forEach(trip => {
            const tripVehicles = trip.vehicles;
            const tripName = trip.name
            const tripDay = trip.date.getDate();
            const tripMonth = trip.date.getMonth();
            tripVehicles.forEach(tripVehicle => {
                const tripEmissions = tripVehicle.total_emissions;
                emissionsYear.push({ tripName, tripDay, tripMonth, tripVehicle, tripEmissions })
            });
        });
    }
}
