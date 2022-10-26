import React, {useState} from 'react';
import './Login.scss';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from '@mantine/form';
import { NumberInput, TextInput, Button, Anchor } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { Select } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import axios from 'axios';

export default function Login() {
  const form = useForm({
    initialValues: { username: '', password: '' },

    // functions will be used to validate values at corresponding key
    validate: {
      username: (value: string) => (value.length > 3 && value.length < 50 ? null : 'Insert a valid username'),
      password: (value: string) => (value.length > 3 && value.length < 50 ? null : 'Insert a valid password'),
    },
  });

  return (
    <div className="container">
      <form className='form' onSubmit={form.onSubmit((values: any) => (console.log(values)))}>
        <h1 id="header">Log in</h1>
        <TextInput placeholder="Username" {...form.getInputProps('username')} mb={"sm"} />
        <TextInput placeholder="Password" {...form.getInputProps('password')} />
        <div className='submit'>
          <Button type="submit" mt="sm" className="submitButton">
            Login
          </Button>
        </div>
        <Anchor
          component="button"
          type="button"
          color="dimmed"
          onClick={() => { }}
          size="xs"
          mt="xs"
        >
          Forget password?
        </Anchor>
          
        <Anchor
          component="button"
          type="button"
          color="dimmed"
          onClick={() => { }}
          size="xs"
          mt="xs"
        >
          
          Don't have an account? Register
        </Anchor>

      </form>
    </div>
  );
}