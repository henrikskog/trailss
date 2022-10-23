import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./components/landing/Landing";
import Map from './components/shared/map/Map';
import UserSettings from './components/user/settings/UserSettings';

function AppRouter() {
    return (
        <div className='main'>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/map" element={<Map />} />
                <Route path='/user/settings' element={<UserSettings />} />
            </Routes>
        </div>
    )
}

export default AppRouter;
