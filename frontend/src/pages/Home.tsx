import React, { useCallback, useState } from 'react';
import SplashScreen from '../components/SplashScreen/SplashScreen';
import Hero from '../components/Hero/Hero';
import Marquee from '../components/Marquee/Marquee';
import About from '../components/About/About';
import Process from '../components/Process/Process';
import CoreValues from '../components/CoreValues/CoreValues';
import Stats from '../components/Stats/Stats';
import TeamsPreview from '../components/TeamsPreview/TeamsPreview';
import Footer from '../components/Footer/Footer';
import ScrollProgress from '../components/ScrollProgress/ScrollProgress';


function Home() {
  const hasSeenSplash = sessionStorage.getItem('acs_splash_seen') === 'true';
  const [splashDone, setSplashDone] = useState(hasSeenSplash);
  const [contentReady, setContentReady] = useState(hasSeenSplash);

  const handleSplashComplete = useCallback(() => {
    sessionStorage.setItem('acs_splash_seen', 'true');
    setSplashDone(true);
    window.setTimeout(() => setContentReady(true), 180);
  }, []);
  return (
    <>
      <ScrollProgress />
      <main>
        <Hero contentReady={contentReady} />
        <Marquee />
        <CoreValues />
        <About />
        <Process />
        <Stats />
        <TeamsPreview />
      </main>
      <Footer />

      {!splashDone && <SplashScreen onComplete={handleSplashComplete} />}
    </>
  );
}

export default Home;
