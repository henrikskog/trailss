import { useLocation } from 'react-router-dom';
import './App.css';
import AppRouter from './AppRouter';
import Navbar from './components/navbar/Navbar';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  const pathName = useLocation().pathname
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <div className="App">
          {!(pathName == '/dashboard' || pathName == '/dashboardCompany' )  && <Navbar />}
          <AppRouter />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
