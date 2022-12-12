import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';

import { useEffect } from 'react';
import { setAxiosAuthToken } from './api/axiosConfig';
import CompanyLogin from './components/company/CompanyLogin';
import DashboardCompany from './components/company/DashboardCompany';
import SalesPage from './components/company/SalesPage';
import Landing from './components/landing/Landing';
import NotFound from './components/shared/notfound/NotFound';
import useAuth from './components/user/auth/AuthContext/AuthProvider';
import Login from './components/user/auth/login/Login';
import Register from './components/user/auth/register/Register';
import Dashboard from './components/user/dashboard/Dashboard';
import MapPage from './components/map-page/MapPage';
import { createTheme, ThemeProvider } from '@mui/material';

function AppRouter() {
  const { user } = useAuth();
  const location = useLocation();

  const routes = [
    { path: '/', element: <Landing />, protected: false },
    { path: '/map', element: <MapPage />, protected: false },
    { path: '/login', element: <Login />, protected: false },
    { path: '/register', element: <Register />, protected: false },
    { path: '/dashboard', element: <Dashboard />, protected: true },
    { path: '/dashboardCompany', element: <DashboardCompany />, protected: false },
    { path: '/information', element: <SalesPage />, protected: false },
    { path: '/companyLogin', element: <CompanyLogin />, protected: false },
  ];

  useEffect(() => {
    if(user?.accessToken) {
      setAxiosAuthToken(user.accessToken);
    }

  }, [user]);

  function ProtectedRoute({ children }: { children: JSX.Element }): JSX.Element {
    const prevLocation = useLocation();

    if (!user) {
      return <Navigate to="/login" replace state={{ attemptedPath: prevLocation }} />;
    }
    return children;
  }

  const theme = createTheme();

  return (

    <ThemeProvider theme={theme}>
    <div className={location.pathname !== '/dashboard' ? 'main' : 'main-logged'}>
      <Routes>
        <Route path="*" element={<NotFound />} />
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.protected ? <ProtectedRoute>{route.element}</ProtectedRoute> : route.element
            }
          />
        ))}
      </Routes>
    </div>
</ThemeProvider>
  );
}

export default AppRouter;
