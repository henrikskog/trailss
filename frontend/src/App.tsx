import React from 'react';
import logo from './logo.svg';
import './App.css';
import VehiclePicker from './components/shared/vehicle-picker/VehiclePicker';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p><VehiclePicker></VehiclePicker></p>
      </header>
    </div>
  );
}

export default App;
