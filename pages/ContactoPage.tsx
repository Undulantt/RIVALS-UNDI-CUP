import React, { useState } from 'react';
import Button from '../components/Button';

// ==========================================
// DATA: TALENT ROSTER
// ==========================================
interface Caster {
  id: string;
  name: string;
  shortName: string;
  role: string;
  avatar: string;
  youtubeShortId: string;
  bio: string;
  isSpecial?: boolean;
  socials: {
    twitch?: string;
    instagram?: string;
    tiktok?: string;
    twitter?: string;
    youtube?: string;
    linktree?: string;
  };
}

const casters: Caster[] = [
  {
    id: '1',
    name: 'Nichays',
    shortName: 'Nichay',
    role: 'CASTER // HOST',
    avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/3a77f817-7eb9-4cd7-8790-9d92afeaa24a-profile_image-70x70.png',
    youtubeShortId: 'dQw4w9WgXcQ',
    bio: 'Soy una Demonia que se aburrio del inframundo y dejo el caos para venir a jugar videojuegos. Traviesa, juguetona, loquita, enojona, intensa y divertida, mezcla la picardía y energía para convertir cada partida en un espectáculo diabólicamente encantador.',
    socials: {
      twitch: 'Nichays',
      instagram: 'nichaysvt',
      tiktok: 'nichayvt',
    }
  },
  {
    id: '2',
    name: 'JazminVT',
    shortName: 'JazminVT',
    role: 'CASTER // HOST',
    avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/7f9e1ebb-65d3-4745-860a-b2c6b9b85b55-profile_image-70x70.png',
    youtubeShortId: 'dQw4w9WgXcQ',
    bio: '💀 Vtuber con esencia, papeadora y decadente💜 Twitch Partner👻 Amodoro mi fantasmitas🌙 Creadora de contenido 🖌️Artista: @YukimiiArt & Rigger: @Yi_Star_',
    socials: {
      twitch: 'JazminVT',
      instagram: 'jazminvtuberr',
      tiktok: 'jazminvtuber',
      twitter: 'jazminvtuber',
    }
  },
  {
    id: '3',
    name: 'Katilamon',
    shortName: 'Katilamon',
    role: 'CASTER',
    avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/dc0201c5-310f-42d9-b144-3140fe3266be-profile_image-70x70.jpeg',
    youtubeShortId: 'dQw4w9WgXcQ',
    bio: 'Caster oficial del torneo SIMBIOXIS U.N.D.I. CUP. Trayendo el mejor análisis y energía a cada partida del Main Event.',
    socials: {
      twitch: 'Katilamon',
      linktree: 'katilamon',
    }
  },
  {
    id: '4',
    name: 'awa_jellyvt',
    shortName: 'AWA',
    role: 'CASTER',
    avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/a5914e6f-3b93-4c4d-8241-d77d37d11b76-profile_image-70x70.jpeg',
    youtubeShortId: 'dQw4w9WgXcQ',
    bio: 'Una vtuber muy acuosa que le gustan los videojuegos y el chisme 🪼// Caster de Esports// Bienvenidos! °^°',
    socials: {
      twitch: 'awa_jellyvt',
    }
  },
  {
    id: '5',
    name: 'Wings667',
    shortName: 'Wings',
    role: 'PROMOTOR // AFILIADO OFICIAL',
    avatar: 'https://static-cdn.jtvnw.net/jtv_user_pictures/937c7c18-ab46-415a-aafb-88ccaa9533aa-profile_image-70x70.png',
    youtubeShortId: 'dQw4w9WgXcQ',
    bio: 'Amante de los Videojuegos y obsesionado con Marvel Rivals! :D El afiliado y promotor oficial de SIMBIOXIS — el que lleva la bandera del torneo más allá del escenario.',
    isSpecial: true,
    socials: {
      twitch: 'Wings667',
      instagram: 'elwings667',
      tiktok: 'wings667_',
    }
  },
];

// ==========================================
// COMPONENT
// ==========================================

