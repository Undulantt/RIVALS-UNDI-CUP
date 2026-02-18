import React, { useState } from 'react';
import Button from '../components/Button';

const BracketPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-rivals-bg pt-32 pb-20 px-4 relative overflow-x-hidden flex flex-col items-center">
      
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-rivals-red/5 rounded-full blur-[150px] pointer-events-none"></div>
      
      {/* 
        ========================================
        HEADER
        ========================================
      */}
      <div className="text-center mb-12 animate-fade-in-up relative z-10 max-w-4xl">
        <h2 className="text-5xl md:text-7xl font-orbitron font-black text-white tracking-widest uppercase mb-4 drop-shadow-[0_0_25px_rgba(230,36,41,0.8)]">
          LIVE <span className="text-transparent bg-clip-text bg-gradient-to-b from-rivals-red to-red-900">BRACKET</span>
        </h2>
        
        <div className="h-1 w-full max-w-md bg-gradient-to-r from-transparent via-rivals-red to-transparent mx-auto mb-6 shadow-neon-red"></div>
        
        <p className="font-montserrat text-gray-300 text-lg md:text-xl uppercase tracking-[0.2em] font-bold">
          Seguimiento en tiempo real <span className="text-rivals-red mx-2">//</span> U.N.D.I. CUP
        </p>
      </div>

      {/* 
        ========================================
        MAIN BRACKET CONTAINER
        ========================================
      */}
      <div className="w-full max-w-[1400px] relative z-10 animate-fade-in-up delay-100 mb-12">
        
        {/* Outer Glow & Border */}
        <div className="relative w-full border-[3px] border-rivals-red bg-black shadow-[0_0_40px_rgba(230,36,41,0.3)] overflow-hidden">
            
            {/* HUD Corner Accents (Decorative) */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-white z-20 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-white z-20 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-white z-20 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-white z-20 pointer-events-none"></div>

            {/* Loading State Overlay */}
            {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 z-0">
                    <div className="relative mb-6">
                        <div className="absolute inset-0 bg-rivals-red blur-xl opacity-20 animate-pulse"></div>
                        <i className="fas fa-satellite-dish text-6xl text-rivals-red animate-pulse relative z-10"></i>
                    </div>
                    <span className="font-orbitron text-white text-xl tracking-[0.3em] animate-pulse">
                        CARGANDO DATOS DEL TORNEO...
                    </span>
                    <span className="font-mono text-rivals-red text-xs mt-2">ESTABLECIENDO ENLACE SEGURO</span>
                </div>
            )}

            {/* Challonge Iframe */}
            {/* Note: Using /module endpoint usually removes the Challonge header/footer for cleaner embedding */}
            <iframe
                src="https://challonge.com/es/3d3x275w/module"
                title="Torneo U.N.D.I. CUP Bracket"
                width="100%"
                height="100%"
                className={`relative z-10 w-full transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                style={{ minHeight: '800px' }} 
                frameBorder="0"
                scrolling="auto"
                allowTransparency={true}
                onLoad={() => setIsLoading(false)}
            ></iframe>
        </div>
      </div>

      {/* 
        ========================================
        FOOTER ACTION
        ========================================
      */}
      <div className="relative z-10 text-center">
          <p className="font-montserrat text-gray-500 text-sm mb-6">¿Problemas visualizando el cuadro?</p>
          <Button
            href="https://challonge.com/es/3d3x275w"
            target="_blank"
            variant="outline"
            icon="fas fa-external-link-alt"
            className="hover:!bg-rivals-red hover:!text-white hover:!ring-rivals-red"
          >
            ABRIR EN PANTALLA COMPLETA
          </Button>
      </div>

    </div>
  );
};

export default BracketPage;