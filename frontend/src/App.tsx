import { useLocation } from 'react-router-dom';
import './App.css';
import AppRouter from './AppRouter';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <div>
        <div className='App'>
          {
            useLocation().pathname !== "/dashboard" &&
            <Navbar />
          }
          <AppRouter />
        </div>
    </div>

  );
}

export default App;
