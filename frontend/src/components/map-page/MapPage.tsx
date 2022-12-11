import './Form.scss';
import './Map.scss';

import { useState } from 'react';
import GoogleMaps from '../shared/googlemaps/GoogleMaps';

import { Button, Divider, NumberInput, Select, TextInput, Title } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDebouncedValue } from '@mantine/hooks';
import React, { useEffect } from 'react';

import { showNotification } from '@mantine/notifications';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useLocation } from 'react-router-dom';
import { getCarMakes, getCarModels } from '../../api/getCarInfo';
import { getEmissions } from '../../api/getEmissions';
import { saveTripToDB } from '../../api/newTrip';
import { getCars } from '../company/dashboard/components/Cars';
import useAuth from '../user/auth/AuthContext/AuthProvider';
import CalculationResultsBar from '../user/trip/calculations/CalculationResultsBar';
import { showGoogleMapsError } from './utils';

const MapPage: React.FC = () => {
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [emissions, setEmissions] = useState<number | null>(null);
  const { state } = useLocation();

  const [directionsResponse, setDirectionsResponse] = useState<
    google.maps.DirectionsResult | undefined
  >(undefined);

  const form = useForm({
    initialValues: {
      origin: state?.origin || '',
      destination: state?.destination || '',
      date: state?.date || new Date(),
      passengers: 1,
      carYear: 2000,
      consumption: null,
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
      carYear: (value: number) =>
        value < 1980 || value > currentYear ? `Select a year between 1960-${currentYear}` : null,
      consumption: (value) =>
        value === 0 && searchMakeValue === '' && searchMakeValue === ''
          ? "Indicate consumption if your model isn't in the list"
          : null,
    },
  });

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
    consumption?: number
  ) {
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    setDirectionsResponse(results);

    // --- TRIP CALCULATIONS
    const resultDistance = results.routes[0].legs[0].distance?.value; // meters
    const resultDuration = results.routes[0].legs[0].duration?.value; // seconds

    if (!resultDistance) {
      showGoogleMapsError('Could not calculate trip distance. Try again later.');
      return;
    }

    if (!resultDuration) {
      showGoogleMapsError('Could not calculate trip duration. Try again later. ');
      return;
    }

    setDistance(resultDistance);
    setDuration(resultDuration);

    // emissions
    try {
      const calculatedEmissions = await getEmissions({
        carMake: carMake,
        carModelYear: carYear,
        carModel: carModel,
        distance: resultDistance,
        fuelType: 'petrol',
        consumptions: consumption,
      });

      setEmissions(calculatedEmissions);
      console.log(calculatedEmissions);
    } catch (error) {
      // Handle error if the staus code is 404, meaning that the car is not supported
      if ((error as AxiosError).response?.status === 404) {
        showGoogleMapsError('Could not calculate emissions for this car!');
        return;
      }

      showGoogleMapsError('Unable to calculate emissions!' + error);
      return;
    }
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
    handleMake();
  }, [searchMakeValue]);

  const currentYear = new Date().getFullYear();

  const handleYear = async () => {
    if (form.values.carYear > 1960 && form.values.carYear <= currentYear) {
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
      const models = await getCarModels(form.values.carYear, searchMakeValue);
      setModels(models);
    } catch {
      setModels([]);
    }
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
                yearValue,
                searchModelValue,
                values.consumption == null ? undefined : values.consumption
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
            <Title order={5} mt="sm">
              The emissions of your car
            </Title>
            <Divider mt={0} />
            <NumberInput
              mt="sm"
              label="Car Year"
              placeholder="E.g. 1985"
              min={1960}
              max={currentYear}
              disabled={form.values.consumption != null}
              {...form.getInputProps('carYear')}
            />
            <div className="double-line">
              <div className="double-line-div margin">
                <Select
                  mt="sm"
                  label="Car Make:"
                  searchable
                  clearable
                  disabled={makes.length === 0 || form.values.consumption != null}
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
                  disabled={models.length === 0 || form.values.consumption != null}
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
              {...form.getInputProps('consumption')}
            />

            <div className="submit">
              <Button type="submit" mt="sm">
                Submit
              </Button>
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

export default MapPage;
