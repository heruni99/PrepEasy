import React, { useState } from 'react';
import { X, Sparkles, Mail, Lock, User, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export const AuthModal: React.FC = () => {
  const { loginWithEmail, signUpWithEmail, loginAsGuest } = useAuth();
  const { isAuthModalOpen, closeAuthModal, addToast } = useApp();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (mode === 'login') {
      await loginWithEmail(email, name);
      addToast(`Logged in as ${email}`, 'success');
    } else {
      await signUpWithEmail(email, name);
      addToast(`Account created for ${email}`, 'success');
    }
    closeAuthModal();
  };

  const handleGuestLogin = () => {
    loginAsGuest();
    addToast('Logged in as Student Guest', 'info');
    closeAuthModal();
  };

  return (
    <div
      onClick={closeAuthModal}
      className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FFFDF9] border-2 border-stone-900 rounded-3xl max-w-md w-full p-6 shadow-[8px_8px_0px_0px_#1C1917] relative text-stone-900 space-y-6"
      >
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-1.5 rounded-xl bg-[#F8F3EB] border-2 border-stone-900 text-stone-800 hover:bg-[#FF3B30] hover:text-white transition-all shadow-[2px_2px_0px_0px_#1C1917]"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-12 h-12 rounded-2xl bg-[#FF3B30] text-white mx-auto flex items-center justify-center border-2 border-stone-900 shadow-[3px_3px_0px_0px_#1C1917]">
            <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
          </div>
          <h3 className="text-xl font-black tracking-tight text-stone-900 font-heading">
            {mode === 'login' ? 'Welcome Back to PrepEasy' : 'Join PrepEasy Today'}
          </h3>
          <p className="text-xs font-bold text-stone-600">
            {mode === 'login'
              ? 'Sign in to access saved recipes & weekly meal plans'
              : 'Create a free student account to organize your meals'}
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex bg-[#F8F3EB] p-1.5 rounded-2xl border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1C1917]">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-black transition-all ${
              mode === 'login' ? 'bg-[#FF3B30] text-white shadow-[2px_2px_0px_0px_#1C1917] border border-stone-900' : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-black transition-all ${
              mode === 'signup' ? 'bg-[#FF3B30] text-white shadow-[2px_2px_0px_0px_#1C1917] border border-stone-900' : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="text-xs font-black text-stone-900 block mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Chen"
                  className="w-full bg-[#F8F3EB] border-2 border-stone-900 focus:border-[#FF3B30] rounded-2xl pl-10 pr-3 py-2 text-xs font-bold text-stone-900 placeholder-stone-500 focus:outline-none shadow-[2px_2px_0px_0px_#1C1917]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-black text-stone-900 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@university.edu"
                className="w-full bg-[#F8F3EB] border-2 border-stone-900 focus:border-[#FF3B30] rounded-2xl pl-10 pr-3 py-2 text-xs font-bold text-stone-900 placeholder-stone-500 focus:outline-none shadow-[2px_2px_0px_0px_#1C1917]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-black text-stone-900 block mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#F8F3EB] border-2 border-stone-900 focus:border-[#FF3B30] rounded-2xl pl-10 pr-3 py-2 text-xs font-bold text-stone-900 placeholder-stone-500 focus:outline-none shadow-[2px_2px_0px_0px_#1C1917]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-2xl bg-[#FF3B30] text-white font-extrabold text-xs border-2 border-stone-900 shadow-[3px_3px_0px_0px_#1C1917] hover:bg-[#E6302B] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all uppercase tracking-wider"
          >
            {mode === 'login' ? 'Sign In to Account' : 'Register Account'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t-2 border-stone-200"></div></div>
          <span className="relative px-3 bg-[#FFFDF9] text-[10px] uppercase tracking-wider font-black text-stone-500">
            Or Demo Instantly
          </span>
        </div>

        {/* Quick Demo Login */}
        <button
          onClick={handleGuestLogin}
          className="w-full py-2.5 rounded-2xl bg-[#FFD166] text-stone-900 text-xs font-black border-2 border-stone-900 shadow-[3px_3px_0px_0px_#1C1917] hover:bg-[#F3C450] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none flex items-center justify-center space-x-2 transition-all"
        >
          <Sparkles className="w-4 h-4 text-stone-900" />
          <span>Continue as Student Guest Demo</span>
        </button>

      </div>
    </div>
  );
};
