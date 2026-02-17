import React from 'react';

const EquiposPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-rivals-bg pt-32 pb-20 px-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
      
      <div className="relative z-10 text-center animate-fade-in-up">
        <i className="fas fa-users-slash text-6xl text-gray-700 mb-6"></i>
        <h2 className="text-5xl md:text-7xl font-anton uppercase italic text-white mb-4">
          ROSTER <span className="text-rivals-red">LOCKED</span>
        </h2>
        <p className="font-montserrat text-gray-400 text-lg max-w-lg mx-auto border-l-4 border-rivals-red pl-6 py-2">
          La lista de equipos se revelará después del Draft en vivo. Mantente atento a Discord para las actualizaciones.
        </p>
      </div>
    </div>
  );
};

export default EquiposPage;