import React, { useState } from 'react';
import './DashboardCompany.scss';
import useAuth from '../user/auth/AuthContext/AuthProvider';
import UserSettings from '../user/settings/UserSettings';
import Home from './dashboard/components/Home';
import Fleets from './dashboard/components/Fleets';
import Statistics from './dashboard/components/Statistics';
import BusinessTrips from './dashboard/components/BusinessTrips';
import Certificates from './dashboard/components/Certificates';
import NotFoundTitle from '../shared/notfound/NotFound';
import MenuBar from '../user/dashboard/components/menubar/MenuBar';

import {
    TablerIcon,
    IconHome2,
    IconCalendarStats,
    IconUser,
    IconLogout,
    IconSwitchHorizontal,
    IconCar,
    IconPlaneDeparture,
    IconCertificate,
    IconChartBar,
} from '@tabler/icons';

export default function DashboardCompany() {
    const [content, setContent] = useState<string>("Home")

const mockdataCompany = [
    { icon: IconHome2, label: 'Home' },
    { icon: IconCar, label: 'Fleets' },
    { icon: IconPlaneDeparture, label: 'Business trips' },
    { icon: IconCertificate, label: 'Certificates' },
    { icon: IconChartBar, label: 'Statistics' },
    { icon: IconUser, label: 'Account' },
];

    function renderSwitch(param: string) {
        switch (param) {
            case 'Home':
                return <Home />;
            case 'Fleets':
                return <Fleets />;
            case 'Statistics':
                return <Statistics />;
            case 'Business trips':
                return <BusinessTrips />;
            case 'Certificates':
                return <Certificates />;
            case 'Account':
                return <UserSettings />;
            default:
                return <NotFoundTitle />;
        }
    }
    return (
        <div className="dashboard-user">
            <MenuBar isCompanyDashboard setContent={setContent} data={mockdataCompany} />
            <div className="dashboard-user-content">
                {renderSwitch(content)}
            </div>
        </div>
    );
}

