import React from 'react';

const ContactoPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-rivals-bg pt-32 pb-20 px-6 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto w-full relative z-10 animate-fade-in-up">
        
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-anton uppercase italic text-white">
            CONTACT <span className="text-rivals-red">H.Q.</span>
          </h2>
          <p className="font-orbitron text-gray-500 mt-2 tracking-widest">SYMBIOSIX COMMAND CENTER</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Discord Card */}
          <a href="https://discord.gg/HdBZGKHZ7J" target="_blank" rel="noopener noreferrer" className="group bg-zinc-900 border border-gray-800 p-8 hover:border-rivals-red transition-all duration-300 transform hover:-translate-y-2">
            <i className="fab fa-discord text-5xl text-[#5865F2] mb-6 group-hover:text-white transition-colors"></i>
            <h3 className="font-anton text-3xl text-white italic mb-2">DISCORD</h3>
            <p className="font-montserrat text-gray-400 text-sm">
              Únete a nuestro servidor oficial. Es el canal principal para soporte, dudas y organización de scrims.
            </p>
          </a>

          {/* Email Card (Placeholder) */}
          <div className="group bg-zinc-900 border border-gray-800 p-8 hover:border-rivals-red transition-all duration-300 transform hover:-translate-y-2">
            <i className="fas fa-envelope text-5xl text-rivals-red mb-6"></i>
            <h3 className="font-anton text-3xl text-white italic mb-2">EMAIL</h3>
            <p className="font-montserrat text-gray-400 text-sm">
              Para consultas comerciales o reportes graves. <br/>
              <span className="text-white font-bold mt-2 block">contact@symbiosix.gg</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactoPage;