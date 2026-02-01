import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface OnboardingScreenProps {
  onStart: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onStart }) => {
  return (
    <div className="bg-white min-h-full flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl -ml-20 -mb-20"></div>

      <div className="flex-1 flex flex-col justify-center px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <div className="w-20 h-20 bg-gradient-to-tr from-teal-500 to-emerald-400 rounded-[24px] flex items-center justify-center shadow-lg shadow-teal-500/30 mb-8 transform rotate-3">
             <div className="w-10 h-10 border-4 border-white rounded-lg"></div>
          </div>
          
          <h1 className="text-5xl font-bold text-slate-900 leading-[1.1] mb-6">
            Manage <br/>
            Your Task <br/>
            <span className="text-teal-600">Freely</span>
          </h1>
          
          <p className="text-slate-500 text-lg leading-relaxed max-w-xs">
            Boost productivity with our streamlined Task Manager app. Simplify task organization and prioritize effectively.
          </p>
        </motion.div>
      </div>

      <div className="p-8 pb-12 relative z-10">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="w-full bg-slate-900 text-white font-bold text-lg py-5 rounded-[24px] shadow-xl flex items-center justify-between px-8 group"
        >
          <span>Get Started</span>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
            <ArrowRight size={20} />
          </div>
        </motion.button>
      </div>
    </div>
  );
};
