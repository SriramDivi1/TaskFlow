import React from 'react';
import { Home, Search, Calendar, User, Plus } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const tabs = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  { id: 'search', label: 'Search', icon: Search, path: '/search' },
  { id: 'create', label: 'Create', icon: Plus, path: '/create', isMain: true },
  { id: 'calendar', label: 'Calendar', icon: Calendar, path: '/calendar' },
  { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
];

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 pt-3 pb-6 z-50">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = isActive(tab.path);
          
          if (tab.isMain) {
            return (
              <button
                key={tab.id}
                onClick={() => navigate(tab.path)}
                className="w-14 h-14 -mt-8 bg-teal-600 rounded-full flex items-center justify-center shadow-xl shadow-teal-600/30 hover:bg-teal-700 active:scale-95 transition-all"
              >
                <Icon size={28} className="text-white" />
              </button>
            );
          }

          return (
            <Link
              key={tab.id}
              to={tab.path}
              className={`flex flex-col items-center space-y-1 transition-colors ${
                active ? 'text-teal-600' : 'text-slate-400'
              }`}
            >
              <Icon size={24} strokeWidth={active ? 2.5 : 2} />
              <span className="text-xs font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
