import Grid from '@mui/material/Grid';
import ListCard from '../../../shared/cards/ListCard';
import "./BusinessTrips.scss";
import FooterDashboard from './FooterDashboard';



const businesstrips = [
    {
        id: "1",
        name: "Meeting",
        origin: "Valencia",
        destination: "Cullera"
    },
    {
        id: "1",
        name: "Dinner",
        origin: "Valencia",
        destination: "Xativa"
    },
    {
        id: "1",
        name: "Project",
        origin: "Valencia",
        destination: "Madrid"
    },
    {
        id: "1",
        name: "Meeting",
        origin: "Valencia",
        destination: "Madrid"
    },
    {
        id: "1",
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
                            <ListCard elements={businesstrips.slice(0, 5)} ></ListCard>
                        </div>
                    </Grid>
                </Grid>
                <FooterDashboard/>

            </div>

    );
}