import React, { useState, useEffect } from 'react';
import Button from '../components/Button';

const InformacionPage: React.FC = () => {
  // Estado para la cuenta regresiva
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Efecto para actualizar el contador cada segundo
  useEffect(() => {
    // FECHA OBJETIVO: 20 DE MARZO
    const currentYear = new Date().getFullYear();
    // Nota: Meses en JS son 0-indexados (0 = Enero, 2 = Marzo)
    const targetDate = new Date(currentYear, 2, 20, 23, 59, 59); 

    // Si la fecha ya pasó este año, usar el siguiente
    if (new Date() > targetDate) {
      targetDate.setFullYear(currentYear + 1);
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const rules = [
    {
      title: "SOLO ENTRY",
      desc: "No necesitas equipo. Te inscribes solo y serás drafteado por un Capitán.",
      icon: "fa-user"
    },
    {
      title: "TIER BALANCE",
      desc: "Límite de poder: Máx 1 Tier S y 2 Tier A por equipo. Adiós Superteams.",
      icon: "fa-scale-balanced"
    },
    {
      title: "SCOUTING",
      desc: "Evaluación obligatoria por Jueces en partidas PUG para asignarte un Rango.",
      icon: "fa-eye"
    },
    {
      title: "FORMATO PRO",
      desc: "Doble Eliminación (Winner & Loser Brackets). Todas las rondas Bo3.",
      icon: "fa-trophy"
    }
  ];

  const timelineSteps = [
    {
      step: "01",
      title: "REGISTRO",
      subtitle: "INSCRIPCIÓN INDIVIDUAL (SOLOQ)",
      desc: "Completa el formulario oficial. Tu perfil será la base para tu evaluación inicial."
    },
    {
      step: "02",
      title: "EVALUACIÓN (PUGS)",
      subtitle: "DEFINICIÓN DE TIER (S, A, B, C)",
      desc: "Participarás en partidas privadas (PUGs) con jueces presentes para definir tu Tier."
    },
    {
      step: "03",
      title: "THE DRAFT",
      subtitle: "SELECCIÓN DE EQUIPOS",
      desc: "12 Capitanes seleccionarán a sus jugadores en un formato Snake Draft en vivo."
    },
    {
      step: "04",
      title: "EL TORNEO",
      subtitle: "DOBLE ELIMINACIÓN",
      desc: "Inicio del Bracket oficial. Winner y Loser Brackets activos. Cada partida cuenta."
    }
  ];

  return (
    <div className="min-h-screen bg-rivals-bg pt-32 pb-20 relative overflow-x-hidden">
      
      {/* Background Decor */}
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-rivals-red/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col">
        
        {/* 
          ========================================
          SECCIÓN 1: HEADER & COUNTDOWN
          ========================================
        */}
        <div className="text-center animate-fade-in-up mb-16">
          {/* Main Title at Top */}
          <h2 className="text-6xl md:text-8xl font-anton uppercase italic text-white leading-none mb-6">
            INFO <span className="text-transparent bg-clip-text bg-gradient-to-r from-rivals-red to-white pb-4 pr-5">HUB</span>
          </h2>
          <div className="w-full max-w-md h-1 bg-rivals-red mx-auto mb-16 shadow-neon-red transform -skew-x-12"></div>

          <span className="text-rivals-red font-orbitron font-bold tracking-[0.3em] text-sm uppercase block mb-8 animate-pulse">
            // CIERRE DE INSCRIPCIONES EN:
          </span>
          
          {/* Contador */}
          <div className="flex justify-center gap-4 md:gap-12">
             {[
               { label: 'DÍAS', value: timeLeft.days },
               { label: 'HRS', value: timeLeft.hours },
               { label: 'MIN', value: timeLeft.minutes },
               { label: 'SEG', value: timeLeft.seconds }
             ].map((item, idx) => (
               <div key={idx} className="flex flex-col items-center">
                 <div className="relative">
                    <span className="font-orbitron font-black text-5xl md:text-8xl text-white drop-shadow-[0_0_15px_rgba(230,36,41,0.8)]">
                      {item.value < 10 ? `0${item.value}` : item.value}
                    </span>
                    {/* Scanline effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent bg-[length:100%_4px] pointer-events-none"></div>
                 </div>
                 <span className="font-montserrat text-xs md:text-sm text-gray-500 tracking-widest mt-2">{item.label}</span>
               </div>
             ))}
          </div>
        </div>

        {/* 
          ========================================
          SECCIÓN 2: PRIZE POOL (PODIO)
          ========================================
        */}
        <div className="w-full mt-32 mb-24">
           <div className="text-center mb-36">
              <h3 className="font-anton text-5xl text-white uppercase italic tracking-wide">
                SEASON 1 <span className="text-rivals-red">PRIZE POOL</span>
              </h3>
              <div className="w-24 h-1 bg-rivals-red mx-auto mt-4 transform -skew-x-12 shadow-neon-red"></div>
           </div>

           <div className="flex flex-col md:flex-row items-center md:items-end justify-center gap-6 md:gap-4 lg:gap-8 px-4">
              
              {/* 2ND PLACE */}
              <div className="order-2 md:order-1 w-full md:w-1/3 max-w-sm bg-zinc-900/60 backdrop-blur-md border border-gray-700 flex flex-col items-center p-6 transform hover:-translate-y-2 transition-transform duration-300 relative group">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gray-800 border-2 border-gray-500 rounded-full flex items-center justify-center shadow-lg z-10">
                     <i className="fas fa-medal text-3xl text-gray-300"></i>
                  </div>
                  <div className="mt-8 text-center">
                      <h4 className="font-anton text-2xl text-gray-300 italic uppercase">FINALISTAS</h4>
                      <div className="my-4 h-px w-full bg-gray-700"></div>
                      <p className="font-orbitron text-2xl text-white font-bold">1,000</p>
                      <p className="font-montserrat text-xs text-gray-400 uppercase tracking-widest mt-1">Créditos p/p</p>
                  </div>
              </div>

              {/* 1ST PLACE (WINNER) */}
              <div className="order-1 md:order-2 w-full md:w-1/3 max-w-md bg-gradient-to-b from-rivals-red/20 to-black/80 backdrop-blur-xl border-2 border-rivals-red flex flex-col items-center p-10 transform md:-translate-y-8 relative group shadow-[0_0_50px_rgba(230,36,41,0.2)]">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 border-2 border-rivals-red blur-sm opacity-50 pointer-events-none"></div>
                  
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-rivals-red border-4 border-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(230,36,41,0.6)] z-10">
                     <i className="fas fa-trophy text-5xl text-white"></i>
                  </div>
                  
                  <div className="mt-10 text-center w-full">
                      <h4 className="font-anton text-4xl text-white italic uppercase drop-shadow-md">CAMPEONES</h4>
                      <p className="font-orbitron text-rivals-red text-sm tracking-[0.3em] uppercase mb-6">U.N.D.I. CUP</p>
                      
                      <div className="bg-black/50 border border-rivals-red/30 p-4 transform -skew-x-12 mb-4">
                         <p className="font-anton text-6xl text-white transform skew-x-12 drop-shadow-lg">$300 <span className="text-2xl">USD</span></p>
                      </div>
                      
                      <div className="flex items-center justify-center gap-2 text-gray-300">
                         <i className="fas fa-plus text-xs"></i>
                         <p className="font-orbitron text-lg font-bold">1,000</p>
                         <p className="font-montserrat text-xs uppercase tracking-widest">Créditos p/p</p>
                      </div>
                  </div>
              </div>

              {/* 3RD PLACE */}
              <div className="order-3 md:order-3 w-full md:w-1/3 max-w-sm bg-zinc-900/60 backdrop-blur-md border border-gray-700 flex flex-col items-center p-6 transform hover:-translate-y-2 transition-transform duration-300 relative group">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gray-800 border-2 border-yellow-900 rounded-full flex items-center justify-center shadow-lg z-10">
                     <i className="fas fa-medal text-3xl text-yellow-700"></i>
                  </div>
                  <div className="mt-8 text-center">
                      <h4 className="font-anton text-2xl text-yellow-700 italic uppercase">3ER PUESTO</h4>
                      <div className="my-4 h-px w-full bg-gray-700"></div>
                      <p className="font-orbitron text-2xl text-white font-bold">500</p>
                      <p className="font-montserrat text-xs text-gray-400 uppercase tracking-widest mt-1">Créditos p/p</p>
                  </div>
              </div>

           </div>
        </div>

        {/* 
          ========================================
          SECCIÓN 3: TIMELINE (SYSTEM)
          ========================================
        */}
        <div className="mb-32 relative">
           <h3 className="text-3xl font-anton text-white italic uppercase mb-16 border-l-4 border-rivals-red pl-4">
             SISTEMA DE DRAFT
           </h3>

           {/* Vertical Line */}
           <div className="absolute left-4 md:left-1/2 top-24 bottom-0 w-1 bg-gray-800 transform -translate-x-1/2 md:block hidden"></div>
           <div className="absolute left-4 top-24 bottom-0 w-1 bg-gray-800 md:hidden block"></div>

           <div className="space-y-16">
              {timelineSteps.map((item, index) => (
                <div key={index} className={`relative flex flex-col md:flex-row items-start ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} gap-8 md:gap-0`}>
                    
                    {/* Content Side */}
                    <div className="w-full md:w-1/2 pl-12 md:px-12">
                        <div className={`flex flex-col ${index % 2 === 0 ? 'md:items-start text-left' : 'md:items-end md:text-right'} items-start text-left`}>
                            <span className="font-orbitron text-rivals-red font-bold tracking-widest text-xs mb-1">FASE {item.step}</span>
                            <h4 className="font-anton text-3xl text-white italic uppercase mb-1">{item.title}</h4>
                            <h5 className="font-orbitron text-gray-500 text-sm uppercase mb-4 tracking-wider">{item.subtitle}</h5>
                            <p className="font-montserrat text-gray-400 text-sm leading-relaxed max-w-sm bg-zinc-900/50 p-6 border border-gray-800 backdrop-blur-sm">
                              {item.desc}
                            </p>
                        </div>
                    </div>

                    {/* Center Point */}
                    <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-6 h-6 bg-black border-2 border-rivals-red rotate-45 flex items-center justify-center z-10 shadow-[0_0_10px_rgba(230,36,41,0.5)] mt-1">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>

                    {/* Empty Side for layout balance (Desktop only) */}
                    <div className="w-1/2 hidden md:block"></div>
                </div>
              ))}
           </div>
        </div>

        {/* 
          ========================================
          SECCIÓN 4: REGLAS DE ORO (GRID)
          ========================================
        */}
        <div className="mb-24">
           <h3 className="text-3xl font-anton text-white italic uppercase mb-8 border-l-4 border-rivals-red pl-4">
             Reglas de Oro
           </h3>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {rules.map((rule, index) => (
                <div key={index} className="group relative bg-zinc-900/80 border border-gray-800 p-8 hover:border-rivals-red transition-all duration-300 flex flex-col items-start overflow-hidden">
                  {/* Hover Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-rivals-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Icon */}
                  <div className="relative z-10 w-14 h-14 bg-black border border-gray-700 flex items-center justify-center transform rotate-3 mb-6 group-hover:rotate-0 transition-transform duration-300 shadow-lg">
                    <i className={`fas ${rule.icon} text-2xl text-rivals-red`}></i>
                  </div>

                  {/* Text */}
                  <h4 className="relative z-10 font-anton text-2xl text-white uppercase italic tracking-wide mb-3 group-hover:text-rivals-red transition-colors">
                    {rule.title}
                  </h4>
                  <p className="relative z-10 font-montserrat text-gray-400 text-sm leading-relaxed">
                    {rule.desc}
                  </p>
                </div>
              ))}
           </div>
        </div>

        {/* 
          ========================================
          SECCIÓN 5: REGLAMENTO OFICIAL
          ========================================
        */}
        <div className="mt-12 mb-16 text-center border-t border-gray-800 pt-16 relative">
             <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-rivals-bg border border-gray-800 flex items-center justify-center rounded-full z-10">
                <i className="fas fa-file-contract text-2xl text-gray-500"></i>
             </div>

             <h3 className="text-4xl font-anton text-white italic uppercase mb-4">
               REGLAMENTO <span className="text-rivals-red">OFICIAL</span>
             </h3>
             
             <p className="font-montserrat text-gray-400 text-sm max-w-2xl mx-auto mb-8 leading-relaxed">
               Para asegurar una competencia justa y transparente, hemos detallado todas las normativas, sanciones y procedimientos en nuestro documento oficial. La ignorancia de las reglas no exime de su cumplimiento.
             </p>

             <Button 
               href="https://docs.google.com/"
               target="_blank"
               variant="outline"
               className="!border-gray-600 hover:!border-rivals-red"
               icon="fas fa-external-link-alt"
             >
               VER DOCUMENTO COMPLETO
             </Button>
        </div>

      </div>
    </div>
  );
};

export default InformacionPage;