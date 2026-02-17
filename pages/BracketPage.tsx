import React from 'react';

const BracketPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-rivals-bg pt-32 pb-20 px-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-rivals-red/5 to-transparent transform -skew-x-12 pointer-events-none"></div>

      <div className="relative z-10 text-center animate-fade-in-up">
        <i className="fas fa-sitemap text-6xl text-gray-700 mb-6"></i>
        <h2 className="text-5xl md:text-7xl font-anton uppercase italic text-white mb-4">
          TOURNAMENT <span className="text-rivals-red">BRACKET</span>
        </h2>
        <div className="font-orbitron text-rivals-red tracking-[0.3em] uppercase text-sm mb-8 animate-pulse">
          // AWAITING SEEDING DATA...
        </div>
        <p className="font-montserrat text-gray-400 text-lg max-w-lg mx-auto border-r-4 border-rivals-red pr-6 py-2">
          El árbol del torneo se generará automáticamente una vez finalice la fase de inscripción y el draft de capitanes.
        </p>
      </div>
    </div>
  );
};

export default BracketPage;