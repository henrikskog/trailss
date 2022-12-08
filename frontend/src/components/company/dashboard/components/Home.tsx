import { IconCar } from '@tabler/icons';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import MainCard from './cards/MainCard';

import './Home.scss';
import { Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Home: React.FC = () => {
  return (
    <div className='company-home-wrapper'>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1.5, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <h3>Home</h3>
        </Grid>
        <Grid item xs={6} md={3}>
          <div className='box purple-box'>
          </div>
        </Grid>
        <Grid item xs={6} md={3}>
          <div className='box'>

          </div>
        </Grid>
        <Grid item xs={6} md={3}>
          <div className='box'>

          </div>
        </Grid>
        <Grid item xs={6} md={3}>
          <div className='box'>

          </div>
        </Grid>
        <Grid item xs={12}>
          <h3>Stats</h3>
        </Grid>
        <Grid item xs={12} md={7}>
          <div className="box big-box">
            <MainCard title="Your Co2 Emmisions" mainStat={3000} change={100 * (1 - 3000 / 3670)} description="…better than last month" />
          </div>
        </Grid>
        <Grid item xs={12} md={5}>
          <div className='multiple-box big-box'>
            <div className='box'>
              <MainCard change={13.37} description="This is not a factual number, but it looks very cool" />

            </div>
            <div className='box'>
              <MainCard description="You are in the top" change={98} />

            </div>
          </div>
        </Grid>
        <Grid item xs={6} md={7}>
          <h3 className='inside-title'>Fleets</h3>
          <div className='box'>
          <MainCard title="You have:" mainStat={2} description="fleets" />
          </div>
          </Grid>
        <Grid item xs={6} md={5}>
          <h3 className='inside-title'>Vehicles</h3>
          <div className='box'>
          <MainCard mainStat={5} description="vehicles" title="Total, in your fleets" />
          </div>
        </Grid>

        <Grid container item columnSpacing={3} xs={12} md={7}>
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
        </Grid>
      </Grid >
    </div >
  );
}
export default Home;
