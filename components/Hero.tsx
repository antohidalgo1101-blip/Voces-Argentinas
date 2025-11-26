import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={ref} className="relative h-screen overflow-hidden flex items-center justify-center">
      {/* Background Layer */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ 
          y: backgroundY,
          backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.3), rgba(15, 23, 42, 1)), url('https://picsum.photos/seed/concert/1920/1080')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      {/* Content Layer */}
      <motion.div 
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        style={{ y: textY, opacity }}
      >
        <div className="mb-4">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm tracking-widest uppercase mb-4 backdrop-blur-sm">
                Cultura & Pasión
            </span>
        </div>
        <h1 className="font-serif text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-white to-blue-200 drop-shadow-2xl mb-6">
          Voces Argentinas
        </h1>
        <p className="text-lg md:text-2xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
          Un recorrido visual por las almas que pusieron música a nuestra historia. 
          Del arrabal del tango a la furia del rock.
        </p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-8 h-8 text-white/50" />
      </motion.div>
    </div>
  );
};

export default Hero;