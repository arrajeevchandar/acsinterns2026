import React, { useState } from 'react';
import SplashScreen from './components/SplashScreen/SplashScreen';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Marquee from './components/Marquee/Marquee';
import CoreValues from './components/CoreValues/CoreValues';
import Stats from './components/Stats/Stats';
import TeamsPreview from './components/TeamsPreview/TeamsPreview';
import Footer from './components/Footer/Footer';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [contentReady, setContentReady] = useState(false);

  const handleSplashComplete = () => {
    setShowSplash(false);
    // Small delay before revealing content with animations
    setTimeout(() => setContentReady(true), 100);
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      {!showSplash && (
        <>
          <Navbar />
          <main>
            <Hero contentReady={contentReady} />
            <Marquee />
            <CoreValues />
            <Stats />
            <TeamsPreview />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
