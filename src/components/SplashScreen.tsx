import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2500); // 2.5 seconds splash screen

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="h-full w-full bg-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-3xl -mr-40 -mt-40 pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.8,
          ease: "easeOut",
          type: "spring",
          bounce: 0.4
        }}
        className="flex flex-col items-center"
      >
        <motion.div 
          className="w-24 h-24 bg-gradient-to-tr from-teal-500 to-emerald-400 rounded-3xl flex items-center justify-center shadow-2xl shadow-teal-500/40 mb-6 relative"
          animate={{ 
            rotate: [0, -10, 10, -5, 5, 0],
          }}
          transition={{ 
            duration: 1.5,
            delay: 0.5,
            ease: "easeInOut",
            times: [0, 0.2, 0.4, 0.6, 0.8, 1],
            repeat: 0
          }}
        >
           <motion.div 
             className="w-12 h-12 border-4 border-white rounded-xl"
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             transition={{ delay: 0.6, duration: 0.4 }}
           />
           
           {/* Checkmark animation */}
           <motion.div
             className="absolute -right-3 -top-3 bg-white rounded-full p-2 shadow-lg"
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             transition={{ delay: 1.2, type: "spring" }}
           >
             <div className="w-4 h-4 bg-teal-500 rounded-full" />
           </motion.div>
        </motion.div>
        
        <motion.h1 
          className="text-3xl font-bold text-white tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          TaskFlow
        </motion.h1>
      </motion.div>
    </div>
  );
};
