import { Grid } from "@mantine/core";


export default function Home() {
    return (<div>
        <Grid justify="center">
            <Grid.Col span={3} style={{ minHeight: 80 }}>
                Home
            </Grid.Col>
            <Grid.Col span={3} style={{ minHeight: 120 }}>
                Fleets
            </Grid.Col>
            <Grid.Col span={3}>
                Business Trips
            </Grid.Col>
            <Grid.Col span={3} style={{ minHeight: 80 }}>
                Certificates
            </Grid.Col>
            <Grid.Col span={3} style={{ minHeight: 120 }}>
                Statistics
            </Grid.Col>
            <Grid.Col span={3}>
                Account
            </Grid.Col>
        </Grid>
    </div>);
}