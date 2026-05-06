import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import TeamsOverview from './pages/Teams/TeamsOverview';
import TeamDetail from './pages/Teams/TeamDetail';
import './components/HomeSections.css';

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <ScrollProgress />
      <Routes>
        <Route path="/" element={<Navigate to="/teams" replace />} />
        <Route path="/teams" element={<TeamsOverview />} />
        <Route path="/teams/:slug" element={<TeamDetail />} />
        <Route path="*" element={<Navigate to="/teams" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
