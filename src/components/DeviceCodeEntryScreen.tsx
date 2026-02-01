import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';

export default function DeviceCodeEntryScreen() {
  const [code, setCode] = useState(['', '', '', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const redirectTimerRef = useRef<number | null>(null);

  const handleInputChange = (index: number, value: string) => {
    // Only allow alphanumeric characters
    const sanitized = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (sanitized.length > 1) return;

    const newCode = [...code];
    newCode[index] = sanitized;
    setCode(newCode);

    // Auto-focus next input
    if (sanitized && index < 7) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').toUpperCase().replace(/[^A-Z0-9]/g, '');
    const newCode = [...code];
    
    for (let i = 0; i < Math.min(pastedData.length, 8); i++) {
      newCode[i] = pastedData[i];
    }
    
    setCode(newCode);
    
    // Focus last filled input (fix off-by-one: target last filled char, not next empty)
    const lastIndex = Math.max(0, Math.min(pastedData.length - 1, 7));
    document.getElementById(`code-${lastIndex}`)?.focus();
  };

  const handleVerify = async () => {
    const fullCode = code.join('');
    
    if (fullCode.length !== 8) {
      toast.error('Please enter the complete 8-character code');
      return;
    }

    setIsVerifying(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock validation - in production, validate against backend
    setIsVerifying(false);
    setIsSuccess(true);
    toast.success('Device authorized successfully!');

    // Redirect after success (prevent leak with ref)
    if (redirectTimerRef.current !== null) {
      clearTimeout(redirectTimerRef.current);
    }
    redirectTimerRef.current = window.setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  };

  // Cleanup redirect timer on unmount
  useEffect(() => {
    return () => {
      if (redirectTimerRef.current !== null) {
        clearTimeout(redirectTimerRef.current);
      }
    };
  }, []);

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-lg p-12 text-center max-w-md">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-14 h-14 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">All Set!</h2>
          <p className="text-slate-600 text-lg">
            Your device has been successfully authorized. Redirecting you now...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 p-6">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button 
          onClick={() => window.history.back()}
          className="p-2 hover:bg-white/50 rounded-full transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6 text-slate-700" />
        </button>
        <h1 className="text-xl font-bold text-slate-900 ml-4">Enter Device Code</h1>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-3xl shadow-lg p-8 space-y-8">
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
                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
              />
            </svg>
          </div>

          {/* Instructions */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">Authorize Your Device</h2>
            <p className="text-slate-600">
              Enter the 8-character code displayed on your device
            </p>
          </div>

          {/* Code Input Fields */}
          <div className="space-y-4">
            <div className="flex justify-center gap-2">
              {code.slice(0, 4).map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-14 h-16 text-center text-2xl font-bold border-2 border-slate-300 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                  aria-label={`Code digit ${index + 1}`}
                />
              ))}
            </div>

            {/* Separator */}
            <div className="flex justify-center">
              <div className="w-8 h-1 bg-slate-300 rounded-full"></div>
            </div>

            <div className="flex justify-center gap-2">
              {code.slice(4, 8).map((digit, index) => (
                <input
                  key={index + 4}
                  id={`code-${index + 4}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index + 4, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index + 4, e)}
                  onPaste={handlePaste}
                  className="w-14 h-16 text-center text-2xl font-bold border-2 border-slate-300 rounded-xl focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                  aria-label={`Code digit ${index + 5}`}
                />
              ))}
            </div>
          </div>

          {/* Verify Button */}
          <Button
            onClick={handleVerify}
            disabled={isVerifying || code.join('').length !== 8}
            className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white py-6 text-lg font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isVerifying ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Verifying...
              </span>
            ) : (
              'Verify & Authorize'
            )}
          </Button>

          {/* Help Text */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">?</span>
              </div>
              <div className="text-sm text-slate-700">
                <p className="font-semibold mb-1">Need help?</p>
                <p className="text-slate-600">
                  Make sure you're entering the code exactly as shown on your device. The code is case-insensitive and expires after 5 minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
