import React, { useState } from 'react';
import Button from '../components/Button';

// ==========================================
// DATA: STREAMERS (MOCK DATA)
// ==========================================
const streamers = [
  {
    id: '1',
    name: 'H. SANTANA',
    channel: 'hsantana', // Canal de prueba solicitado
    role: 'HOST PRINCIPAL // BLOQUE A',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4',
    bio: 'Veterano de los shooters tácticos y la voz oficial de SymbioSix. Especialista en análisis macro y play-by-play de alta intensidad.',
    tags: ['CASTER', 'ANALISTA', 'HYPE']
  },
  {
    id: '2',
    name: 'VALKYRIE_TV',
    channel: 'marvelrivals', // Placeholder (Canal oficial del juego como fallback)
    role: 'CO-CASTER // BLOQUE B',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka&backgroundColor=ffdfbf',
    bio: 'Ex-jugadora profesional de Overwatch. Aporta una visión técnica profunda sobre composiciones de equipo y sinergias de héroes.',
    tags: ['COLOR CASTER', 'ESTRATEGA']
  },
  {
    id: '3',
    name: 'NEXUS_PRIME',
    channel: 'twitch', // Placeholder
    role: 'OBSERVER // BLOQUE C',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexander&backgroundColor=c0aede',
    bio: 'El ojo que todo lo ve. Responsable de la cámara in-game, asegurando que no te pierdas ninguna ultimate ni jugada clave.',
    tags: ['OBSERVER', 'CAMERAMAN']
  },
  {
    id: '4',
    name: 'SYMBIO_OFFICIAL',
    channel: 'lirik', // Placeholder random popular
    role: 'RED ZONE // MULTI-STREAM',
    image: 'https://i.postimg.cc/9QxV1Tt9/Simbioxis.png',
    bio: 'Canal oficial de la organización. Transmisión tipo "Red Zone" saltando entre las partidas más interesantes del momento.',
    tags: ['HIGHLIGHTS', 'ENTREVISTAS']
  }
];

