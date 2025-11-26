import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxWrapperProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}

const ParallaxWrapper: React.FC<ParallaxWrapperProps> = ({ children, offset = 50, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  const smoothY = useSpring(y, springConfig);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div style={{ y: smoothY }}>
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxWrapper;