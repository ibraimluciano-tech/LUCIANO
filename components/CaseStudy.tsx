
import React, { useState } from 'react';
import { CaseStudy as CaseStudyType } from '../types';
import { analyzeCaseStudyAnswer } from '../services/geminiService';
import { MessageSquare, Send, Sparkles, ChevronDown, ChevronUp, Unlock } from 'lucide-react';

interface CaseStudyProps {
  studies: CaseStudyType[];
  onScore: (id: string) => void;
}

export const CaseStudy: React.FC<CaseStudyProps> = ({ studies, onScore }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [aiFeedback, setAiFeedback] = useState<Record<string, string>>({});
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());
  const [showIdeal, setShowIdeal] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleInputChange = (id: string, text: string) => {
    setUserInputs(prev => ({ ...prev, [id]: text }));
  };

  const handleSubmit = async (study: CaseStudyType) => {
    const input = userInputs[study.id];
    if (!input || input.trim().length < 5) return;

    setLoadingIds(prev => new Set(prev).add(study.id));
    
    const feedback = await analyzeCaseStudyAnswer(study.scenario, input, study.idealAnswer);
    
    setAiFeedback(prev => ({ ...prev, [study.id]: feedback }));
    setLoadingIds(prev => {
        const next = new Set(prev);
        next.delete(study.id);
        return next;
    });
    // Reward for submitting and analyzing
    onScore(study.id);
    
    // Also reveal ideal answer when feedback comes
    setShowIdeal(prev => new Set(prev).add(study.id));
  };

  if (studies.length === 0) return <div className="p-8 text-center text-slate-500">No case studies available.</div>;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Safety Scenarios</h2>
        <p className="text-slate-500">What would you do? Analyze real-world situations (+100 pts).</p>
      </div>

      <div className="grid gap-6">
        {studies.map((study) => {
            const isExpanded = expandedId === study.id;
            const isLoading = loadingIds.has(study.id);
            const feedback = aiFeedback[study.id];
            const idealRevealed = showIdeal.has(study.id);

            return (
                <div key={study.id} className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
                    <div 
                        onClick={() => toggleExpand(study.id)}
                        className="p-6 cursor-pointer hover:bg-slate-50 transition-colors flex justify-between items-center"
                    >
                        <div className="flex items-center gap-4">
                            <div className="bg-yellow-100 p-3 rounded-full text-yellow-700">
                                <MessageSquare className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-800">Scenario {study.id}</h3>
                                <p className="text-sm text-slate-500 truncate max-w-xs md:max-w-md">{study.scenario}</p>
                            </div>
                        </div>
                        {isExpanded ? <ChevronUp className="text-slate-400"/> : <ChevronDown className="text-slate-400"/>}
                    </div>

                    {isExpanded && (
                        <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-6">
                            <div className="bg-white p-4 rounded-lg border border-slate-200">
                                <h4 className="text-xs uppercase font-bold text-slate-400 mb-2">The Situation</h4>
                                <p className="text-slate-800 leading-relaxed text-lg">{study.scenario}</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Your Action Plan:</label>
                                <textarea
                                    className="w-full p-4 rounded-lg border border-slate-300 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none h-32 resize-none"
                                    placeholder="Describe specifically what you would do..."
                                    value={userInputs[study.id] || ''}
                                    onChange={(e) => handleInputChange(study.id, e.target.value)}
                                    disabled={!!feedback}
                                ></textarea>
                                
                                {!feedback && (
                                    <div className="flex justify-end">
                                        <button
                                            onClick={() => handleSubmit(study)}
                                            disabled={isLoading || !userInputs[study.id]}
                                            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-white transition-all ${
                                                isLoading || !userInputs[study.id]
                                                ? 'bg-slate-300'
                                                : 'bg-blue-600 hover:bg-blue-700 shadow-lg'
                                            }`}
                                        >
                                            {isLoading ? <span className="animate-pulse">Analyzing...</span> : <>Analyze my Answer <Sparkles className="w-4 h-4"/></>}
                                        </button>
                                    </div>
                                )}
                            </div>

                            {feedback && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 animate-fade-in">
                                    <div className="flex items-center gap-2 mb-2 text-blue-800 font-bold">
                                        <Sparkles className="w-5 h-5" /> Gemini Feedback (+100 pts)
                                    </div>
                                    <p className="text-slate-800 whitespace-pre-wrap">{feedback}</p>
                                </div>
                            )}

                            {!idealRevealed ? (
                                <button 
                                    onClick={() => setShowIdeal(prev => new Set(prev).add(study.id))}
                                    className="text-sm text-slate-500 hover:text-slate-800 flex items-center gap-1 mx-auto"
                                >
                                    <Unlock className="w-3 h-3" /> Just show me the ideal answer
                                </button>
                            ) : (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                                     <h4 className="text-xs uppercase font-bold text-green-700 mb-2">Ideal Response</h4>
                                     <p className="text-slate-800">{study.idealAnswer}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )
        })}
      </div>
    </div>
  );
};
