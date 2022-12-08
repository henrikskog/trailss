import Grid from '@mui/material/Grid';
import MainCard from './MainCard';
import "./Certificates.scss";
import Image from "./certificate-diploma.png"

export default function Certificates() {
    return (
        <div className='company-home-wrapper'>
            <Grid container rowSpacing={4} columnSpacing={{ xs: 1.5, sm: 2, md: 3 }} justifyContent="space-evenly" alignItems={"start"}>
                <Grid item xs={11}>
                    <h1>Download Your Certificate</h1>
                </Grid>
                <Grid item xs={12} md={7}>
                    <MainCard description="Your most important stats:" mainStat={3000} change={100 * (1 - 3000 / 3670)} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <div className='image-div'>
                        <img className="image" src={Image}/>
                    </div>
                </Grid>
                <Grid item xs={6} md={6} className="test33" alignItems="center">
                    <div className='bottom-text'>
                        <h2>Need a more personalized certificate?</h2>
                        <p>Contact us at</p>
                        <h3>contact@trailss.com</h3>
                    </div>
                </Grid>

            </Grid>
        </div>
    );
}