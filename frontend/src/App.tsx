import React from 'react';
import { Routes, Route ,  useLocation} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import './components/HomeSections.css';
import Projects from './pages/Projects';
import Teams from './pages/Teams/Teams';

import { ZenithProvider } from './context/ZenithContext';
import { ZenithChat } from './components/Zenith/ZenithChat';

function AppShell() {
  const location = useLocation();
  const isFaQ = location.pathname === '/faqs';

  return (
    <ZenithProvider>
      <div className="app-shell">
        <ScrollToTop />
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/teams" element={<Teams />} />
      </Routes>
      
      </div>
      {/* Only show floating chat bubble on non-FAQ pages */}
      {!isFaQ && <ZenithChat />}
    </ZenithProvider>
  );
}

function App() {
  return <AppShell />;
}



export default App;
