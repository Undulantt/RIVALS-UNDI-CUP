import React from 'react';

const InformacionPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-rivals-bg pt-32 pb-20 px-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
      
      {/* Red Glow Top Right */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rivals-red/5 rounded-full blur-[80px]"></div>

      <div className="relative z-10 text-center animate-fade-in-up">
        <i className="fas fa-info-circle text-6xl text-gray-700 mb-6"></i>
        <h2 className="text-5xl md:text-7xl font-anton uppercase italic text-white mb-4">
          INFO <span className="text-rivals-red">HUB</span>
        </h2>
        <div className="w-24 h-1 bg-rivals-red mx-auto mb-8 transform -skew-x-12 shadow-neon-red"></div>
        
        <p className="font-montserrat text-gray-400 text-lg max-w-lg mx-auto border-l-4 border-rivals-red pl-6 py-2 bg-black/40">
          No hay información actualmente. Mantente atento a los anuncios oficiales.
        </p>
      </div>
    </div>
  );
};

export default InformacionPage;