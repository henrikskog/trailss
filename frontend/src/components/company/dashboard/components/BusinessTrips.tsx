import Grid from '@mui/material/Grid';
import MainCard from './cards/MainCard';
import "./BusinessTrips.scss";
import Image from "./certificate-diploma.png"
import ListCard from "./cards/ListCard"
import ShortForm from '../../../landing/components/ShortForm';


const businesstrips = [
    {
      id: 1,
      name: "Meeting",
      origin: "Valencia",
      destination: "Cullera" 
    },
    {
        id: 1,
        name: "Dinner",
        origin: "Valencia",
        destination: "Xativa" 
    },
    {
        id: 1,
        name: "Project",
        origin: "Valencia",
        destination: "Madrid" 
    },
    {
        id: 1,
        name: "Meeting",
        origin: "Valencia",
        destination: "Madrid" 
    },
    {
        id: 1,
        name: "Meeting",
        origin: "Valencia",
        destination: "Barcelona" 
    }];

export default function BusinessTrips() {
    return (
        <div className='company-home-wrapper'>
            <Grid container rowSpacing={4} columnSpacing={{ xs: 1.5, sm: 2, md: 3 }} justifyContent="space-evenly" alignItems={"start"}>
                <Grid item xs={12}>
                    <h1>Business Trips</h1>
                </Grid>
                <Grid item xs={12} md={7}>
                    <div className='box'>
                        <h1>Add a new business trip</h1>
                        <h3>Origin</h3>
                        <h3>Destination</h3>
                        <h3>Choose car</h3>
                    </div>
                </Grid>
                <Grid item xs={12} md={3}>
                    <div className='box'>
                        <ListCard elements={businesstrips.slice(0, 5)}></ListCard>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}