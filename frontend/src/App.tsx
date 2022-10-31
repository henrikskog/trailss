import { useLocation } from 'react-router-dom';
import './App.css';
import AppRouter from './AppRouter';
import Navbar from './components/navbar/Navbar';
import TripInfoContext from './context/TripInfoContext';

function setTripInfo() {
  return {origin: '', destination: '', date: 0, passengers: 1, carYear: 2000, consumption: 0}
}

const tripInfo = {
  origin: 'Albalat de la Ribera', 
  destination: 'Poliña del Xuquer', 
  date: 0, 
  passengers: 1, 
  carYear: 2000, 
  consumption: 69
}

function App() {
  return (
    <TripInfoContext.Provider value={{tripInfo, setTripInfo}}>
      <div>
        <div className='App'>
          {
            useLocation().pathname !== "/dashboard" &&
            <Navbar />
          }
          <AppRouter />
        </div>
      </div>
    </TripInfoContext.Provider>
  );
}

export default App;
