
import React, { useState } from 'react';
import { HardHat, ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: (name: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name.trim());
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center space-y-6">
        <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <HardHat className="w-10 h-10 text-slate-900" />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold text-slate-800">SafetyPro</h1>
          <p className="text-slate-500 mt-2">Training & Certification Dashboard</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
           Welcome, Cadet! Identify yourself to begin your shift and track your performance stats.
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-left">
            <label className="block text-sm font-semibold text-slate-700 mb-1">Worker Name / ID</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all"
              placeholder="e.g. John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
          >
            Start Shift <ArrowRight className="w-4 h-4" />
          </button>
        </form>
        
        <p className="text-xs text-slate-400">Powered by Gemini AI Intelligence</p>
      </div>
    </div>
  );
};
