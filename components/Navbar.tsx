import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Información', path: '/informacion' },
    { name: 'Agenda', path: '/agenda' },
    { name: 'Equipos', path: '/equipos' },
    { name: 'Bracket', path: '/bracket' },
    { name: 'Contacto', path: '/contacto' },
  ];

  // Helper to check active state
  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 h-[70px] flex items-center border-b-2 border-rivals-red/80 ${
        isScrolled 
          ? 'bg-black shadow-[0_4px_20px_rgba(230,36,41,0.2)]' 
          : 'bg-black/95 backdrop-blur-sm'
      }`}
    >
      {/* LEFT: LOGO */}
      <div className="h-full bg-black pl-6 pr-8 flex items-center relative z-20 min-w-fit">
        <Link to="/" className="group flex items-center gap-3">
          <img 
            src="https://i.postimg.cc/9QxV1Tt9/Simbioxis.png" 
            alt="SymbioSix Logo" 
            className="h-12 w-auto object-contain transform -skew-x-12 drop-shadow-[0_0_5px_rgba(230,36,41,0.5)] transition-transform duration-300 group-hover:scale-110"
          />
          <div className="flex flex-col leading-none transform -skew-x-12">
            <span className="font-orbitron font-black text-2xl tracking-tighter text-white py-1 pr-1">
              SYMBIOSIX
            </span>
          </div>
        </Link>

        {/* Separator Line */}
        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-8 bg-gray-700 transform rotate-12"></div>
      </div>

      {/* CENTER: NAVIGATION (Desktop) */}
      <div className="hidden lg:flex h-full flex-1 items-center justify-start pl-4 overflow-hidden">
        {navLinks.map((link, index) => (
          <div key={link.name} className="h-full flex items-center relative group">
            <Link 
              to={link.path}
              className={`
                h-full flex items-center px-4 xl:px-6
                font-anton text-lg tracking-wider uppercase italic whitespace-nowrap pr-1
                transition-colors duration-200
                ${isActive(link.path) ? 'text-rivals-red' : 'text-gray-300 hover:text-white'}
              `}
            >
              {link.name}
            </Link>

            {/* Hover/Active Effect: Red bottom bar with skew */}
            <div className={`
              absolute bottom-0 left-0 w-full h-[4px] bg-rivals-red transform -skew-x-12 origin-bottom
              transition-transform duration-200
              ${isActive(link.path) ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'}
            `}></div>

            {/* Divider */}
            {index !== navLinks.length - 1 && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-4 bg-gray-800 transform rotate-12"></div>
            )}
          </div>
        ))}
      </div>

      {/* RIGHT: UTILS & CTA */}
      <div className="ml-auto h-full flex items-center">

        {/* Mobile Toggle — visible solo en móvil, ANTES del botón INSCRIBIRSE */}
        <button 
          className="lg:hidden text-white text-2xl focus:outline-none px-5"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>

        {/* GIANT RED BUTTON — oculto en móvil para no tapar el hamburger */}
        <a 
          href="https://docs.google.com/forms/d/e/1FAIpQLSfXJHoNVXVrE_R4C-cT4qYFC4mACrINLmjXeYgSkku_7_rDqQ/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex relative h-full bg-rivals-red items-center px-8 md:px-10 group overflow-hidden min-w-[180px] justify-center text-center transition-colors duration-300 hover:bg-white"
          style={{ clipPath: "polygon(20px 0, 100% 0, 100% 100%, 0% 100%)" }}
        >
          {/* Overlay effect */}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>

          <span className="font-anton text-xl md:text-2xl uppercase tracking-wide text-white group-hover:text-rivals-red italic relative z-10 whitespace-nowrap transition-colors duration-300 pr-1">
            INSCRIBIRSE
          </span>
        </a>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div className={`lg:hidden fixed top-[70px] left-0 w-full bg-black/95 border-b-4 border-rivals-red backdrop-blur-xl transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-screen py-8' : 'max-h-0 py-0'}`}>
        <div className="flex flex-col items-center gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`font-anton text-2xl uppercase italic tracking-widest pr-1 ${isActive(link.path) ? 'text-rivals-red' : 'text-white hover:text-rivals-red'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {/* INSCRIBIRSE también disponible en el menú móvil */}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfXJHoNVXVrE_R4C-cT4qYFC4mACrINLmjXeYgSkku_7_rDqQ/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 bg-rivals-red px-10 py-3 font-anton text-2xl uppercase italic tracking-widest text-white hover:bg-white hover:text-rivals-red transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            INSCRIBIRSE
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;