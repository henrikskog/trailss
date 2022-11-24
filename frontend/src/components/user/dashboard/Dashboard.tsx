import React, { useState } from 'react';
import './Dashboard.scss';
import MenuBar from './components/menubar/MenuBar';
import Map  from "../../shared/map/Map"
import useAuth from '../auth/AuthContext/AuthProvider';
import HistoryUser from './components/history/HistoryUser';
import UserSettings from '../settings/UserSettings';

import {
    IconHome2,
    IconCalendarStats,
    IconUser,
} from '@tabler/icons';

export default function Dashboard() {
    const [content, setContent] = useState("")

const mockdataUser = [
    { icon: IconHome2, label: 'Map' },
    { icon: IconCalendarStats, label: 'History' },
    { icon: IconUser, label: 'Account' },
];

    function renderSwitch(param: string) {
        switch (param) {
            case 'History':
                return <HistoryUser />;
            case 'Account':
                return <UserSettings />;    
            default:
                return <Map />;
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

