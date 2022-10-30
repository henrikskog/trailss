import { Anchor, Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../AuthContext/AuthProvider';
import './Register.scss';

export default function Register() {
  const navigate = useNavigate();
  const { register, error, user } = useAuth();

  useEffect(() => {
    if (user?.accessToken) {
      navigate('/dashboard');
    }
  }, [user]);

  const form = useForm({
    initialValues: { email: '', username: '', password: '' },
    validate: {
      email: (value: string) =>
        value.length > 3 && value.length < 50 ? null : 'Insert a valid email',
      username: (value: string) =>
        value.length > 3 && value.length < 50 ? null : 'Insert a valid username',
      password: (value: string) =>
        value.length > 3 && value.length < 50 ? null : 'Insert a valid password',
    },
  });

  return (
    <div className="container">
      <form
        className="form"
        onSubmit={form.onSubmit((values: any) => {
          register(values['email'], values['username'], values['password'])
        }
        )}
      >
        <h1 id="header">Create a new account</h1>
        <TextInput placeholder="e-Mail" type="email" {...form.getInputProps('email')} mb={'sm'} />
        <TextInput placeholder="Username" {...form.getInputProps('username')} mb="sm" />
        <TextInput placeholder="Password" {...form.getInputProps('password')} mb="lg" />
        <Button type="submit" mt="sm" className="submitButton">
          Register
        </Button>
        {error}
        <Anchor
          component="button"
          type="button"
          color="dimmed"
          onClick={() => navigate('/login')}
          size="xs"
          mt="xs"
        >
          Already have an account? Log in
        </Anchor>
      </form>
    </div>
  );
}
