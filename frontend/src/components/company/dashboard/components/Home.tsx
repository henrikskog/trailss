import { Button, Grid, UnstyledButton } from '@mantine/core';
import { IconCar } from '@tabler/icons';
import './Home.scss';

export default function Home() {
  return (
    <Grid grow className="home-grid">
      <Grid.Col>
        Fleets

      <br></br>
        <IconCar />
      </Grid.Col>
      <Grid.Col>Business Trips</Grid.Col>
      <Grid.Col>Certificates</Grid.Col>
      <Grid.Col>Statistics</Grid.Col>
      <Grid.Col>Account</Grid.Col>
      <Grid.Col>Account</Grid.Col>
      <Grid.Col>Account</Grid.Col>
      <Grid.Col>Account</Grid.Col>
    </Grid>
  );
}
