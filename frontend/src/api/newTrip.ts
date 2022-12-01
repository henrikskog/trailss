import axios from "axios";
import { z } from "zod";

const TripSchema = z.object({
  origin: z.string(),
  destination: z.string(),
  distance: z.number(),
  total_emissions: z.number(),
})

export type Trip = z.infer<typeof TripSchema>;

export const saveTripToDB = async (trip: Trip) => {
    const URL = `${process.env.REACT_APP_API_ROOT}/trips`
    return axios.post(`${URL}`, trip);
};

export const getTripsFromDB = async (): Promise<Trip[]> => {
    const URL = `${process.env.REACT_APP_API_ROOT}/trips`
    const data = await axios.get(`${URL}`);

    const result: Trip[] = []

    data.data.forEach((trip: unknown) => {
        const parsedTrip = TripSchema.safeParse(trip)
        if (parsedTrip.success) {
            result.push(parsedTrip.data)
        }
    })

    return result

    
}