import React, { useState, useEffect } from 'react';
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

const Agenda: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const apiKey = 'AIzaSyBRFtFSBQW9wtz2I2a6AG0LX4GamL6PfFo';
  const calendarId = 'b49ef74d68fbb6e92d1de66a7183caf3d14fcc70c1c26591ce1727f2c78a86b4@group.calendar.google.com';

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
    <div className="min-h-screen bg-rivals-bg pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-montserrat">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="relative mb-8 flex flex-col md:flex-row md:items-end justify-between border-b border-rivals-red/30 pb-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black font-orbitron text-rivals-white tracking-tighter italic">
              MISSION LOG // <span className="text-rivals-red">AGENDA</span>
            </h1>
            <p className="mt-2 text-rivals-silver font-bold tracking-widest text-sm uppercase">
              HORARIOS OFICIALES DE PUGS, DRAFT Y MAIN EVENT
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center bg-rivals-black border border-rivals-red px-3 py-1 rounded shadow-neon-red">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
            <span className="text-[10px] font-orbitron font-bold text-rivals-white tracking-widest">
              SYNC: ONLINE
            </span>
          </div>
        </div>

        {/* Calendar Container */}
        <div className="bg-rivals-black border-2 border-rivals-red rounded-lg p-4 md:p-6 shadow-2xl relative overflow-hidden">
          <style>{`
            .fc { --fc-border-color: rgba(230, 36, 41, 0.2); --fc-button-bg-color: #050505; --fc-button-border-color: #E62429; --fc-button-hover-bg-color: #E62429; --fc-button-hover-border-color: #E62429; --fc-button-active-bg-color: #4a0a0c; --fc-button-active-border-color: #E62429; color: white; }
            .fc-toolbar-title { font-family: 'Orbitron', sans-serif !important; font-weight: 900 !important; text-transform: uppercase; letter-spacing: 0.1em; font-style: italic; font-size: 1.25rem !important; }
            .fc-col-header-cell { background: #E62429; color: white; padding: 8px 0 !important; text-transform: uppercase; font-size: 0.75rem; font-weight: 800; }
            .fc-daygrid-day-number { font-family: 'Orbitron', sans-serif; font-weight: 700; padding: 4px 8px !important; }
            .fc-event { border: none !important; padding: 2px 4px !important; border-radius: 2px !important; font-weight: 700 !important; font-size: 0.75rem !important; cursor: pointer; }
            .fc-list-day-cushion { background: #1a1a1a !important; }
            .fc-list-event:hover td { background: rgba(230, 36, 41, 0.1) !important; }
            .fc-theme-standard td, .fc-theme-standard th { border: 1px solid rgba(230, 36, 41, 0.2); }
            .fc-day-today { background: rgba(230, 36, 41, 0.05) !important; }
          `}</style>
          
          <FullCalendar
            plugins={[dayGridPlugin, listPlugin, googleCalendarPlugin]}
            initialView="dayGridMonth"
            googleCalendarApiKey={apiKey}
            events={{ googleCalendarId: calendarId }}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,listMonth'
            }}
            eventClick={handleEventClick}
            height="auto"
            locale="es"
          />

          {/* Legend */}
          <div className="mt-8 flex flex-wrap gap-4 pt-6 border-t border-rivals-red/20 justify-center text-[10px] font-bold tracking-widest uppercase">
            <div className="flex items-center"><span className="w-3 h-3 bg-blue-600 rounded-sm mr-2 shadow-[0_0_5px_rgba(37,99,235,0.5)]"></span> Inscripciones</div>
            <div className="flex items-center"><span className="w-3 h-3 bg-orange-500 rounded-sm mr-2 shadow-[0_0_5px_rgba(249,115,22,0.5)]"></span> Pugs</div>
            <div className="flex items-center"><span className="w-3 h-3 bg-red-600 rounded-sm mr-2 shadow-[0_0_5px_rgba(220,38,38,0.5)]"></span> Torneo</div>
            <div className="flex items-center"><span className="w-3 h-3 bg-purple-600 rounded-sm mr-2 shadow-[0_0_5_rgba(147,51,234,0.5)]"></span> Nichay</div>
            <div className="flex items-center"><span className="w-3 h-3 bg-green-600 rounded-sm mr-2 shadow-[0_0_5px_rgba(22,163,74,0.5)]"></span> Wings</div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rivals-black/90 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-rivals-black border-2 border-rivals-red p-8 shadow-[0_0_50px_rgba(230,36,41,0.3)] animate-in fade-in zoom-in duration-200">
            {/* Tactic Corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-rivals-red shadow-neon-red"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-rivals-red shadow-neon-red"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-rivals-red shadow-neon-red"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-rivals-red shadow-neon-red"></div>

            <div className="mb-6 border-b border-rivals-red/30 pb-2">
              <h3 className="text-[10px] font-orbitron font-black text-rivals-red tracking-[0.3em] uppercase">
                INCOMING DATA // EVENT DETAILS
              </h3>
            </div>

            <h2 className="text-3xl font-black font-orbitron text-rivals-white italic mb-4 uppercase leading-tight">
              {selectedEvent.title}
            </h2>

            <div className="flex items-center text-rivals-silver mb-6 font-bold text-sm tracking-wide">
              <i className="far fa-clock text-rivals-red mr-3 text-lg"></i>
              <span>{new Date(selectedEvent.start).toLocaleString('es-ES', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long',
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            </div>

            {text && (
              <div className="bg-rivals-white/5 p-4 rounded border border-rivals-white/10 mb-6 max-h-48 overflow-y-auto custom-scrollbar">
                <p className="text-rivals-silver leading-relaxed text-sm whitespace-pre-wrap font-medium uppercase italic opacity-80">
                  {text}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-3">
              {twitchUrl && (
                <a 
                  href={twitchUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-[#9146FF] hover:bg-[#772ce8] text-white py-3 px-6 rounded font-black font-orbitron tracking-widest text-sm transition-all shadow-[0_0_15px_rgba(145,70,255,0.4)] hover:scale-[1.02]"
                >
                  <i className="fab fa-twitch mr-3 text-lg"></i>
                  VER EN VIVO
                </a>
              )}
              
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-rivals-red hover:bg-rivals-darkRed text-rivals-white py-3 px-6 rounded font-black font-orbitron tracking-widest text-sm transition-all border border-transparent hover:border-rivals-red hover:scale-[1.02]"
              >
                CERRAR PROTOCOLO
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Agenda;
