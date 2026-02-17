import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-16 border-t border-gray-900 relative overflow-hidden z-20">
      
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-1 bg-gradient-to-r from-transparent via-rivals-red/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center gap-8">
        
        {/* LOGO AREA */}
        <div className="flex flex-col items-center group">
             {/* Logo Image */}
             <div className="mb-4 relative">
                <img 
                  src="https://i.postimg.cc/9QxV1Tt9/Simbioxis.png" 
                  alt="SymbioSix Logo" 
                  className="h-20 w-20 object-cover rounded-full border-2 border-zinc-800 group-hover:border-rivals-red transition-colors duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]" 
                />
             </div>
             
             {/* Text Logo */}
             <h3 className="font-anton text-3xl text-white italic tracking-wider">
                SYMBIO<span className="text-rivals-red">SIX</span>
             </h3>
        </div>

        {/* LEGAL TEXT */}
        <div className="max-w-2xl border-t border-gray-800 pt-8 mt-2">
            <p className="text-gray-500 font-montserrat text-sm leading-relaxed">
                Organizado por <span className="text-gray-300 font-bold">SymbioSix</span>. 
                Este torneo no está afiliado con NetEase Games ni Marvel Games. 
                Todas las marcas registradas son propiedad de sus respectivos dueños.
            </p>
        </div>

        {/* COPYRIGHT */}
        <p className="text-gray-600 font-orbitron text-xs tracking-[0.2em] uppercase mt-4">
            © 2026 SYMBIOSIX - ALL RIGHTS RESERVED.
        </p>

      </div>
    </footer>
  );
};

export default Footer;