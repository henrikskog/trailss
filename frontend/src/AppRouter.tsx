import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./components/landing/Landing";
import Map from './components/shared/map/Map';

function AppRouter() {
    return (
        <div className='main'>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/map" element={<Map />} />
            </Routes>
        </div>
    )
}

export default AppRouter;
