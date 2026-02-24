import React, { useState, useEffect, useMemo } from 'react';
import Papa from 'papaparse';

interface Player {
  Nombre: string;
  Rango: string;
  Descripcion: string;
  Rol: string;
  Tier: string;
}

interface Team {
  id: number;
  captainName: string;
  players: Player[];
}

const PASSWORD_CORRECT = 'S1MBIOSEX';

const Draft: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>(
    Array.from({ length: 12 }, (_, i) => ({ id: i + 1, captainName: `CAPTAIN ${i + 1}`, players: [] }))
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState<string | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);

  const sheetId = '1e8M3r-dbHHAAsD9nWX5TVc-DoWV1FiHhtdhdXJt_L5Q';
  const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

  useEffect(() => {
    if (isAuthenticated) {
      Papa.parse(csvUrl, {
        download: true,
        header: true,
        complete: (results) => {
          setPlayers(results.data as Player[]);
          setLoading(false);
        },
        error: (error) => {
          console.error('Error fetching sheets:', error);
          setLoading(false);
        }
      });
    }
  }, [isAuthenticated, csvUrl]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PASSWORD_CORRECT) {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const filteredPlayers = useMemo(() => {
    return players.filter(p => {
      const matchesSearch = p.Nombre?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTier = filterTier ? p.Tier === filterTier : true;
      const isDrafted = teams.some(t => t.players.some(tp => tp.Nombre === p.Nombre));
      return matchesSearch && matchesTier && !isDrafted;
    });
  }, [players, searchTerm, filterTier, teams]);

  const playersLeft = players.length - teams.reduce((acc, t) => acc + t.players.length, 0);
  const draftedCount = teams.reduce((acc, t) => acc + t.players.length, 0);

  const getTierColor = (tier: string) => {
    switch (tier?.toUpperCase()) {
      case 'S': return 'text-yellow-400 border-yellow-400';
      case 'A': return 'text-red-500 border-red-500';
      case 'B': return 'text-purple-500 border-purple-500';
      case 'C': return 'text-blue-500 border-blue-500';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getRoleIcon = (rol: string) => {
    switch (rol?.toLowerCase()) {
      case 'tank': return 'fa-shield-halved';
      case 'dps': return 'fa-gun';
      case 'support': return 'fa-heart-pulse';
      case 'strategist': return 'fa-brain';
      default: return 'fa-user';
    }
  };

  const assignPlayer = (teamId: number) => {
    if (!selectedPlayer) return;
    setTeams(prev => prev.map(t => {
      if (t.id === teamId && t.players.length < 5) {
        return { ...t, players: [...t.players, selectedPlayer] };
      }
      return t;
    }));
    setSelectedPlayer(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-rivals-bg flex items-center justify-center p-4 font-orbitron">
        <div className="max-w-md w-full bg-rivals-black border-2 border-rivals-red p-8 relative shadow-neon-red">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-rivals-red"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-rivals-red"></div>
          
          <h2 className="text-2xl font-black text-white italic mb-6 border-b border-rivals-red/30 pb-2 tracking-widest">
            RESTRICTED // DRAFT ACCESS
          </h2>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] text-rivals-red font-bold tracking-[0.3em] mb-2 uppercase">
                ENTER CLEARANCE CODE
              </label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-rivals-red/50 p-3 text-white focus:outline-none focus:border-rivals-red transition-colors font-mono tracking-widest"
                placeholder="********"
              />
            </div>
            
            {authError && (
              <p className="text-rivals-red text-[10px] font-bold animate-pulse uppercase tracking-widest">
                [ERROR] INVALID CREDENTIALS. ACCESS DENIED.
              </p>
            )}

            <button 
              type="submit"
              className="w-full bg-rivals-red hover:bg-rivals-darkRed text-white py-3 font-black tracking-widest transition-all italic"
            >
              ACCEDER AL PROTOCOLO
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rivals-bg pt-20 pb-8 px-4 font-montserrat flex flex-col h-screen overflow-hidden">
      {/* HUD Header */}
      <div className="flex justify-between items-center mb-4 border-b border-rivals-red/30 pb-2 shrink-0">
        <div>
          <h1 className="text-2xl font-black font-orbitron text-white italic tracking-tighter">
            DRAFT PROTOCOL // <span className="text-rivals-red text-sm tracking-[0.2em] font-bold">LIVE FEED</span>
          </h1>
        </div>
        <div className="flex gap-8 items-center bg-black/40 px-6 py-2 border border-rivals-red/20 rounded-sm shadow-inner">
          <div className="text-center">
            <p className="text-[10px] font-bold text-white/60 tracking-widest uppercase">Players Left</p>
            <p className="text-2xl font-black font-orbitron text-white">{playersLeft}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-bold text-rivals-red tracking-widest uppercase">Drafted</p>
            <p className="text-2xl font-black font-orbitron text-rivals-red">{draftedCount}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 flex-1 min-h-0">
        {/* Left Panel: Players List */}
        <div className="w-1/3 bg-rivals-black border border-rivals-red/30 flex flex-col rounded-sm overflow-hidden">
          <div className="p-4 bg-white/5 border-b border-white/10 space-y-4">
            <div className="relative">
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-xs"></i>
              <input 
                type="text"
                placeholder="BUSCAR JUGADOR..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black border border-rivals-red/30 p-2 pl-10 text-xs text-white focus:outline-none focus:border-rivals-red font-orbitron tracking-widest uppercase"
              />
            </div>
            <div className="flex gap-2 justify-between">
              {['S', 'A', 'B', 'C'].map(t => (
                <button
                  key={t}
                  onClick={() => setFilterTier(filterTier === t ? null : t)}
                  className={`flex-1 py-1 font-orbitron font-black text-xs border transition-all ${
                    filterTier === t 
                      ? 'bg-rivals-red border-rivals-red text-white' 
                      : 'border-white/10 text-white/40 hover:border-rivals-red/50 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
              <button 
                onClick={() => {setFilterTier(null); setSearchTerm('');}}
                className="px-3 border border-white/10 text-white/40 hover:text-white text-xs"
              >
                <i className="fas fa-rotate-left"></i>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {loading ? (
              <div className="text-center py-20 text-white/20 font-orbitron animate-pulse uppercase tracking-[0.5em]">Syncing...</div>
            ) : filteredPlayers.length === 0 ? (
              <div className="text-center py-20 text-white/20 font-orbitron uppercase tracking-widest">No signals found</div>
            ) : (
              filteredPlayers.map((player, idx) => (
                <div 
                  key={idx}
                  onClick={() => setSelectedPlayer(player)}
                  className={`group bg-white/5 border-l-4 p-3 cursor-pointer transition-all hover:bg-white/10 ${
                    selectedPlayer?.Nombre === player.Nombre ? 'border-rivals-red bg-white/10' : 'border-white/10'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-xl font-black font-orbitron italic ${getTierColor(player.Tier).split(' ')[0]}`}>
                      {player.Tier}
                    </span>
                    <i className={`fas ${getRoleIcon(player.Rol)} text-white/30 group-hover:text-rivals-red transition-colors`}></i>
                  </div>
                  <h3 className="text-lg font-black font-orbitron text-white tracking-tighter uppercase leading-tight group-hover:text-rivals-red transition-colors">
                    {player.Nombre}
                  </h3>
                  <p className="text-[10px] font-bold text-rivals-red tracking-[0.2em] uppercase mb-2">{player.Rango}</p>
                  <p className="text-[10px] text-white/40 leading-relaxed italic line-clamp-2">{player.Descripcion}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Panel: Captains Grid */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <div className="grid grid-cols-4 gap-4 pb-4">
            {teams.map((team) => (
              <div key={team.id} className="bg-rivals-black border border-white/10 relative group">
                {/* HUD Corner Detail */}
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-rivals-red"></div>
                
                <div className="p-3 border-b border-white/10 flex justify-between items-center bg-white/5">
                  <h4 className="font-orbitron font-black text-xs text-white tracking-widest italic uppercase">
                    {team.captainName}
                  </h4>
                  <span className={`text-[10px] font-black font-orbitron ${team.players.length === 5 ? 'text-rivals-red' : 'text-white/40'}`}>
                    {team.players.length}/5
                  </span>
                </div>

                <div className="p-2 space-y-1">
                  {team.players.map((p, i) => (
                    <div key={i} className="bg-white/5 p-2 flex items-center justify-between border border-white/5 rounded-sm">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span className={`font-black font-orbitron text-[10px] ${getTierColor(p.Tier).split(' ')[0]}`}>{p.Tier}</span>
                        <span className="font-bold text-[10px] text-white truncate uppercase tracking-tighter">{p.Nombre}</span>
                      </div>
                      <i className={`fas ${getRoleIcon(p.Rol)} text-[10px] text-white/20`}></i>
                    </div>
                  ))}
                  {Array.from({ length: 5 - team.players.length }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => assignPlayer(team.id)}
                      disabled={!selectedPlayer}
                      className={`w-full py-3 border border-dashed border-white/10 flex items-center justify-center transition-all ${
                        selectedPlayer ? 'hover:border-rivals-red/50 hover:bg-rivals-red/5' : ''
                      }`}
                    >
                      <span className="text-[8px] font-bold text-white/10 tracking-[0.3em] uppercase group-hover:text-white/30">EMPTY SLOT</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assignment Modal Indicator */}
      {selectedPlayer && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-rivals-red px-8 py-3 rounded-full shadow-2xl animate-bounce flex items-center gap-4 border-2 border-white/20 z-50">
          <span className="font-orbitron font-black text-white text-xs tracking-widest italic uppercase">
            ASSIGNING: {selectedPlayer.Nombre}
          </span>
          <button 
            onClick={() => setSelectedPlayer(null)}
            className="text-white hover:text-black transition-colors"
          >
            <i className="fas fa-times-circle"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default Draft;
