import React, { useState } from 'react';
import './Dashboard.scss';
import { MenuBar } from './components/menubar/MenuBar';
import Map  from "../../shared/map/Map"

export default function Dashboard() {
    const [content, setContent] = useState("")

    function renderSwitch(param: string) {
        switch (param) {
            case 'History':
                return <div>asdasd</div>;
            case 'Account':
                return <Map />;    
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

