import { Anchor, Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import './Register.scss';


export default function Register() {
  const form = useForm({
    initialValues: { username: '', password: '' },
    validate: {
      username: (value: string) => (value.length > 3 && value.length < 50 ? null : 'Insert a valid username'),
      password: (value: string) => (value.length > 3 && value.length < 50 ? null : 'Insert a valid password'),
    },
  });

  return (
    <div className="container">
      <form className='form' onSubmit={form.onSubmit((values: any) => (console.log(values)))}>
        <h1 id="header">Create a new account</h1>
        <TextInput placeholder="Username" {...form.getInputProps('username')} mb={"sm"} />
        <TextInput placeholder="Password" {...form.getInputProps('password')} mb="sm"Register/>
        <TextInput placeholder="e-Mail" {...form.getInputProps('e-Mail')}/>
        <div className='submit'>
          <Button type="submit" mt="sm" className="submitButton">
            Register
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
          Already have an account? Log in 
        </Anchor>
      </form>
    </div>
  );
}