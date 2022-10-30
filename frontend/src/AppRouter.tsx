import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./components/landing/Landing";
import Map from './components/shared/map/Map';
import NotFound from './components/shared/notfound/NotFound';
import Dashboard from './components/user/dashboard/Dashboard';


function AppRouter() {
    function RequireAuth({ children }:any) {
        //const { authed } = useAuth();
      
        return true ? children : <Navigate to="/login" replace />;
      }

    return (
        <div className='main'>
            <Routes>
                <Route path='*' element={<NotFound />} />
                <Route path="/" element={<Landing />} />
                <Route path="/map" element={<Map />} />
                <Route path="/dashboard" element={
                    <RequireAuth>
                        <Dashboard />
                    </RequireAuth>
                } />
                <Route path='/user/settings' element={<Map />} />
            </Routes>
        </div>
    )
}

export default AppRouter;
