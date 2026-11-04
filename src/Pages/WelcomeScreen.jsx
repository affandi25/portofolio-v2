import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Github, Globe, User } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const WelcomeScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });

    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        onLoadingComplete?.();
      }, 700);
    }, 2400);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  const containerVariants = {
    exit: {
      opacity: 0,
      y: -40,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 bg-[#eae8e3] text-[#0D0D0D] flex flex-col justify-between p-8 sm:p-12 overflow-hidden"
          initial={{ opacity: 1 }}
          exit="exit"
          variants={containerVariants}
        >
          {/* Top Micro Label */}
          <div className="flex justify-between items-center text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-neutral-600">
            <span>MUHAMMAD YUSUF AFFANDI</span>
            <span>EDITION 2026 / 2027</span>
          </div>

          {/* Center Stage: Bold Minimalist Wordmark */}
          <div className="text-center my-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-3"
            >
              <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-neutral-500 block">
                INFORMATICS &amp; CREATIVE DEVELOPER
              </span>
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase text-black">
Portofolio
              </h1>
              <div className="w-12 h-1 bg-black mx-auto mt-4"></div>
            </motion.div>
          </div>

          {/* Bottom Loading Progress */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs font-mono uppercase tracking-widest text-neutral-500 gap-2">
            <span>UNIVERSITAS PGRI SEMARANG</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-black animate-ping"></span>
              <span>INITIALIZING STUDIO VIEW...</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
