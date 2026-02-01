import React, { useState } from 'react';
import { User, Bell, Shield, Globe, HelpCircle, LogOut, ChevronRight, Settings, ChevronLeft, Camera, Mail, Phone, Briefcase, Check } from 'lucide-react';
import { User as UserType } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { useStore } from '../store';

interface ProfileScreenProps {
  onLogout: () => void;
}

type ProfileView = 'main' | 'personal' | 'notifications' | 'security' | 'language' | 'help';

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onLogout }) => {
  const user = useStore(state => state.user);
  const setUser = useStore(state => state.setUser);
  const [currentView, setCurrentView] = useState<ProfileView>('main');

  const renderView = () => {
    switch (currentView) {
      case 'personal':
        return <PersonalInfoView user={user} onUpdateUser={setUser} onBack={() => setCurrentView('main')} />;
      case 'notifications':
        return <NotificationsView onBack={() => setCurrentView('main')} />;
      case 'security':
        return <SecurityView onBack={() => setCurrentView('main')} />;
      case 'language':
        return <LanguageView onBack={() => setCurrentView('main')} />;
      case 'help':
        return <HelpCenterView onBack={() => setCurrentView('main')} />;
      default:
        return <MainProfileView user={user} onViewChange={setCurrentView} onLogout={onLogout} />;
    }
  };

  return (
    <div className="bg-slate-50 min-h-full pb-24">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="h-full"
        >
          {renderView()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// --- Sub Views ---

const MainProfileView: React.FC<{ user: UserType; onViewChange: (view: ProfileView) => void; onLogout: () => void }> = ({ user, onViewChange, onLogout }) => (
  <>
    <div className="bg-white pt-12 pb-8 px-6 rounded-b-[40px] shadow-sm relative overflow-hidden">
      <div className="flex justify-between items-center mb-8 relative z-10">
        <div className="w-10"></div>
        <h1 className="text-xl font-bold text-slate-900">Profile</h1>
        <button className="text-slate-900 p-2 hover:bg-slate-50 rounded-full transition-colors">
          <Settings size={24} />
        </button>
      </div>
      
      <div className="flex flex-col items-center relative z-10">
        <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full p-1 bg-white border border-slate-100 shadow-sm">
              <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
            </div>
            <button className="absolute bottom-0 right-0 bg-teal-600 text-white p-2 rounded-full border-4 border-white">
              <div className="w-3 h-3 bg-teal-600 rounded-full"></div>
            </button>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">{user.name}</h2>
        <p className="text-slate-500 font-medium">{user.email}</p>
      </div>
      
      {/* Decorative background blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-teal-50 rounded-full blur-3xl -mt-20 -z-0"></div>
    </div>

    <div className="px-6 py-8 space-y-6">
      <div className="bg-white rounded-3xl p-2 shadow-sm border border-slate-100">
        <ProfileMenuItem icon={<User size={20} />} label="Personal Information" onClick={() => onViewChange('personal')} />
        <ProfileMenuItem icon={<Bell size={20} />} label="Notifications" onClick={() => onViewChange('notifications')} />
        <ProfileMenuItem icon={<Shield size={20} />} label="Security" onClick={() => onViewChange('security')} />
        <ProfileMenuItem icon={<Globe size={20} />} label="Language" value="English (US)" onClick={() => onViewChange('language')} />
      </div>

      <div className="bg-white rounded-3xl p-2 shadow-sm border border-slate-100">
        <ProfileMenuItem icon={<HelpCircle size={20} />} label="Help Center" onClick={() => onViewChange('help')} />
        <ProfileMenuItem icon={<LogOut size={20} />} label="Log Out" danger onClick={() => {
          toast.success('Logged out successfully');
          onLogout();
        }} />
      </div>
    </div>
  </>
);

const PersonalInfoView: React.FC<{ user: UserType; onUpdateUser: (user: UserType) => void; onBack: () => void }> = ({ user, onUpdateUser, onBack }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [phone, setPhone] = useState('+1 (555) 000-0000');

  const handleSave = () => {
    onUpdateUser({ ...user, name, email, role });
    toast.success('Profile updated successfully');
    onBack();
  };

  return (
    <div className="h-full flex flex-col">
      <Header title="Personal Info" onBack={onBack} />
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg overflow-hidden">
               <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <button className="absolute bottom-0 right-0 bg-slate-900 text-white p-2.5 rounded-full border-4 border-white shadow-sm">
               <Camera size={16} />
            </button>
          </div>
        </div>

        <div className="space-y-5">
           <InputGroup label="Full Name" icon={<User size={18} />} value={name} onChange={setName} />
           <InputGroup label="Email Address" icon={<Mail size={18} />} value={email} onChange={setEmail} type="email" />
           <InputGroup label="Phone Number" icon={<Phone size={18} />} value={phone} onChange={setPhone} type="tel" />
           <InputGroup label="Role" icon={<Briefcase size={18} />} value={role} onChange={setRole} />
        </div>
      </div>
      <div className="p-6 bg-white border-t border-slate-50">
         <button onClick={handleSave} className="w-full bg-teal-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-teal-600/30">
           Save Changes
         </button>
      </div>
    </div>
  );
};

const NotificationsView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [settings, setSettings] = useState({
    push: true,
    email: false,
    promo: false,
    updates: true,
    reminders: true
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="h-full flex flex-col">
      <Header title="Notifications" onBack={onBack} />
      <div className="flex-1 px-6 py-6 space-y-6">
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 space-y-4">
           <SwitchItem label="Push Notifications" description="Receive push notifications on your device" checked={settings.push} onChange={() => toggle('push')} />
           <SwitchItem label="Email Alerts" description="Get important updates via email" checked={settings.email} onChange={() => toggle('email')} />
           <SwitchItem label="Task Reminders" description="Remind me 1 hour before task due" checked={settings.reminders} onChange={() => toggle('reminders')} />
        </div>

        <h3 className="text-sm font-bold text-slate-500 uppercase px-2 mt-4">Other</h3>
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 space-y-4">
           <SwitchItem label="App Updates" description="Notify me about new features" checked={settings.updates} onChange={() => toggle('updates')} />
           <SwitchItem label="Promotions" description="Receive special offers and promo" checked={settings.promo} onChange={() => toggle('promo')} />
        </div>
      </div>
    </div>
  );
};

const SecurityView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="h-full flex flex-col">
      <Header title="Security" onBack={onBack} />
      <div className="flex-1 px-6 py-6 space-y-6">
         <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
            <h3 className="font-bold text-slate-900 mb-2">Change Password</h3>
            <div className="space-y-4">
               <input type="password" placeholder="Current Password" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-teal-500" />
               <input type="password" placeholder="New Password" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-teal-500" />
               <input type="password" placeholder="Confirm New Password" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm focus:outline-none focus:border-teal-500" />
            </div>
            <button className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl mt-2 text-sm">
              Update Password
            </button>
         </div>

         <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100">
             <SwitchItem label="Two-Factor Authentication" description="Secure your account with 2FA" checked={false} onChange={() => {}} />
             <div className="h-[1px] bg-slate-50 my-3"></div>
             <SwitchItem label="Face ID" description="Use Face ID to sign in" checked={true} onChange={() => {}} />
         </div>
      </div>
    </div>
  );
};

const LanguageView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [selected, setSelected] = useState('English (US)');
  const languages = ['English (US)', 'English (UK)', 'Mandarin', 'Hindi', 'Spanish', 'French', 'Arabic', 'Russian'];

  return (
    <div className="h-full flex flex-col">
      <Header title="Language" onBack={onBack} />
      <div className="flex-1 px-6 py-6">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
           {languages.map((lang, i) => (
             <button 
               key={lang}
               onClick={() => { setSelected(lang); setTimeout(onBack, 300); }}
               className={`w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0`}
             >
                <span className={`font-medium ${selected === lang ? 'text-teal-600 font-bold' : 'text-slate-700'}`}>{lang}</span>
                {selected === lang && <Check size={20} className="text-teal-600" />}
             </button>
           ))}
        </div>
      </div>
    </div>
  );
};

const HelpCenterView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
     <div className="h-full flex flex-col">
       <Header title="Help Center" onBack={onBack} />
       <div className="flex-1 px-6 py-6 overflow-y-auto">
         <h3 className="font-bold text-slate-900 mb-4">Frequently Asked Questions</h3>
         <div className="space-y-3">
            <Accordion title="How do I create a new task?" content="To create a new task, navigate to the Home screen and tap the '+' button in the bottom navigation bar. Fill in the details and tap 'Create Task'." />
            <Accordion title="Can I collaborate with others?" content="Yes, you can add team members to your tasks. In the task creation or edit screen, look for the 'Assignees' section to add people." />
            <Accordion title="How do I change my password?" content="Go to Profile > Security > Change Password. Enter your current password and your new password to update it." />
            <Accordion title="Is my data secure?" content="We prioritize your security. All your data is encrypted and stored securely in the cloud." />
         </div>
         
         <div className="mt-8 bg-teal-50 rounded-3xl p-6 text-center">
            <h4 className="font-bold text-teal-800 text-lg mb-2">Need more help?</h4>
            <p className="text-teal-600/80 mb-4 text-sm">Our support team is available 24/7 to assist you with any issues.</p>
            <button className="bg-teal-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-teal-600/20">
               Contact Support
            </button>
         </div>
       </div>
     </div>
  );
};

// --- Reusable Components ---

const Header: React.FC<{ title: string; onBack: () => void }> = ({ title, onBack }) => (
  <div className="bg-white pt-12 pb-4 px-6 flex items-center shadow-sm relative z-20">
    <button onClick={onBack} className="p-2 -ml-2 text-slate-900 hover:bg-slate-50 rounded-full transition-colors">
      <ChevronLeft size={28} />
    </button>
    <h1 className="text-xl font-bold text-slate-900 ml-2">{title}</h1>
  </div>
);

const ProfileMenuItem: React.FC<{ icon: React.ReactNode; label: string; value?: string; danger?: boolean; onClick: () => void }> = ({ icon, label, value, danger, onClick }) => (
  <button onClick={onClick} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors group">
    <div className="flex items-center space-x-4">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${danger ? 'bg-red-50 text-red-500' : 'bg-slate-50 text-slate-600 group-hover:bg-white group-hover:shadow-sm'}`}>
        {icon}
      </div>
      <span className={`font-semibold ${danger ? 'text-red-500' : 'text-slate-700'}`}>{label}</span>
    </div>
    <div className="flex items-center space-x-2">
      {value && <span className="text-sm text-slate-400 font-medium">{value}</span>}
      <ChevronRight size={18} className="text-slate-300" />
    </div>
  </button>
);

const InputGroup: React.FC<{ label: string; icon: React.ReactNode; value: string; onChange: (val: string) => void; type?: string }> = ({ label, icon, value, onChange, type = 'text' }) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold text-slate-700 ml-1">{label}</label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
        {icon}
      </div>
      <input 
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
      />
    </div>
  </div>
);

const SwitchItem: React.FC<{ label: string; description: string; checked: boolean; onChange: () => void }> = ({ label, description, checked, onChange }) => (
  <div className="flex items-center justify-between p-2">
    <div>
       <h4 className="font-bold text-slate-900 text-sm">{label}</h4>
       <p className="text-xs text-slate-400 mt-0.5">{description}</p>
    </div>
    <button 
      onClick={onChange}
      className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 ${checked ? 'bg-teal-600' : 'bg-slate-200'}`}
    >
      <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${checked ? 'translate-x-5' : 'translate-x-0'}`}></div>
    </button>
  </div>
);

const Accordion: React.FC<{ title: string; content: string }> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden transition-all">
       <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-4 text-left">
          <span className="font-bold text-slate-800 text-sm">{title}</span>
          <ChevronRight size={16} className={`text-slate-400 transform transition-transform ${isOpen ? 'rotate-90' : ''}`} />
       </button>
       <AnimatePresence>
         {isOpen && (
           <motion.div 
             initial={{ height: 0, opacity: 0 }}
             animate={{ height: 'auto', opacity: 1 }}
             exit={{ height: 0, opacity: 0 }}
             className="px-4 pb-4 text-sm text-slate-500 leading-relaxed"
           >
             {content}
           </motion.div>
         )}
       </AnimatePresence>
    </div>
  );
};
