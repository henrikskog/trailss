import { useState } from 'react';
import { Navbar, Tooltip, UnstyledButton, createStyles, Stack } from '@mantine/core';
import logo from '../../../../../logoDark.svg';
import {
    TablerIcon,
    IconHome2,
    IconCalendarStats,
    IconUser,
    IconLogout,
    IconSwitchHorizontal,
} from '@tabler/icons';
import { Link } from 'react-router-dom';
import useAuth from '../../../auth/AuthContext/AuthProvider';

const useStyles = createStyles((theme) => ({
    link: {
        width: 50,
        height: 50,
        borderRadius: theme.radius.md,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
        },
    },

    active: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
            color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        },
    },
}));

interface NavbarLinkProps {
    icon: TablerIcon;
    label: string;
    active?: boolean;
    onClick?(): void;
}


const mockdata = [
    { icon: IconHome2, label: 'Map' },
    { icon: IconCalendarStats, label: 'History' },
    { icon: IconUser, label: 'Account' },
];

export function MenuBar(props: any) {
    const [active, setActive] = useState(2);
    const {logout} = useAuth()

    const links = mockdata.map((link, index) => (
        <NavbarLink
            {...link}
            key={link.label}
            active={index === active}
            onClick={() => {
                setActive(index)
                props.setContent(link.label)
            }}
        />
    ));

    function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
        const { classes, cx } = useStyles();
        return (
            <Tooltip label={label} position="right" transitionDuration={0}>
                <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
                    <Icon stroke={1.5} />
                </UnstyledButton>
            </Tooltip>
        );
    }

    return (
        <Navbar height={"100%"} width={{ base: 80 }} p="md">
            <Link to="/"><img src={logo} className="logo" alt="Logo" /></Link>
            <Navbar.Section grow mt={50}>
                <Stack justify="center" spacing={0}>
                    {links}
                </Stack>
            </Navbar.Section>
            <Navbar.Section>
                <Stack justify="center" spacing={0}>
                    <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
                    <NavbarLink icon={IconLogout} label="Logout" onClick={() => logout()} />
                </Stack>
            </Navbar.Section>
        </Navbar>
    );
}