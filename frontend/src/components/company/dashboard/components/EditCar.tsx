import { Input, Select } from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getCarMakes, getCarModels } from "../../../../api/getCarInfo";
import { Car } from "./Cars";

interface Props {
    initialValues?: Car;
    id: string
    onSave: (car: Car) => void;
    onExit: () => void;
}

  const EditCarRow: React.FC<Props> = ({initialValues, id, onSave, onExit}) => {

  const [carName, setCarName] = useState<string>(initialValues?.name || "");
  const [carMake, setCarMake] = useState<string>(initialValues?.make || "");
  const [carModel, setCarModel] = useState<string>(initialValues?.model || "");
  const [carYear, setCarYear] = useState<number>(initialValues?.year || 0);
  const [carColor, setCarColor] = useState<string>(initialValues?.color || "");
  const [carLicensePlate, setCarLicensePlate] = useState<string>(initialValues?.licensePlate || "");
  const [carMileage, setCarMileage] = useState<number>(initialValues?.mileage || 0);
  const [carStatus, setCarStatus] = useState<string>(initialValues?.status || "");

  const { data: autoCompleteMakes, isLoading: isLoadingMakes } = useQuery({
    queryKey: ['makes-autocomplete'],
    queryFn: () => getCarMakes(2000),
  });
  const { data: autoCompleteModels, isLoading: isLoadingModels } = useQuery({
    queryKey: ['models-autocomplete', carMake],
    queryFn: () => (carMake == '' ? [] : getCarModels(2000, carMake)),
  });

    return (
      <tr key={id}>
        <td>
          <Input value={carName} onChange={(event: any) => setCarName(event.target.value)} />
        </td>
        <td>
          <Select
            searchable
            clearable
            data={autoCompleteMakes ?? []}
            onSearchChange={setCarMake}
            searchValue={carMake}
            placeholder="Eg. Toyota"
          />
        </td>
        <td>
          <Select
            searchable
            clearable
            data={autoCompleteModels ?? []}
            onSearchChange={setCarModel}
            searchValue={carModel}
            placeholder="Eg. Camry"
          />
        </td>
        <td>
          <Input
            placeholder="2001"
            value={carYear}
            onChange={(event: any) => setCarYear(event.target.value)}
          />
        </td>
        <td>
          <Input
            placeholder="Red"
            value={carColor}
            onChange={(event: any) => setCarColor(event.target.value)}
          />
        </td>
        <td>
          <Input
            value={carLicensePlate}
            onChange={(event: any) => setCarLicensePlate(event.target.value)}
            placeholder="ABC123"
          />
        </td>
        <td>
          <Input
            placeholder="5000"
            value={carMileage}
            onChange={(event: any) => setCarMileage(event.target.value)}
          />
        </td>
        <td>
          <Select
            searchable
            data={['Available', 'Unavailable'] ?? []}
            onSearchChange={setCarStatus}
            searchValue={carStatus}
          />
        </td>
        <td>
          <IconCheck onClick={() => onSave({
            color: carColor,
            licensePlate: carLicensePlate,
            make: carMake,
            mileage: carMileage,
            model: carModel,
            name: carName,
            status: carStatus,
            year: carYear
          })} className="hover-cursor"></IconCheck>
          <IconX
            onClick={onExit}
            className="hover-cursor"
          />
        </td>
      </tr>
    )
        }


export default EditCarRow;