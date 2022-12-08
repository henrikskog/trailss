import axios from 'axios';
import { z } from 'zod';

type Props = {
  distance: number;
  fuelType: string;
  carMake: string;
  carModel: string;
  carModelYear: number;
};

export const getEmissions = async ({
  distance,
  fuelType,
  carMake,
  carModel,
  carModelYear,
}: Props): Promise<any> => {
  const data = await axios.get(
    `http://localhost:5000/trips/calculate?distance=${distance}&fuel-type=${fuelType}&car-make=${carMake}&car-model=${carModel}&car-model-year=${carModelYear}`
  );

  return z.object({ data: z.number() }).parse(data).data;
};
