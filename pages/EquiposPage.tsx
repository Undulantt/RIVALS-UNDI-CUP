import React from 'react';

// ==========================================
// DATA STRUCTURE
// ==========================================
interface Team {
  id: number;
  name: string;
  platform: 'PC' | 'CONSOLA';
  leader: string;
  icon: string;       // URL de la imagen del icono del equipo
  members: string[];  // 5 titulares
  substitute: string; // 1 suplente
}

const DEFAULT_ICON = "https://i.postimg.cc/9QxV1Tt9/Simbioxis.png";

const teamsData: Team[] = [
  // --- PC TEAMS (8) ---
  {
    id: 1,
    name: "S.H.I.E.L.D.",
    platform: "PC",
    leader: "",
    icon: DEFAULT_ICON,
    members: ["", "", "", "", ""],
    substitute: ""
  },
  {
    id: 2,
    name: "Hydra",
    platform: "PC",
    leader: "",
    icon: DEFAULT_ICON,
    members: ["", "", "", "", ""],
    substitute: ""
  },
  {
    id: 3,
    name: "Los Vengadores",
    platform: "PC",
    leader: "",
    icon: DEFAULT_ICON,
    members: ["", "", "", "", ""],
    substitute: ""
  },
  {
    id: 4,
    name: "X-Men",
    platform: "PC",
    leader: "",
    icon: DEFAULT_ICON,
    members: ["", "", "", "", ""],
    substitute: ""
  },
  {
    id: 5,
    name: "Guardianes de la Galaxia",
    platform: "PC",
    leader: "",
    icon: DEFAULT_ICON,
    members: ["", "", "", "", ""],
    substitute: ""
  },
  {
    id: 6,
    name: "S.W.O.R.D.",
    platform: "PC",
    leader: "",
    icon: DEFAULT_ICON,
    members: ["", "", "", "", ""],
    substitute: ""
  },
  {
    id: 7,
    name: "A.I.M.",
    platform: "PC",
    leader: "",
    icon: DEFAULT_ICON,
    members: ["", "", "", "", ""],
    substitute: ""
  },
  {
    id: 8,
    name: "Nova Corps",
    platform: "PC",
    leader: "",
    icon: DEFAULT_ICON,
    members: ["", "", "", "", ""],
    substitute: ""
  },

  // --- CONSOLE TEAMS (8) ---
  {
    id: 9,
    name: "Los Diez Anillos",
    platform: "CONSOLA",
    leader: "",
    icon: DEFAULT_ICON,
    members: ["", "", "", "", ""],
    substitute: ""
  },
  {
    id: 10,
    name: "Thunderbolts",
    platform: "CONSOLA",
    leader: "",
    icon: DEFAULT_ICON,
    members: ["", "", "", "", ""],
    substitute: ""
  },
  {
    id: 11,
    name: "La Mano",
    platform: "CONSOLA",
    leader: "",
    icon: DEFAULT_ICON,
    members: ["", "", "", "", ""],
    substitute: ""
  },
  {
    id: 12,
    name: "Future Foundation",
    platform: "CONSOLA",
    leader: "",
    icon: DEFAULT_ICON,
    members: ["", "", "", "", ""],
    substitute: ""
  },
  {
    id: 13,
    name: "Hellfire Club",
    platform: "CONSOLA",
    leader: "",
    icon: DEFAULT_ICON,
    members: ["", "", "", "", ""],
    substitute: ""
  },
  {
    id: 14,
    name: "TVA",
    platform: "CONSOLA",
    leader: "",
    icon: DEFAULT_ICON,
    members: ["", "", "", "", ""],
    substitute: ""
  },
  {
    id: 15,
    name: "Alpha Flight",
    platform: "CONSOLA",
    leader: "",
    icon: DEFAULT_ICON,
    members: ["", "", "", "", ""],
    substitute: ""
  },
  {
    id: 16,
    name: "Ravagers",
    platform: "CONSOLA",
    leader: "",
    icon: DEFAULT_ICON,
    members: ["", "", "", "", ""],
    substitute: ""
  },
];

// ==========================================
// COMPONENT
// ==========================================

