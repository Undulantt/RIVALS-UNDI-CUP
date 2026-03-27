import React, { useState, useEffect, useMemo } from 'react';

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
const SHEET_ID = '1e8M3r-dbHHAAsD9nWX5TVc-DoWV1FiHhtdhdXJt_L5Q';

// Mapeo por índice de columna: A=0 Nombre, B=1 Rango, C=2 Desc, D=3 Rol, E=4 Tier
const parseGvizRows = (json: any): Player[] => {
  const results: Player[] = [];
  for (const row of json.table.rows) {
    if (!row || !row.c) continue;
    const cells = row.c;
    const nombre = String(cells[0]?.v ?? '').trim();
    // Saltar filas vacías, el header de columnas o fila de instrucciones
    if (!nombre || nombre.toUpperCase() === 'NOMBRE' || nombre.includes('PROTOCOL') || nombre.includes('CUP')) continue;
    results.push({
      Nombre:      nombre,
      Rango:       String(cells[1]?.v ?? '').trim(),
      Descripcion: String(cells[2]?.v ?? '').trim(),
      Rol:         String(cells[3]?.v ?? '').trim(),
      Tier:        String(cells[4]?.v ?? '').trim().toUpperCase(),
    });
  }
  return results;
};

const Draft: React.FC = () => {
  const [password, setPassword]             = useState('');
  const [isAuthenticated, setIsAuth]        = useState(false);
  const [authError, setAuthError]           = useState(false);
  const [players, setPlayers]               = useState<Player[]>([]);
  const [teams, setTeams]                   = useState<Team[]>(
    Array.from({ length: 16 }, (_, i) => ({ id: i + 1, captainName: `CAPTAIN ${i + 1}`, players: [] }))
  );
  const [searchTerm, setSearchTerm]         = useState('');
  const [filterTier, setFilterTier]         = useState<string | null>(null);
  const [draggedPlayer, setDraggedPlayer]   = useState<Player | null>(null);
  const [dragOverTeam, setDragOverTeam]     = useState<number | null>(null);
  const [loading, setLoading]               = useState(true);
  const [fetchError, setFetchError]         = useState('');

  useEffect(() => {
    if (!isAuthenticated) return;
    setLoading(true);
    setFetchError('');

    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then(raw => {
        const start = raw.indexOf('(') + 1;
        const end   = raw.lastIndexOf(')');
        const json  = JSON.parse(raw.substring(start, end));
        const parsed = parseGvizRows(json);
        setPlayers(parsed);
        if (parsed.length === 0) {
          setFetchError('No se encontraron jugadores. Verifica que la hoja sea pública y tenga datos.');
        }
      })
      .catch(err => setFetchError(`Error: ${err.message}`))
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PASSWORD_CORRECT) { setIsAuth(true); setAuthError(false); }
    else setAuthError(true);
  };

  const draftedNames = useMemo(
    () => new Set(teams.flatMap(t => t.players.map(p => p.Nombre))),
    [teams]
  );

  const filteredPlayers = useMemo(() => players.filter(p => {
    if (!p.Nombre) return false;
    const matchSearch = searchTerm === '' || p.Nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTier   = filterTier === null || p.Tier === filterTier;
    const notDrafted  = !draftedNames.has(p.Nombre);
    return matchSearch && matchTier && notDrafted;
  }), [players, searchTerm, filterTier, draftedNames]);

  const playersLeft  = players.length - draftedNames.size;
  const draftedCount = draftedNames.size;

  const getTierColors = (tier: string) => {
    switch (tier) {
      case 'S': return { text: 'text-yellow-400', bg: 'bg-yellow-400', border: 'border-yellow-400', glow: 'shadow-[0_0_8px_rgba(250,204,21,0.5)]' };
      case 'A': return { text: 'text-red-500',    bg: 'bg-red-500',    border: 'border-red-500',    glow: 'shadow-[0_0_8px_rgba(239,68,68,0.5)]' };
      case 'B': return { text: 'text-purple-400', bg: 'bg-purple-400', border: 'border-purple-400', glow: 'shadow-[0_0_8px_rgba(192,132,252,0.5)]' };
      case 'C': return { text: 'text-blue-400',   bg: 'bg-blue-400',   border: 'border-blue-400',   glow: 'shadow-[0_0_8px_rgba(96,165,250,0.5)]' };
      default:  return { text: 'text-gray-400',   bg: 'bg-gray-500',   border: 'border-gray-600',   glow: '' };
    }
  };

  const getRoleIcon = (rol: string) => {
    switch (rol.toLowerCase()) {
      case 'tank':       return 'fa-shield-halved';
      case 'dps':        return 'fa-gun';
      case 'soporte':
      case 'support':    return 'fa-heart-pulse';
      case 'estratega':
      case 'strategist': return 'fa-brain';
      case 'flex':       return 'fa-shuffle';
      default:           return 'fa-user';
    }
  };

  const handleDragStart = (e: React.DragEvent, player: Player) => {
    e.dataTransfer.effectAllowed = 'move';
    setDraggedPlayer(player);
  };

  const handleDragOver = (e: React.DragEvent, teamId: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverTeam(teamId);
  };

  const handleDrop = (e: React.DragEvent, teamId: number) => {
    e.preventDefault();
    if (!draggedPlayer) return;
    setTeams(prev => prev.map(t => {
      if (t.id === teamId && t.players.length < 5 && !t.players.find(p => p.Nombre === draggedPlayer.Nombre)) {
        return { ...t, players: [...t.players, draggedPlayer] };
      }
      return t;
    }));
    setDraggedPlayer(null);
    setDragOverTeam(null);
  };

  const handleDragEnd = () => { setDraggedPlayer(null); setDragOverTeam(null); };

  const removePlayer = (teamId: number, nombre: string) => {
    setTeams(prev => prev.map(t =>
      t.id === teamId ? { ...t, players: t.players.filter(p => p.Nombre !== nombre) } : t
    ));
  };

  // ---- AUTH SCREEN ----
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
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-rivals-red/50 p-3 text-white focus:outline-none focus:border-rivals-red transition-colors font-mono tracking-widest"
                placeholder="********"
              />
            </div>
            {authError && (
              <p className="text-rivals-red text-[10px] font-bold animate-pulse uppercase tracking-widest">
                [ERROR] INVALID CREDENTIALS. ACCESS DENIED.
              </p>
            )}
            <button type="submit" className="w-full bg-rivals-red hover:bg-rivals-darkRed text-white py-3 font-black tracking-widest transition-all italic">
              ACCEDER AL PROTOCOLO
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ---- MAIN DRAFT UI ----
  return (
    <div className="bg-rivals-bg font-montserrat flex flex-col overflow-hidden" style={{ height: '100vh' }}>

      {/* HUD HEADER */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-rivals-red/30 bg-black/60 shrink-0">
        <div>
          <h1 className="text-xl font-black font-orbitron text-white italic tracking-tighter">
            DRAFT PROTOCOL // <span className="text-rivals-red text-sm tracking-[0.2em] font-bold">LIVE FEED</span>
          </h1>
          <p className="font-orbitron text-[9px] text-white/30 tracking-widest uppercase">LIVE PLAYER ALLOCATION SYSTEM</p>
        </div>
        <div className="flex gap-6 items-center bg-black/40 px-6 py-2 border border-rivals-red/20">
          <div className="text-center">
            <p className="text-[9px] font-bold text-white/50 tracking-widest uppercase">Players Left</p>
            <p className="text-2xl font-black font-orbitron text-white leading-none">{playersLeft}</p>
          </div>
          <div className="w-px h-8 bg-rivals-red/30"></div>
          <div className="text-center">
            <p className="text-[9px] font-bold text-rivals-red tracking-widest uppercase">Drafted</p>
            <p className="text-2xl font-black font-orbitron text-rivals-red leading-none">{draftedCount}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3 flex-1 min-h-0 p-3">

        {/* ======== LEFT PANEL: PLAYERS ======== */}
        <div className="w-72 bg-black/40 border border-rivals-red/30 flex flex-col overflow-hidden shrink-0">

          {/* Search & Filters */}
          <div className="p-3 bg-white/5 border-b border-white/10 space-y-2 shrink-0">
            <div className="relative">
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-xs"></i>
              <input
                type="text"
                placeholder="BUSCAR JUGADOR..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-black border border-rivals-red/30 p-2 pl-8 text-xs text-white focus:outline-none focus:border-rivals-red font-orbitron tracking-widest uppercase"
              />
            </div>
            <div className="flex gap-1">
              {['S', 'A', 'B', 'C'].map(t => {
                const tc = getTierColors(t);
                return (
                  <button
                    key={t}
                    onClick={() => setFilterTier(filterTier === t ? null : t)}
                    className={`flex-1 py-1.5 font-orbitron font-black text-xs border transition-all ${
                      filterTier === t ? `${tc.bg} border-transparent text-white` : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
              <button
                onClick={() => { setFilterTier(null); setSearchTerm(''); }}
                className="px-3 border border-white/10 text-white/40 hover:text-white text-xs transition-colors"
              >
                <i className="fas fa-rotate-left"></i>
              </button>
            </div>
          </div>

          {/* Player list */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full gap-3 text-white/20">
                <i className="fas fa-circle-notch fa-spin text-rivals-red text-2xl"></i>
                <span className="font-orbitron text-xs tracking-widest animate-pulse uppercase">Syncing data...</span>
              </div>
            ) : fetchError ? (
              <div className="text-center py-10 px-3 space-y-2">
                <i className="fas fa-triangle-exclamation text-rivals-red text-2xl"></i>
                <p className="font-orbitron text-[10px] text-rivals-red uppercase tracking-widest leading-relaxed">{fetchError}</p>
              </div>
            ) : filteredPlayers.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-2 text-white/20">
                <i className="fas fa-satellite-dish text-3xl"></i>
                <span className="font-orbitron text-xs tracking-widest uppercase">No signals found</span>
              </div>
            ) : (
              filteredPlayers.map((player, idx) => {
                const tc = getTierColors(player.Tier);
                const isDragging = draggedPlayer?.Nombre === player.Nombre;
                return (
                  <div
                    key={`${player.Nombre}-${idx}`}
                    draggable
                    onDragStart={e => handleDragStart(e, player)}
                    onDragEnd={handleDragEnd}
                    className={`
                      group relative border-l-4 ${tc.border} p-3 cursor-grab active:cursor-grabbing
                      transition-all duration-150 select-none
                      ${isDragging ? 'opacity-30 scale-95 bg-white/5' : 'bg-white/5 hover:bg-white/10'}
                    `}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-base font-black font-orbitron italic ${tc.text}`}>
                        {player.Tier || '?'}
                      </span>
                      <i className={`fas ${getRoleIcon(player.Rol)} text-xs text-white/25 group-hover:text-rivals-red transition-colors`}></i>
                    </div>
                    <h3 className="font-black font-orbitron text-white tracking-tighter uppercase text-sm leading-tight group-hover:text-rivals-red transition-colors">
                      {player.Nombre}
                    </h3>
                    <p className={`text-[9px] font-bold ${tc.text} tracking-[0.15em] uppercase mt-0.5`}>{player.Rango}</p>
                    {player.Descripcion && (
                      <p className="text-[9px] text-white/35 italic mt-1 line-clamp-1">{player.Descripcion}</p>
                    )}
                    <div className="flex items-center gap-1 mt-1.5">
                      <i className="fas fa-arrows-up-down-left-right text-[8px] text-white/15"></i>
                      <span className="text-[8px] text-white/15 font-orbitron tracking-widest uppercase">Drag to assign</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ======== RIGHT PANEL: TEAMS GRID ======== */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-4 gap-2 pb-4">
            {teams.map(team => {
              const isOver = dragOverTeam === team.id;
              const isFull = team.players.length >= 5;
              return (
                <div
                  key={team.id}
                  onDragOver={e => !isFull && handleDragOver(e, team.id)}
                  onDragLeave={() => setDragOverTeam(null)}
                  onDrop={e => !isFull && handleDrop(e, team.id)}
                  className={`relative border transition-all duration-150 ${
                    isOver && !isFull
                      ? 'border-rivals-red shadow-neon-red scale-[1.02] bg-rivals-red/5'
                      : isFull
                      ? 'border-rivals-red/30 bg-black/30'
                      : 'border-white/10 bg-black/20 hover:border-white/20'
                  }`}
                >
                  {/* Corner decorations */}
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-rivals-red opacity-60"></div>
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-rivals-red opacity-60"></div>

                  {/* Team header */}
                  <div className={`px-3 py-2 border-b flex justify-between items-center ${
                    isOver && !isFull ? 'border-rivals-red/50 bg-rivals-red/10' : 'border-white/10 bg-white/5'
                  }`}>
                    <h4 className="font-orbitron font-black text-[10px] text-white tracking-widest italic uppercase truncate">
                      {team.captainName}
                    </h4>
                    <span className={`text-[9px] font-black font-orbitron ml-2 shrink-0 ${isFull ? 'text-rivals-red' : 'text-white/30'}`}>
                      {team.players.length}/5
                    </span>
                  </div>

                  <div className="p-1.5 space-y-1">
                    {team.players.map((p, i) => {
                      const tc = getTierColors(p.Tier);
                      return (
                        <div key={i} className="bg-white/5 px-2 py-1.5 flex items-center justify-between border border-white/5 group/slot">
                          <div className="flex items-center gap-1.5 overflow-hidden min-w-0">
                            <span className={`font-black font-orbitron text-[9px] shrink-0 ${tc.text}`}>{p.Tier}</span>
                            <i className={`fas ${getRoleIcon(p.Rol)} text-[8px] text-white/20 shrink-0`}></i>
                            <span className="font-bold text-[9px] text-white truncate uppercase tracking-tight">{p.Nombre}</span>
                          </div>
                          <button
                            onClick={() => removePlayer(team.id, p.Nombre)}
                            className="text-white/10 hover:text-rivals-red transition-colors text-[9px] ml-1 shrink-0 opacity-0 group-hover/slot:opacity-100"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      );
                    })}
                    {Array.from({ length: 5 - team.players.length }).map((_, i) => (
                      <div
                        key={`empty-${i}`}
                        className={`w-full py-2.5 border border-dashed flex items-center justify-center transition-all ${
                          isOver && !isFull ? 'border-rivals-red/60 bg-rivals-red/5' : 'border-white/8'
                        }`}
                      >
                        <span className="text-[7px] font-bold tracking-[0.3em] uppercase text-white/10">
                          {isOver && i === 0 ? '⬇ DROP HERE' : 'EMPTY SLOT'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* DRAG FLOATING INDICATOR */}
      {draggedPlayer && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
          <div className="bg-rivals-red border-2 border-white/20 px-6 py-2.5 shadow-2xl flex items-center gap-3">
            <i className="fas fa-arrows-up-down-left-right text-white text-sm"></i>
            <span className="font-orbitron font-black text-white text-xs tracking-widest italic uppercase">
              {draggedPlayer.Nombre}
            </span>
            <span className={`font-orbitron text-xs font-black ${getTierColors(draggedPlayer.Tier).text}`}>
              [{draggedPlayer.Tier}]
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Draft;