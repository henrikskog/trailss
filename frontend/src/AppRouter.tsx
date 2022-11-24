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
import SalesPage from './components/enterprise/SalesPage';
import EnterpriseLogin from "./components/enterprise/EnterpriseLogin";
import DashboardCompany from './components/company/DashboardCompany';


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
                <Route path="/dashboardCompany" element={
                    //<RequireAuth>
                        <DashboardCompany />
                    //</ RequireAuth>
                } />
                <Route path='/user/settings' element={<Map />} />
                <Route path='information' element={<SalesPage />} />
                <Route path='enterprise-login' element={<EnterpriseLogin />} />
            </Routes>
        </div>
    )
}

export default AppRouter;
