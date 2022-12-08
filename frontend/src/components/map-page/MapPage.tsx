import './Form.scss';
import './Map.scss';

import { useState } from 'react';
import GoogleMaps from '../shared/googlemaps/GoogleMaps';

import { Button, NumberInput, Select, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDebouncedValue } from '@mantine/hooks';
import React, { useEffect } from 'react';

import { showNotification } from '@mantine/notifications';
import { AxiosError } from 'axios';
import { getCarMakes, getCarModels } from '../../api/getCarInfo';
import { getEmissions } from '../../api/getEmissions';
import { saveTripToDB } from '../../api/newTrip';
import useAuth from '../user/auth/AuthContext/AuthProvider';
import CalculationResultsBar from '../user/trip/calculations/CalculationResultsBar';
import { showGoogleMapsError } from './utils';

const MapPage: React.FC = () => {
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [emissions, setEmissions] = useState<number | null>(null);
  const [showSaveTrip, setShowSaveTrip] = useState<boolean>(false);
  const { user } = useAuth();

  const [directionsResponse, setDirectionsResponse] = useState<
    google.maps.DirectionsResult | undefined
  >(undefined);

  const form = useForm({
    initialValues: {
      origin: '',
      destination: '',
      date: new Date(),
      passengers: 1,
      carYear: 2000,
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
    carModel: string
  ) {
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    setDirectionsResponse(results);

    const resultDistance = results.routes[0].legs[0].distance?.value; // meters
    const resultDuration = results.routes[0].legs[0].duration?.value; // seconds

    if (!resultDistance || !resultDuration) {
      showGoogleMapsError('Could not calculate distance or duration');
      return;
    }

    setDistance(resultDistance);
    setDuration(resultDuration);

    try {
      const calculatedEmissions = await getEmissions({
        carMake: carMake,
        carModelYear: carYear,
        carModel: carModel,
        distance: resultDistance,
        fuelType: 'petrol',
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

    console.log("in submit")
    user?.accessToken && setShowSaveTrip(true);
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
  }, [form.values]);

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

  const saveTrip = async () => {
    const trip = {
      origin: form.values.origin,
      destination: form.values.destination,
      distance: distance!,
      duration: duration!,
      emissions: emissions!,
      date: form.values.date.toString(),
      carYear: form.values.carYear,
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
                yearValue,
                searchModelValue
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
            <NumberInput
              mt="sm"
              label="Car Year"
              placeholder="E.g. 1985"
              min={1960}
              max={currentYear}
              {...form.getInputProps('carYear')}
            />
            <div className="double-line">
              <div className="double-line-div margin">
                {makes.length !== 0 && (
                  <Select
                    mt="sm"
                    label="Car Make:"
                    searchable
                    clearable
                    data={makes}
                    onSearchChange={onSearchMakeChange}
                    searchValue={searchMakeValue}
                  />
                )}
                {makes.length === 0 && (
                  <Select
                    mt="sm"
                    label="Car Make:"
                    searchable
                    clearable
                    disabled
                    data={makes}
                    onSearchChange={onSearchMakeChange}
                    searchValue={searchMakeValue}
                  />
                )}
              </div>
              <div className="double-line-div">
                {models.length !== 0 && (
                  <Select
                    mt="sm"
                    label="Car model:"
                    searchable
                    clearable
                    data={models}
                    onSearchChange={onSearchModelChange}
                    searchValue={searchModelValue}
                  />
                )}
                {models.length === 0 && (
                  <Select
                    mt="sm"
                    label="Car model:"
                    searchable
                    clearable
                    disabled
                    data={models}
                    onSearchChange={onSearchModelChange}
                    searchValue={searchModelValue}
                  />
                )}
              </div>
            </div>
            <div className="submit">
              <Button type="submit" mt="sm">
                Submit
              </Button>
              {showSaveTrip && (
                <Button
                  className="save-button"
                  type="submit"
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

export default MapPage;
