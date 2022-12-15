import axios from 'axios';
import { z } from 'zod';

const UserVehicleSchema = z.object({
  _id: z.optional(z.string()),
  name: z.string(),
  make: z.string(),
  model: z.string(),
  year: z.number(),
  color: z.optional(z.string()),
  licensePlate: z.optional(z.string()),
  mileage: z.optional(z.number()),
  status: z.optional(z.string()),
});

export type UserVehicle = z.infer<typeof UserVehicleSchema>;


export const getAllUserVehicles = async (): Promise<UserVehicle[]> => {
  const response = await axios.get(`${process.env.REACT_APP_API_ROOT}/vehicles/`);
  const responseData = z.array(z.any()).parse(response.data);

  const result = responseData.filter((car) => {
    const parsedCar = UserVehicleSchema.safeParse(car);
    if(parsedCar.success) {
      return true;
    }
    console.error("Recieved a car from the backend with unexpected properties: ", parsedCar.error);
    return false
  })

  return result;
};
