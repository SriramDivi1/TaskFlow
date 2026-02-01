import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
      <div className={`w-full max-w-md bg-white h-[850px] rounded-[40px] shadow-2xl overflow-hidden relative border-8 border-slate-900 flex flex-col ${className}`}>
        {/* Notch mock */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-slate-900 rounded-b-2xl z-50"></div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
          {children}
        </div>
        
        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-slate-900 rounded-full opacity-20 pointer-events-none"></div>
      </div>
    </div>
  );
};
