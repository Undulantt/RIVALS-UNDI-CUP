import React from 'react';

// ==========================================
// DATA STRUCTURE (EDITABLE)
// ==========================================
interface Team {
  id: number;
  name: string; // Nombre del Equipo (o "Team [Capitán]")
  platform: 'PC' | 'CONSOLA';
  leader: string; // Nombre del Capitán
  members: string[]; // Lista de 5 jugadores (Titulares)
  substitutes: string[]; // Lista de 2 jugadores (Suplentes)
}

const teamsData: Team[] = [
  // --- PC TEAMS (6) ---
  {
    id: 1,
    name: "Warlock Team",
    platform: "PC",
    leader: "KRAKEN_FPS",
    members: ["ShadowSlayer", "Viper_X", "", "", ""],
    substitutes: ["", ""]
  },
  {
    id: 2,
    name: "Angela Team",
    platform: "PC",
    leader: "SYNTH_WAVE",
    members: ["", "", "", "", ""],
    substitutes: ["", ""]
  },
  {
    id: 3,
    name: "Blade Team",
    platform: "PC",
    leader: "NOCTURNE",
    members: ["DarkMatter", "", "", "", ""],
    substitutes: ["", ""]
  },
  {
    id: 4,
    name: "Deadpool Team",
    platform: "PC",
    leader: "ALPHA_ZERO",
    members: ["", "", "", "", ""],
    substitutes: ["", ""]
  },
  {
    id: 5,
    name: "Groot Team",
    platform: "PC",
    leader: "KENJI_SAN",
    members: ["BladeRunner", "Ghost_Shell", "Akira", "", ""],
    substitutes: ["Ronin_Sub", ""]
  },
  {
    id: 6,
    name: "Hawkeye Team",
    platform: "PC",
    leader: "ATLAS_MECH",
    members: ["", "", "", "", ""],
    substitutes: ["", ""]
  },

  // --- CONSOLE TEAMS (6) ---
  {
    id: 7,
    name: "Magik Team",
    platform: "CONSOLA",
    leader: "AIM_ASSIST_KING",
    members: ["StickDrift", "L2_Spam", "", "", ""],
    substitutes: ["", ""]
  },
  {
    id: 8,
    name: "Wolverine Team",
    platform: "CONSOLA",
    leader: "JOYSTICK_JEDI",
    members: ["", "", "", "", ""],
    substitutes: ["", ""]
  },
  {
    id: 9,
    name: "Thor Team",
    platform: "CONSOLA",
    leader: "SCARLET_WITCH",
    members: ["Visionary", "", "", "", ""],
    substitutes: ["", ""]
  },
  {
    id: 10,
    name: "Rogue Team",
    platform: "CONSOLA",
    leader: "AZURE_SKY",
    members: ["", "", "", "", ""],
    substitutes: ["", ""]
  },
  {
    id: 11,
    name: "Thing Team",
    platform: "CONSOLA",
    leader: "REVERB",
    members: ["Delay_Master", "Ping_Lord", "", "", ""],
    substitutes: ["", ""]
  },
  {
    id: 12,
    name: "Venom Team",
    platform: "CONSOLA",
    leader: "GAME_OVER",
    members: ["Retry", "Continue?", "", "", ""],
    substitutes: ["", ""]
  }
];

// ==========================================
// COMPONENT
// ==========================================

