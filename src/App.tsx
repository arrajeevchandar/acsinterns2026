import React, { useCallback, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SplashScreen from './components/SplashScreen/SplashScreen';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import HomePage from './pages/HomePage/HomePage';
import TeamsOverview from './pages/Teams/TeamsOverview';
import TeamDetail from './pages/Teams/TeamDetail';
import './components/HomeSections.css';

function App() {
  const [splashDone, setSplashDone] = useState(
    () => sessionStorage.getItem('acs-splash-played') === '1'
  );
  const [contentReady, setContentReady] = useState(
    () => sessionStorage.getItem('acs-splash-played') === '1'
  );

  const handleSplashComplete = useCallback(() => {
    sessionStorage.setItem('acs-splash-played', '1');
    setSplashDone(true);
    window.setTimeout(() => setContentReady(true), 180);
  }, []);

  return (
    <div className="app-shell">
      <Navbar />
      <ScrollProgress />
      <Routes>
        <Route path="/" element={<HomePage contentReady={contentReady} />} />
        <Route path="/teams" element={<TeamsOverview />} />
        <Route path="/teams/:slug" element={<TeamDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      {!splashDone && <SplashScreen onComplete={handleSplashComplete} />}
    </div>
  );
}

export default App;
