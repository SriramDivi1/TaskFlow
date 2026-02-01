import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Phone, ArrowRight, Smartphone, Eye, EyeOff, User, Check, X } from 'lucide-react';
import { toast } from 'sonner';

interface SignUpScreenProps {
  onSignUp: () => void;
  onSignInClick: () => void;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({ onSignUp, onSignInClick }) => {
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  
  // Password validation state
  const [validations, setValidations] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false
  });

  useEffect(() => {
    setValidations({
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.<>?":{}|<>\-_~`[\]\\/';=+]/.test(password)
    });
  }, [password]);

  const isValidEmail = (email: string) => /^[\w.-]+@[\w.-]+\.\w+$/.test(email);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName || !lastName) {
      toast.error('Please enter your full name');
      return;
    }

    if (method === 'email' && !email) {
      toast.error('Please enter your email address');
      return;
    }

    if (method === 'email' && !isValidEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (method === 'phone' && (!phone || phone.length !== 10)) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }

    const allValid = Object.values(validations).every(Boolean);
    if (!allValid) {
      toast.error('Please ensure password meets all requirements');
      return;
    }
    
    // Simulate API call
    const loadingToast = toast.loading('Creating account...');
    setTimeout(() => {
      toast.dismiss(loadingToast);
      toast.success('Account created successfully!');
      onSignUp();
    }, 1500);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(value);
  };

  const handleGoogleSignUp = () => {
    const loadingToast = toast.loading('Connecting to Google...');
    setTimeout(() => {
      toast.dismiss(loadingToast);
      toast.success('Signed up with Google');
      onSignUp();
    }, 1500);
  };

  return (
    <div className="bg-slate-50 min-h-full flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>

      <div className="flex-1 flex flex-col px-6 relative z-10 py-8 overflow-y-auto no-scrollbar">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="w-14 h-14 bg-gradient-to-tr from-teal-500 to-emerald-400 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/30 mb-4 transform rotate-3">
             <User className="text-white" size={24} />
          </div>
          
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h1>
          <p className="text-slate-500">Sign up to get started</p>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
          onSubmit={handleSignUp}
        >
          {/* Name Fields */}
          <div className="flex space-x-3">
            <div className="space-y-2 flex-1">
              <label htmlFor="firstName" className="text-xs font-bold text-slate-700 ml-1">First Name</label>
              <input 
                id="firstName"
                type="text" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
              />
            </div>
            <div className="space-y-2 flex-1">
              <label htmlFor="lastName" className="text-xs font-bold text-slate-700 ml-1">Last Name</label>
              <input 
                id="lastName"
                type="text" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
              />
            </div>
          </div>

          {/* Auth Method Tabs */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 ml-1">Contact Method</label>
            <div className="flex p-1 bg-white rounded-2xl border border-slate-100 relative">
              <motion.div 
                layoutId="activeSignUpTab"
                className={`absolute top-1 bottom-1 ${method === 'email' ? 'left-1 w-[calc(50%-4px)]' : 'left-[calc(50%+4px)] w-[calc(50%-8px)]'} bg-teal-50 rounded-xl z-0`}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
              <button 
                type="button"
                onClick={() => setMethod('email')}
                className={`flex-1 flex items-center justify-center py-2.5 rounded-xl relative z-10 text-xs font-bold transition-colors ${method === 'email' ? 'text-teal-700' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <Mail size={16} className="mr-2" />
                Email
              </button>
              <button 
                type="button"
                onClick={() => setMethod('phone')}
                className={`flex-1 flex items-center justify-center py-2.5 rounded-xl relative z-10 text-xs font-bold transition-colors ${method === 'phone' ? 'text-teal-700' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <Smartphone size={16} className="mr-2" />
                Phone
              </button>
            </div>
          </div>

          {method === 'email' ? (
            <motion.div 
              key="email-input"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-2"
            >
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                />
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="phone-input"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-2"
            >
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="tel" 
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="Enter your mobile number"
                  className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                />
              </div>
            </motion.div>
          )}

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create password"
                className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-12 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            {/* Password Requirements Checklist */}
            <div className="bg-white rounded-xl p-3 border border-slate-100 space-y-2 mt-2">
               <div className="text-xs font-semibold text-slate-500 mb-2">Password requirements:</div>
               <ValidationItem valid={validations.length} label="At least 8 characters" />
               <ValidationItem valid={validations.lowercase} label="One lowercase letter" />
               <ValidationItem valid={validations.uppercase} label="One uppercase letter" />
               <ValidationItem valid={validations.number} label="One number" />
               <ValidationItem valid={validations.special} label="One special character" />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-slate-900 text-white font-bold text-lg py-4 rounded-2xl shadow-xl shadow-slate-900/10 flex items-center justify-center space-x-2 group hover:bg-slate-800 transition-colors mt-6"
          >
            <span>Sign Up</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.form>

        <div className="my-6 flex items-center space-x-4">
          <div className="h-[1px] bg-slate-200 flex-1"></div>
          <span className="text-xs text-slate-400 font-medium">Or continue with</span>
          <div className="h-[1px] bg-slate-200 flex-1"></div>
        </div>

        <button 
          onClick={handleGoogleSignUp}
          className="w-full bg-white border border-slate-200 text-slate-700 font-bold py-3.5 rounded-2xl hover:bg-slate-50 transition-colors flex items-center justify-center space-x-3 mb-6"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          <span>Google Account</span>
        </button>

        <p className="text-center text-slate-500 font-medium text-sm pb-6">
          Already have an account? <button onClick={onSignInClick} className="text-teal-600 font-bold hover:underline">Sign In</button>
        </p>
      </div>
    </div>
  );
};

const ValidationItem: React.FC<{ valid: boolean; label: string }> = ({ valid, label }) => (
  <div className="flex items-center space-x-2">
    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${valid ? 'bg-teal-100 text-teal-600' : 'bg-slate-100 text-slate-300'}`}>
       {valid ? <Check size={10} /> : <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />}
    </div>
    <span className={`text-xs ${valid ? 'text-teal-700 font-medium' : 'text-slate-400'}`}>{label}</span>
  </div>
);
