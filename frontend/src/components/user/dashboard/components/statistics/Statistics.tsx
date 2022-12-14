
import { Grid, Container } from '@mui/material';
import BajaAreaChartCard from "../../../../shared/cards/BajaAreaChart";

const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

const series = [{
    name: 'emissions',
    data: [100, 109, 86, 50, 40, 39, 35]
}];

const seriesEmployees = [{
    name: 'emissions',
    data: [2, 2.09, 2.06, 1.15, 1.25, 1.2, 1.15]
}];

const seriesKilometer = [{
    name: 'emissions',
    data: [0.15, 0.16, 0.17, 0.2, 0.13, 0.14, 0.13]
}];

const seriesVehicle = [{
    name: 'emissions',
    data: [5.15, 6.16, 5.17, 6.2, 3.13, 2.64, 2.63]
}];

const fleets = [
    {
      id: 1,
      name: "Cars of employees",
      quantity: 3,
      quantity2: 4
    },
    {
      id: 2,
      name: "Trucks",
      quantity: 3,
      quantity2: 4
    },
    {
      id: 3,
      name: "Bajaj Finery",
      quantity: 3,
      quantity2: 4
    },
    {
      id: 4,
      name: "Bajaj Finery",
      quantity: 3,
      quantity2: 4
    },
    {
      id: 5,
      name: "Bajaj Finery",
      quantity: 3,
      quantity2: 4
    },
    {
      id: 6,
      name: "Bajaj Finery",
      quantity: 3,
      quantity2: 4
    },
    {
      id: 7,
      name: "Bajaj Finery",
      quantity: 3,
      quantity2: 4
    },
    {
      id: 8,
      name: "Bajaj Finery",
      quantity: 3,
      quantity2: 4
    },
    {
      id: 9,
      name: "Bajaj Finery",
      quantity: 3,
      quantity2: 4
    },
    {
      id: 10,
      name: "Bajaj Finery",
      quantity: 3,
      quantity2: 4
    },
  ];

const trips = [{
    name: "Trip 1",
    emissions: 100,
    number: 1,
    date: "01/01/2021"
},
{
    name: "Trip 2",
    emissions: 100,
    number: 2,
    date: "01/01/2021"
},
{
    name: "Trip 3",
    emissions: 100,
    number: 3,
    date: "01/01/2021"
},
{
    name: "Trip 4",
    emissions: 100,
    number: 4,
    date: "01/01/2021"
},
{
    name: "Trip 5",
    emissions: 100,
    number: 5,
    date: "01/01/2021"
},
{
    name: "Trip 6",
    emissions: 100,
    number: 6,
    date: "01/01/2021"
},
{
    name: "Trip 7",
    emissions: 100,
    number: 7,
    date: "01/01/2021"
},
{
    name: "Trip 8",
    emissions: 100,
    number: 8,
    date: "01/01/2021"
},
{
    name: "Trip 9",
    emissions: 100,
    number: 9,
    date: "01/01/2021"
},
{
    name: "Trip 10",
    emissions: 100,
    number: 10,
    date: "01/01/2021"
}];

export default function Statistics() {
    return (
        <Container maxWidth='xl'>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1.5, sm: 2, md: 3 }}>
                <Grid item xs={12} md={6}>
                    <div className="box big-box">
                        <BajaAreaChartCard categories={categories} series={series} title={"Total Emissions"} value={"3500 Kg"} difference={"+10%"} />
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div className="box big-box">
                        <BajaAreaChartCard categories={categories} series={seriesEmployees} title={"Emissions per employee"} value={"35 Kg"} difference={"+10%"} />
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div className="box big-box">
                        <BajaAreaChartCard categories={categories} series={seriesKilometer} title={"Emissions per kilometer"} value={"Average 0.15 kg/km"} difference={"+10%"} />
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div className="box big-box">
                        <BajaAreaChartCard categories={categories} series={seriesVehicle} title={"Emissions per vehicle"} value={"Average:  Kg"} difference={"+10%"} />
                    </div>
                </Grid> 
            </Grid>
        </Container>
    );
}