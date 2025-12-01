
import React from 'react';
import { Tab } from '../types';
import { LayoutDashboard, CheckSquare, BrainCircuit, AlertTriangle, Link2, HardHat, Trophy, Clock, User, BarChart3, LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  selectedAula: number | 'ALL';
  setSelectedAula: (aula: number | 'ALL') => void;
  userName: string;
  score: number;
  timeElapsed: string;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeTab, 
  setActiveTab, 
  selectedAula, 
  setSelectedAula,
  userName,
  score,
  timeElapsed
}) => {
  
  // Basic Navigation
  const navItems = [
    { id: Tab.CHECKLIST, label: 'Checklist', icon: CheckSquare },
    { id: Tab.QUIZ, label: 'Quiz', icon: BrainCircuit },
    { id: Tab.TRUE_FALSE, label: 'True/False', icon: AlertTriangle },
    { id: Tab.CASE_STUDY, label: 'Case Studies', icon: LayoutDashboard },
    { id: Tab.ASSOCIATION, label: 'Association', icon: Link2 },
  ];

  const isAdmin = userName === 'Professor';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800">
      {/* Mobile Header */}
      <div className="md:hidden bg-slate-900 text-white p-3 shadow-md sticky top-0 z-50">
        <div className="flex justify-between items-center mb-3">
             <div className="flex items-center gap-2 font-bold text-yellow-500">
                <HardHat className="w-5 h-5" />
                <span>SafetyPro</span>
            </div>
             <div className="flex items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-1 text-yellow-400">
                    <Trophy className="w-3 h-3" /> {score} pts
                </div>
                <div className="flex items-center gap-1 text-slate-300">
                    <Clock className="w-3 h-3" /> {timeElapsed}
                </div>
            </div>
        </div>
        <div className="flex justify-between items-center">
            <span className="text-sm font-semibold truncate max-w-[150px] flex items-center gap-1">
                <User className="w-3 h-3" /> {userName}
            </span>
            {isAdmin && (
                <button 
                    onClick={() => setActiveTab(Tab.ADMIN)}
                    className="text-xs bg-indigo-600 px-2 py-1 rounded text-white font-bold"
                >
                    Admin
                </button>
            )}
            {!isAdmin && (
                <select 
                className="bg-slate-800 text-xs rounded px-2 py-1 border border-slate-700"
                value={selectedAula}
                onChange={(e) => setSelectedAula(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))}
                >
                <option value="ALL">All Aulas</option>
                <option value={15}>Aula 15</option>
                <option value={16}>Aula 16</option>
                </select>
            )}
        </div>
      </div>

      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white h-screen sticky top-0 overflow-y-auto border-r border-slate-800">
        <div className="p-6 bg-yellow-500 text-slate-900 flex items-center gap-3 shadow-lg">
          <HardHat className="w-8 h-8" />
          <div>
            <h1 className="font-bold text-xl">SafetyPro</h1>
            <p className="text-xs opacity-80 font-semibold">Gamified Training</p>
          </div>
        </div>

        {/* User Stats Card */}
        <div className="p-4 bg-slate-800 border-b border-slate-700">
            <div className="flex items-center gap-2 mb-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isAdmin ? 'bg-indigo-600' : 'bg-slate-700'}`}>
                    <User className="w-4 h-4 text-white" />
                </div>
                <div className="overflow-hidden">
                    <p className="text-xs text-slate-400 uppercase font-bold">{isAdmin ? 'Instructor' : 'Cadet'}</p>
                    <p className="font-bold truncate">{userName}</p>
                </div>
            </div>
            {!isAdmin && (
                <div className="grid grid-cols-2 gap-2">
                    <div className="bg-slate-900 p-2 rounded border border-slate-700 text-center">
                        <p className="text-xs text-slate-500 uppercase">Score</p>
                        <p className="text-xl font-bold text-yellow-500 font-mono">{score}</p>
                    </div>
                    <div className="bg-slate-900 p-2 rounded border border-slate-700 text-center">
                        <p className="text-xs text-slate-500 uppercase">Time</p>
                        <p className="text-lg font-bold text-blue-400 font-mono">{timeElapsed}</p>
                    </div>
                </div>
            )}
        </div>

        {!isAdmin && (
            <div className="p-4">
            <label className="text-slate-500 text-xs uppercase font-semibold mb-2 block">Filter Content</label>
            <select 
                className="w-full bg-slate-800 text-white p-2 rounded border border-slate-600 focus:border-yellow-500 outline-none text-sm"
                value={selectedAula}
                onChange={(e) => setSelectedAula(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))}
            >
                <option value="ALL">All Classes (Aulas)</option>
                <option value={15}>Aula 15 - Basics</option>
                <option value={16}>Aula 16 - Risks</option>
            </select>
            </div>
        )}

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id 
                  ? 'bg-slate-800 text-white font-bold border-l-4 border-yellow-500' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}

          {/* Admin Link */}
          {isAdmin && (
             <>
                <div className="h-px bg-slate-800 my-2"></div>
                <button
                    onClick={() => setActiveTab(Tab.ADMIN)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        activeTab === Tab.ADMIN 
                        ? 'bg-indigo-900 text-white font-bold border-l-4 border-indigo-500' 
                        : 'text-indigo-300 hover:bg-slate-800'
                    }`}
                    >
                    <BarChart3 className="w-5 h-5" />
                    Painel do Instrutor
                </button>
             </>
          )}
        </nav>
        
        <div className="p-4 flex flex-col gap-2">
            <button 
                onClick={() => window.location.reload()}
                className="w-full text-xs text-slate-500 hover:text-white flex items-center justify-center gap-2 p-2 rounded hover:bg-slate-800 transition-colors"
            >
                <LogOut className="w-3 h-3" /> Sign Out
            </button>
            <div className="text-[10px] text-slate-600 text-center">
                Powered by Gemini AI
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-[calc(100vh-110px)] md:h-screen">
        <div className="max-w-4xl mx-auto">
            {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white text-slate-600 flex justify-around p-2 border-t border-slate-200 z-50 shadow-lg pb-safe">
        {navItems.map((item) => (
            <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`p-2 rounded-full flex flex-col items-center ${activeTab === item.id ? 'text-yellow-600 bg-yellow-50' : 'text-slate-400'}`}
            >
                <item.icon className="w-6 h-6" />
                <span className="text-[10px] mt-1">{item.label}</span>
            </button>
        ))}
        {isAdmin && (
             <button
                onClick={() => setActiveTab(Tab.ADMIN)}
                className={`p-2 rounded-full flex flex-col items-center ${activeTab === Tab.ADMIN ? 'text-indigo-600 bg-indigo-50' : 'text-slate-400'}`}
            >
                <BarChart3 className="w-6 h-6" />
                <span className="text-[10px] mt-1">Admin</span>
            </button>
        )}
      </div>
    </div>
  );
};
