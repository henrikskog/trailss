import React, { useState } from 'react';
import './UserSettings.scss';
import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function UserSettings() {

  const form = useForm({
    initialValues: { username: '', password: '' },
    validate: {
      username: (value: string) =>
        value.length > 3 && value.length < 50 ? null : 'Insert a valid username',
      password: (value: string) =>
        value.length > 3 && value.length < 50 ? null : 'Insert a valid password',
    },
  });

  return (
    <div className='user-settings'>
      <h4>You and Trailss</h4>
      <div className='user-settings-form'>
        <form
          className="form"
          onSubmit={form.onSubmit((values: any) => console.log("abuela"))}
        >
          <TextInput label="Change username:" placeholder="Username" {...form.getInputProps('username')} mb={'sm'} />
          <TextInput label="Change password:" placeholder="Password" {...form.getInputProps('password')} />
        </form>
        {/* <div className='change-user'>
            <h4>Change username</h4>
            <input type="text" placeholder='username'/>
        </div>
        <div className='change-password'>
            <h4>Change password</h4>
            <input type="password" placeholder='password'/>
        </div> */}
        <div>
          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
}
