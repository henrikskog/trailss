import axios from 'axios';
import { z } from 'zod';

const TripSchema = z.object({
  date: z.string(),
  origin: z.string(),
  destination: z.string(),
  distance: z.number(),
  duration: z.number(),
  total_emissions: z.number(),
  car: z.optional(z.any()),
  carModel: z.optional(z.string()),
  carMake: z.optional(z.string()),
  carYear: z.optional(z.number()),
});

export type Trip = z.infer<typeof TripSchema>;

export const saveTripToDB = async (trip: Trip) => {
  console.log(trip)
  const URL = `${process.env.REACT_APP_API_ROOT}/trips`;
  return axios.post(`${URL}`, trip);
};

export const getTripsFromDB = async (): Promise<Trip[]> => {
  const URL = `${process.env.REACT_APP_API_ROOT}/trips`;
  const data = await axios.get(`${URL}`);

  return z.object({
    data: z.array(TripSchema)
  }).parse(data).data
};
