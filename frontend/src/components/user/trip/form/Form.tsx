import React from 'react';
import './Form.scss';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from '@mantine/form';
import { NumberInput, TextInput, Button } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { Select } from '@mantine/core';

import VehiclePicker from '../../../shared/vehicle-picker/VehiclePicker';

export default function Form() {

    const CurrentYear = new Date().getFullYear()

    const form = useForm({
        initialValues: { origin: '', destination: '', date: 0, passengers: 1, carYear: 2000, make: '', model: '', consumption: 0 },

        // functions will be used to validate values at corresponding key
        validate: {
            origin: (value: string) => (value.length > 3 && value.length < 50 ? null : 'Insert a valid Location'),
            destination: (value: string) => (value.length > 3 && value.length < 50 ? null : 'Insert a valid Location'),
            date: (value: any) => (value ? null : 'Date must be provided'),
            passengers: (value: number) => (value === 0 || value > 10 ? 'Wrong number of passengers' : null),
            carYear: (value: number) => (value < 1980 || value > CurrentYear ? 'Passengers cannot be 0' : null),
        },
    });

    return (
        <div className='search-form'>
            <h1>Your trip</h1>
            <form className='form' onSubmit={form.onSubmit((values) => (console.log(values)))}>
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
                        <Select
                            mt="sm"
                            label="Car Make:"
                            searchable
                            clearable
                            data={['React', 'Angular', 'Svelte', 'Vue']}
                        />
                    </div>
                    <div className='double-line-div'>
                        <Select
                            mt="sm"
                            label="Car model:"
                            searchable
                            clearable
                            data={['React', 'Angular', 'Svelte', 'Vue']}
                        />
                    </div>
                </div>
                <div className='submit'>
                    <Button type="submit" mt="sm">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
}
