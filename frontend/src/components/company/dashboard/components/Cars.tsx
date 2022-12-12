import { Button, Divider, LoadingOverlay, Table } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconEdit, IconX } from '@tabler/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { z } from 'zod';
import './Cars.scss';
import EditCarRow from './EditCar';

const CarSchema = z.object({
  _id: z.optional(z.string()),
  name: z.string(),
  make: z.string(),
  model: z.string(),
  year: z.number(),
  color: z.optional(z.string()),
  licensePlate: z.optional(z.string()),
  mileage: z.optional(z.number()),
  status: z.optional(z.string()),
});

export type Car = z.infer<typeof CarSchema>;

export const getCars = async (): Promise<Car[]> => {
  const response = await axios.get(`${process.env.REACT_APP_API_ROOT}/vehicles`);

  const responseData = z.array(z.any()).parse(response.data);

  const result = responseData.filter((car) => {
    const parsedCar = CarSchema.safeParse(car);
    if(parsedCar.success) {
      return true;
    }
    console.error("Recieved a car from the backend with unexpected properties: ", parsedCar.error);
    return false
  })



  return result
};

export const postCar = async (car: Car): Promise<Car> => {
  delete car._id;
  const response = await axios.post(`${process.env.REACT_APP_API_ROOT}/vehicles`, car);

  return CarSchema.parse(response.data);
};

export default function Cars() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [addButtonEnabled, setAddButtonEnabled] = useState<boolean>(true);

  const [showCreateNewCar, setShowCreateNewCar] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const { data, isLoading, error, isError } = useQuery({ queryKey: ['cars'], queryFn: getCars });

  const deleteCar = async (carId: string | number) => {
    const response = await axios.delete(`${process.env.REACT_APP_API_ROOT}/vehicles/` + carId);

    return response;
  };

  const updateCar = async (car: Car) => {
    const response = await axios.patch(
      `${process.env.REACT_APP_API_ROOT}/vehicles/` + car._id,
      car
    );

    return response;
  };

  const newCarMutation = useMutation({
    mutationFn: postCar,
    onMutate: async (car) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['cars'] });

      // Snapshot the previous value
      const prevCars = queryClient.getQueryData<Car[]>(['cars']);

      if (prevCars) {
        // Optimistically update to the new value
        queryClient.setQueryData<Car[]>(['cars'], [...prevCars, car]);
      }

      // Return a context object with the snapshotted value
      return { prevCars };
    },
    onSuccess: () => {
      // Invalidate and refetch
      console.log('onSuccess');
    },

    onError: (error, newCar, context) => {
      if (context?.prevCars) {
        showNotification({
          title: 'Could not create car',
          message: 'Please try again later',
          color: 'red',
        });
        queryClient.setQueryData<Car[]>(['cars'], context.prevCars);
      }
    },

    onSettled: () => {
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

  function displayCarRows(cars: Car[]) {
    return cars.map((car) => {
      if (selectedCar?._id && selectedCar._id === car._id) {
        return (
          <EditCarRow
            id={selectedCar._id}
            initialValues={selectedCar}
            onSave={(newCar) => {
              setSelectedCar(null);
              updateCarMutation.mutate({ ...newCar, _id: selectedCar._id });
            }}
            onExit={() => setSelectedCar(null)}
          />
        );
      } else {
        return (
          <tr key={car._id}>
            <td>{car.name ? car.name : '-'}</td>
            <td>{car.make ? car.make : '-'}</td>
            <td>{car.model ? car.model : '-'}</td>
            <td>{car.year ? car.year : '-'}</td>
            <td>{car.color ? car.color : '-'}</td>
            <td>{car.licensePlate ? car.licensePlate : '-'}</td>
            <td>{car.mileage ? car.mileage : '-'}</td>
            <td>{car.status ? car.status : '-'}</td>
            <td>
              <IconEdit
                className="hover-cursor"
                onClick={() => {
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
                }}
              />
            </td>
          </tr>
        );
      }
    });
  }

  const addCar = () => {
    setShowCreateNewCar(true);
    setAddButtonEnabled(false);
  };

  return (
    <div className="container">
      <div className="table">
        <h2>Your cars</h2>
        <Divider my={'lg'} />
        {isError ? (
          <div>
            <p>There was an error loading your cars</p>
            <Button onClick={() => queryClient.invalidateQueries({ queryKey: ['cars'] })}>
              Retry
            </Button>
          </div>
        ) : isLoading ? (
          <div>
            <LoadingOverlay visible></LoadingOverlay>
          </div>
        ) : (
          <Table verticalSpacing="sm" striped highlightOnHover className="vehicle-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Make</th>
                <th>Model</th>
                <th>Year</th>
                <th>Color</th>
                <th>License Plate</th>
                <th>Mileage</th>
                <th>Status</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {displayCarRows(data)}
              {showCreateNewCar && (
                <EditCarRow
                  id={data.length.toString()}
                  onSave={(newCar) => {
                    newCarMutation.mutate(newCar);
                    setShowCreateNewCar(false);
                    setAddButtonEnabled(true);
                  }}
                  onExit={() => {
                    setShowCreateNewCar(false);
                    setAddButtonEnabled(true);
                  }}
                />
              )}
            </tbody>
          </Table>
        )}
        <Button onClick={addCar} disabled={!addButtonEnabled}>
          Add new car
        </Button>
      </div>
    </div>
  );
}
