import {
  IconCar,
  IconCertificate,
  IconChartBar,
  IconHome2,
  IconPlaneDeparture,
  IconUser,
} from '@tabler/icons';
import { useState } from 'react';
import NotFoundTitle from '../shared/notfound/NotFound';
import MenuBar from '../user/dashboard/components/menubar/MenuBar';
import UserSettings from '../user/settings/UserSettings';
import BusinessTrips from './dashboard/components/BusinessTrips';
import Certificates from './dashboard/components/Certificates';
import Fleets from './dashboard/components/Fleets';
import Home from './dashboard/components/Home';
import Statistics from './dashboard/components/Statistics';
import './DashboardCompany.scss';

import { red } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function DashboardCompany() {
  const [content, setContent] = useState<string>('Home');

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
        <div className="dashboard-user-content">{renderSwitch(content)}</div>
      </div>
  );
}
