import Grid from '@mui/material/Grid';
import MainCard from './cards/MainCard';
import "./BusinessTrips.scss";
import Image from "./certificate-diploma.png"
import ListCard from "./cards/ListCard"
import ShortForm from '../../../landing/components/ShortForm';
import Model from "../../../landing/media/carretera_ 1.png";
import FooterDashboard from './FooterDashboard';



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
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // get the form data
        const formData = new FormData((event.target as HTMLFormElement));
        // do something with the form data
    };

    return (
            <div className='company-home-wrapper'>
                <Grid container rowSpacing={4} columnSpacing={{ xs: 1.5, sm: 2, md: 3 }} justifyContent="space-evenly" alignItems={"start"}>
                    <Grid item xs={12}>
                        <h1>Business Trips</h1>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <div className='box'>
                            {/* <Form calculateRoute={calculateRoute} /> */}
                        </div>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <div className='box'>
                            <ListCard elements={businesstrips.slice(0, 5)} text={'text'} textAfter={'textAfter'}></ListCard>
                        </div>
                    </Grid>
                </Grid>
                <FooterDashboard/>

            </div>

    );
}