import React from 'react';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import ArtistCard from './components/ArtistCard';
import MusicDiscovery from './components/MusicDiscovery';
import ParallaxWrapper from './components/ParallaxWrapper';
import { INITIAL_ARTISTS } from './constants';

const App: React.FC = () => {
  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 selection:bg-blue-500/30">
      <Hero />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro Text Section */}
        <section className="py-24 md:py-32 flex flex-col items-center justify-center text-center">
            <ParallaxWrapper offset={-30}>
                <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-white">
                    Iconos de la Melodía
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mb-6"></div>
                <p className="max-w-2xl text-lg text-slate-400 mx-auto">
                    Argentina respira música. Desde los adoquines de San Telmo hasta los estadios repletos de Buenos Aires, estas son las voces que definieron nuestra identidad.
                </p>
            </ParallaxWrapper>
        </section>

        {/* Artists Grid */}
        <section className="space-y-12 pb-24">
          {INITIAL_ARTISTS.map((artist, index) => (
            <ArtistCard key={artist.id} artist={artist} index={index} />
          ))}
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent my-12 opacity-50"></div>

        {/* AI Discovery Section */}
        <MusicDiscovery />

      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800 bg-slate-950 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-slate-500 font-serif italic text-lg mb-4">
                "La música es el arte más directo, entra por el oído y va al corazón."
            </p>
            <p className="text-slate-600 text-sm">
                © {new Date().getFullYear()} Voces Argentinas. Hecho con pasión y React.
            </p>
        </div>
      </footer>
    </div>
  );
};

export default App;