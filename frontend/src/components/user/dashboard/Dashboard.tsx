import React, { useState } from 'react';
import './Dashboard.scss';
import { MenuBar } from './components/menubar/MenuBar';
import Map  from "../../shared/map/Map"
import useAuth from '../auth/AuthContext/AuthProvider';
import HistoryUser from './components/history/HistoryUser';
import UserSettings from '../settings/UserSettings';

export default function Dashboard() {
    const [content, setContent] = useState("")

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
            <MenuBar setContent={setContent}/>
            <div className="dashboard-user-content">
                {renderSwitch(content)}
            </div>
        </div>
    );
}

