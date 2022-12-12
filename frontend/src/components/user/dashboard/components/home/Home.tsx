import { IconCar } from '@tabler/icons';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import MainCard from '../../../../shared/cards/MainCard';
import ListCard from "../../../../shared/cards/ListCard";

import './Home.scss';
import { Typography } from '@mui/material';
import BajaAreaChartCard from '../../../../shared/cards/BajaAreaChart';
import SmallCard from '../../../../shared/cards/SmallCard';
import TableCard from '../../../../shared/cards/TableCard';

const series = [{
  name: 'series1',
  data: [100, 109, 86, 50, 40, 39, 45]
}
];
const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

//create an array of 10 fleets with id name and two quantities
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

//create an array of 10 trips with name emissions number and date
const trips = [
  {
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
  }
];

const Home: React.FC = () => {
  return (
    <div className='company-home-wrapper'>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1.5, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <h3>Home</h3>
        </Grid>
        <Grid item xs={6} md={3}>
          <div className='box purple-box'>
            <SmallCard title="Total Emissions" number="3500 Kg" subtitle="You emitted 1500kg more than last year" />
          </div>
        </Grid>
        <Grid item xs={6} md={3}>
          <div className='box blue-box'>
          <SmallCard title="Distance tracked" number="6321 km" subtitle="You have tracked emissions on 63241 km" />

          </div>
        </Grid>
        <Grid item xs={6} md={3}>
          <div className='box'>
          <SmallCard title="Cars" number="2" subtitle="You have 2 vehicles being tracked" />

          </div>
        </Grid>
        <Grid item xs={6} md={3}>
          <div className='box'>
          <SmallCard title="Last trip emissions" number="1500 Kg" subtitle="Your business trips emitted 1500kg" />

          </div>
        </Grid>

        <Grid item xs={12} md={8}>
        <h3 className='inside-title'>Stats</h3>
          <div className="box big-box">
            <BajaAreaChartCard categories={categories} series={series} title={"Total Emissions"} value={"3500 Kg"} difference={"+10%"} />
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <h3 className='inside-title'>Cars</h3>
          <div className='box big-box'>
            <ListCard elements={fleets.slice(0, 5)} text="Emitted" textAfter='kg'></ListCard>
        </div>
      </Grid>
      <Grid item xs={12} md={8}>
        <h3 className='inside-title'>Trips</h3>
        <div className='box bigger-box'>
          <TableCard trips={trips}/>
        </div>
      </Grid>
      <Grid item xs={12} md={4}>
        <h3 className='inside-title'>Community</h3>
        <div className='box bigger-box'>
          <MainCard mainStat={5} description="vehicles" title="Total, in your fleets" />
        </div>
      </Grid>
    </Grid >
    </div >
  );
}
export default Home;
