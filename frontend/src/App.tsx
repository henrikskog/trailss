import { useLocation } from 'react-router-dom';
import './App.css';
import AppRouter from './AppRouter';
import Navbar from './components/navbar/Navbar';

function App() {
  const pathName = useLocation().pathname;
  return (
    <div>
      <div className="App">
        {!(pathName == '/dashboard' || pathName == '/dashboardCompany') && <Navbar />}
        <AppRouter />
      </div>
    </div>
  );
}

export default App;
