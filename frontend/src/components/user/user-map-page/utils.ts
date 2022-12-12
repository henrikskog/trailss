import { getEmissions } from '../../../api/getEmissions';

export class TripCalculationError extends Error {
  constructor(message: string) {
    super(message);

    // 👇️ because we are extending a built-in class
    Object.setPrototypeOf(this, TripCalculationError.prototype);
  }

  getErrorMessage() {
    return this.message;
  }
}

export const googleMapsTripsCalculation = async (origin: string, destination: string) => {
  const directionsService = new google.maps.DirectionsService();
  return directionsService.route({
    origin: origin,
    destination: destination,
    travelMode: google.maps.TravelMode.DRIVING,
  });
};

export const extractTripInformation = async (
  tripResult: google.maps.DirectionsResult,
  consumptions: number
) => {
  // --- TRIP CALCULATIONS
  const resultDistance = tripResult.routes[0].legs[0].distance?.value; // meters
  const resultDuration = tripResult.routes[0].legs[0].duration?.value; // seconds

  if (!resultDistance) {
    throw new TripCalculationError('Could not calculate trip distance. Try again later. ');
  }

  if (!resultDuration) {
    throw new TripCalculationError('Could not calculate trip duration. Try again later. ');
  }

  try {
    const calculatedEmissions = await getEmissions({
      distance: resultDistance / 1000, // convert from meters to km
      fuelType: 'petrol',
      consumptions: consumptions,
    });
    return {
      distance: resultDistance,
      duration: resultDuration,
      emissions: calculatedEmissions,
    };
  } catch (error) {
    throw new TripCalculationError('Could not calculate trip emissions. Try again later. ');
  }
};
