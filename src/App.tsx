import React from 'react';
<<<<<<< HEAD
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import TeamsOverview from './pages/Teams/TeamsOverview';
import TeamDetail from './pages/Teams/TeamDetail';
=======
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
>>>>>>> main
import './components/HomeSections.css';
import Projects from './pages/Projects';
import Teams from './pages/Teams/Teams';

function App() {
  return (
    <div className="app-shell">
      <ScrollToTop />
      <Navbar />
<<<<<<< HEAD
      <ScrollProgress />
      <Routes>
        <Route path="/" element={<Navigate to="/teams" replace />} />
        <Route path="/teams" element={<TeamsOverview />} />
        <Route path="/teams/:slug" element={<TeamDetail />} />
        <Route path="*" element={<Navigate to="/teams" replace />} />
      </Routes>
      <Footer />
=======
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/teams" element={<Teams />} />
      </Routes>
>>>>>>> main
    </div>
  );
}

export default App;