const EquiposPage: React.FC = () => {
  // Filter logic
  const pcTeams = teamsData.filter(t => t.platform === 'PC');
  const consoleTeams = teamsData.filter(t => t.platform === 'CONSOLA');

  // Helper to render a Team Card
  const TeamCard = ({ team }: { team: Team }) => (
    <div className="group relative bg-zinc-900 border border-gray-800 overflow-hidden hover:border-rivals-red hover:shadow-neon-red transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full">
      
      {/* Decorative Top Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 group-hover:from-rivals-red group-hover:via-white group-hover:to-rivals-red transition-all duration-500"></div>

      {/* Header Area */}
      <div className="p-6 pb-4 border-b border-gray-800 bg-black/40 relative">
        <div className="flex justify-between items-start mb-4">
            {/* Captain Avatar Placeholder */}
            <div className="relative w-16 h-16 bg-zinc-800 rounded-full border-2 border-gray-600 group-hover:border-rivals-red flex items-center justify-center overflow-hidden transition-colors">
                 <i className="fas fa-user-astronaut text-3xl text-gray-500 group-hover:text-white transition-colors"></i>
            </div>
            
            {/* Platform Badge */}
            <span className={`
              px-3 py-1 font-orbitron text-xs font-bold tracking-widest transform -skew-x-12 border
              ${team.platform === 'PC' 
                ? 'bg-blue-900/20 text-blue-400 border-blue-900' 
                : 'bg-green-900/20 text-green-400 border-green-900'}
            `}>
               {team.platform}
            </span>
        </div>

        <h3 className="font-anton text-3xl text-white italic uppercase tracking-wide group-hover:text-rivals-red transition-colors">
            {team.name}
        </h3>
        
        <div className="flex items-center gap-2 mt-2">
            <span className="text-gray-500 text-xs font-orbitron uppercase">CAPITÁN:</span>
            <span className="text-white font-bold font-montserrat text-sm">{team.leader}</span>
        </div>
      </div>

      {/* Roster List Container */}
      <div className="p-6 pt-4 flex-grow bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] flex flex-col">
        
        {/* === SECTION: MAIN ROSTER (5 Slots) === */}
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
                            {/* Slot Indicator (Solid Bar for Main) */}
                            <div className={`w-1 h-full min-h-[1.5rem] ${isEmpty ? 'bg-gray-800' : 'bg-rivals-red shadow-[0_0_5px_rgba(230,36,41,0.5)]'}`}></div>
                            
                            {/* Name */}
                            <span className={`font-montserrat text-sm uppercase tracking-wide ${isEmpty ? 'text-gray-600 italic' : 'text-gray-200 font-semibold'}`}>
                                {isEmpty ? 'PENDIENTE DRAFT' : memberName}
                            </span>
                            
                            {isEmpty && <i className="fas fa-spinner fa-spin text-xs text-gray-700 ml-auto"></i>}
                        </li>
                    );
                })}
            </ul>
        </div>

        {/* Separator / Divider */}
        <div className="border-t border-dashed border-gray-800 my-2 relative">
             {/* Small visual anchor */}
             <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-gray-700 rounded-full"></div>
        </div>

        {/* === SECTION: SUBSTITUTES (2 Slots) === */}
        <div className="mt-2 opacity-80 group-hover:opacity-100 transition-opacity">
            <h4 className="font-orbitron text-[10px] text-gray-600 mb-3 tracking-[0.2em] uppercase pl-2">
                SUPLENTES
            </h4>
            <ul className="space-y-2">
                {Array.from({ length: 2 }).map((_, i) => {
                     const subName = team.substitutes[i];
                     const isEmpty = !subName || subName.trim() === "";

                     return (
                         <li key={`sub-${i}`} className="flex items-center gap-3 pl-1">
                             {/* Slot Indicator (Hollow/Dimmed for Subs) */}
                             <div className={`w-1.5 h-1.5 rounded-full border ${isEmpty ? 'border-gray-700' : 'border-rivals-silver bg-gray-500'}`}></div>

                             {/* Name */}
                             <span className={`font-montserrat text-xs uppercase tracking-wider ${isEmpty ? 'text-gray-700 italic' : 'text-gray-400'}`}>
                                 {isEmpty ? 'VACANTE' : subName}
                             </span>
                         </li>
                     );
                })}
            </ul>
        </div>
      </div>

      {/* Hover Glow Background */}
      <div className="absolute inset-0 bg-rivals-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-rivals-bg pt-32 pb-24 px-6 relative overflow-x-hidden">
      
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-rivals-red/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ================= HEADER ================= */}
        <div className="text-center mb-24 animate-fade-in-up">
            <h2 className="text-6xl md:text-8xl font-anton uppercase italic text-white leading-none mb-4">
                EQUIPOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-rivals-red to-white pb-4 pr-5">PARTICIPANTES</span>
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-gray-400 font-orbitron tracking-widest text-sm md:text-base">
                <span className="flex items-center gap-2">
                    <i className="fas fa-desktop"></i> 6 CAPITANES DE PC
                </span>
                <span className="hidden md:block text-rivals-red">//</span>
                <span className="flex items-center gap-2">
                    <i className="fas fa-gamepad"></i> 6 CAPITANES DE CONSOLA
                </span>
            </div>
            <div className="w-40 h-1 bg-rivals-red mx-auto mt-8 shadow-neon-red transform -skew-x-12"></div>
        </div>

        {/* ================= PC SECTION ================= */}
        <div className="mb-24">
            <div className="flex items-center gap-4 mb-10 border-b border-gray-800 pb-4">
                <i className="fas fa-desktop text-3xl text-rivals-red"></i>
                <h3 className="font-anton text-4xl text-white italic uppercase">EQUIPOS DE PC</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pcTeams.map(team => (
                    <TeamCard key={team.id} team={team} />
                ))}
            </div>
        </div>

        {/* ================= CONSOLE SECTION ================= */}
        <div>
            <div className="flex items-center gap-4 mb-10 border-b border-gray-800 pb-4">
                <i className="fas fa-gamepad text-3xl text-rivals-red"></i>
                <h3 className="font-anton text-4xl text-white italic uppercase">EQUIPOS DE CONSOLA</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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