
import React, { useState } from 'react';
import { ChecklistItem } from '../types';
import { explainTopic } from '../services/geminiService';
import { Sparkles, Check, Info } from 'lucide-react';

interface ChecklistProps {
  items: ChecklistItem[];
  onComplete: (id: string) => void;
}

export const Checklist: React.FC<ChecklistProps> = ({ items, onComplete }) => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [explanation, setExplanation] = useState<{ id: string; text: string } | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const toggleCheck = (id: string) => {
    const next = new Set(checkedItems);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
      onComplete(id); // Trigger score
    }
    setCheckedItems(next);
  };

  const handleExplain = async (id: string, topic: string) => {
    if (explanation?.id === id) {
      setExplanation(null);
      return;
    }
    setLoadingId(id);
    const text = await explainTopic(topic);
    setExplanation({ id, text });
    setLoadingId(null);
  };

  const progress = Math.round((checkedItems.size / items.length) * 100) || 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Study Checklist</h2>
          <p className="text-slate-500">Track your progress (+10 pts each).</p>
        </div>
        <div className="text-right">
            <span className="text-3xl font-bold text-yellow-600">{progress}%</span>
            <span className="text-sm text-slate-400 block">Complete</span>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-slate-200 rounded-full h-2.5">
        <div 
            className="bg-yellow-500 h-2.5 rounded-full transition-all duration-500" 
            style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {items.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No items for this filter.</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {items.map((item) => (
              <div key={item.id} className="p-4 transition-colors hover:bg-slate-50">
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleCheck(item.id)}
                    className={`mt-1 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                      checkedItems.has(item.id) 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : 'border-slate-300 hover:border-yellow-500'
                    }`}
                  >
                    {checkedItems.has(item.id) && <Check className="w-4 h-4" />}
                  </button>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <span className={`text-lg ${checkedItems.has(item.id) ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                        {item.topic}
                        </span>
                        <span className="text-xs font-mono bg-slate-100 text-slate-500 px-2 py-1 rounded ml-2 whitespace-nowrap">
                            Aula {item.aula}
                        </span>
                    </div>

                    <div className="mt-2">
                        <button 
                            onClick={(e) => { e.stopPropagation(); handleExplain(item.id, item.topic); }}
                            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium"
                            disabled={loadingId === item.id}
                        >
                            {loadingId === item.id ? (
                                <span className="animate-pulse">Asking Gemini...</span>
                            ) : (
                                <>
                                    <Sparkles className="w-3 h-3" />
                                    {explanation?.id === item.id ? 'Hide Explanation' : 'Explain this'}
                                </>
                            )}
                        </button>
                        
                        {explanation?.id === item.id && (
                            <div className="mt-3 p-3 bg-blue-50 text-blue-900 rounded-lg text-sm border border-blue-100 flex gap-2">
                                <Info className="w-4 h-4 mt-0.5 shrink-0" />
                                <p>{explanation.text}</p>
                            </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
