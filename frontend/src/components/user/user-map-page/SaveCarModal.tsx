import { Button, Text, TextInput } from '@mantine/core';
import { closeAllModals, openConfirmModal } from '@mantine/modals';
import { OpenConfirmModal } from '@mantine/modals/lib/context';
import { showNotification } from '@mantine/notifications';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { postCar } from '../../company/dashboard/components/Cars';

interface SaveCarProps {
  carModel: string;
  carYear: number;
  carMake: string;
}

const SaveCar: React.FC<SaveCarProps> = ({ carModel, carMake, carYear }: SaveCarProps)  => {
  const [carName, setCarName] = useState('');
  const queryClient = useQueryClient();

  const handleConfirm = async () => {
    closeAllModals();
    try {
      await postCar({
        name: carName,
        model: carModel,
        make: carMake,
        year: carYear,
        color: '',
        licensePlate: '',
        mileage: 0,
        status: 'available',
      });
      showNotification({
        title: 'Car saved',
        message: 'Your car has been saved',
        color: 'green',
      });
      queryClient.invalidateQueries({ queryKey: ['cars'] })

    } catch (err) {
      showNotification({
        title: 'There was an error saving your car',
        message: 'Please try again later',
        color: 'red',
      });
    }
  };

  return (
    <>
      <TextInput label="Name" value={carName} onChange={(e) => setCarName(e.target.value)} />
      <Button onClick={() => closeAllModals}>Exit</Button>
      <Button onClick={handleConfirm}>Save</Button>
    </>
  );
};

export const SaveCarModal = (props: SaveCarProps): OpenConfirmModal  => ({ title: 'Do you want to save this car?',
    closeOnConfirm: false,
    labels: { confirm: 'Yes', cancel: 'No' },
    onConfirm: () =>
      openConfirmModal({
        title: 'Give your car a name',
        closeOnCancel: true,
        children: <SaveCar {...props} />,
        onConfirm: closeAllModals,
      }),
  })

export default SaveCar;
