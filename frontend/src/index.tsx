import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CompanyAuthProvider } from './components/company/AuthContext/CompanyAuthProvider';
import { AuthProvider } from './components/user/auth/AuthContext/AuthProvider';
import './index.css';
import reportWebVitals from './reportWebVitals';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CompanyAuthProvider>
        <AuthProvider>
          <MantineProvider>
            <QueryClientProvider client={queryClient}>
              <ModalsProvider>
                <NotificationsProvider>
                  <App />
                </NotificationsProvider>
              </ModalsProvider>
            </QueryClientProvider>
          </MantineProvider>
        </AuthProvider>
      </CompanyAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
