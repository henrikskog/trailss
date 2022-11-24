import { useLocation } from 'react-router-dom';
import './App.css';
import AppRouter from './AppRouter';
import Navbar from './components/navbar/Navbar';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <div className="App">
          {useLocation().pathname !== '/dashboard' && <Navbar />}
          <AppRouter />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
