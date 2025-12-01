
import React, { useState, useMemo, useEffect } from 'react';
import { Layout } from './components/Layout';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Checklist } from './components/Checklist';
import { Quiz } from './components/Quiz';
import { TrueFalse } from './components/TrueFalse';
import { CaseStudy } from './components/CaseStudy';
import { Association } from './components/Association';
import { AdminDashboard } from './components/AdminDashboard';
import { Tab } from './types';
import { CHECKLIST_DATA, QUIZ_DATA, TRUE_FALSE_DATA, CASE_STUDIES_DATA, ASSOCIATION_DATA } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.CHECKLIST);
  const [selectedAula, setSelectedAula] = useState<number | 'ALL'>('ALL');
  
  // Gamification State
  const [userName, setUserName] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState("00:00");
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  // Timer Logic
  useEffect(() => {
    if (!startTime) return;
    
    const interval = setInterval(() => {
        const now = Date.now();
        const diff = Math.floor((now - startTime) / 1000);
        const minutes = Math.floor(diff / 60).toString().padStart(2, '0');
        const seconds = (diff % 60).toString().padStart(2, '0');
        setElapsedTime(`${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const handleStart = (name: string) => {
      setUserName(name);
      setStartTime(Date.now());
      setScore(0);
      setCompletedIds(new Set());
      
      // Auto-redirect admin to dashboard
      if (name === 'Professor') {
          setActiveTab(Tab.ADMIN);
      }
  };

  const handleScoreUpdate = (id: string, points: number) => {
      if (completedIds.has(id)) return;
      
      setScore(prev => prev + points);
      setCompletedIds(prev => new Set(prev).add(id));
  };

  // Filter Data Helpers
  const filterByAula = <T extends { aula?: number }>(data: T[]) => {
    if (selectedAula === 'ALL') return data;
    return data.filter(item => item.aula === selectedAula);
  };

  const checklistItems = useMemo(() => filterByAula(CHECKLIST_DATA), [selectedAula]);
  const quizItems = useMemo(() => filterByAula(QUIZ_DATA), [selectedAula]);
  const tfItems = useMemo(() => filterByAula(TRUE_FALSE_DATA), [selectedAula]);
  const caseStudies = useMemo(() => filterByAula(CASE_STUDIES_DATA), [selectedAula]);
  const associationPairs = ASSOCIATION_DATA; 

  if (!userName) {
      return <WelcomeScreen onStart={handleStart} />;
  }

  return (
    <Layout 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        selectedAula={selectedAula}
        setSelectedAula={setSelectedAula}
        userName={userName}
        score={score}
        timeElapsed={elapsedTime}
    >
        {activeTab === Tab.CHECKLIST && (
            <Checklist 
                items={checklistItems} 
                onComplete={(id) => handleScoreUpdate(id, 10)} 
            />
        )}
        {activeTab === Tab.QUIZ && (
            <Quiz 
                questions={quizItems} 
                onScore={(id) => handleScoreUpdate(id, 50)}
            />
        )}
        {activeTab === Tab.TRUE_FALSE && (
            <TrueFalse 
                questions={tfItems} 
                onScore={(id) => handleScoreUpdate(id, 30)}
            />
        )}
        {activeTab === Tab.CASE_STUDY && (
            <CaseStudy 
                studies={caseStudies} 
                onScore={(id) => handleScoreUpdate(id, 100)}
            />
        )}
        {activeTab === Tab.ASSOCIATION && (
            <Association 
                pairs={associationPairs} 
                onScore={(id) => handleScoreUpdate(id, 20)}
            />
        )}
        {activeTab === Tab.ADMIN && userName === 'Professor' && (
            <AdminDashboard />
        )}
    </Layout>
  );
};

export default App;
