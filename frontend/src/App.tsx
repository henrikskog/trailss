import React from 'react';
import logo from './logo.svg';
import Landing from './components/landing/Landing';
import './App.css';
<<<<<<< HEAD
import VehiclePicker from './components/shared/vehicle-picker/VehiclePicker';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p><VehiclePicker></VehiclePicker></p>
      </header>
=======
import AppRouter from './AppRouter';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className='App'>
          <Navbar />
          <AppRouter />
        </div>
      </BrowserRouter>
>>>>>>> master
    </div>

  );
}

export default App;
