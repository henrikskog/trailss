import './App.css';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Landing from "./components/landing/Landing";
import Map from './components/shared/map/Map';
import NotFound from './components/shared/notfound/NotFound';
import Dashboard from './components/user/dashboard/Dashboard';


function AppRouter(props: any) {
    function RequireAuth({ children }:any) {
        //const { authed } = useAuth();
        console.log(location.pathname)
        return true ? children : <Navigate to="/login" replace />;
      }
    const location = useLocation();  
    return (
        <div className={location.pathname !== "/dashboard"? "main" : "main-logged"}>
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
