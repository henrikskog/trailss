import './App.css';
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";

import Landing from "./components/landing/Landing";
import Map from './components/shared/map/Map';
import NotFound from './components/shared/notfound/NotFound';
import Dashboard from './components/user/dashboard/Dashboard';
import useAuth from './components/user/auth/AuthContext/AuthProvider';
import Login from './components/user/auth/login/Login';
import Register from './components/user/auth/register/Register';
import MapsExample from './components/shared/map/MapsExample'
import { ReactNode } from 'react';


function AppRouter(props: any) {
    const { user } = useAuth();

    function RequireAuth({ children }: {children: JSX.Element}): JSX.Element {
        if(!user) {
            return <Navigate to="/login" replace />;
        }

        return children 
    }

    const location = useLocation();  
    return (
        <div className={location.pathname !== "/dashboard"? "main" : "main-logged"}>
            <Routes>
                <Route path='*' element={<NotFound />} />
                <Route path="/" element={<Landing />} />
                <Route path="/map" element={<Map />} />
                <Route path="/mapTemp" element={<Map />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={
                    <RequireAuth>
                        <Dashboard />
                    </ RequireAuth>
                } />
                <Route path='/user/settings' element={<Map />} />
            </Routes>
        </div>
    )
}

export default AppRouter;
