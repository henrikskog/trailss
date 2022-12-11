import axios from 'axios';
import { z } from 'zod';

interface Props {
  distance: number;
  fuelType: string;

  carMake?: string;
  carModel?: string;
  carModelYear?: number;
  consumptions?: number;
}

export const getEmissions = async ({
  distance,
  fuelType,
  carMake,
  carModel,
  carModelYear,
  consumptions,
}: Props): Promise<number> => {
  let data;

  if (carMake && carModel && carModelYear) {
    data = await axios.get(
      `http://localhost:5000/trips/calculate?distance=${distance}&fuel-type=${fuelType}&car-make=${carMake}&car-model=${carModel}&car-model-year=${carModelYear}`
    );
  } else if (consumptions !== 0) {
    data = await axios.get(
      `http://localhost:5000/trips/calculate?distance=${distance}&fuel-type=${fuelType}&consumptions=${consumptions}`
    );
  } else {
    throw new Error('Missing required parameters');
  }

  return z.object({ data: z.number() }).parse(data).data;
};
