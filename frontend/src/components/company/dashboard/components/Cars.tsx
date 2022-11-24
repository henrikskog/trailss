import { Button, Divider, Input, Table } from '@mantine/core';
import { IconCheck, IconEdit, IconX } from '@tabler/icons';
import { useState } from 'react';
import './Cars.scss';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import useAuth from '../../../user/auth/AuthContext/AuthProvider';

interface Car {
  _id: number;
  name: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  mileage: number;
  status: string;
}

// TODO: Replace with real data
// 10 cars for testing
const dummyCars: Car[] = [
  {
    _id: 1,
    name: 'Car 1',
    model: 'Model 1',
    year: 2021,
    color: 'Red',
    licensePlate: 'ABC123',
    mileage: 1000,
    status: 'Available',
  },
  {
    _id: 2,
    name: 'Car 2',
    model: 'Model 2',
    year: 2021,
    color: 'Blue',
    licensePlate: 'ABC124',
    mileage: 1000,
    status: 'Available',
  },
  {
    _id: 3,
    name: 'Car 3',
    model: 'Model 3',
    year: 2021,
    color: 'Green',
    licensePlate: 'ABC125',
    mileage: 1000,
    status: 'Available',
  },
  {
    _id: 4,
    name: 'Car 4',
    model: 'Model 4',
    year: 2021,
    color: 'Yellow',
    licensePlate: 'ABC126',
    mileage: 1000,
    status: 'Available',
  },
];

export default function Cars() {
  const [cars, setCars] = useState<Car[]>(dummyCars);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [addButtonEnabled, setAddButtonEnabled] = useState<boolean>(true);

  const [carName, setCarName] = useState<string>('');
  const [carModel, setCarModel] = useState<string>('');
  const [carYear, setCarYear] = useState<number>(2022);
  const [carColor, setCarColor] = useState<string>('');
  const [carLicensePlate, setCarLicensePlate] = useState<string>('');
  const [carMileage, setCarMileage] = useState<number>(0);
  const [carStatus, setCarStatus] = useState<string>('');

  const { authFetch } = useAuth();

  const getCars = async () => {
    type CarsApiResponse = Car[];

    const response = (await authFetch(
      'http://localhost:5000/vehicles',
      undefined
    )) as CarsApiResponse;
    return response;
  };

  const postCar = async (car: Car) => {
    const response = await authFetch('http://localhost:5000/vehicles', {
      method: 'POST',
      body: JSON.stringify(car),
    });
    return response;
  };

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({ queryKey: ['cars'], queryFn: getCars });

  // Mutations
  const mutation = useMutation({
    mutationFn: postCar,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
  });

  function setInputStates(car: Car) {
    setCarName(car.name);
    setCarModel(car.model);
    setCarYear(car.year);
    setCarColor(car.color);
    setCarLicensePlate(car.licensePlate);
    setCarMileage(car.mileage);
    setCarStatus(car.status);
  }

  function displayCars(cars: Car[]) {
    return (
      <Table verticalSpacing="sm" striped highlightOnHover className="vehicle-table">
        <thead>
          <tr>
            <td>Name</td>
            <td>Model</td>
            <td>Year</td>
            <td>Color</td>
            <td>License Plate</td>
            <td>Mileage</td>
            <td>Status</td>
            <td>Edit</td>
          </tr>
        </thead>
        <tbody>{displayCarRows(cars)}</tbody>
      </Table>
    );
  }

  function saveCar() {
    if (selectedCar == null) {
      return;
    }

    const newCar: Car = {
      _id: selectedCar._id,
      name: carName,
      model: carModel,
      year: carYear,
      color: carColor,
      licensePlate: carLicensePlate,
      mileage: carMileage,
      status: carStatus,
    };

    //mutation.mutate(newCar)

    const newCars = cars.map((car) => (car._id === selectedCar?._id ? newCar : car));

    setCars(newCars);
    setSelectedCar(null);
    setInputStates(newEmptyCar(cars.length + 1));
    setAddButtonEnabled(true);
  }

  function displayCarRows(cars: Car[]) {
    console.log(cars);
    return cars.map((car) => {
      if (car._id === selectedCar?._id) {
        return (
          <tr key={car._id}>
            <td>
              <Input value={carName} onChange={(event: any) => setCarName(event.target.value)} />
            </td>
            <td>
              <Input value={carModel} onChange={(event: any) => setCarModel(event.target.value)} />
            </td>
            <td>
              <Input value={carYear} onChange={(event: any) => setCarYear(event.target.value)} />
            </td>
            <td>
              <Input value={carColor} onChange={(event: any) => setCarColor(event.target.value)} />
            </td>
            <td>
              <Input
                value={carLicensePlate}
                onChange={(event: any) => setCarLicensePlate(event.target.value)}
              />
            </td>
            <td>
              <Input
                value={carMileage}
                onChange={(event: any) => setCarMileage(event.target.value)}
              />
            </td>
            <td>
              <Input
                value={carStatus}
                onChange={(event: any) => setCarStatus(event.target.value)}
              />
            </td>
            <td>
              <IconCheck onClick={saveCar} className="hover-cursor"></IconCheck>
              <IconX
                onClick={() => {
                  setCars(cars.filter((c) => c._id !== car._id));
                  setSelectedCar(null);
                  setAddButtonEnabled(true);
                }}
                className="hover-cursor"
              />
            </td>
          </tr>
        );
      } else {
        return (
          <tr key={car._id}>
            <td>{car.name}</td>
            <td>{car.model}</td>
            <td>{car.year}</td>
            <td>{car.color}</td>
            <td>{car.licensePlate}</td>
            <td>{car.mileage}</td>
            <td>{car.status}</td>
            <td>
              <IconEdit
                className="hover-cursor"
                onClick={() => {
                  setInputStates(car);
                  setSelectedCar(car);
                }}
              />
              <IconX
                className="hover-cursor"
                onClick={() => {
                  setCars(cars.filter((c) => c._id !== car._id));
                }}
              />
            </td>
          </tr>
        );
      }
    });
  }
  // ToDo: replace by database access?
  // ToDo: think about better table header names

  // Function that adds a new empty car to a fleet
  const newEmptyCar = (_id: number) => ({
    _id: _id,
    name: '',
    model: '',
    year: 0,
    color: '',
    licensePlate: '',
    mileage: 0,
    status: '',
  });

  const addCar = () => {
    const newCar = newEmptyCar(cars.reduce((max, car) => (car._id > max ? car._id : max), 0) + 1);
    setCars([...cars, newCar]);
    setSelectedCar(newCar);
    setAddButtonEnabled(false);
  };

  // REQUIREMENTS:
  // the idea was to have on the left side the table, containing all the registered cars
  // on the right side we have the editor. Clicking on any car in the table opens the car in the editor
  // and the car be modified from there. Maybe it should allow for adding stops beside the origin/destination as well
  // maybe below the Editor have the option of adding new cars by clicking on a button

  return (
    <div className="container">
      <div className="table">
        <h2>Your cars</h2>
        <Divider my={'lg'} />
        {/* {!isLoading && displayCars(data as Car[])} */}
        {displayCars(cars)}
        <Button onClick={addCar} disabled={!addButtonEnabled}>
          Add new car
        </Button>
      </div>
    </div>
  );
}
