import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class UserMetricsService {
    constructor() { }

    async getAllTrips(user: any) {
        const trips = await user.populate("trips").then((p) => p.trips);
        if (!trips.length) {
            throw new NotFoundException("No trips yet");
        }
        return trips
    }

    async getMonthTrips(user: any, year, month: number) {
        const trips = await this.getAllTrips(user)
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

    async getYearTrips(user: any, year: number) {
        const trips = await this.getAllTrips(user)
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

    async calculateStatsPerMonth(user: any, yearSelected: Date, monthSelected: Date) {
        const emissionsMonth = []
        const year = new Date(yearSelected).getFullYear()
        const month = new Date(monthSelected).getMonth()
        const monthTrips = await this.getMonthTrips(user, year, month)
        

        monthTrips.forEach(trip => {
            const tripEmissions = trip.total_emissions;
            const tripDay = trip.date.getDate()
            emissionsMonth.push({tripDay, tripEmissions})
        });
        console.log(year)
        console.log(emissionsMonth)
        return emissionsMonth;
    }

    async calculateStatsPerYearByDay(user: any, yearSelected: Date) {
        const emissionsYear = []
        const year = new Date(yearSelected).getFullYear()
        const yearTrips = await this.getYearTrips(user, year)

        yearTrips.forEach(trip => {
            const tripEmissions = trip.total_emissions;
            const tripDay = trip.date.getDate();
            const tripMonth = trip.date.getMonth();
            emissionsYear.push({tripDay, tripMonth, tripEmissions})
        });
    }
}
