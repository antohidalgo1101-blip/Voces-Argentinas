import React from 'react';
import { motion } from 'framer-motion';
import { Artist } from '../types';
import { Play, Disc, Calendar } from 'lucide-react';

interface ArtistCardProps {
  artist: Artist;
  index: number;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16 py-20 px-4 md:px-0`}
    >
      {/* Image Side */}
      <div className="w-full md:w-1/2 relative group">
        <div className="absolute inset-0 bg-blue-500 rounded-xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
        <div className="relative overflow-hidden rounded-xl aspect-[3/4] md:aspect-[4/5] shadow-2xl">
          <img 
            src={artist.imageUrl} 
            alt={artist.name} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
          <div className="absolute bottom-6 left-6">
             <span className="text-9xl font-serif font-bold text-white/10 absolute -top-20 -left-6 select-none">
               {index + 1}
             </span>
          </div>
        </div>
      </div>

      {/* Text Side */}
      <div className="w-full md:w-1/2 space-y-6">
        <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-blue-400"></span>
            <span className="text-blue-400 uppercase tracking-widest text-sm font-semibold">{artist.genre}</span>
        </div>
        
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-white">
          {artist.name}
        </h2>
        
        <p className="text-slate-300 text-lg leading-relaxed">
          {artist.description}
        </p>

        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-800">
            <div className="flex items-start gap-3">
                <Disc className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                    <h4 className="text-sm text-slate-500 uppercase tracking-wider">Canción Icónica</h4>
                    <p className="text-white font-medium">{artist.famousSong}</p>
                </div>
            </div>
            <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                    <h4 className="text-sm text-slate-500 uppercase tracking-wider">Periodo</h4>
                    <p className="text-white font-medium">{artist.yearActive}</p>
                </div>
            </div>
        </div>

        <button className="mt-6 flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all group">
            <Play className="w-4 h-4 fill-current group-hover:text-blue-400 transition-colors" />
            <span className="text-sm font-semibold">Escuchar en Spotify</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ArtistCard;