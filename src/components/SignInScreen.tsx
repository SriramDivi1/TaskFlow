import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Phone, ArrowRight, Smartphone, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

interface SignInScreenProps {
  onSignIn: () => void;
  onSignUpClick: () => void;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({ onSignIn, onSignUpClick }) => {
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (method === 'email' && (!email || !password)) {
      toast.error('Please enter email and password');
      return;
    }
    if (method === 'phone' && (!phone || phone.length !== 10)) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }
    
    // Simulate API call
    const loadingToast = toast.loading('Signing in...');
    setTimeout(() => {
      toast.dismiss(loadingToast);
      toast.success('Welcome back!');
      onSignIn();
    }, 1500);
  };

  const handleGoogleSignIn = () => {
    const loadingToast = toast.loading('Connecting to Google...');
    setTimeout(() => {
      toast.dismiss(loadingToast);
      toast.success('Signed in with Google');
      onSignIn();
    }, 1500);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(value);
  };

  return (
    <div className="bg-slate-50 min-h-full flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>

      <div className="flex-1 flex flex-col justify-center px-6 relative z-10 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-16 h-16 bg-gradient-to-tr from-teal-500 to-emerald-400 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/30 mb-6 transform rotate-3">
             <div className="w-8 h-8 border-4 border-white rounded-lg"></div>
          </div>
          
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Welcome Back!</h1>
          <p className="text-slate-500 text-lg">Please sign in to your account</p>
        </motion.div>

        {/* Auth Method Tabs */}
        <div className="flex p-1 bg-white rounded-2xl border border-slate-100 mb-8 relative">
          <motion.div 
            layoutId="activeTab"
            className={`absolute top-1 bottom-1 ${method === 'email' ? 'left-1 w-[calc(50%-4px)]' : 'left-[calc(50%+4px)] w-[calc(50%-8px)]'} bg-teal-50 rounded-xl z-0`}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
          <button 
            onClick={() => setMethod('email')}
            className={`flex-1 flex items-center justify-center py-3 rounded-xl relative z-10 text-sm font-bold transition-colors ${method === 'email' ? 'text-teal-700' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Mail size={18} className="mr-2" />
            Email
          </button>
          <button 
            onClick={() => setMethod('phone')}
            className={`flex-1 flex items-center justify-center py-3 rounded-xl relative z-10 text-sm font-bold transition-colors ${method === 'phone' ? 'text-teal-700' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Smartphone size={18} className="mr-2" />
            Phone
          </button>
        </div>

        <motion.form 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-5"
          onSubmit={handleSignIn}
        >
          {method === 'email' ? (
            <motion.div 
              key="email-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-5"
            >
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-bold text-slate-700">Password</label>
                  <button type="button" className="text-xs font-bold text-teal-600 hover:text-teal-700">Forgot?</button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-12 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="phone-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Mobile Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="Enter your mobile number"
                    className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                  />
                </div>
              </div>
              <div className="p-4 bg-teal-50 rounded-2xl border border-teal-100 text-sm text-teal-800">
                We'll send you a verification code to confirm your number. Standard rates may apply.
              </div>
            </motion.div>
          )}

          <button 
            type="submit"
            className="w-full bg-slate-900 text-white font-bold text-lg py-4 rounded-2xl shadow-xl shadow-slate-900/10 flex items-center justify-center space-x-2 group hover:bg-slate-800 transition-colors mt-8"
          >
            <span>Sign In</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.form>

        <div className="my-8 flex items-center space-x-4">
          <div className="h-[1px] bg-slate-200 flex-1"></div>
          <span className="text-sm text-slate-400 font-medium">Or continue with</span>
          <div className="h-[1px] bg-slate-200 flex-1"></div>
        </div>

        <button 
          onClick={handleGoogleSignIn}
          className="w-full bg-white border border-slate-200 text-slate-700 font-bold py-4 rounded-2xl hover:bg-slate-50 transition-colors flex items-center justify-center space-x-3"
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

        <p className="text-center mt-8 text-slate-500 font-medium">
          Don't have an account? <button onClick={onSignUpClick} className="text-teal-600 font-bold hover:underline">Sign Up</button>
        </p>
      </div>
    </div>
  );
};
