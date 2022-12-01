import { IconCar } from '@tabler/icons';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import './Home.scss';
import { Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Home() {
  return (
    <div className='company-home-wrapper'>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1.5, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <h3>Home</h3>
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
        <Grid item xs={6} md={3}>
          <div className='box'>

          </div>
        </Grid>
        <Grid item xs={12}>
          <h3>Stats</h3>
        </Grid>
        <Grid item xs={12} md={7}>
          <div className='box big-box'>

          </div>
        </Grid>
        <Grid item xs={12} md={5}>
          <div className='multiple-box big-box'>
            <div className='box'>

            </div>
            <div className='box'>

            </div>
          </div>
        </Grid>
        <Grid item xs={6} md={7}>
          <h3 className='inside-title'>Fleets</h3>
          <div className='box big-box'>

          </div>
        </Grid>
        <Grid item xs={6} md={5}>
          <h3 className='inside-title'>Vehicles</h3>
          <div className='box big-box'>

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
      </Grid>
    </div>
  );
}
