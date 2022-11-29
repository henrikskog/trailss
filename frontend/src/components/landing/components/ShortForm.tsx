import React, { useState } from 'react';
import './ShortForm.scss';
import { useForm } from '@mantine/form';
import { TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { FaSearch } from "react-icons/fa";

export default function ShortForm() {
    const form = useForm({
        initialValues: {
            origin: '',
            destination: '',
            date: 0,
        },

        // functions will be used to validate values at corresponding key
        validate: {
            origin: (value: string) =>
                value.length > 3 && value.length < 50 ? null : 'Insert a valid Location',
            destination: (value: string) =>
                value.length > 3 && value.length < 50 ? null : 'Insert a valid Location',
            date: (value: any) => (value ? null : 'Date must be provided'),
        }
    });
    return (
        <form className="shortform"
            onSubmit={form.onSubmit((values: any) => {
                console.log(values)
            })}>
            <TextInput className='left-input'
                placeholder="E.g. Times Square"
                {...form.getInputProps('origin')}
            />
            <div className='lines'></div>
            <TextInput
                mt="sm"
                placeholder="E.g. Vegas"
                {...form.getInputProps('destination')}
            />
            <div className='lines'></div>
            <DatePicker
                placeholder="Pick date"
                {...form.getInputProps('date')}
            />
            <button className="shortform-submit">
                <FaSearch />
            </button>

        </form>
    );
}
