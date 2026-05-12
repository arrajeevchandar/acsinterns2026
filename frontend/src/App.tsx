import React, { useCallback, useState } from 'react';
import SplashScreen from './components/SplashScreen/SplashScreen';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Marquee from './components/Marquee/Marquee';
import About from './components/About/About';
import Process from './components/Process/Process';
import CoreValues from './components/CoreValues/CoreValues';
import Stats from './components/Stats/Stats';
import Footer from './components/Footer/Footer';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import './components/HomeSections.css';

function App() {
  const hasSeenSplash = sessionStorage.getItem('acs_splash_seen') === 'true';
  const [splashDone, setSplashDone] = useState(hasSeenSplash);
  const [contentReady, setContentReady] = useState(hasSeenSplash);

  const handleSplashComplete = useCallback(() => {
    sessionStorage.setItem('acs_splash_seen', 'true');
    setSplashDone(true);
    window.setTimeout(() => setContentReady(true), 180);
  }, []);

  return (
    <div className="app-shell">
      <Navbar />
      <ScrollProgress />
      <main>
        <Hero contentReady={contentReady} />
        <Marquee />
        <CoreValues />
        <About />
        <Process />
        <Stats />
      </main>
      <Footer />

      {!splashDone && <SplashScreen onComplete={handleSplashComplete} />}
    </div>
  );
}

export default App;