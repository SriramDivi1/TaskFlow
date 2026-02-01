import React from 'react';

interface CalendarStripProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export const CalendarStrip: React.FC<CalendarStripProps> = ({ selectedDate, onSelectDate }) => {
  const dates = [];
  const today = new Date();
  
  // Generate next 14 days
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date);
  }

  const isSelected = (d1: Date, d2: Date) => 
    d1.getDate() === d2.getDate() && 
    d1.getMonth() === d2.getMonth() && 
    d1.getFullYear() === d2.getFullYear();

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-4">
      <div className="flex space-x-3 px-1">
        {dates.map((date, index) => {
          const selected = isSelected(date, selectedDate);
          return (
            <button
              key={index}
              onClick={() => onSelectDate(date)}
              className={`flex flex-col items-center justify-center min-w-[60px] h-[80px] rounded-2xl transition-all duration-300 ${
                selected 
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30 transform scale-105' 
                  : 'bg-white text-slate-500 border border-slate-100 hover:border-teal-200'
              }`}
            >
              <span className="text-xs font-medium mb-1 opacity-80">
                {date.getDate()}
              </span>
              <span className="text-sm font-bold uppercase">
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
