import React from 'react';

import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import FAQ from './pages/FAQ';
import './components/HomeSections.css';
import Projects from './pages/Projects';
import Teams from './pages/Teams/Teams';

function App() {
  return (
    <div className="app-shell">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/faqs" element={<FAQ />} />
      </Routes>
    </div>
  );
}

export default App;