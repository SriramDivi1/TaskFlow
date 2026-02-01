import React from 'react';
import { ChevronLeft, Calendar, Clock, MoreVertical, Edit, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import { Task } from '../types';
import { motion } from 'motion/react';
import { useStore } from '../store';
import { toast } from 'sonner';

interface TaskDetailScreenProps {
  task: Task;
  onBack: () => void;
}

export const TaskDetailScreen: React.FC<TaskDetailScreenProps> = ({ 
  task, 
  onBack
}) => {
  const deleteTask = useStore(state => state.deleteTask);
  const toggleTaskComplete = useStore(state => state.toggleTaskComplete);
  
  const handleDelete = () => {
    deleteTask(task.id);
    toast.success('Task deleted');
    onBack();
  };
  
  const handleToggle = () => {
    toggleTaskComplete(task.id);
  };
  return (
    <div className="bg-slate-50 min-h-full flex flex-col relative">
      {/* Header */}
      <div className="px-6 py-6 flex items-center justify-between sticky top-0 bg-slate-50/80 backdrop-blur-md z-20">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-900 hover:bg-white rounded-full transition-colors shadow-sm">
          <ChevronLeft size={28} />
        </button>
        <h1 className="text-lg font-bold text-slate-900">Task Details</h1>
        <button className="p-2 text-slate-600 hover:bg-white rounded-full transition-colors">
          <MoreVertical size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Title & Status */}
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-bold uppercase tracking-wide">
                {task.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                task.priority === 'High' ? 'bg-red-100 text-red-600' :
                task.priority === 'Medium' ? 'bg-orange-100 text-orange-600' :
                'bg-blue-100 text-blue-600'
              }`}>
                {task.priority} Priority
              </span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 leading-tight">{task.title}</h2>
          </div>

          {/* Time & Date Card */}
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <Calendar size={24} />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase">Due Date</p>
                <p className="text-slate-900 font-bold">{task.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </div>
            </div>
             <div className="h-10 w-[1px] bg-slate-100"></div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase">Time</p>
                <p className="text-slate-900 font-bold">{task.startTime}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">Description</h3>
            <p className="text-slate-500 leading-relaxed">
              {task.description || "No description provided for this task."}
            </p>
          </div>

          {/* Team Members */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Team Members</h3>
            <div className="flex flex-wrap gap-3">
              {task.assignees.map((user, i) => (
                <div key={i} className="flex items-center space-x-3 bg-white p-2 pr-4 rounded-full border border-slate-100 shadow-sm">
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-bold text-slate-900">{user.name}</p>
                    <p className="text-xs text-slate-400">{user.role}</p>
                  </div>
                </div>
              ))}
              <button className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border border-dashed border-slate-300 hover:bg-slate-200 transition-colors">
                <span className="text-2xl font-light">+</span>
              </button>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
             <div className="flex justify-between items-center mb-3">
               <h3 className="font-bold text-slate-900">Task Progress</h3>
               <span className="text-teal-600 font-bold text-lg">{task.progress}%</span>
             </div>
             <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
               <div 
                 className="h-full bg-teal-500 rounded-full transition-all duration-1000" 
                 style={{ width: `${task.progress}%` }}
               ></div>
             </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Action Bar */}
      <div className="absolute bottom-0 w-full bg-white border-t border-slate-50 p-6 z-20 flex space-x-4">
        <button 
          onClick={handleToggle}
          className={`flex-1 font-bold text-lg py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center space-x-2 ${
            task.completed 
            ? 'bg-slate-100 text-slate-500' 
            : 'bg-teal-600 text-white shadow-teal-600/30 hover:bg-teal-700'
          }`}
        >
          <CheckCircle size={20} />
          <span>{task.completed ? 'Completed' : 'Complete Task'}</span>
        </button>
        
        <button 
          onClick={handleDelete}
          className="bg-red-50 text-red-500 p-4 rounded-2xl hover:bg-red-100 transition-colors"
        >
          <Trash2 size={24} />
        </button>
      </div>
    </div>
  );
};
