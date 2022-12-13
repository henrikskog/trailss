import './Form.scss';
import './Map.scss';

import { useState } from 'react';

import { Button, Divider, NumberInput, Select, TextInput, Title } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDebouncedValue } from '@mantine/hooks';
import React, { useEffect } from 'react';

import { openConfirmModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { getCarMakes, getCarModels } from '../../../api/getCarInfo';
import { getVehicleConsumptions } from '../../../api/getEmissions';
import { saveTripToDB, Trip } from '../../../api/newTrip';
import { getCars } from '../../company/dashboard/components/Cars';
import { showGoogleMapsError } from '../../map-page/utils';
import GoogleMaps from '../../shared/googlemaps/GoogleMaps';
import CalculationResultsBar from '../trip/calculations/CalculationResultsBar';
import { SaveCarModal } from './SaveCarModal';
import { extractTripInformation, googleMapsTripsCalculation, TripCalculationError } from './utils';

const isNumber = (value: any): value is number => typeof value === 'number';

const UserMapPage: React.FC = () => {
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [emissions, setEmissions] = useState<number | null>(null);
  const [showSaveTrip, setShowSaveTrip] = useState<boolean>(false);
  const [showUsersSavedCars, setShowUsersSavedCars] = useState<boolean>(true);
  const { state } = useLocation();

  const { data: cars, isLoading: carsAreLoading } = useQuery({
    queryKey: ['cars'],
    queryFn: getCars,
  });

  const [directionsResponse, setDirectionsResponse] = useState<
    google.maps.DirectionsResult | undefined
  >(undefined);

  const form = useForm({
    initialValues: {
      origin: state?.origin || '',
      destination: state?.destination || '',
      date: state?.date || new Date(),
      passengers: 1,
      carYear: undefined,
      consumptions: undefined,
    },

    // functions will be used to validate values at corresponding key
    validate: {
      origin: (value: string) =>
        value.length > 3 && value.length < 50 ? null : 'Insert a valid Location',
      destination: (value: string) =>
        value.length > 3 && value.length < 50 ? null : 'Insert a valid Location',
      date: (value: any) => (value ? null : 'Date must be provided'),
      passengers: (value: number) =>
        value === 0 || value > 10 ? 'Wrong number of passengers' : null,
      carYear: (value) =>
        isNumber(value) &&
        (value < 1980 || value > currentYear ? `Select a year between 1960-${currentYear}` : null),
      consumptions: (value) =>
        value === 0 && searchMakeValue === '' && searchMakeValue === ''
          ? "Indicate consumption if your model isn't in the list"
          : null,
    },
  });

  const [userCar, setUserCar] = useState<string>('');
  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [yearValue] = useDebouncedValue(form.values.carYear, 200);
  const [searchMakeValue, onSearchMakeChange] = useState('');
  const [searchModelValue, onSearchModelChange] = useState('');

  async function onSubmit(
    origin: string,
    destination: string,
    carMake: string,
    carYear: number,
    carModel: string,
    consumptions?: number
  ) {
    let results: google.maps.DirectionsResult;
    console.log("Triggered onsubit")

    try {
      results = await googleMapsTripsCalculation(origin, destination);
    } catch (error) {
      form.setValues({ origin: '', destination: '' });
      showGoogleMapsError('Unable to calculate route for these locations . Try again.');
      return;
    }

    // FIND CAR CONSUMPTIONS

    let finalConsumption = consumptions;
    if (showUsersSavedCars) {
      const userSavedCar = cars?.find((car) => car.name == userCar);

      if (!userSavedCar || !userSavedCar.make || !userSavedCar.year || !userSavedCar.model) {
        showGoogleMapsError(
          'Could not calculate the consumptions for the chosen car. Make sure it has all the required information!'
        );
        return;
      }

      try {
        finalConsumption = await getVehicleConsumptions({
          carMake: userSavedCar.make,
          carModelYear: userSavedCar.year,
          carModel: userSavedCar.model,
        });
      } catch (error) {
        showGoogleMapsError('Could not calculate the consumptions for this car');
        return;
      }
    } else {
      if (!consumptions) {
        try {
          finalConsumption = await getVehicleConsumptions({ carMake, carModelYear: carYear, carModel });
        } catch (error) {
          showGoogleMapsError('Could not calculate the consumptions for this car');
          return;
        }
      } else {
        finalConsumption = consumptions;
      }
    }

    let finalTripCalculations;

    try {
      finalTripCalculations = await extractTripInformation(results, finalConsumption);
    } catch (error) {
      if (error instanceof TripCalculationError) {
        showGoogleMapsError(error.getErrorMessage());
        return;
      }

      showGoogleMapsError("Could not calculate the trip's information");
      return;
    }

    setDirectionsResponse(results);
    setDistance(finalTripCalculations.distance);
    setDuration(finalTripCalculations.duration);
    setEmissions(finalTripCalculations.emissions);

    // Prompt to save car if searching with a custom car!
    if (!showUsersSavedCars && carMake && carYear && carModel) {
      openConfirmModal(SaveCarModal({ carMake, carYear, carModel }));
    }

    setShowSaveTrip(true);
  }

  function clearRoute() {
    setDirectionsResponse(undefined);
    setDistance(0);
    setEmissions(0);
    setDuration(0);
  }

  useEffect(() => {
    handleYear();
  }, [yearValue]);

  useEffect(() => {
    setShowSaveTrip(false);
    console.log(form.values);
  }, [form.values]);

  useEffect(() => {
    handleMake();
  }, [searchMakeValue]);

  const currentYear = new Date().getFullYear();

  const handleYear = async () => {
    if (
      isNumber(form.values.carYear) &&
      form.values.carYear > 1960 &&
      form.values.carYear <= currentYear
    ) {
      setModels([]);
      onSearchMakeChange('');
      onSearchModelChange('');
      try {
        const makes = await getCarMakes(form.values.carYear);
        setMakes(makes);
      } catch {
        setMakes([]);
        setModels([]);
      }
    }
  };

  const handleMake = async () => {
    onSearchModelChange('');
    try {
      const models = await getCarModels(form.values.carYear!, searchMakeValue);
      setModels(models);
    } catch {
      setModels([]);
    }
  };

  const saveTrip = async () => {
    const trip: Trip = {
      origin: form.values.origin,
      destination: form.values.destination,
      distance: distance!,
      duration: duration!,
      total_emissions: emissions!,
      date: form.values.date.toString(),
      carYear: form.values.carYear!,
      carMake: searchMakeValue,
      carModel: searchModelValue,
    };
    const response = await saveTripToDB(trip);

    if (!(response.status < 400)) {
      return showNotification({
        title: 'Error',
        message: 'There was an error saving your trip. Please try again later.',
      });
    }

    showNotification({
      title: 'Success',
      message: 'Your trip was saved successfully!',
    });

    setShowSaveTrip(false);
  };

  return (
    <div className="map-container">
      <div className="overlay-left">
        <div className="search-form">
          <form
            className="form"
            onSubmit={form.onSubmit((values) => {
              onSubmit(
                values.origin,
                values.destination,
                searchMakeValue,
                yearValue!,
                searchModelValue,
                values.consumptions == null ? undefined : values.consumptions
              );
            })}
          >
            <h1>Your trip</h1>
            <TextInput
              label="Origin:"
              placeholder="E.g. Times Square"
              {...form.getInputProps('origin')}
            />
            <TextInput
              mt="sm"
              label="Destination:"
              placeholder="E.g. Vegas"
              {...form.getInputProps('destination')}
            />
            <div className="double-line">
              <div className="double-line-div margin">
                <DatePicker
                  placeholder="Pick date"
                  label="Event date"
                  withAsterisk
                  {...form.getInputProps('date')}
                />
              </div>
              <div className="double-line-div">
                <NumberInput
                  mt="sm"
                  label="Num. Passengers:"
                  placeholder="1"
                  min={1}
                  max={10}
                  {...form.getInputProps('passengers')}
                />
              </div>
            </div>
            {/* Form section about finding the emissions of the car */}
            <Title order={5} my="sm">
              Vehicle Information
            </Title>
            <Divider mt={0} />
            {showUsersSavedCars ? (
              <Select
                label="Your cars"
                searchable
                clearable
                data={(cars ? cars : [])
                  .filter((car) => car.name.includes(userCar))
                  .map((car) => ({ label: car.name, value: car.name }))}
                onSearchChange={setUserCar}
                searchValue={userCar}
                disabled={carsAreLoading}
              />
            ) : (
              <>
                <i className="info-consumption">
                  Provide either info about the vehicle or give the consumption directly
                </i>
                <NumberInput
                  mt="sm"
                  label="Car Year"
                  placeholder="E.g. 1985"
                  min={1960}
                  max={currentYear}
                  disabled={form.values.consumptions !== undefined}
                  {...form.getInputProps('carYear')}
                />
                <div className="double-line">
                  <div className="double-line-div margin">
                    <Select
                      mt="sm"
                      label="Car Make:"
                      searchable
                      clearable
                      disabled={makes.length === 0 || form.values.consumptions != null}
                      data={makes}
                      onSearchChange={onSearchMakeChange}
                      searchValue={searchMakeValue}
                    />
                  </div>
                  <div className="double-line-div">
                    <Select
                      mt="sm"
                      label="Car model:"
                      searchable
                      clearable
                      disabled={models.length === 0 || form.values.consumptions != null}
                      data={models}
                      onSearchChange={onSearchModelChange}
                      searchValue={searchModelValue}
                    />
                  </div>
                </div>
                <NumberInput
                  mt="sm"
                  label="Consumption"
                  placeholder="E.g. 5 (liters/100km)"
                  min={0}
                  max={100}
                  disabled={form.values.carYear != null}
                  {...form.getInputProps('consumption')}
                />
              </>
            )}
            <p className="customCarButton" onClick={() => setShowUsersSavedCars((prev) => !prev)}>
              {showUsersSavedCars ? 'Use a temporary new car' : 'Use one of your saved cars'}
            </p>

            <div className="submit">
              <Button type="submit" mt="sm">
                Submit
              </Button>
              {showSaveTrip && (
                <Button
                  className="save-button"
                  type="button"
                  mt="sm"
                  onClick={saveTrip}
                  disabled={emissions == null || distance == null || duration == null}
                >
                  Save Trip
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="overlay-calculations calculations">
        {distance && duration && emissions ? (
          <CalculationResultsBar distance={distance} emissions={emissions} duration={duration} />
        ) : null}
      </div>
      <div className="background-map">
        {/* Google Map Box */}
        <GoogleMaps directionsResponse={directionsResponse} />
      </div>
    </div>
  );
};

export default UserMapPage;
