import React, { useState } from 'react';
import logo from './logo.svg';
import Landing from './components/landing/Landing';
import './App.css';
import AppRouter from './AppRouter';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

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
