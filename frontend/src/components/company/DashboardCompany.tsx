import React, { useState } from 'react';
import './DashboardCompany.scss';
import { MenuBar } from '../user/dashboard/components/menubar/MenuBar';
import Map from '../shared/map/Map';
import useAuth from '../user/auth/AuthContext/AuthProvider';
import UserSettings from '../user/settings/UserSettings';
import Home from './dashboard/components/Home';
import Fleets from './dashboard/components/Fleets';
import Statistics from './dashboard/components/Statistics';
import BusinessTrips from './dashboard/components/BusinessTrips';
import Certificates from './dashboard/components/Certificates';


export default function DashboardCompany() {
    const [content, setContent] = useState("")

    function renderSwitch(param: string) {
        switch (param) {
            case 'Fleets':
                return <Fleets />;
            case 'Business trips':
                return <BusinessTrips />;
            case 'Certificates':
                return <Certificates />;
            case "Statistics":
                return <Statistics />;
            case 'Account':
                return <UserSettings />;  
            default:
                return <Home />;
        }
    }
    return (
        <div className="dashboard-user">
            <MenuBar isCompanyDashboard setContent={setContent}/>
            <div className="dashboard-user-content">
                {renderSwitch(content)}
            </div>
        </div>
    );
}

