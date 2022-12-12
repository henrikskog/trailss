import axios from 'axios';
import { z } from 'zod';

interface Props {
  distance: number;
  fuelType: string;
  consumptions: number;
}

interface GetConsumptionParams {
  carMake: string;
  carModel: string;
  carModelYear: number;
}

export const getVehicleConsumptions = async ({
  carMake,
  carModel,
  carModelYear,
}: GetConsumptionParams): Promise<number> => {
  const data = await axios.get(
    `http://localhost:5000/vehicles/calculate-consumptions?car-make=${carMake}&car-model=${carModel}&car-model-year=${carModelYear}`
  );
  return z.object({ data: z.number() }).parse(data).data;
};

export const getEmissions = async ({
  distance,
  fuelType,
  consumptions,
}: Props): Promise<number> => {
  let data;

  // } else if (consumptions !== 0) {
  data = await axios.get(
    `http://localhost:5000/trips/calculate?distance=${distance}&fuel-type=${fuelType}&consumptions=${consumptions}`
  );
  // } else {
  //   throw new Error('Missing required parameters');
  // }

  return z.object({ data: z.number() }).parse(data).data;
};
