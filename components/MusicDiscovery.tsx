import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Music2, Loader2 } from 'lucide-react';
import { discoverArtists } from '../services/geminiService';
import { Recommendation, LoadingState } from '../types';

const MusicDiscovery: React.FC = () => {
  const [query, setQuery] = useState('');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setStatus(LoadingState.LOADING);
    const results = await discoverArtists(query);
    setRecommendations(results);
    setStatus(LoadingState.SUCCESS);
  };

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-bold tracking-wider uppercase">Impulsado por Gemini AI</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Descubre tu Próxima Obsesión
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            ¿Buscas algo melancólico como el tango o enérgico como el rock barrial? 
            Pregúntale a nuestra IA musical.
          </p>
        </div>

        <form onSubmit={handleSearch} className="mb-16 relative">
          <div className="relative group">
             <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
             <div className="relative flex items-center bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl p-2">
                <Search className="w-6 h-6 text-slate-500 ml-4" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ej: Quiero algo parecido a Gustavo Cerati pero más moderno..."
                    className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-slate-500 px-4 py-3 text-lg"
                />
                <button 
                    type="submit"
                    disabled={status === LoadingState.LOADING}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {status === LoadingState.LOADING ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        "Descubrir"
                    )}
                </button>
             </div>
          </div>
        </form>

        <AnimatePresence>
          {recommendations.length > 0 && (
            <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {recommendations.map((rec, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-800/50 border border-slate-700/50 backdrop-blur-md p-6 rounded-2xl hover:border-blue-500/30 transition-colors"
                >
                  <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 text-blue-400">
                    <Music2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{rec.artistName}</h3>
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed">{rec.reason}</p>
                  <div className="mt-auto pt-4 border-t border-slate-700/50">
                    <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Canción Sugerida</span>
                    <span className="text-blue-300 font-medium">{rec.suggestedTrack}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MusicDiscovery;