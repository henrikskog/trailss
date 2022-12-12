import { useEffect } from 'react';

// material-ui
import { Grid, Typography } from '@mui/material';
import { Button } from '@mui/material/';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';


// third-party
import ReactApexChart from 'react-apexcharts';

import './BajaAreaChart.scss';

const BajaAreaChartCard = (props) => {

    const options = {
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 90, 100]
            }
        },
        chart: {
            type: 'area',
            toolbar: {
                show: false,
                zoom: false
            },
            zoom: false
        },
        colors: ['#372D87', '#00FF00', '#0000FF'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'string',
            categories: props.categories
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            },
        },
    }

    return (
        <div className='area-chart-wrapper'>
            <Grid container sx={{ pl: 2, pr: 2, pb: 0, color: '#fff' }}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="subtitle1">
                                {props.title}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <div className='view-all-button'>
                                <Button size="small" disableElevation>
                                    View All
                                    <ChevronRightOutlinedIcon />
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid item>
                        <Typography variant="h4" >
                            {props.value}
                        </Typography>
                    </Grid>
                    <Typography variant="subtitle2">
                        {props.diference}
                    </Typography>
                </Grid>
            </Grid>
            <div className='area-chart'>
                <ReactApexChart options={options} series={props.series} type="area" height={"100%"} />
            </div>
        </div>
    );
};

export default BajaAreaChartCard;