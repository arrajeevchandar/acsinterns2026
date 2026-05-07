import React, { useCallback, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from './components/SplashScreen/SplashScreen';
import Navbar from './components/Navbar/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home'
import './components/HomeSections.css';
import Projects from './pages/projecstpage'

function App() {
  

  return (
    <div className="app-shell">
      <ScrollToTop/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>

    </div>
  );
}

export default App;
