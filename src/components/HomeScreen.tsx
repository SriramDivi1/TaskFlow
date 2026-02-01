import React, { useMemo } from 'react';
import { CalendarStrip } from './CalendarStrip';
import { Task } from '../types';
import { MoreVertical, Clock, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useStore } from '../store';

interface HomeScreenProps {
  onTaskClick: (task: Task) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onTaskClick }) => {
  const tasks = useStore(state => state.tasks);
  const selectedDate = useStore(state => state.selectedDate);
  const setSelectedDate = useStore(state => state.setSelectedDate);
  const filteredTasks = useMemo(() => {
    return tasks.filter(t => 
      t.date.getDate() === selectedDate.getDate() &&
      t.date.getMonth() === selectedDate.getMonth() &&
      t.date.getFullYear() === selectedDate.getFullYear()
    );
  }, [tasks, selectedDate]);

  const progress = useMemo(() => {
    if (filteredTasks.length === 0) return 0;
    const completed = filteredTasks.filter(t => t.completed).length;
    return Math.round((completed / filteredTasks.length) * 100);
  }, [filteredTasks]);

  return (
    <div className="pb-24 px-6 pt-12 bg-slate-50 min-h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Today's Task</h1>
          <p className="text-sm text-slate-500 mt-1">
            {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} • {filteredTasks.length} Tasks
          </p>
        </div>
        <button className="bg-white p-2 rounded-xl border border-slate-100 shadow-sm text-slate-600">
           <Clock size={20} />
        </button>
      </div>

      {/* Date Strip */}
      <CalendarStrip selectedDate={selectedDate} onSelectDate={setSelectedDate} />

      {/* Insights Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 bg-slate-900 rounded-[28px] p-6 text-white shadow-xl shadow-slate-900/20 relative overflow-hidden"
      >
        <div className="relative z-10">
          <h3 className="text-lg font-semibold mb-1">Today's task insights</h3>
          <div className="flex justify-between items-end mt-4 mb-2">
             <span className="text-sm text-slate-400">Processing</span>
             <span className="text-2xl font-bold">{progress}%</span>
          </div>
          <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-teal-500 rounded-full"
            />
          </div>
        </div>
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-600/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-600/20 rounded-full blur-3xl -ml-10 -mb-10"></div>
      </motion.div>

      {/* Filter Chips */}
      <div className="flex space-x-3 mt-8 overflow-x-auto no-scrollbar pb-2">
        {['All', 'My tasks', 'In-progress', 'Completed'].map((filter, i) => (
          <button 
            key={i}
            className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              i === 1 ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20' : 'bg-white text-slate-600 border border-slate-100'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Pinned Tasks Header */}
      <div className="flex justify-between items-center mt-8 mb-4">
        <h2 className="text-lg font-bold text-slate-900">Pinned Tasks</h2>
        <button className="text-sm font-medium text-teal-600">See All</button>
      </div>

      {/* Task Cards */}
      <div className="space-y-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
             <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task)} />
          ))
        ) : (
          <div className="text-center py-10 text-slate-400">
            <p>No tasks for this day.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const TaskCard: React.FC<{ task: Task; onClick: () => void }> = ({ task, onClick }) => {
  return (
    <motion.div 
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white rounded-[24px] p-5 shadow-sm border border-slate-100 relative overflow-hidden group"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-xs font-medium text-slate-400 mb-1 block">
            {task.date.toLocaleDateString()}
          </span>
          <h3 className="text-lg font-bold text-slate-800 leading-tight">{task.title}</h3>
          <span className="text-xs text-slate-500 mt-1 block">{task.category}</span>
        </div>
        <button className="text-slate-300 hover:text-slate-600">
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Progress Bar for Card */}
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-slate-400 font-medium">Progress</span>
          <span className="text-teal-600 font-bold">{task.progress}%</span>
        </div>
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
           <div className="h-full bg-teal-500 rounded-full" style={{ width: `${task.progress}%` }}></div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 border-t border-slate-50 pt-4">
        <div className="flex -space-x-2">
          {task.assignees.map((user, i) => (
            <img 
              key={i} 
              src={user.avatar} 
              alt={user.name} 
              className="w-8 h-8 rounded-full border-2 border-white object-cover"
            />
          ))}
          <button className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs text-slate-500 font-medium hover:bg-slate-200">
            +
          </button>
        </div>
        
        {task.priority === 'High' && (
          <span className="bg-red-50 text-red-500 px-3 py-1 rounded-full text-xs font-bold">
            HIGH PRIORITY
          </span>
        )}
      </div>
    </motion.div>
  );
}
