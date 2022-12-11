import { useState } from 'react';
import './Dashboard.scss';
import MenuBar from './components/menubar/MenuBar';
import HistoryUser from './components/history/HistoryUser';
import UserSettings from '../settings/UserSettings';

import {
    IconHome2,
    IconCalendarStats,
    IconUser,
    IconCar,
} from '@tabler/icons';
import Cars from '../../company/dashboard/components/Cars';
import UserMapPage from '../user-map-page/UserMapPage';

export default function Dashboard() {
    const [content, setContent] = useState("Home")

const mockdataUser = [
    { icon: IconHome2, label: 'Home' },
    { icon: IconCalendarStats, label: 'History' },
    { icon: IconUser, label: 'Account' },
    { icon: IconCar, label: 'Cars' },
];

    function renderSwitch(param: string) {
        switch (param) {
            case 'Home':
                return <UserMapPage />;
            case 'History':
                return <HistoryUser />;
            case 'Account':
                return <UserSettings />;    
            case 'Cars':
                return <Cars />;    
        }
    }
    return (
        <div className="dashboard-user">
            <MenuBar setContent={setContent} data={mockdataUser} />
            <div className="dashboard-user-content">
                {renderSwitch(content)}
            </div>
        </div>
    );
}

