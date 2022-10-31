import React, { useEffect, useState } from 'react';
import './Form.scss';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from '@mantine/form';
import { NumberInput, TextInput, Button } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { Select } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';


import axios from 'axios';

interface Props {
    calculateRoute: (origin:string, destination: string) => void;
}

const Form: React.FC<Props> = ({calculateRoute}) => {
    const baseURL = "https://www.fueleconomy.gov/";


    const form = useForm({
        initialValues: { origin: '', destination: '', date: 0, passengers: 1, carYear: 2000, consumption: 0 },

        // functions will be used to validate values at corresponding key
        validate: {
            origin: (value: string) => (value.length > 3 && value.length < 50 ? null : 'Insert a valid Location'),
            destination: (value: string) => (value.length > 3 && value.length < 50 ? null : 'Insert a valid Location'),
            date: (value: any) => (value ? null : 'Date must be provided'),
            passengers: (value: number) => (value === 0 || value > 10 ? 'Wrong number of passengers' : null),
            carYear: (value: number) => (value < 1980 || value > CurrentYear ? `Select a year between 1960-${CurrentYear}` : null),
            consumption: (value: number) => (value === 0 && searchMakeValue === '' &&  searchMakeValue === '' ? "Indicate consumption if your model isn't in the list": null)
        },
    });


    const [makes, setMakes] = useState([])
    const [models, setModels] = useState([])

    const [yearValue, setYearValue] = useDebouncedValue(form.values.carYear, 200);
    const [searchMakeValue, onSearchMakeChange] = useState('');
    const [searchModelValue, onSearchModelChange] = useState('');


    useEffect(() => {
        handleYear()
    }, [yearValue]);

    useEffect(() => {
        handleMake()
    }, [searchMakeValue]);


    const CurrentYear = new Date().getFullYear()


    const handleYear = () => {
        if (form.values.carYear > 1960 && form.values.carYear <= CurrentYear) {
            axios.get(baseURL + `/ws/rest/vehicle/menu/make?year=${form.values.carYear}`).then((response) => {
                try {
                    let responseMakes = response.data.menuItem.map((item: any) => item.value)
                    setMakes(responseMakes)
                } catch {
                    setModels([])
                    setMakes([])
                }
                setModels([])
                onSearchMakeChange('')
                onSearchModelChange('')
            });
        }
    }

    const handleMake = () => {
        axios.get(baseURL + `/ws/rest/vehicle/menu/model?year=${form.values.carYear}&make=${searchMakeValue}`).then((response) => {
            try {
                let responseModels = response.data.menuItem.map((item: any) => item.value)
                setModels(responseModels)
            } catch {
                setModels([])
            }
            onSearchModelChange('')
        });
    }

    return (
            <div className='search-form'>
                <h1>Your trip</h1>
                <form className='form' onSubmit={form.onSubmit((values: any) => {
                    calculateRoute(values.origin, values.destination)
                })}>
                    <TextInput label="Origin:" placeholder="E.g. Times Square" {...form.getInputProps('origin')} />
                    <TextInput mt="sm" label="Destination:" placeholder="E.g. Vegas" {...form.getInputProps('destination')} />
                    <div className='double-line'>
                        <div className='double-line-div margin'>
                            <DatePicker placeholder="Pick date" label="Event date" withAsterisk {...form.getInputProps('date')} />

                        </div>
                        <div className='double-line-div'>
                            <NumberInput
                                mt="sm"
                                label="Num. Passengers:"
                                placeholder="1"
                                min={1}
                                max={10}
                                {...form.getInputProps('passengers')}
                            />
                        </div>

                    </div>
                    <NumberInput
                        mt="sm"
                        label="Car Year"
                        placeholder="E.g. 1985"
                        min={1960}
                        max={CurrentYear}
                        {...form.getInputProps('carYear')}
                    />
                    <div className='double-line'>
                        <div className='double-line-div margin'>
                            {makes.length !== 0 &&
                            <Select
                                mt="sm"
                                label="Car Make:"
                                searchable
                                clearable
                                data={makes}
                                onSearchChange={onSearchMakeChange}
                                searchValue={searchMakeValue}
                            />
                            }
                            {makes.length === 0 &&
                            <Select
                                mt="sm"
                                label="Car Make:"
                                searchable
                                clearable
                                disabled
                                data={makes}
                                onSearchChange={onSearchMakeChange}
                                searchValue={searchMakeValue}
                            />
                            }

                        </div>
                        <div className='double-line-div'>
                            {models.length !== 0 &&
                            <Select
                                mt="sm"
                                label="Car model:"
                                searchable
                                clearable
                                data={models}
                                onSearchChange={onSearchModelChange}
                                searchValue={searchModelValue}
                            />}
                            {models.length === 0 &&
                            <Select
                                mt="sm"
                                label="Car model:"
                                searchable
                                clearable
                                disabled
                                data={models}
                                onSearchChange={onSearchModelChange}
                                searchValue={searchModelValue}
                            />}

                        </div>
                    </div>
                    <NumberInput
                        mt="sm"
                        label="Comsumption"
                        placeholder="E.g. 5l/100km"
                        min={0}
                        max={100}
                        {...form.getInputProps('consumption')}
                    />
                    <div className='submit'>
                        <Button type="submit" mt="sm">
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        
    );
}

export default Form