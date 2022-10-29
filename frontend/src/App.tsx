import React from 'react';
import logo from './logo.svg';
import Landing from './components/landing/Landing';
import './App.css';
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
    </div>

  );
}

export default App;
