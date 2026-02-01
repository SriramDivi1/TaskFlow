import { useState, useEffect } from 'react';
import { ArrowLeft, Copy, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';

interface DeviceAuthScreenProps {
  onBack: () => void;
}

export default function DeviceAuthScreen({ onBack }: DeviceAuthScreenProps) {
  const [authCode, setAuthCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isExpired, setIsExpired] = useState(false);

  // Generate random 8-character code (format: XXXX-XXXX)
  useEffect(() => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Exclude confusing chars
    const code = Array.from({ length: 8 }, () => 
      chars[Math.floor(Math.random() * chars.length)]
    ).join('');
    setAuthCode(`${code.slice(0, 4)}-${code.slice(4)}`);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true);
      return;
    }
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopy = async () => {
    if (isExpired) {
      toast.error('Code has expired');
      return;
    }
    
    try {
      await navigator.clipboard.writeText(authCode);
      setCopied(true);
      toast.success('Code copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy code');
    }
  };

  const handleOpenBrowser = () => {
    if (isExpired) {
      toast.error('Code has expired');
      return;
    }
    window.open('https://taskflow-app.vercel.app/device', '_blank');
  };

  const handleRegenerateCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const code = Array.from({ length: 8 }, () => 
      chars[Math.floor(Math.random() * chars.length)]
    ).join('');
    setAuthCode(`${code.slice(0, 4)}-${code.slice(4)}`);
    setTimeLeft(300);
    setIsExpired(false);
    toast.success('New code generated');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 p-6">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-white/50 rounded-full transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6 text-slate-700" />
        </button>
        <h1 className="text-xl font-bold text-slate-900 ml-4">Device Authorization</h1>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-3xl shadow-lg p-8 space-y-6">
          {/* Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          {/* Instructions */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">Authorize This Device</h2>
            <p className="text-slate-600">
              Visit <span className="font-semibold text-teal-600">taskflow-app.vercel.app/device</span> and enter this code:
            </p>
          </div>

          {/* Code Display */}
          <div className="relative">
            <div className={`bg-gradient-to-br rounded-2xl p-6 border-2 ${
              isExpired 
                ? 'from-red-50 to-orange-50 border-red-200' 
                : 'from-teal-50 to-blue-50 border-teal-200'
            }`}>
              <div className="text-center">
                <div className={`text-5xl font-bold tracking-widest mb-2 font-mono ${
                  isExpired ? 'text-slate-400 line-through' : 'text-slate-900'
                }`}>
                  {authCode}
                </div>
                <div className={`text-sm font-semibold ${
                  isExpired ? 'text-red-600' : 'text-slate-500'
                }`}>
                  {isExpired ? '⚠️ Expired' : `Expires in ${formatTime(timeLeft)}`}
                </div>
              </div>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              disabled={isExpired}
              className="absolute top-4 right-4 p-2 hover:bg-white/50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Copy code"
            >
              {copied ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <Copy className="w-5 h-5 text-slate-600" />
              )}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {isExpired ? (
              <Button
                onClick={handleRegenerateCode}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-6 text-lg font-semibold rounded-xl"
              >
                Generate New Code
              </Button>
            ) : (
              <Button
                onClick={handleOpenBrowser}
                className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white py-6 text-lg font-semibold rounded-xl"
              >
                Open Browser to Enter Code
              </Button>
            )}

            <Button
              onClick={onBack}
              variant="outline"
              className="w-full py-6 text-lg rounded-xl"
            >
              Cancel
            </Button>
          </div>

          {/* Additional Instructions */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">i</span>
              </div>
              <div className="text-sm text-slate-700 space-y-1">
                <p className="font-semibold">How it works:</p>
                <ol className="list-decimal list-inside space-y-1 text-slate-600">
                  <li>Open the link above on your browser</li>
                  <li>Enter the code shown above</li>
                  <li>Your device will be authorized automatically</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Security Note */}
          <p className="text-xs text-center text-slate-500">
            🔐 This code is single-use and will expire after 5 minutes for your security
          </p>
        </div>
      </div>
    </div>
  );
}
