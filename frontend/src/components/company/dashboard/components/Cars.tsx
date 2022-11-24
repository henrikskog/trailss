import { Button, Divider, Input, LoadingOverlay, Table } from '@mantine/core';
import { IconCheck, IconEdit, IconX } from '@tabler/icons';
import { useState } from 'react';
import './Cars.scss';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import useAuth from '../../../user/auth/AuthContext/AuthProvider';

interface Car {
  _id?: number;
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

    setSelectedCar(response as Car);

    return response;
  };

  const deleteCar = async (carId: string | number) => {
    const response = await authFetch('http://localhost:5000/vehicles/' + carId, {
      method: 'DELETE',
    });

    return response;
  };

  const updateCar = async (car: Car) => {
    const response = await authFetch('http://localhost:5000/vehicles/' + car._id, {
      method: 'PATCH',
      body: JSON.stringify(car),
    });

    return response;
  };

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({ queryKey: ['cars'], queryFn: getCars });

  // Mutations
  const postCarMutation = useMutation({
    mutationFn: postCar,
    onSuccess: () => {
      // Invalidate and refetch
      console.log('onSuccess');
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
  });

  const deleteCarMutation = useMutation({
    mutationFn: deleteCar,
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['cars'] });

      // Snapshot the previous value
      const prevCars = queryClient.getQueryData<Car[]>(['cars']);

      if (prevCars) {
        // Optimistically update to the new value
        queryClient.setQueryData<Car[]>(
          ['cars'],
          prevCars.filter((car) => car._id !== id)
        );
      }

      // Return a context object with the snapshotted value
      return { prevCars };
    },
    onSuccess: () => {
      // Invalidate and refetch
      console.log('onSuccess');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
  });

  const updateCarMutation = useMutation({
    mutationFn: updateCar,
    // When mutate is called:
    onMutate: async (newCar) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['cars'] });

      // Snapshot the previous value
      const prevCars = queryClient.getQueryData<Car[]>(['cars']);

      if (prevCars) {
        // Optimistically update to the new value
        queryClient.setQueryData<Car[]>(
          ['cars'],
          prevCars.map((car) => {
            if (car._id === newCar._id) {
              return newCar;
            } else {
              return car;
            }
          })
        );
      }

      // Return a context object with the snapshotted value
      return { prevCars };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, variables, context) => {
      if (context?.prevCars) {
        queryClient.setQueryData<Car[]>(['cars'], context.prevCars);
      }
    },
    // Always refetch after error or success:
    onSettled: () => {
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
            <th>Name</th>
            <th>Model</th>
            <th>Year</th>
            <th>Color</th>
            <th>License Plate</th>
            <th>Mileage</th>
            <th>Status</th>
            <th>Edit</th>
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

    updateCarMutation.mutate(newCar);

    setSelectedCar(null);
    setInputStates(newEmptyCar());
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
                  if (!car._id) {
                    console.log('Car has no id, deleting from state');
                    return;
                  }
                  setSelectedCar(null);
                  deleteCarMutation.mutate(car._id);
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
                  if (!car._id) {
                    console.log('Car has no id, deleting from state');
                    return;
                  }
                  setSelectedCar(null);
                  deleteCarMutation.mutate(car._id);
                  setAddButtonEnabled(true);
                  setCars(cars.filter((c) => c._id !== car._id));
                }}
              />
            </td>
          </tr>
        );
      }
    });
  }

  // Function that adds a new empty car to a fleet
  const newEmptyCar = () => ({
    name: '',
    model: '',
    year: 0,
    color: '',
    licensePlate: '',
    mileage: 0,
    status: '',
  });

  const addCar = () => {
    const newCar = newEmptyCar();

    newCar.name = 'hello';
    postCarMutation.mutate(newCar);

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
        {isLoading ? <LoadingOverlay visible></LoadingOverlay> : displayCars(data as Car[])}
        <Button onClick={addCar} disabled={!addButtonEnabled}>
          Add new car
        </Button>
      </div>
    </div>
  );
}
