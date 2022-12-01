import { Anchor, Button, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../AuthContext/AuthProvider';
import './Login.scss';

export default function Login(props: any) {
  const navigate = useNavigate();
  const { login, error, user, loginCompany } = useAuth();

  useEffect(() => {
    if (user !== null) {
      navigate('/dashboard');
    }
  }, [user]);

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
    <div className="container">
      <form
        className="form"
        onSubmit={form.onSubmit((values: any) => props.business ? loginCompany("", "") : login(values['username'], values['password']))}
      >
        {error}
        
        <h1 id="header">{props.business ? "Business log in" : "Log in" }</h1>
        <TextInput placeholder="Username" {...form.getInputProps('username')} mb={'sm'} />
        <PasswordInput placeholder="Password" {...form.getInputProps('password')} />
        <div className="submit">
          <Button type="submit" mt="sm" className="submitButton">
            Login
          </Button>
        </div>
        <Anchor
          component="button"
          type="button"
          color="dimmed"
          size="xs"
          mt="xs"
          onClick={() => navigate('/register')}
        >
          Forgot password?
        </Anchor>

        <Anchor
          component="button"
          type="button"
          color="dimmed"
          onClick={() => navigate('/register')}
          size="xs"
          mt="xs"
        >
          Don't have an account? Register
        </Anchor>
      </form>
    </div>
  );
}
