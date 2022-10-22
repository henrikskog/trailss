import { hover } from '@testing-library/user-event/dist/hover';
import React from 'react';
import Select, {StylesConfig} from 'react-select';
import { colors } from 'react-select/dist/declarations/src/theme';
import './VehiclePicker.scss';

interface Vehicle {
  id: number,
  make: string,
  model: string,
  year: number
}

interface ArrayObjectSelectState {
  selectedVehicle: Vehicle | null;
}

const vehicles: Vehicle[] = [
  {
    id: 1,
    make: 'Ford',
    model: 'Fiesta',
    year: 2003
  },
  {
    id: 2,
    make: 'Ford',
    model: 'Focus',
    year: 2008
  },
  {
    id: 3,
    make: 'Opel',
    model: 'Astra',
    year: 1999
  },
  {
    id: 4,
    make: 'Renault',
    model: 'Megane',
    year: 2003
  },
  {
    id: 5,
    make: 'Renault',
    model: 'Clio',
    year: 2001
  },
  {
    id: 6,
    make: 'Mitsubishi',
    model: 'Pajero',
    year: 2005
  },
  {
    id: 7,
    make: 'Audi',
    model: 'A4',
    year: 2009
  }
];

export default function VehiclePicker() {
  const [state, setState] = React.useState<ArrayObjectSelectState>({
    selectedVehicle: null,
  });
  const selectStyle: StylesConfig<Vehicle, false> = {
    control: (provided, state) => ({
      display: 'flex'
    }),
    option: (provided, state) => ({
      ...provided,
      fontWeight: state.isSelected ? 'bold' : 'normal',
      color: '#372D87',
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: '#372D87'
    })
  };
  return (
    <div className="vehicle-picker">
        <Select
          value={state.selectedVehicle}
          onChange={(option: Vehicle | null) => {
            setState({ selectedVehicle: option });
          }}
          getOptionLabel={(vehicle: Vehicle) => vehicle.model}
          getOptionValue={(vehicle: Vehicle) => vehicle.model}
          options={vehicles}
          isClearable={true}
          backspaceRemovesValue={true}
          styles={selectStyle}
        />
    </div>
  );
}

