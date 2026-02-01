import React, { useMemo } from 'react';
import { ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react';
import { Task } from '../types';
import { motion } from 'framer-motion';
import { useStore } from '../store';

interface CalendarScreenProps {
  onTaskClick: (task: Task) => void;
}

export const CalendarScreen: React.FC<CalendarScreenProps> = ({ onTaskClick }) => {
  const tasks = useStore(state => state.tasks);
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(); // 0 is Sunday
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const offset = Array.from({ length: firstDayOfMonth }, (_, i) => i);
  
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const getTasksForDay = (day: number) => {
    return tasks.filter(t => 
      t.date.getDate() === day && 
      t.date.getMonth() === currentDate.getMonth() && 
      t.date.getFullYear() === currentDate.getFullYear()
    );
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const [selectedDay, setSelectedDay] = React.useState<number>(new Date().getDate());
  
  const selectedDayTasks = useMemo(() => getTasksForDay(selectedDay), [selectedDay, currentDate, tasks]);

  return (
    <div className="bg-slate-50 min-h-full flex flex-col pt-12 px-6 pb-24">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Schedule</h1>
        <button className="bg-white p-2 rounded-xl shadow-sm text-slate-600 border border-slate-100">
           <MoreVertical size={20} />
        </button>
      </div>

      {/* Calendar Card */}
      <div className="bg-slate-900 rounded-[32px] p-6 text-white shadow-xl shadow-slate-900/20 mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-6">
            <button onClick={prevMonth} className="p-1 hover:bg-slate-700 rounded-lg transition-colors"><ChevronLeft size={20} /></button>
            <h2 className="text-lg font-bold">{monthName}</h2>
            <button onClick={nextMonth} className="p-1 hover:bg-slate-700 rounded-lg transition-colors"><ChevronRight size={20} /></button>
          </div>

          <div className="grid grid-cols-7 gap-y-4 mb-2 text-center">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
              <div key={`${d}-${i}`} className="text-xs font-medium text-slate-400">{d}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-y-2 place-items-center">
            {offset.map(o => <div key={`offset-${o}`} />)}
            {days.map(day => {
              const dayTasks = getTasksForDay(day);
              const isSelected = selectedDay === day;
              const today = new Date();
              const isToday = day === today.getDate() && 
                         currentDate.getMonth() === today.getMonth() &&
                         currentDate.getFullYear() === today.getFullYear();
              
              return (
                <button 
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium relative transition-all ${
                    isSelected ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30' : 
                    isToday ? 'bg-slate-700 text-white' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {day}
                  {dayTasks.length > 0 && !isSelected && (
                    <div className="absolute bottom-1 w-1 h-1 bg-teal-500 rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Decoration */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -ml-10 -mb-10"></div>
      </div>

      {/* Tasks List */}
      <div className="flex-1">
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-lg font-bold text-slate-900">
             Tasks for {selectedDay} {currentDate.toLocaleDateString('en-US', { month: 'short' })}
          </h3>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{selectedDayTasks.length} TASKS</span>
        </div>

        <div className="space-y-4">
          {selectedDayTasks.length > 0 ? (
            selectedDayTasks.map(task => (
              <motion.div 
                key={task.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => onTaskClick(task)}
                className="bg-white p-4 rounded-2xl border-l-4 border-teal-500 shadow-sm flex justify-between items-center group cursor-pointer hover:shadow-md transition-all"
              >
                <div>
                   <h4 className="font-bold text-slate-800">{task.title}</h4>
                   <p className="text-xs text-slate-500 mt-1">{task.startTime} - {task.endTime}</p>
                </div>
                {task.completed ? (
                  <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
                    <div className="w-3 h-3 bg-teal-600 rounded-full"></div>
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-slate-200 group-hover:border-teal-500 transition-colors"></div>
                )}
              </motion.div>
            ))
          ) : (
             <div className="py-8 text-center text-slate-400 text-sm bg-white rounded-2xl border border-dashed border-slate-200">
                No tasks scheduled for this day.
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
