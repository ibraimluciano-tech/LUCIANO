
import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { getDeepDive } from '../services/geminiService';
import { Brain, ArrowRight, RefreshCcw, Sparkles } from 'lucide-react';

interface QuizProps {
  questions: QuizQuestion[];
  onScore: (id: string) => void;
}

export const Quiz: React.FC<QuizProps> = ({ questions, onScore }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  // If filtered returns empty
  if (questions.length === 0) return <div className="p-8 text-center text-slate-500">No questions available for this filter.</div>;

  const question = questions[currentIdx];

  const handleSelect = (key: string) => {
    if (isRevealed) return;
    setSelectedOption(key);
  };

  const handleReveal = () => {
    setIsRevealed(true);
    // Score if correct
    if (selectedOption === question.correctAnswer) {
        onScore(question.id);
    }
  };

  const handleNext = () => {
    setIsRevealed(false);
    setSelectedOption(null);
    setAiInsight(null);
    setCurrentIdx((prev) => (prev + 1) % questions.length);
  };

  const handleAiDeepDive = async () => {
    setLoadingAi(true);
    const text = await getDeepDive(question.question, question.options[question.correctAnswer as keyof typeof question.options]);
    setAiInsight(text);
    setLoadingAi(false);
  };

  const options = Object.entries(question.options);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
                <Brain className="w-6 h-6 text-yellow-600" />
                Knowledge Check
            </h2>
            <p className="text-slate-500">Question {currentIdx + 1} of {questions.length} (+50 pts)</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="p-6 md:p-8 bg-slate-900 text-white">
                <span className="inline-block bg-yellow-500 text-slate-900 text-xs font-bold px-2 py-1 rounded mb-4">
                    Aula {question.aula}
                </span>
                <h3 className="text-xl font-medium leading-relaxed">{question.question}</h3>
            </div>

            <div className="p-6 space-y-3">
                {options.map(([key, text]) => {
                    let baseStyle = "w-full text-left p-4 rounded-xl border-2 transition-all flex justify-between items-center group";
                    let stateStyle = "border-slate-200 hover:border-yellow-400 hover:bg-yellow-50";
                    
                    if (isRevealed) {
                        if (key === question.correctAnswer) {
                            stateStyle = "border-green-500 bg-green-50 text-green-800";
                        } else if (key === selectedOption && key !== question.correctAnswer) {
                            stateStyle = "border-red-500 bg-red-50 text-red-800";
                        } else {
                            stateStyle = "border-slate-100 opacity-50";
                        }
                    } else if (selectedOption === key) {
                        stateStyle = "border-slate-800 bg-slate-100 shadow-inner";
                    }

                    return (
                        <button
                            key={key}
                            onClick={() => handleSelect(key)}
                            disabled={isRevealed}
                            className={`${baseStyle} ${stateStyle}`}
                        >
                            <span className="font-medium">{text}</span>
                            {isRevealed && key === question.correctAnswer && (
                                <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">Correct</span>
                            )}
                             {isRevealed && key === selectedOption && key !== question.correctAnswer && (
                                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">Your Pick</span>
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
                {!isRevealed ? (
                    <button
                        onClick={handleReveal}
                        disabled={!selectedOption}
                        className={`w-full md:w-auto px-6 py-3 rounded-lg font-bold text-white transition-all ${
                            selectedOption ? 'bg-yellow-500 hover:bg-yellow-600 shadow-md' : 'bg-slate-300 cursor-not-allowed'
                        }`}
                    >
                        Check Answer
                    </button>
                ) : (
                    <div className="w-full flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <span className={`font-bold ${selectedOption === question.correctAnswer ? 'text-green-600' : 'text-red-600'}`}>
                                {selectedOption === question.correctAnswer ? 'Correct! +50pts' : 'Incorrect'}
                            </span>
                            <button
                                onClick={handleNext}
                                className="flex items-center gap-2 text-slate-700 hover:text-slate-900 font-semibold"
                            >
                                Next Question <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Gemini Integration */}
                        {!aiInsight ? (
                            <button 
                                onClick={handleAiDeepDive}
                                disabled={loadingAi}
                                className="w-full text-center py-2 text-sm text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 flex items-center justify-center gap-2 border border-purple-200"
                            >
                                {loadingAi ? <span className="animate-spin"><RefreshCcw className="w-4 h-4"/></span> : <Sparkles className="w-4 h-4"/>}
                                {loadingAi ? 'Asking AI...' : 'Why is this correct? Ask Gemini'}
                            </button>
                        ) : (
                            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 text-sm text-slate-800">
                                <div className="flex items-center gap-2 mb-2 text-purple-700 font-bold">
                                    <Sparkles className="w-4 h-4" /> Gemini Insight
                                </div>
                                {aiInsight}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};
