import React from 'react';
import logo from './logo.svg';
import Landing from './components/landing/Landing';
import Home from './components/home/Home';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/normal' element={<Home/>}/>
        </Routes>    
      </BrowserRouter>
    </div>

  );
}

export default App;