const EquiposPage: React.FC = () => {
  const pcTeams = teamsData.filter(t => t.platform === 'PC');
  const consoleTeams = teamsData.filter(t => t.platform === 'CONSOLA');

  const TeamCard = ({ team }: { team: Team }) => (
    <div className="group relative bg-zinc-900/80 border border-gray-800 overflow-hidden hover:border-rivals-red hover:shadow-neon-red transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full backdrop-blur-sm">

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 group-hover:from-rivals-red group-hover:via-white group-hover:to-rivals-red transition-all duration-500"></div>

      {/* Esquinas decorativas HUD */}
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-rivals-red/40 group-hover:border-rivals-red transition-colors duration-300"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-rivals-red/40 group-hover:border-rivals-red transition-colors duration-300"></div>

      {/* Header */}
      <div className="p-6 pb-4 border-b border-gray-800 bg-black/40 relative">
        <div className="flex justify-between items-start mb-4">

          {/* Icono del equipo via URL */}
          <div className="relative w-16 h-16 bg-zinc-800 border-2 border-gray-700 group-hover:border-rivals-red flex items-center justify-center overflow-hidden transition-colors duration-300">
            <img
              src={team.icon}
              alt={`${team.name} icon`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                (e.target as HTMLImageElement).src = DEFAULT_ICON;
              }}
            />
          </div>

          {/* Platform Badge */}
          <span className={`
            px-3 py-1 font-orbitron text-xs font-bold tracking-widest transform -skew-x-12 border
            ${team.platform === 'PC'
              ? 'bg-blue-900/20 text-blue-400 border-blue-900'
              : 'bg-green-900/20 text-green-400 border-green-900'}
          `}>
            <span className="block transform skew-x-12">{team.platform}</span>
          </span>
        </div>

        <h3 className="font-anton text-2xl text-white italic uppercase tracking-wide group-hover:text-rivals-red transition-colors leading-tight">
          {team.name}
        </h3>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-gray-500 text-xs font-orbitron uppercase">CAPITÁN:</span>
          <span className={`font-bold font-montserrat text-sm ${team.leader ? 'text-white' : 'text-gray-600 italic'}`}>
            {team.leader || 'PENDIENTE DRAFT'}
          </span>
        </div>
      </div>

      {/* Roster */}
      <div className="p-6 pt-4 flex-grow bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] flex flex-col">

        {/* Titulares */}
        <div className="mb-4">
          <h4 className="font-orbitron text-xs text-gray-500 mb-4 tracking-[0.2em] uppercase border-l-2 border-rivals-red pl-2">
            ROSTER PRINCIPAL
          </h4>
          <ul className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => {
              const memberName = team.members[i];
              const isEmpty = !memberName || memberName.trim() === "";
              return (
                <li key={`main-${i}`} className="flex items-center gap-3">
                  <div className={`w-1 self-stretch min-h-[1.25rem] ${isEmpty ? 'bg-gray-800' : 'bg-rivals-red shadow-[0_0_5px_rgba(230,36,41,0.5)]'}`}></div>
                  <span className={`font-montserrat text-sm uppercase tracking-wide ${isEmpty ? 'text-gray-600 italic' : 'text-gray-200 font-semibold'}`}>
                    {isEmpty ? 'PENDIENTE DRAFT' : memberName}
                  </span>
                  {isEmpty && <i className="fas fa-spinner fa-spin text-xs text-gray-700 ml-auto"></i>}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-gray-800 my-2"></div>

        {/* Suplente (1) */}
        <div className="mt-2 opacity-80 group-hover:opacity-100 transition-opacity">
          <h4 className="font-orbitron text-[10px] text-gray-600 mb-3 tracking-[0.2em] uppercase pl-2">
            SUPLENTE
          </h4>
          <div className="flex items-center gap-3 pl-1">
            <div className={`w-1.5 h-1.5 rounded-full border ${!team.substitute ? 'border-gray-700' : 'border-rivals-silver bg-gray-500'}`}></div>
            <span className={`font-montserrat text-xs uppercase tracking-wider ${!team.substitute ? 'text-gray-700 italic' : 'text-gray-400'}`}>
              {team.substitute || 'VACANTE'}
            </span>
          </div>
        </div>
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 bg-rivals-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-rivals-bg pt-32 pb-24 relative overflow-x-hidden">

      {/* Background Decor — consistente con otros módulos */}
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-rivals-red/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* HEADER */}
        <div className="text-center mb-24 animate-fade-in-up">
          <h2 className="text-6xl md:text-8xl font-anton uppercase italic text-white leading-none mb-6">
            EQUIPOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-rivals-red to-white pb-4 pr-5">PARTICIPANTES</span>
          </h2>
          <div className="w-full max-w-md h-1 bg-rivals-red mx-auto mb-6 shadow-neon-red transform -skew-x-12"></div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-gray-400 font-orbitron tracking-widest text-sm">
            <span className="flex items-center gap-2">
              <i className="fas fa-desktop text-rivals-red"></i> 8 EQUIPOS DE PC
            </span>
            <span className="hidden md:block text-rivals-red">//</span>
            <span className="flex items-center gap-2">
              <i className="fas fa-gamepad text-rivals-red"></i> 8 EQUIPOS DE CONSOLA
            </span>
          </div>
        </div>

        {/* PC SECTION */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-10 border-b border-gray-800 pb-4">
            <i className="fas fa-desktop text-3xl text-rivals-red"></i>
            <h3 className="font-anton text-4xl text-white italic uppercase">EQUIPOS DE PC</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pcTeams.map(team => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </div>

        {/* CONSOLE SECTION */}
        <div>
          <div className="flex items-center gap-4 mb-10 border-b border-gray-800 pb-4">
            <i className="fas fa-gamepad text-3xl text-rivals-red"></i>
            <h3 className="font-anton text-4xl text-white italic uppercase">EQUIPOS DE CONSOLA</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {consoleTeams.map(team => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default EquiposPage;