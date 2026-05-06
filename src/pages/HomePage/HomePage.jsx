import React from 'react';
import Hero from '../../components/Hero/Hero';
import Marquee from '../../components/Marquee/Marquee';
import CoreValues from '../../components/CoreValues/CoreValues';
import About from '../../components/About/About';
import Process from '../../components/Process/Process';
import Stats from '../../components/Stats/Stats';
import TeamsPreview from '../../components/TeamsPreview/TeamsPreview';

export default function HomePage({ contentReady }) {
  return (
    <main>
      <Hero contentReady={contentReady} />
      <Marquee />
      <CoreValues />
      <About />
      <Process />
      <Stats />
      <TeamsPreview />
    </main>
  );
}
