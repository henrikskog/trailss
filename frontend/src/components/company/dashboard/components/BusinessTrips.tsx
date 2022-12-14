import Grid from '@mui/material/Grid';
import ListCard from '../../../shared/cards/ListCard';
import "./BusinessTrips.scss";
import FooterDashboard from './FooterDashboard';
import { Button, Divider, NumberInput, Select, TextInput, Title } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useState } from "react";
import { Close } from '@mui/icons-material';
import { SemanticClassificationFormat } from 'typescript';


function onSubmit() {
    console.log("lol")
}

export default function BusinessTrips() {
    const [cars, setCars] = useState<string[]>([]);
    const [value, setValue] = useState("");

    const [businessTrips, setBusinessTrips] = useState<any[]>([
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
    ]);

    function handleRemoveCar(index: number) {
        const updatedCars = [...cars];
        updatedCars.splice(index, 1);
        setCars(updatedCars);
        setValue("")
    }    

    const [form, showForm] = useState(false);

    const handleAddTrip = () => {
        // get the form data

        const newTrip = {
            id: 1 as number,
            name: occasion,
            origin: origin,
            destination: destination
        }
        // do something with the form data
        setBusinessTrips([...businessTrips, newTrip])
        showForm(!form)
        setCars([])
    };

    const [occasion, setOccasion] = useState<string>();
    const [origin, setOrigin] = useState<string>();
    const [destination, setDestination] = useState<string>();

    return (
        <div className='company-home-wrapper'>
            <Grid container rowSpacing={4} columnSpacing={{ xs: 1.5, sm: 2, md: 3 }} justifyContent="space-evenly" alignItems={"start"}>
                <Grid item xs={12}>
                    <h1>Business Trips</h1>
                </Grid>
                <Grid item xs={12} md={7}>
                    <div className='box business-trip-box'>
                        {form ?
                            <form className="form">
                                <h2>Create New Business Trip</h2>
                                <div>{cars.map((car, index) => (
                                    <span key={index} className="car-element">
                                        {car}
                                        <span className='remove-button' onClick={() => handleRemoveCar(index)}>
                                            <Close className='close-icon' />
                                        </span>
                                    </span>
                                ))}</div>
                                <Select placeholder="Add car"
                                    value={value}
                                    onChange={(event) => {
                                        setCars(
                                            [...cars, event!]
                                        )
                                        setValue("")
                                    }}
                                    data={["Audi A4 2015", "BMW M440i 2016", "Ford Explorer 2019"]} />
                                <TextInput
                                    label="Occasion:"
                                    placeholder="E.g. Meeting"
                                    value = {occasion}
                                    onChange={(evt) => setOccasion(evt.currentTarget.value)}
                                />
                                <TextInput
                                    label="Origin:"
                                    placeholder="E.g. Valencia"
                                    value = {origin}
                                    onChange={(evt) => setOrigin(evt.currentTarget.value)}
                                />
                                <TextInput
                                    label="Destination:"
                                    placeholder="E.g. Madrid"
                                    value = {destination}
                                    onChange={(evt) => setDestination(evt.currentTarget.value)}
                                />

                            </form>
                            :
                            <ListCard elements={businessTrips.slice(0, 5)} ></ListCard>
                        }
                        <br></br>
                        <br></br>
                        {form && cars.length > 0 ? <Button type="button" onClick={handleAddTrip}>Add Business Trip</Button> : <></>}
                        <Button className='business-trip-button' onClick={() => showForm(!form)}>{form ? "Cancel" : "Add New Business Trip"}</Button>
                    </div>

                </Grid>

            </Grid>
            <FooterDashboard />

        </div>

    );
}