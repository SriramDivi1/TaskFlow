import React, { useState } from 'react';
import { ChevronLeft, Calendar as CalendarIcon, Clock, Paperclip, X } from 'lucide-react';
import { motion } from 'motion/react';
import { Category, Priority, Task } from '../types';
import { useStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const CATEGORIES: Category[] = ['Marketing', 'Family', 'Sports', 'Academics', 'Entertainment', 'Art', 'Business', 'Designing'];

export const CreateTaskScreen: React.FC = () => {
  const navigate = useNavigate();
  const addTask = useStore(state => state.addTask);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('Designing');
  const [priority, setPriority] = useState<Priority>('Medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask({
      title,
      description,
      date: new Date(date),
      startTime,
      endTime,
      category: selectedCategory,
      priority
    });
    toast.success('Task created successfully!');
    navigate('/');
  };

  return (
    <div className="bg-white min-h-full flex flex-col relative">
      <div className="px-6 py-6 flex items-center justify-between border-b border-slate-50 sticky top-0 bg-white/80 backdrop-blur-md z-20">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-900 hover:bg-slate-50 rounded-full transition-colors">
          <ChevronLeft size={28} />
        </button>
        <h1 className="text-lg font-bold text-slate-900">Create New Task</h1>
        <div className="w-8" />
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Task Title</label>
            <input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter project title"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Date</label>
              <div className="relative">
                <input 
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
                <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Start Time</label>
              <div className="relative">
                <input 
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              </div>
            </div>
          </div>

          <div className="space-y-3">
             <label className="text-sm font-semibold text-slate-700">Category</label>
             <div className="flex flex-wrap gap-3">
               {CATEGORIES.map(cat => (
                 <button
                   key={cat}
                   type="button"
                   onClick={() => setSelectedCategory(cat)}
                   className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                     selectedCategory === cat 
                       ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20 transform scale-105' 
                       : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                   }`}
                 >
                   {cat}
                 </button>
               ))}
             </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Description</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description about your project..."
              rows={4}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-none transition-all"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Priority</label>
            <div className="flex bg-slate-50 p-1 rounded-2xl border border-slate-200">
               {(['Low', 'Medium', 'High'] as Priority[]).map(p => (
                 <button
                   key={p}
                   type="button"
                   onClick={() => setPriority(p)}
                   className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all ${
                     priority === p 
                       ? 'bg-white text-teal-600 shadow-sm border border-slate-100' 
                       : 'text-slate-400 hover:text-slate-600'
                   }`}
                 >
                   {p}
                 </button>
               ))}
            </div>
          </div>
        </form>
      </div>

      <div className="absolute bottom-0 w-full bg-white border-t border-slate-50 p-6 z-20">
        <button 
          onClick={handleSubmit}
          className="w-full bg-teal-600 text-white font-bold text-lg py-4 rounded-2xl shadow-xl shadow-teal-600/30 hover:bg-teal-700 active:scale-95 transition-all"
        >
          Create Task
        </button>
      </div>
    </div>
  );
};
