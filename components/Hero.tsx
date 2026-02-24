import React from 'react';
import Button from './Button';

const Hero: React.FC = () => {
  return (
    <div id="home" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-rivals-bg">

      {/* FONDO */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://i.postimg.cc/BnBMHB30/hero-background.jpg"
          alt="Marvel Rivals Tournament Background" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-rivals-bg via-black/80 to-rivals-darkRed/30"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-rivals-red/10 to-transparent transform -skew-x-12 mix-blend-screen pointer-events-none"></div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative z-10 text-center px-4 w-full max-w-6xl mx-auto flex flex-col items-center animate-fade-in-up pt-24 pb-16 md:pt-16 md:pb-10 gap-3 md:gap-4">

        {/* Top Tagline */}
        <div className="flex items-center gap-3 md:gap-4">
          <span className="px-3 py-1 bg-rivals-red text-white text-xs md:text-sm font-anton uppercase transform -skew-x-12 shadow-neon-red">
            <span className="block transform skew-x-12">TEMPORADA 1</span>
          </span>
          <span className="text-gray-300 text-xs md:text-sm font-montserrat font-bold tracking-[0.2em] uppercase">
            PC Y CONSOLA
          </span>
        </div>

        {/* Título Principal */}
        <h1 className="font-orbitron font-black uppercase italic tracking-tighter text-white leading-none drop-shadow-2xl
          text-5xl
          xs:text-6xl
          sm:text-7xl
          md:text-8xl
          lg:text-9xl">
          Torneo de <br />
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-br from-rivals-red to-white pb-2 pr-4 md:pb-4 md:pr-16 md:-mr-12">
            draft
          </span>
        </h1>

        {/* Subtítulo */}
        <p className="font-montserrat text-sm sm:text-base md:text-xl text-gray-300 
          max-w-[280px] sm:max-w-md md:max-w-3xl 
          font-medium tracking-wide 
          mt-1 mb-2 md:mb-6 md:mt-6
          px-4 md:px-6 
          border-l-4 border-rivals-red 
          bg-black/40 backdrop-blur-sm 
          py-3 md:py-6
          text-left md:text-center md:border-l-0 md:border-t-4">
          Únete a la Ultimate Network Duel Invitational Cup, no necesitas equipo, solo tu habilidad.
        </p>

        {/* Botones de Acción */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full md:w-auto items-center">
          <a 
            href="https://docs.google.com/document/d/1T88EWKeyJjcQtDkBPSg1PNtka6Uy4nsdwUyyv4mJcWQ/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto"
          >
            <div className="relative w-full md:w-auto px-10 py-4 font-anton text-lg tracking-wider uppercase transform -skew-x-12 transition-all duration-300 group inline-flex items-center justify-center gap-2 cursor-pointer active:scale-95 bg-rivals-red text-white hover:bg-white hover:text-rivals-red hover:shadow-[0_0_20px_rgba(230,36,41,0.6)]">
              <div className="transform skew-x-12 flex items-center gap-2 italic pr-1">
                <i className="fas fa-scroll text-lg"></i>
                <span>Ver Reglas</span>
              </div>
            </div>
          </a>

          <div className="w-full md:w-auto">
            <Button 
              variant="outline" 
              icon="fab fa-discord" 
              href="https://discord.gg/Qumbascbvb" 
              target="_blank"
            >
              Discord Oficial
            </Button>
          </div>
        </div>

        {/* HUD Bottom */}
        <div className="w-full flex justify-between px-4 md:px-10 text-gray-500 font-orbitron text-xs tracking-widest opacity-60 mt-4 md:mt-8">
          <span>SYS.ONLINE</span>
          <div className="flex gap-2 items-center">
            <div className="w-10 h-1 bg-rivals-red shadow-neon-red"></div>
            <div className="w-2 h-1 bg-gray-600"></div>
            <div className="w-2 h-1 bg-gray-600"></div>
          </div>
          <span>V.2.0.0</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;