const ContactoPage: React.FC = () => {
  const [activeStreamer, setActiveStreamer] = useState(streamers[0]);

  // Construcción segura de la URL de Twitch
  // Se agregan multiples 'parent' para soportar tanto producción como desarrollo local
  const getTwitchEmbedUrl = (channel: string) => {
    const hostname = window.location.hostname;
    // Nota: Twitch requiere SSL (https) para embeds en la mayoría de los casos modernos, 
    // o estar en localhost.
    return `https://player.twitch.tv/?channel=${channel}&parent=undicup.netlify.app&parent=${hostname}&parent=localhost&parent=127.0.0.1&muted=false`;
  };

  return (
    <div className="min-h-screen bg-rivals-bg pt-32 pb-20 px-4 md:px-6 relative overflow-x-hidden">
      
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-rivals-red/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-16">

        {/* 
          ========================================
          SECCIÓN 1: INTRO & DINÁMICA
          ========================================
        */}
        <div className="text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-rivals-red/50 rounded-full bg-rivals-red/10 mb-4">
                <div className="w-2 h-2 bg-rivals-red rounded-full animate-pulse"></div>
                <span className="text-rivals-red font-orbitron text-xs font-bold tracking-widest">LIVE SIGNAL</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-anton uppercase italic text-white mb-6">
                OFFICIAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-rivals-red to-white">BROADCAST</span>
            </h2>
            <div className="max-w-3xl mx-auto bg-zinc-900/80 border-l-4 border-rivals-red p-6 text-left md:text-center shadow-lg backdrop-blur-sm">
                <p className="font-montserrat text-gray-300 text-lg leading-relaxed">
                    La <span className="text-white font-bold">U.N.D.I. CUP</span> se transmite en 4 canales simultáneos. 
                    Cada streamer cubre un bloque diferente del bracket o una perspectiva única. 
                    <br className="hidden md:block" />
                    <span className="text-rivals-red font-bold mt-2 block uppercase tracking-wide">¡Tú eliges qué partida ver!</span>
                </p>
            </div>
        </div>

        {/* 
          ========================================
          SECCIÓN 2: MULTI-STREAM PLAYER
          ========================================
        */}
        <div className="w-full animate-fade-in-up delay-100">
            
            {/* --- MAIN PLAYER WRAPPER --- */}
            <div className="relative w-full aspect-video bg-black border-2 border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden group mb-8">
                {/* Decorative Borders (Corner HUD) */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-rivals-red z-20"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-rivals-red z-20"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-rivals-red z-20"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-rivals-red z-20"></div>

                {/* Twitch Iframe */}
                <iframe
                    src={getTwitchEmbedUrl(activeStreamer.channel)}
                    title={`Twitch Stream ${activeStreamer.name}`}
                    className="w-full h-full relative z-10"
                    allowFullScreen
                    scrolling="no"
                ></iframe>
                
                {/* Loading/Offline Placeholder (Behind iframe) */}
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 z-0">
                    <span className="font-orbitron text-gray-600 animate-pulse">CONNECTING TO FEED...</span>
                </div>
            </div>

            {/* --- STREAMER INFO & SELECTOR --- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* INFO PANEL (Left - 4 Cols) */}
                <div className="lg:col-span-4 flex flex-col justify-between bg-zinc-900/50 p-6 border border-gray-800 backdrop-blur-md h-full min-h-[250px]">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                             <h3 className="font-anton text-3xl text-white italic uppercase tracking-wide">
                                {activeStreamer.name}
                             </h3>
                             <a 
                               href={`https://twitch.tv/${activeStreamer.channel}`} 
                               target="_blank" 
                               rel="noreferrer"
                               className="text-gray-500 hover:text-[#9146FF] transition-colors"
                             >
                                <i className="fab fa-twitch text-xl"></i>
                             </a>
                        </div>
                        <span className="font-orbitron text-rivals-red text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
                            {activeStreamer.role}
                        </span>
                        
                        <div className="w-12 h-1 bg-gray-700 mb-4"></div>
                        
                        <p className="font-montserrat text-gray-400 text-sm leading-relaxed mb-6">
                            {activeStreamer.bio}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {activeStreamer.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-black border border-gray-700 text-gray-300 text-[10px] font-orbitron uppercase">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* SELECTOR GRID (Right - 8 Cols) */}
                <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {streamers.map((streamer) => {
                        const isActive = activeStreamer.id === streamer.id;
                        return (
                            <button
                                key={streamer.id}
                                onClick={() => setActiveStreamer(streamer)}
                                className={`
                                    relative group h-full min-h-[140px] flex flex-col items-center justify-end p-4 border transition-all duration-300 overflow-hidden
                                    ${isActive 
                                        ? 'bg-rivals-red/10 border-rivals-red shadow-[0_0_15px_rgba(230,36,41,0.4)] scale-105 z-10' 
                                        : 'bg-zinc-900 border-gray-800 hover:border-gray-500 hover:bg-zinc-800 opacity-70 hover:opacity-100'}
                                `}
                            >
                                {/* Background Image/Avatar effect */}
                                <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity">
                                    <img src={streamer.image} alt={streamer.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                </div>
                                
                                {/* Status Dot */}
                                <div className={`absolute top-3 right-3 w-2 h-2 rounded-full ${isActive ? 'bg-rivals-red shadow-[0_0_5px_#E62429]' : 'bg-gray-600'}`}></div>

                                {/* Text Content */}
                                <div className="relative z-10 text-center">
                                    <h4 className={`font-anton text-lg italic uppercase leading-none ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                                        {streamer.name}
                                    </h4>
                                    <span className="text-[9px] font-orbitron text-gray-500 uppercase tracking-wider block mt-1">
                                        {streamer.channel}
                                    </span>
                                </div>
                                
                                {/* Active Bottom Bar */}
                                {isActive && (
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-rivals-red animate-pulse"></div>
                                )}
                            </button>
                        );
                    })}
                </div>

            </div>
        </div>

        {/* 
          ========================================
          SECCIÓN 3: CONTACTO ADMINISTRATIVO (Original)
          ========================================
        */}
        <div className="border-t border-gray-800 pt-16 mt-8">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-anton uppercase italic text-white">
                    CONTACT <span className="text-rivals-red">H.Q.</span>
                </h2>
                <p className="font-orbitron text-gray-500 mt-2 tracking-widest text-sm">SYMBIOSIX COMMAND CENTER</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Discord Card */}
                <div className="group bg-zinc-900 border border-gray-800 p-8 hover:border-[#5865F2] transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <i className="fab fa-discord text-9xl text-white transform rotate-12"></i>
                    </div>
                    
                    <div className="relative z-10">
                        <i className="fab fa-discord text-4xl text-[#5865F2] mb-4"></i>
                        <h3 className="font-anton text-2xl text-white italic mb-2">DISCORD COMUNIDAD</h3>
                        <p className="font-montserrat text-gray-400 text-sm mb-6">
                            Únete al servidor oficial. Canal principal para soporte técnico, dudas de reglamento y organización de scrims.
                        </p>
                        <Button 
                            href="https://discord.gg/HdBZGKHZ7J" 
                            target="_blank"
                            className="!bg-[#5865F2] hover:!bg-white hover:!text-[#5865F2] w-full md:w-auto"
                        >
                            UNIRSE AHORA
                        </Button>
                    </div>
                </div>

                {/* Email Card */}
                <div className="group bg-zinc-900 border border-gray-800 p-8 hover:border-rivals-red transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <i className="fas fa-envelope text-9xl text-white transform -rotate-12"></i>
                    </div>

                    <div className="relative z-10">
                        <i className="fas fa-envelope text-4xl text-rivals-red mb-4"></i>
                        <h3 className="font-anton text-2xl text-white italic mb-2">CORREO DIRECTO</h3>
                        <p className="font-montserrat text-gray-400 text-sm mb-6">
                            Para consultas comerciales, patrocinios o reportes graves de conducta. Respondemos en 24-48hs.
                        </p>
                        <div className="bg-black/50 border border-gray-700 p-3 text-center">
                            <span className="font-mono text-white text-sm">contact@symbiosix.gg</span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Social Row */}
            <div className="flex justify-center gap-6 mt-12">
                 {['twitter', 'instagram', 'youtube', 'tiktok'].map(social => (
                     <a key={social} href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-gray-400 hover:bg-rivals-red hover:text-white transition-all duration-300">
                         <i className={`fab fa-${social}`}></i>
                     </a>
                 ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default ContactoPage;