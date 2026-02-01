import React, { useState, useMemo } from 'react';
import { Search, X, Filter, Clock, ArrowUpRight } from 'lucide-react';
import { Task } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';

interface SearchScreenProps {
  onTaskClick: (task: Task) => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({ onTaskClick }) => {
  const tasks = useStore(state => state.tasks);
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      // Filter by query (search term)
      const matchesQuery = !query || 
        task.title.toLowerCase().includes(query.toLowerCase()) ||
        task.category?.toLowerCase().includes(query.toLowerCase());
      
      // Filter by category
      const matchesFilter = activeFilter === 'All' || 
        task.category?.toLowerCase() === activeFilter.toLowerCase();
      
      return matchesQuery && matchesFilter;
    });
  }, [tasks, query, activeFilter]);

  const recentSearches = ['Design System', 'Marketing', 'Quarterly Review', 'Bug Fixes'];

  return (
    <div className="bg-slate-50 min-h-full flex flex-col pt-12 px-6 pb-24">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Search</h1>
      
      {/* Search Bar */}
      <div className="relative mb-6">
        <input 
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for tasks..."
          className="w-full bg-white border-2 border-transparent focus:border-teal-500 rounded-[20px] pl-12 pr-12 py-4 text-slate-900 shadow-sm placeholder-slate-400 focus:outline-none transition-all"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
        {query && (
          <button 
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 bg-slate-100 rounded-full"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex space-x-3 mb-8 overflow-x-auto no-scrollbar">
         {['All', 'Design', 'Development', 'Marketing', 'Business'].map(f => (
           <button
             key={f}
             onClick={() => setActiveFilter(f)}
             className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
               activeFilter === f 
                 ? 'bg-slate-900 text-white' 
                 : 'bg-white text-slate-500 border border-slate-100'
             }`}
           >
             {f}
           </button>
         ))}
      </div>

      {/* Content */}
      <div className="flex-1">
        {!query ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-900">Recent Searches</h3>
              <button className="text-xs font-bold text-teal-600">Clear All</button>
            </div>
            <div className="space-y-3">
              {recentSearches.map((s, i) => (
                <button 
                  key={i}
                  onClick={() => setQuery(s)}
                  className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 text-slate-600 hover:border-teal-200 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <Clock size={18} className="text-slate-400 group-hover:text-teal-500 transition-colors" />
                    <span>{s}</span>
                  </div>
                  <ArrowUpRight size={18} className="text-slate-300 group-hover:text-teal-500 transition-colors" />
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div layout>
            <h3 className="font-bold text-slate-900 mb-4">
              Results <span className="text-slate-400 font-normal">({filteredTasks.length})</span>
            </h3>
            
            {filteredTasks.length > 0 ? (
              <div className="space-y-4">
                {filteredTasks.map(task => (
                  <motion.div 
                    key={task.id}
                    layoutId={task.id}
                    onClick={() => onTaskClick(task)}
                    className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div>
                      <h4 className="font-bold text-slate-900">{task.title}</h4>
                      <p className="text-xs text-slate-500 mt-1">{task.category} • {task.date.toLocaleDateString()}</p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      task.priority === 'High' ? 'bg-red-500' : 
                      task.priority === 'Medium' ? 'bg-orange-400' : 'bg-blue-400'
                    }`} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400">
                <Search size={48} className="mx-auto mb-4 opacity-20" />
                <p>No matching tasks found.</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};