const ContactoPage: React.FC = () => {
  const [activeCaster, setActiveCaster] = useState<Caster>(casters[0]);

  const socialIcons: Record<string, { icon?: string; svg?: React.ReactNode; color: string; base: string }> = {
    twitch:    { icon: 'fab fa-twitch',    color: 'hover:text-[#9146FF]', base: 'https://twitch.tv/' },
    instagram: { icon: 'fab fa-instagram', color: 'hover:text-[#E1306C]', base: 'https://instagram.com/' },
    tiktok:    { icon: 'fab fa-tiktok',    color: 'hover:text-white',     base: 'https://tiktok.com/@' },
    twitter:   { icon: 'fab fa-twitter',   color: 'hover:text-[#1DA1F2]', base: 'https://twitter.com/' },
    youtube:   { icon: 'fab fa-youtube',   color: 'hover:text-[#FF0000]', base: 'https://youtube.com/@' },
    linktree:  {
      color: 'hover:text-[#43E660]',
      base: 'https://linktr.ee/',
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M13.51 5.753l4.37-4.539 2.098 2.023-4.552 4.371h6.32v2.944h-6.354l4.553 4.37-2.098 2.024-4.837-4.686-4.837 4.686-2.099-2.024 4.553-4.37H4.253V7.608h6.32L6.02 3.237l2.099-2.023 4.37 4.539zm-1.51 8.88h2.944v8.622H12.01V14.633z"/>
        </svg>
      ),
    },
  };

  return (
    <div className="min-h-screen bg-rivals-bg pt-32 pb-20 relative overflow-x-hidden">

      {/* Background Image — estilo Hero */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="https://i.postimg.cc/J4NjxWwz/SEGURIDAD_DEL_MUSEO.png"
          alt="Background"
          className="w-full h-full object-cover object-center scale-150 transition-transform duration-1000"
        />
        {/* Overlay gradiente oscuro igual que Hero */}
        <div className="absolute inset-0 bg-gradient-to-t from-rivals-bg via-black/85 to-rivals-darkRed/40"></div>
        {/* Carbon fibre overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        {/* Tinte rojo lateral */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-rivals-red/10 to-transparent transform -skew-x-12 mix-blend-screen"></div>
      </div>
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-rivals-red/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col gap-16">

        {/* ======================================== HEADER ======================================== */}
        <div className="text-center animate-fade-in-up">
          <h1 className="text-6xl md:text-8xl font-anton uppercase italic text-white leading-none mb-6">
            TALENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-rivals-red to-white pb-4 pr-5">ROSTER</span>
          </h1>
          <div className="w-full max-w-md h-1 bg-rivals-red mx-auto mb-6 shadow-neon-red transform -skew-x-12"></div>
          <p className="font-montserrat text-gray-400 text-sm tracking-[0.3em] uppercase font-bold">
            CONOCE A LAS VOCES DEL TORNEO
          </p>
        </div>

        {/* ======================================== MAIN PANEL ======================================== */}
        <div className="animate-fade-in-up">

          {/* VIDEO + INFO */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-12">

            {/* YouTube Short embed — proporción 9:16 */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-[320px] bg-black border-2 border-rivals-red/60 overflow-hidden shadow-[0_0_40px_rgba(230,36,41,0.2)]">
                {/* Esquinas HUD */}
                <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-rivals-red z-20"></div>
                <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-rivals-red z-20"></div>
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-rivals-red z-20"></div>
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-rivals-red z-20"></div>

                {/* REC indicator */}
                <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-black/60 px-2 py-1 backdrop-blur-sm">
                  <div className="w-2 h-2 bg-rivals-red rounded-full animate-pulse"></div>
                  <span className="font-orbitron text-white text-[9px] font-bold tracking-widest">REC</span>
                </div>

                {/* Aspect ratio 9:16 */}
                <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
                  <iframe
                    key={activeCaster.id}
                    src={`https://www.youtube.com/embed/${activeCaster.youtubeShortId}?autoplay=0&rel=0&modestbranding=1`}
                    title={`${activeCaster.name} - YouTube Short`}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>

            {/* INFO DEL CASTER */}
            <div className="flex flex-col gap-6">

              {/* Línea decorativa roja */}
              <div className="w-12 h-1 bg-rivals-red shadow-neon-red"></div>

              {/* Nombre */}
              <div>
                {activeCaster.isSpecial && (
                  <div className="flex items-center gap-2 mb-3">
                    <i className="fas fa-star text-yellow-400 text-xs drop-shadow-[0_0_6px_rgba(250,204,21,0.8)]"></i>
                    <span className="font-orbitron text-[9px] font-black tracking-[0.4em] uppercase text-yellow-400/80">
                      PROMOTOR &amp; AFILIADO OFICIAL
                    </span>
                    <i className="fas fa-star text-yellow-400 text-xs drop-shadow-[0_0_6px_rgba(250,204,21,0.8)]"></i>
                  </div>
                )}
                <h2 className="font-anton text-5xl md:text-6xl text-white uppercase italic leading-none mb-2">
                  {activeCaster.name}
                </h2>
                <span className={`font-orbitron text-sm font-bold tracking-[0.25em] uppercase ${activeCaster.isSpecial ? 'text-yellow-400' : 'text-rivals-red'}`}>
                  {activeCaster.role}
                </span>
              </div>

              {/* Bio */}
              <div className={`border-l-4 bg-zinc-900/50 px-5 py-4 backdrop-blur-sm ${activeCaster.isSpecial ? 'border-yellow-400' : 'border-rivals-red'}`}>
                <p className="font-montserrat text-gray-300 text-base leading-relaxed">
                  {activeCaster.bio}
                </p>
              </div>

              {/* Redes sociales */}
              <div className="flex items-center gap-4">
                {Object.entries(activeCaster.socials).map(([platform, handle]) => {
                  const social = socialIcons[platform];
                  if (!social || !handle) return null;
                  return (
                    <a
                      key={platform}
                      href={`${social.base}${handle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-11 h-11 rounded-full bg-zinc-800 border border-gray-700 flex items-center justify-center text-gray-400 ${social.color} hover:border-gray-500 hover:scale-110 transition-all duration-200`}
                    >
                      {social.svg ? social.svg : <i className={`${social.icon} text-lg`}></i>}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ---- SELECTOR DE CASTERS ---- */}
          <div className="flex justify-center gap-4 flex-wrap items-end">
            {casters.map((caster) => {
              const isActive = activeCaster.id === caster.id;
              if (caster.isSpecial) {
                return (
                  <button
                    key={caster.id}
                    onClick={() => setActiveCaster(caster)}
                    className={`
                      relative flex flex-col items-center gap-2 p-1 transition-all duration-300 group
                      ${isActive ? 'scale-110' : 'opacity-70 hover:opacity-100 hover:scale-105'}
                    `}
                  >
                    {/* Special crown/star badge */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <i className="fas fa-star text-yellow-400 text-xs drop-shadow-[0_0_6px_rgba(250,204,21,0.8)]"></i>
                    </div>

                    {/* Avatar with gold border */}
                    <div className={`
                      w-20 h-20 overflow-hidden border-2 transition-all duration-300
                      ${isActive
                        ? 'border-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.5)]'
                        : 'border-yellow-600/60 group-hover:border-yellow-400 group-hover:shadow-[0_0_8px_rgba(250,204,21,0.3)]'}
                    `}>
                      <img
                        src={caster.avatar}
                        alt={caster.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Nombre corto */}
                    <span className={`font-orbitron text-[10px] uppercase tracking-wider transition-colors ${isActive ? 'text-yellow-400' : 'text-yellow-600 group-hover:text-yellow-400'}`}>
                      {caster.shortName}
                    </span>

                    {/* Special label */}
                    <span className="font-orbitron text-[8px] uppercase tracking-wider text-yellow-500/60 -mt-1">
                      PROMOTOR
                    </span>

                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-yellow-400 shadow-[0_0_6px_rgba(250,204,21,0.8)]"></div>
                    )}
                  </button>
                );
              }

              return (
                <button
                  key={caster.id}
                  onClick={() => setActiveCaster(caster)}
                  className={`
                    relative flex flex-col items-center gap-2 p-1 transition-all duration-300 group
                    ${isActive ? 'scale-110' : 'opacity-60 hover:opacity-100 hover:scale-105'}
                  `}
                >
                  {/* Avatar */}
                  <div className={`
                    w-16 h-16 overflow-hidden border-2 transition-colors duration-300
                    ${isActive ? 'border-rivals-red shadow-neon-red' : 'border-gray-700 group-hover:border-gray-500'}
                  `}>
                    <img
                      src={caster.avatar}
                      alt={caster.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Nombre corto */}
                  <span className={`font-orbitron text-[10px] uppercase tracking-wider transition-colors ${isActive ? 'text-rivals-red' : 'text-gray-500 group-hover:text-gray-300'}`}>
                    {caster.shortName}
                  </span>

                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-rivals-red shadow-neon-red"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ======================================== CONTACT HQ ======================================== */}
        <div className="border-t border-gray-800 pt-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-anton uppercase italic text-white">
              CONTACT <span className="text-rivals-red">H.Q.</span>
            </h2>
            <p className="font-orbitron text-gray-500 mt-2 tracking-widest text-sm">SYMBIOSIX COMMAND CENTER</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

            {/* Discord */}
            <div className="group bg-zinc-900/80 border border-gray-800 p-8 hover:border-[#5865F2] transition-all duration-300 relative overflow-hidden backdrop-blur-sm">
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
                  href="https://discord.gg/Qumbascbvb"
                  target="_blank"
                  className="!bg-[#5865F2] hover:!bg-white hover:!text-[#5865F2] w-full md:w-auto"
                >
                  UNIRSE AHORA
                </Button>
              </div>
            </div>

            {/* Email */}
            <div className="group bg-zinc-900/80 border border-gray-800 p-8 hover:border-rivals-red transition-all duration-300 relative overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <i className="fas fa-envelope text-9xl text-white transform -rotate-12"></i>
              </div>
              <div className="relative z-10">
                <i className="fas fa-envelope text-4xl text-rivals-red mb-4"></i>
                <h3 className="font-anton text-2xl text-white italic mb-2">CONTACTO STAFF</h3>
                <p className="font-montserrat text-gray-400 text-sm mb-6">
                  Para consultas comerciales, patrocinios o reportes graves de conducta. Respondemos en 24-48hs.
                </p>
                <div className="bg-black/50 border border-gray-700 p-3 text-center">
                  <span className="font-mono text-white text-sm">symbiosoda@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          
        </div>

      </div>
    </div>
  );
};

export default ContactoPage;