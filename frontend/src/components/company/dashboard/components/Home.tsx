import { IconCar } from '@tabler/icons';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import MainCard from './cards/MainCard';
import ListCard from "./cards/ListCard";

import './Home.scss';
import { Typography } from '@mui/material';
import BajaAreaChartCard from './cards/BajaAreaChart';
import SmallCard from './cards/SmallCard';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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
          <SmallCard title="Active Fleets" number="5" subtitle="You have 5 fleets being tracked" />

          </div>
        </Grid>
        <Grid item xs={6} md={3}>
          <div className='box'>
          <SmallCard title="Active vehicles" number="60" subtitle="You have 60 vehicles being tracked" />

          </div>
        </Grid>
        <Grid item xs={6} md={3}>
          <div className='box'>
          <SmallCard title="Business trips" number="1500 Kg" subtitle="Your business trips emitted 1500kg" />

          </div>
        </Grid>

        <Grid item xs={12} md={8}>
        <h3 className='inside-title'>Stats</h3>
          <div className="box big-box">
            <BajaAreaChartCard categories={categories} series={series} title={"Total Emissions"} value={"3500 Kg"} difference={"+10%"} />
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <h3 className='inside-title'>Fleets</h3>
          <div className='box big-box'>
            <ListCard elements={fleets.slice(0, 5)}></ListCard>
        </div>
      </Grid>
      <Grid item xs={6} md={7}>
        <h3 className='inside-title'>Fleets</h3>
        <div className='box big-box'>
          <MainCard title="You have:" mainStat={2} description="fleets" />
        </div>
      </Grid>
      <Grid item xs={6} md={5}>
        <h3 className='inside-title'>Vehicles</h3>
        <div className='box'>
          <MainCard mainStat={5} description="vehicles" title="Total, in your fleets" />
        </div>
      </Grid>

      {/* <Grid container item columnSpacing={3} xs={12} md={7}>
        <Grid item xs={12}>
          <h3 className='inside-title'>Trips</h3>
        </Grid>
        <Grid item xs={9} md={7}>
          <div className='box big-box'>

          </div>
        </Grid>
        <Grid item xs={9} md={5}>
          <div className='box big-box'>

          </div>
        </Grid>
      </Grid>

      <Grid item xs={12} md={5}>
        <h3 className='inside-title'>Certificates</h3>
        <div className='box big-box'>

        </div>
      </Grid> */}
    </Grid >
    </div >
  );
}
export default Home;
