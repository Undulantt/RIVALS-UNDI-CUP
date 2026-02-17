import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import InformacionPage from './pages/InformacionPage';
import EquiposPage from './pages/EquiposPage';
import BracketPage from './pages/BracketPage';
import ContactoPage from './pages/ContactoPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-rivals-bg text-white font-montserrat overflow-x-hidden selection:bg-rivals-red selection:text-white">
        {/* Navbar: Fixed positioning handled inside component, but we ensure z-index context here if needed */}
        <Navbar />
        
        {/* Main Content: Flex grow pushes Footer down. Added top padding to account for fixed Navbar if needed, 
            though individual pages handle their own paddingTop currently. */}
        <main className="flex-grow w-full relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/informacion" element={<InformacionPage />} />
            <Route path="/equipos" element={<EquiposPage />} />
            <Route path="/bracket" element={<BracketPage />} />
            <Route path="/contacto" element={<ContactoPage />} />
          </Routes>
        </main>

        {/* Footer: Always at bottom */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;