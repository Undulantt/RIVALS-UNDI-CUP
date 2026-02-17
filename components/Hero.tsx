import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const Hero: React.FC = () => {
  return (
    <div id="home" className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-rivals-bg">
      
      {/* 
        ========================================
        FONDO (Background + Overlay)
        ========================================
      */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://i.postimg.cc/BnBMHB30/hero-background.jpg"
          alt="Marvel Rivals Tournament Background" 
          className="w-full h-full object-cover"
        />
        
        {/* Overlay Gradiente Rojo Oscuro */}
        <div className="absolute inset-0 bg-gradient-to-t from-rivals-bg via-black/80 to-rivals-darkRed/30"></div>
        
        {/* Grid pattern styled like a HUD */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 mix-blend-overlay"></div>
        
        {/* Decorative diagonal lines - Red tint */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-rivals-red/10 to-transparent transform -skew-x-12 mix-blend-screen pointer-events-none"></div>
      </div>

      {/* 
        ========================================
        CONTENIDO PRINCIPAL
        ========================================
      */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto flex flex-col items-center gap-4 animate-fade-in-up mt-16">
        
        {/* Top Tagline */}
        <div className="flex items-center gap-4 mb-2">
            <span className="px-4 py-1 bg-rivals-red text-white text-sm font-anton uppercase transform -skew-x-12 shadow-neon-red">
                <span className="block transform skew-x-12">TEMPORADA 1</span>
            </span>
            <span className="text-gray-300 text-sm font-montserrat font-bold tracking-[0.2em] uppercase">
                PC Y CONSOLA
            </span>
        </div>

        {/* Título Principal 
            Aseguramos padding gigante (pr-16) para la itálica
        */}
        <h1 className="font-orbitron font-black text-6xl md:text-8xl lg:text-9xl uppercase italic tracking-tighter text-white leading-none drop-shadow-2xl">
            Rivals <br />
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-br from-rivals-red to-white pb-4 pr-16 -mr-12">
                Tournament
            </span>
        </h1>

        {/* Subtítulo */}
        <p className="font-montserrat text-lg md:text-xl text-gray-300 max-w-3xl font-medium tracking-wide mb-10 mt-6 px-6 border-l-4 border-rivals-red bg-black/40 backdrop-blur-sm py-4 text-left md:text-center md:border-l-0 md:border-t-4 md:py-6">
            Únete a la batalla definitiva en el multiverso. Inscribe a tu equipo, escala en los brackets y reclama la gloria eterna.
        </p>

        {/* Botones de Acción */}
        <div className="flex flex-col md:flex-row gap-8 w-full md:w-auto items-center">
            {/* Botón Central: Ver Reglas (Usamos Link wrapper manual para routing interno) */}
            <Link to="/informacion">
              <div className="relative px-10 py-4 font-anton text-lg tracking-wider uppercase transform -skew-x-12 transition-all duration-300 group inline-flex items-center justify-center gap-2 cursor-pointer active:scale-95 border-0 text-decoration-none bg-rivals-red text-white hover:bg-white hover:text-rivals-red hover:shadow-[0_0_20px_rgba(230,36,41,0.6)]">
                 <div className="transform skew-x-12 flex items-center gap-2 italic pr-1">
                    <i className="fas fa-scroll text-lg"></i>
                    <span>Ver Reglas</span>
                 </div>
              </div>
            </Link>
            
            {/* Botón Discord: Enlace Externo (Usa el componente Button existente que soporta href) */}
            <Button 
                variant="outline" 
                icon="fab fa-discord" 
                href="https://discord.gg/HdBZGKHZ7J" 
                target="_blank"
            >
                Discord Oficial
            </Button>
        </div>

        {/* Elemento Decorativo: Bottom HUD */}
        <div className="absolute -bottom-24 md:bottom-10 w-full flex justify-between px-10 text-gray-500 font-orbitron text-xs tracking-widest opacity-60">
            <span>SYS.ONLINE</span>
            <div className="flex gap-2">
                <div className="w-10 h-1 bg-rivals-red shadow-neon-red"></div>
                <div className="w-2 h-1 bg-gray-600"></div>
                <div className="w-2 h-1 bg-gray-600"></div>
            </div>
            <span>V.1.0.4</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;