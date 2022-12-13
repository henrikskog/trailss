import { Button, Container, Group, ScrollArea, Table } from '@mantine/core';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Fleets.scss';
import Grid from '@mui/material/Grid';
import Model from '../../../landing/media/carretera_ 1.png';
import FooterDashboard from './FooterDashboard';
import SmallCard from '../../../shared/cards/SmallCard';
import BajaAreaChartCard from '../../../shared/cards/BajaAreaChart';
import ListCard from '../../../shared/cards/ListCard';
import TableCard from '../../../shared/cards/TableCard';
import MainCard from '../../../shared/cards/MainCard';
import FleetsTableCard from '../../../shared/cards/FleetsTableCard';
import CarsTableCard from '../../../shared/cards/CarsTableCard';

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
  { name: 'Cars of employees', cars: cars.slice(0, 2) },
  { name: 'Transport trailers', cars: cars.slice(2, 4) },
  { name: 'Manager cars', cars: cars.slice(1, 3) },
].map((fleet, i) => ({ ...fleet, number: fleet.cars.length, id: i }));

export default function Fleet() {
  return (
    <>
      <div className="company-home-wrapper">
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1.5, sm: 2, md: 3 }}>
          <Grid item xs={12} md={12}>
            <h3 className="inside-title">Your fleets</h3>
            <div className="box bigger-box">
              <FleetsTableCard fleets={fleetsTestData} />
            </div>
          </Grid>
        </Grid>
        <FooterDashboard />
      </div>
    </>
  );
}
