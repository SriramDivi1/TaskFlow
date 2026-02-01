import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { CreateTaskScreen } from './components/CreateTaskScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { OnboardingScreen } from './components/OnboardingScreen';
import { SearchScreen } from './components/SearchScreen';
import { CalendarScreen } from './components/CalendarScreen';
import { TaskDetailScreen } from './components/TaskDetailScreen';
import { SignInScreen } from './components/SignInScreen';
import { SignUpScreen } from './components/SignUpScreen';
import { SplashScreen } from './components/SplashScreen';
import { useStore } from './store';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster } from 'sonner';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (showSplash) {
    return (
      <Layout>
        <SplashScreen onFinish={() => setShowSplash(false)} />
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return (
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/signup" element={
              <SignUpScreen 
                onSignUp={() => setIsAuthenticated(true)} 
                onSignInClick={() => {}} 
              />
            } />
            <Route path="*" element={
              <SignInScreen 
                onSignIn={() => setIsAuthenticated(true)} 
                onSignUpClick={() => {}}
              />
            } />
          </Routes>
        </Layout>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Layout>
        <AppContent />
        <Toaster position="top-center" />
      </Layout>
    </BrowserRouter>
  );
}

function AppContent() {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const tasks = useStore(state => state.tasks);
  const location = useLocation();
  
  const selectedTask = selectedTaskId ? tasks.find(t => t.id === selectedTaskId) : null;
  
  // Hide bottom nav on create screen and task detail screen
  const showBottomNav = !selectedTask && location.pathname !== '/create';

  return (
    <div className="h-full flex flex-col relative">
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTask ? 'detail' : 'main'}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="h-full w-full absolute top-0 left-0 overflow-y-auto no-scrollbar"
          >
            {selectedTask ? (
              <TaskDetailScreen 
                task={selectedTask} 
                onBack={() => setSelectedTaskId(null)}
              />
            ) : (
              <Routes>
                <Route path="/" element={<HomeScreen onTaskClick={(task) => setSelectedTaskId(task.id)} />} />
                <Route path="/create" element={<CreateTaskScreen />} />
                <Route path="/search" element={<SearchScreen onTaskClick={(task) => setSelectedTaskId(task.id)} />} />
                <Route path="/calendar" element={<CalendarScreen onTaskClick={(task) => setSelectedTaskId(task.id)} />} />
                <Route path="/profile" element={<ProfileScreen onLogout={() => window.location.reload()} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {showBottomNav && <BottomNav />}
    </div>
  );
}
