import { createStyles, Title, Text, Button, Container, Group } from '@mantine/core';
import { Link, Navigate } from 'react-router-dom';
import logo from '../../../logoDark.svg';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],

    [theme.fn.smallerThan('sm')]: {
      fontSize: 100,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

export default function Unsupported() {
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <div className={classes.label}>
        <img src={logo} className="logo" alt="Logo" />{' '}
      </div>
      <Title className={classes.title}>Unsupported device</Title>
      <Text color="dimmed" size="lg" align="center" className={classes.description}>
        Unfortunately, your device is not supported. Trailss currently only support devices 1000px
        or wider.
      </Text>
    </Container>
  );
}
