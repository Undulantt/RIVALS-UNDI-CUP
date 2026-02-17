import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';

const App: React.FC = () => {
  const steps = [
    { 
      step: '01', 
      title: 'REGISTRO INDIVIDUAL', 
      desc: 'Te inscribes solo, no con equipo. Tu habilidad será tu carta de presentación.', 
      icon: 'fa-user-astronaut' 
    },
    { 
      step: '02', 
      title: 'THE SCOUTING GROUNDS', 
      desc: 'Partidas de prueba para definir tu Ranking/MMR interno ante los capitanes.', 
      icon: 'fa-crosshairs' 
    },
    { 
      step: '03', 
      title: 'THE DRAFT', 
      desc: 'Evento en vivo donde los capitanes seleccionan estratégicamente a sus jugadores.', 
      icon: 'fa-users-viewfinder' 
    },
    { 
      step: '04', 
      title: 'U.N.D.I. CUP', 
      desc: 'Inicia la batalla con equipos equilibrados. Solo uno alcanzará la gloria.', 
      icon: 'fa-trophy' 
    },
  ];

  return (
    <div className="min-h-screen bg-rivals-bg text-white font-montserrat overflow-x-hidden selection:bg-rivals-red selection:text-white flex flex-col">
      <Navbar />
      <Hero />
      
      {/* 
        ========================================
        SECCIÓN: PRIZE POOL
        ========================================
      */}
      <section className="py-16 bg-black border-y border-gray-800 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-64 h-full bg-rivals-red/5 transform -skew-x-12"></div>
        <div className="absolute top-0 left-0 w-32 h-full bg-rivals-red/5 transform -skew-x-12"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* Header Title 
                FIX: Increased padding to pr-12 to fix clipping.
            */}
            <div className="text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-anton uppercase italic text-white tracking-wide">
                PRIZE <span className="inline-block text-rivals-red py-2 pr-12 -mr-8">POOL</span>
              </h2>
              <p className="font-orbitron text-gray-400 tracking-widest text-sm mt-2">RECOMPENSAS DE TEMPORADA</p>
            </div>

            {/* Prize Cards Container */}
            <div className="flex flex-wrap justify-center gap-6">
              
              {/* 2nd Place */}
              <div className="w-40 md:w-48 h-40 bg-gray-900/80 border border-gray-700 transform -skew-x-12 flex flex-col items-center justify-center group hover:border-rivals-silver transition-colors">
                 <div className="transform skew-x-12 flex flex-col items-center">
                    <i className="fas fa-medal text-4xl text-gray-400 mb-2 drop-shadow-lg"></i>
                    {/* Increased padding to pr-8 */}
                    <span className="font-anton text-xl text-gray-300 pr-8 -mr-4">2ND PLACE</span>
                    <span className="font-orbitron text-sm text-gray-500">Skin Épica</span>
                 </div>
              </div>

              {/* 1st Place (Main) */}
              <div className="w-48 md:w-56 h-48 bg-rivals-red/10 border-2 border-rivals-red transform -skew-x-12 flex flex-col items-center justify-center shadow-neon-red relative overflow-hidden group">
                 <div className="absolute inset-0 bg-rivals-red/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                 <div className="transform skew-x-12 flex flex-col items-center relative z-10">
                    <i className="fas fa-trophy text-5xl text-rivals-red group-hover:text-white transition-colors mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"></i>
                    {/* Increased padding to pr-8 */}
                    <span className="font-anton text-3xl text-white italic pr-8 -mr-4">WINNER</span>
                    <span className="font-orbitron text-sm font-bold text-rivals-red group-hover:text-white">BATTLE PASS + VIP</span>
                 </div>
              </div>

               {/* 3rd Place */}
               <div className="w-40 md:w-48 h-40 bg-gray-900/80 border border-gray-700 transform -skew-x-12 flex flex-col items-center justify-center group hover:border-rivals-silver transition-colors">
                 <div className="transform skew-x-12 flex flex-col items-center">
                    <i className="fas fa-medal text-4xl text-yellow-800 mb-2 drop-shadow-lg"></i>
                    {/* Increased padding to pr-8 */}
                    <span className="font-anton text-xl text-yellow-700 pr-8 -mr-4">3RD PLACE</span>
                    <span className="font-orbitron text-sm text-gray-500">Cosméticos</span>
                 </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================
        SECCIÓN: CÓMO FUNCIONA (TIMELINE)
        ========================================
      */}
      <section className="py-24 px-6 bg-gradient-to-b from-rivals-bg to-gray-900 relative">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header 
              FIX: Increased padding to pr-16.
          */}
          <div className="flex flex-col items-center mb-20 text-center">
             <span className="text-rivals-red font-orbitron font-bold tracking-[0.3em] text-sm mb-2">SYSTEM // WORKFLOW</span>
             <h2 className="text-4xl md:text-5xl font-anton uppercase italic text-white">
               SISTEMA DE <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-rivals-red to-white py-2 pr-16 -mr-8">DRAFT</span>
             </h2>
             <div className="w-24 h-1 bg-rivals-red mt-6 transform -skew-x-12 shadow-neon-red"></div>
          </div>

          {/* Timeline Container */}
          <div className="relative">
            
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gray-800 z-0">
               <div className="h-full w-full bg-gradient-to-r from-rivals-red/0 via-rivals-red/50 to-rivals-red/0"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-4 relative z-10">
              {steps.map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center group">
                  
                  {/* Icon Wrapper */}
                  <div className="w-24 h-24 bg-black border-2 border-gray-700 group-hover:border-rivals-red transition-colors duration-300 transform rotate-45 flex items-center justify-center mb-8 relative shadow-lg group-hover:shadow-neon-red">
                    {/* Inner Content (Counter-rotated) */}
                    <div className="transform -rotate-45 flex flex-col items-center">
                       <i className={`fas ${item.icon} text-3xl text-gray-400 group-hover:text-rivals-red transition-colors duration-300`}></i>
                    </div>
                    {/* Step Number Badge */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-rivals-red transform -rotate-45 flex items-center justify-center shadow-md">
                       <span className="font-anton text-white text-sm transform rotate-45">{item.step}</span>
                    </div>
                  </div>

                  {/* Text Content */}
                  <h3 className="font-orbitron font-bold text-xl text-white mb-3 italic uppercase group-hover:text-rivals-red transition-colors pr-2">
                    {item.title}
                  </h3>
                  <p className="font-montserrat text-gray-400 text-sm leading-relaxed max-w-[250px]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================
        SECCIÓN: HOSTED BY (ORGANIZERS)
        ========================================
      */}
      <section className="relative py-20 bg-zinc-900 border-t border-rivals-red/30 overflow-hidden">
          {/* Texture & Background elements */}
          <div className="absolute -left-20 top-0 w-96 h-96 bg-rivals-red/5 rounded-full blur-[100px]"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left: Team Logo */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center group">
                    {/* Animated Glow */}
                    <div className="absolute inset-0 bg-rivals-red/10 rounded-full animate-pulse blur-2xl"></div>
                    
                    {/* Logo Shape (Hexagon-ish or rotated square) */}
                    <div className="relative w-full h-full bg-gradient-to-br from-black to-zinc-800 border-2 border-rivals-red/50 transform rotate-45 flex items-center justify-center shadow-[0_0_30px_rgba(230,36,41,0.2)] transition-transform duration-500 group-hover:rotate-[225deg] overflow-hidden">
                         {/* Counter rotate icon so it stays upright initially, or let it rotate */}
                         <div className="transform -rotate-45 group-hover:rotate-[-225deg] transition-transform duration-500 w-full h-full flex items-center justify-center">
                            {/* LOGO IMAGE REPLACING ICON */}
                            <img 
                              src="https://i.postimg.cc/9QxV1Tt9/Simbioxis.png" 
                              alt="SymbioSix Team Logo" 
                              className="w-full h-full object-cover"
                            />
                         </div>
                    </div>
                    
                    {/* Decorative orbit */}
                    <div className="absolute inset-[-20px] border border-dashed border-gray-700 rounded-full animate-spin-slow opacity-30"></div>
                </div>
              </div>

              {/* Right: Info */}
              <div className="lg:col-span-7 text-center lg:text-left space-y-8">
                  <div>
                      <span className="text-rivals-red font-orbitron font-bold tracking-[0.2em] uppercase text-sm">Hosted By</span>
                      
                      {/* 
                         FIX: Increased padding to pr-16 and adjusted margin.
                      */}
                      <h2 className="text-5xl md:text-7xl font-anton italic uppercase text-white leading-tight mt-2">
                          SYMBIO<span className="inline-block text-transparent bg-clip-text bg-gradient-to-br from-rivals-red to-white py-4 pr-16 -mr-12">SIX</span>
                      </h2>
                  </div>
                  
                  <p className="font-montserrat text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                      Somos un colectivo de jugadores competitivos de Marvel Rivals. Organizamos la <strong>U.N.D.I. CUP</strong> por amor puro a la comunidad, con el objetivo de elevar el nivel de la región y descubrir nuevos talentos. Sin lucro, solo gloria.
                  </p>

                  {/* 3 Pillars */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-y border-white/5">
                      <div className="flex flex-col items-center lg:items-start gap-2">
                          <div className="w-10 h-10 bg-rivals-red/10 rounded flex items-center justify-center mb-1">
                             <i className="fas fa-chart-line text-rivals-red"></i>
                          </div>
                          <h4 className="font-anton text-xl text-white uppercase tracking-wide">Competitividad</h4>
                          <p className="text-xs text-gray-500 font-orbitron uppercase">Alto Nivel & MMR</p>
                      </div>
                      <div className="flex flex-col items-center lg:items-start gap-2">
                           <div className="w-10 h-10 bg-rivals-red/10 rounded flex items-center justify-center mb-1">
                             <i className="fas fa-users text-rivals-red"></i>
                          </div>
                          <h4 className="font-anton text-xl text-white uppercase tracking-wide">Comunidad</h4>
                          <p className="text-xs text-gray-500 font-orbitron uppercase">Creciendo Juntos</p>
                      </div>
                       <div className="flex flex-col items-center lg:items-start gap-2">
                           <div className="w-10 h-10 bg-rivals-red/10 rounded flex items-center justify-center mb-1">
                             <i className="fas fa-handshake text-rivals-red"></i>
                          </div>
                          <h4 className="font-anton text-xl text-white uppercase tracking-wide">Fair Play</h4>
                          <p className="text-xs text-gray-500 font-orbitron uppercase">Reglas Claras</p>
                      </div>
                  </div>

                  {/* Action Button 
                      UPDATED: Now links to the leader's Discord profile
                  */}
                  <div className="pt-2 flex justify-center lg:justify-start">
                       <a 
                         href="https://discord.com/users/929791227245789255" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="group relative inline-flex items-center gap-3 px-6 py-3 bg-zinc-800 border border-gray-600 hover:border-rivals-red transition-all duration-300 transform -skew-x-12"
                        >
                          <span className="font-anton uppercase tracking-wider text-white group-hover:text-rivals-red transform skew-x-12 transition-colors pr-2">
                              SCRIM WITH US
                          </span>
                          <i className="fas fa-gamepad text-gray-400 group-hover:text-rivals-red transform skew-x-12 transition-colors"></i>
                       </a>
                  </div>
              </div>

            </div>
          </div>
      </section>

      {/* Footer is now added at the end of the layout */}
      <Footer />

    </div>
  );
};

export default App;