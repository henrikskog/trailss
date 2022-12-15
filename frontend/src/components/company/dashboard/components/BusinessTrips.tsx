import { Button, Select, TextInput } from '@mantine/core';
import { Close } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import ListCard from '../../../shared/cards/ListCard';
import './BusinessTrips.scss';
import FooterDashboard from './FooterDashboard';

interface Trip {
  name: string;
  origin: string;
  destination: string;
}

export default function BusinessTrips() {
  const [cars, setCars] = useState<string[]>([]);
  const [value, setValue] = useState('');
  const [showForm, setShowForm] = useState(false);

  const [occasion, setOccasion] = useState<string>('');
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');

  const [businessTrips, setBusinessTrips] = useState<Trip[]>([
    {
      name: 'Meeting',
      origin: 'Valencia',
      destination: 'Cullera',
    },
    {
      name: 'Dinner',
      origin: 'Valencia',
      destination: 'Xativa',
    },
    {
      name: 'Project',
      origin: 'Valencia',
      destination: 'Madrid',
    },
  ]);

  function handleRemoveCar(index: number) {
    const updatedCars = [...cars];
    updatedCars.splice(index, 1);
    setCars(updatedCars);
    setValue('');
  }

  const handleAddTrip = () => {

    const newTrip = {
      name: occasion,
      origin: origin,
      destination: destination,
    };

    console.log(newTrip)

    // do something with the form data
    setBusinessTrips([...businessTrips, newTrip]);
    setShowForm(!showForm);
    setOrigin('')
    setOccasion('');
    setDestination('');
    setCars([]);
  };

  return (
    <div className="company-home-wrapper">
      <Grid
        container
        rowSpacing={4}
        columnSpacing={{ xs: 1.5, sm: 2, md: 3 }}
        justifyContent="space-evenly"
        alignItems={'start'}
      >
        <Grid item xs={12}>
          <h1>Business Trips</h1>
        </Grid>
        <Grid item xs={12} md={7}>
          <div className="box business-trip-box">
            {showForm ? (
              <form className="form">
                <h2>Create New Business Trip</h2>
                <TextInput
                  label="Occasion:"
                  className="business-trip-input"
                  placeholder="E.g. Meeting"
                  value={occasion}
                  onChange={(evt) => setOccasion(evt.currentTarget.value)}
                />
                <TextInput
                  label="Origin:"
                  placeholder="E.g. Valencia"
                  className="business-trip-input"
                  value={origin}
                  onChange={(evt) => setOrigin(evt.currentTarget.value)}
                />
                <TextInput
                  label="Destination:"
                  className="business-trip-input"
                  placeholder="E.g. Madrid"
                  value={destination}
                  onChange={(evt) => setDestination(evt.currentTarget.value)}
                />
                <Select
                  label="Cars:"
                  className="business-trip-input"
                  placeholder="Choose cars"
                  value={value}
                  onChange={(event) => {
                    setCars([...cars, event!]);
                    setValue('');
                  }}
                  data={['Audi A4 2015', 'BMW M440i 2016', 'Ford Explorer 2019']}
                />
                <div>
                  {cars.map((car, index) => (
                    <div key={index} className="car-element">
                      {car}
                      <div className="remove-button" onClick={() => handleRemoveCar(index)}>
                        <Close className="close-icon" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="trip-form-buttons">
                  <Button type="button" className="add-trip-button" onClick={handleAddTrip}>
                    Add Business Trip
                  </Button>
                  <Button className="cancel-trip-button" onClick={() => setShowForm(!showForm)}>
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <>
                <ListCard elements={businessTrips} />
                <Button type="button" onClick={() => setShowForm(true)}>
                  Add Business Trip
                </Button>
              </>
            )}
          </div>
        </Grid>
      </Grid>
      <FooterDashboard />
    </div>
  );
}
