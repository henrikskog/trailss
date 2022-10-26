import React from 'react';
import logo from './logo.svg';
import Landing from './components/landing/Landing';
import './App.css';
import AppRouter from './AppRouter';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/user/auth/login/Login';

function App() {
  return (
    <div>
      <Login></Login>
    </div>
  );
}

export default App;
