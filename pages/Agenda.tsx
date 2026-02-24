import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import googleCalendarPlugin from '@fullcalendar/google-calendar';

interface CalendarEvent {
  title: string;
  start: string;
  end?: string;
  extendedProps?: {
    description?: string;
    location?: string;
  };
}

const AgendaPage: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const apiKey = 'AIzaSyBRFtFSBQW9wtz2I2a6AG0LX4GamL6PfFo';
  const calendarId = 'b49ef74d68fbb6e92d1de66a7183caf3d14fcc70c1c26591ce1727f2c78a86b4@group.calendar.google.com';

  // ---- Color por palabra clave en el título ----
  const getEventColor = (title: string): string => {
    const t = title.toUpperCase();
    if (t.includes('INSCRIPCION') || t.includes('INSCRIPCIÓN')) return '#2563EB';
    if (t.includes('PUGS') || t.includes('PUG'))                 return '#F97316';
    if (t.includes('TORNEO'))                                     return '#E62429';
    if (t.includes('NICHAY'))                                     return '#9333EA';
    if (t.includes('WINGS'))                                      return '#16A34A';
    if (t.includes('JAZMIN') || t.includes('JAZMÍN'))            return '#EC4899';
    return '#6B7280';
  };

  // ---- Aplica color sólido y oculta el dot ----
  // ---- Glow LED por tipo de evento ----
  const getEventGlow = (title: string): string => {
    const t = title.toUpperCase();
    if (t.includes('INSCRIPCION') || t.includes('INSCRIPCIÓN')) return '0 0 8px #2563EB, 0 0 18px #2563EB66';
    if (t.includes('PUGS') || t.includes('PUG'))                 return '0 0 8px #F97316, 0 0 18px #F9731666';
    if (t.includes('TORNEO'))                                     return '0 0 8px #E62429, 0 0 18px #E6242966';
    if (t.includes('NICHAY'))                                     return '0 0 8px #9333EA, 0 0 18px #9333EA66';
    if (t.includes('WINGS'))                                      return '0 0 8px #16A34A, 0 0 18px #16A34A66';
    if (t.includes('JAZMIN') || t.includes('JAZMÍN'))            return '0 0 8px #EC4899, 0 0 18px #EC489966';
    return '0 0 6px #6B728066';
  };

  // ---- Aplica color LED semitransparente con blur, oculta dot y hora ----
  const handleEventDidMount = (info: any) => {
    const color = getEventColor(info.event.title);
    const glow  = getEventGlow(info.event.title);
    // Color semitransparente: convertir hex a rgba con alpha 0.75
    const hexToRgba = (hex: string, alpha: number) => {
      const r = parseInt(hex.slice(1,3), 16);
      const g = parseInt(hex.slice(3,5), 16);
      const b = parseInt(hex.slice(5,7), 16);
      return `rgba(${r},${g},${b},${alpha})`;
    };
    info.el.style.backgroundColor = hexToRgba(color, 0.72);
    info.el.style.backdropFilter = 'blur(6px)';
    info.el.style.webkitBackdropFilter = 'blur(6px)';
    info.el.style.borderColor = color;
    info.el.style.borderLeft = `3px solid ${color}`;
    info.el.style.color = '#ffffff';
    info.el.style.borderRadius = '0';
    info.el.style.boxShadow = glow;
    const dot = info.el.querySelector('.fc-daygrid-event-dot, .fc-list-event-dot');
    if (dot) (dot as HTMLElement).style.display = 'none';
    const time = info.el.querySelector('.fc-event-time');
    if (time) (time as HTMLElement).style.display = 'none';
  };

  const handleEventClick = (info: any) => {
    setSelectedEvent({
      title: info.event.title,
      start: info.event.startStr,
      end: info.event.endStr,
      extendedProps: {
        description: info.event.extendedProps.description,
        location: info.event.extendedProps.location,
      }
    });
    setIsModalOpen(true);
  };

  const parseDescription = (description: string | undefined) => {
    if (!description) return { text: '', twitchUrl: null };
    const twitchRegex = /(https?:\/\/(www\.)?twitch\.tv\/[a-zA-Z0-9_]+)/g;
    const match = description.match(twitchRegex);
    const twitchUrl = match ? match[0] : null;
    const text = description.replace(twitchRegex, '').trim();
    return { text, twitchUrl };
  };

  const { text, twitchUrl } = parseDescription(selectedEvent?.extendedProps?.description);

  return (
    <div className="min-h-screen bg-rivals-bg pt-32 pb-20 relative overflow-x-hidden">

      {/* Background Decor */}
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-rivals-red/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* HEADER */}
        <div className="text-center animate-fade-in-up mb-12">
          <h1 className="text-6xl md:text-8xl font-anton uppercase italic text-white leading-none mb-6">
            HORARIOS // <span className="text-transparent bg-clip-text bg-gradient-to-r from-rivals-red to-white pb-4 pr-5">AGENDA</span>
          </h1>
          <div className="w-full max-w-md h-1 bg-rivals-red mx-auto mb-6 shadow-neon-red transform -skew-x-12"></div>
          <p className="font-montserrat text-gray-400 text-sm tracking-[0.3em] uppercase font-bold">
            HORARIOS OFICIALES DE PUGS, DRAFT Y MAIN EVENT
          </p>
          <div className="mt-6 inline-flex items-center bg-black border border-rivals-red px-4 py-2 shadow-neon-red">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
            <span className="font-orbitron font-bold text-white text-xs tracking-widest">SYNC: ONLINE</span>
          </div>
        </div>

        {/* CALENDARIO */}
        <div className="bg-zinc-900/80 border-2 border-rivals-red/60 backdrop-blur-sm p-4 md:p-8 relative overflow-hidden">

          {/* Esquinas HUD */}
          <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-rivals-red"></div>
          <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-rivals-red"></div>
          <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-rivals-red"></div>
          <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-rivals-red"></div>

          <style>{`
            .fc {
              --fc-border-color: rgba(230, 36, 41, 0.2);
              --fc-button-bg-color: #0a0a0a;
              --fc-button-border-color: #E62429;
              --fc-button-text-color: #ffffff;
              --fc-button-hover-bg-color: #E62429;
              --fc-button-hover-border-color: #E62429;
              --fc-button-active-bg-color: #7f1d1d;
              --fc-button-active-border-color: #E62429;
              --fc-today-bg-color: rgba(230, 36, 41, 0.06);
              --fc-page-bg-color: transparent;
              --fc-neutral-bg-color: transparent;
              color: white;
              font-family: 'Montserrat', sans-serif;
            }
            .fc .fc-button {
              font-family: 'Anton', sans-serif;
              font-style: italic;
              letter-spacing: 0.05em;
              text-transform: uppercase;
              border-radius: 0;
              padding: 6px 14px;
            }
            .fc-toolbar-title {
              font-family: 'Anton', sans-serif !important;
              font-style: italic !important;
              text-transform: uppercase;
              letter-spacing: 0.08em;
              font-size: 1.4rem !important;
            }
            .fc-col-header-cell {
              background: rgba(230, 36, 41, 0.8);
              color: white;
              padding: 8px 0 !important;
              text-transform: uppercase;
              font-size: 0.7rem;
              font-weight: 800;
              letter-spacing: 0.1em;
              border: none !important;
            }
            .fc-daygrid-day-number {
              font-family: 'Orbitron', sans-serif;
              font-weight: 700;
              font-size: 0.75rem;
              padding: 4px 8px !important;
              color: #9ca3af;
            }
            .fc-day-today .fc-daygrid-day-number { color: #E62429; }
            .fc-event {
              border-radius: 0 !important;
              font-weight: 700 !important;
              font-size: 0.75rem !important;
              cursor: pointer;
              font-family: 'Montserrat', sans-serif;
              padding: 2px 6px !important;
            }
            .fc-event-title { font-weight: 700 !important; color: #fff !important; }
            .fc-daygrid-event-dot { display: none !important; }
            .fc-list-event-dot { display: none !important; }
            .fc-theme-standard td, .fc-theme-standard th {
              border: 1px solid rgba(230, 36, 41, 0.15);
            }
            .fc-list-day-cushion {
              background: rgba(230, 36, 41, 0.15) !important;
              font-family: 'Anton', sans-serif;
              font-style: italic;
              letter-spacing: 0.05em;
            }
            .fc-list-event:hover td { background: rgba(230, 36, 41, 0.08) !important; }
            .fc-list-event-title { font-weight: 700; }
            .fc-scrollgrid { border-radius: 0 !important; }
            .fc-event-time { display: none !important; }
            /* Responsive toolbar para móvil */
            @media (max-width: 640px) {
              .fc-toolbar { flex-wrap: wrap; gap: 8px; justify-content: center; }
              .fc-toolbar-chunk { display: flex; align-items: center; gap: 4px; }
              .fc-toolbar-title { font-size: 1rem !important; text-align: center; }
              .fc .fc-button { padding: 4px 8px; font-size: 0.7rem; }
              .fc-header-toolbar { flex-direction: column; gap: 8px; }
            }
          `}</style>

          <FullCalendar
            plugins={[dayGridPlugin, listPlugin, googleCalendarPlugin]}
            initialView={typeof window !== 'undefined' && window.innerWidth < 768 ? 'listMonth' : 'dayGridMonth'}
            googleCalendarApiKey={apiKey}
            events={{ googleCalendarId: calendarId }}
            headerToolbar={{
              left: 'prev,next',
              center: 'title',
              right: 'dayGridMonth,listMonth'
            }}
            footerToolbar={{
              center: 'today'
            }}
            views={{
              dayGridMonth: { buttonText: 'Month' },
              listMonth:    { buttonText: 'List'  }
            }}
            eventClick={handleEventClick}
            eventDidMount={handleEventDidMount}
            displayEventTime={false}
            height="auto"
            locale="es"
          />

          {/* Leyenda */}
          <div className="mt-8 pt-6 border-t border-rivals-red/20">
            <div className="flex flex-wrap gap-6 justify-center">
              {[
                { label: 'INSCRIPCIONES', color: '#2563EB' },
                { label: 'PUGS',          color: '#F97316' },
                { label: 'TORNEO',        color: '#E62429' },
                { label: 'NICHAY',        color: '#9333EA' },
                { label: 'WINGS',         color: '#16A34A' },
                { label: 'JAZMIN',        color: '#EC4899' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span
                    className="w-4 h-3 transform -skew-x-12 inline-block"
                    style={{ backgroundColor: item.color, boxShadow: `0 0 6px ${item.color}88` }}
                  ></span>
                  <span className="font-montserrat text-xs font-bold text-gray-400 tracking-widest uppercase">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md bg-rivals-bg border-2 border-rivals-red p-8 shadow-[0_0_60px_rgba(230,36,41,0.25)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Esquinas HUD */}
            <div className="absolute top-0 left-0 w-5 h-5 border-t-4 border-l-4 border-rivals-red shadow-neon-red -translate-x-px -translate-y-px"></div>
            <div className="absolute top-0 right-0 w-5 h-5 border-t-4 border-r-4 border-rivals-red shadow-neon-red translate-x-px -translate-y-px"></div>
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-4 border-l-4 border-rivals-red shadow-neon-red -translate-x-px translate-y-px"></div>
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-4 border-r-4 border-rivals-red shadow-neon-red translate-x-px translate-y-px"></div>

            {/* Línea de color del evento arriba del modal */}
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ backgroundColor: getEventColor(selectedEvent.title) }}
            ></div>

            {/* Header */}
            <div className="mb-5 pb-3 border-b border-rivals-red/30">
              <span className="font-orbitron font-bold text-rivals-red text-[10px] tracking-[0.35em] uppercase">
                INCOMING DATA // EVENT DETAILS
              </span>
            </div>

            {/* Título */}
            <h2 className="font-anton text-3xl text-white uppercase italic leading-tight mb-4">
              {selectedEvent.title}
            </h2>

            {/* Fecha y hora */}
            <div className="flex items-center gap-3 mb-6 bg-zinc-900/60 border border-gray-800 px-4 py-3">
              <i className="far fa-clock text-rivals-red text-base"></i>
              <span className="font-montserrat text-sm font-bold text-gray-300 uppercase tracking-wide">
                {new Date(selectedEvent.start).toLocaleString('es-ES', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>

            {/* Descripción con borde del color del evento */}
            {text && (
              <div
                className="mb-6 bg-zinc-900/50 px-4 py-3 max-h-40 overflow-y-auto border-l-4"
                style={{ borderColor: getEventColor(selectedEvent.title) }}
              >
                <p className="font-montserrat text-sm text-gray-400 leading-relaxed">
                  {text}
                </p>
              </div>
            )}

            {/* Botones */}
            <div className="flex flex-col gap-3 mt-2">
              {twitchUrl && (
                <a
                  href={twitchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-6 py-3 bg-[#9146FF] hover:bg-[#772ce8] text-white font-anton text-base uppercase italic tracking-wider transition-all duration-200 hover:shadow-[0_0_20px_rgba(145,70,255,0.5)] active:scale-95"
                >
                  <i className="fab fa-twitch text-lg"></i>
                  VER EN VIVO
                </a>
              )}
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex items-center justify-center gap-3 px-6 py-3 bg-rivals-red hover:bg-white text-white hover:text-rivals-red font-anton text-base uppercase italic tracking-wider transition-all duration-200 hover:shadow-[0_0_20px_rgba(230,36,41,0.5)] active:scale-95"
              >
                <i className="fas fa-times text-base"></i>
                CERRAR PROTOCOLO
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgendaPage;