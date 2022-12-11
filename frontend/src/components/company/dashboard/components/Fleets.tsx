import { Button, Container, Group, ScrollArea, Table } from '@mantine/core';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Fleets.scss';
import Grid from '@mui/material/Grid';
import Model from "../../../landing/media/carretera_ 1.png";
import FooterDashboard from "./FooterDashboard";

interface Car {
  id: number;
  name: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  mileage: number;
  status: string;
}

interface Fleet {
  id: number;
  name: string;
  cars: Car[];
}

// TODO: Replace with real data
// 10 cars for testing
const cars: Car[] = [
  {
    id: 1,
    name: 'Car 1',
    model: 'Model 1',
    year: 2021,
    color: 'Red',
    licensePlate: 'ABC123',
    mileage: 1000,
    status: 'Available',
  },
  {
    id: 2,
    name: 'Car 2',
    model: 'Model 2',
    year: 2021,
    color: 'Blue',
    licensePlate: 'ABC124',
    mileage: 1000,
    status: 'Available',
  },
  {
    id: 3,
    name: 'Car 3',
    model: 'Model 3',
    year: 2021,
    color: 'Green',
    licensePlate: 'ABC125',
    mileage: 1000,
    status: 'Available',
  },
  {
    id: 4,
    name: 'Car 4',
    model: 'Model 4',
    year: 2021,
    color: 'Yellow',
    licensePlate: 'ABC126',
    mileage: 1000,
    status: 'Available',
  },
];

const fleetsTestData: Fleet[] = [
  { name: 'Cars of employees', cars: cars.slice(0, 2), id: 1 },
  { name: 'Transport trailers', cars: cars.slice(2, 4), id: 2 },
];

export default function Fleet() {
  const [activeFleet, setActiveFleet] = useState<{ name: string; cars: Car[]; id: number } | null>(
    null
  );
  const [fleets, setFleets] = useState<Fleet[]>(fleetsTestData);
  // ToDo: replace by database access?
  // ToDo: think about better table header names

  // Function that adds a new empty car to a fleet
  const addCar = (fleet: Fleet) => {
    const newCar: Car = {
      id: fleet.cars.length,
      name: '',
      model: '',
      year: 0,
      color: '',
      licensePlate: '',
      mileage: 0,
      status: '',
    };

    const newFleet = {
      ...fleet,
      cars: [...fleet.cars, newCar],
    };

    const newFleets = fleets.map((f) => (f.id === fleet.id ? newFleet : f));

    setFleets(JSON.parse(JSON.stringify(newFleets)));
  };

  // REQUIREMENTS:
  // the idea was to have on the left side the table, containing all the registered cars
  // on the right side we have the editor. Clicking on any car in the table opens the car in the editor
  // and the car be modified from there. Maybe it should allow for adding stops beside the origin/destination as well
  // maybe below the Editor have the option of adding new cars by clicking on a button

  return (
    // <div className='main-container'>
      <div className='company-home-wrapper'>
        <Grid container rowSpacing={4} columnSpacing={{ xs: 1.5, sm: 2, md: 3 }} justifyContent="space-evenly" alignItems={"start"}>
          <Grid item xs={12}>
            <h1>Fleets</h1>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className='box'>
              <h2>Your fleets</h2>
              <Table verticalSpacing="sm" striped highlightOnHover>
                <th>Name</th>
                <th>Number of cars</th>
                <tbody>
                  {fleets.map((fleet) => (
                    <tr key={fleet.id} onClick={() => setActiveFleet(fleet)}>
                      <td>{fleet.name}</td>
                      <td>{fleet.cars.length}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="box">
              <div>
                <h2>Edit fleet</h2>
              </div>
              {activeFleet !== null && (
                <div>
                  <h2>{activeFleet.name}</h2>
                  <Table verticalSpacing="sm" striped highlightOnHover>
                    <th>Car name</th>
                    <th>Car model</th>
                    <th>Edit</th>
                    <tbody>
                      {activeFleet.cars.map((car) => (
                        <tr key={car.id}>
                          <td>{car.name}</td>
                          <td>{car.model}</td>
                          <td>
                            <Button onClick={() => console.log('edit')}>Edit</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>


                  <Button className="newCarButton" onClick={() => addCar(activeFleet)}>
                    Add a new car
                  </Button>
                </div>
              )}
            </div>
          </Grid>
        </Grid>
        <FooterDashboard/>
      </div>
      
  );
}
