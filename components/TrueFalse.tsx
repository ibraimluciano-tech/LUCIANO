
import React, { useState } from 'react';
import { TrueFalseQuestion } from '../types';
import { CheckCircle2, XCircle, ChevronRight, HelpCircle } from 'lucide-react';

interface TrueFalseProps {
  questions: TrueFalseQuestion[];
  onScore: (id: string) => void;
}

export const TrueFalse: React.FC<TrueFalseProps> = ({ questions, onScore }) => {
  // State to track answered questions to show feedback inline
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({});

  const handleAnswer = (id: string, choice: boolean) => {
    setAnswers(prev => ({ ...prev, [id]: choice }));
    // Score logic
    const question = questions.find(q => q.id === id);
    if (question && question.isTrue === choice) {
        onScore(id);
    }
  };

  const reset = () => setAnswers({});

  if (questions.length === 0) return <div className="p-8 text-center text-slate-500">Nenhuma pergunta disponível.</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold text-slate-800">Verdadeiro ou Falso</h2>
            <p className="text-slate-500">Verifique seu conhecimento (+30 pts cada).</p>
        </div>
        <button onClick={reset} className="text-sm text-slate-500 hover:text-yellow-600 flex items-center gap-1">
            <HelpCircle className="w-4 h-4" /> Reiniciar
        </button>
      </div>

      <div className="grid gap-6">
        {questions.map((q) => {
          const userAnswer = answers[q.id];
          const isAnswered = userAnswer !== undefined && userAnswer !== null;
          const isCorrect = isAnswered && userAnswer === q.isTrue;

          return (
            <div key={q.id} className={`bg-white rounded-xl shadow-sm border-l-4 transition-all ${
                isAnswered 
                    ? isCorrect ? 'border-l-green-500 shadow-md' : 'border-l-red-500 shadow-md'
                    : 'border-l-yellow-400'
            }`}>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                     <p className="text-lg font-medium text-slate-800">{q.statement}</p>
                     <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded">Aula {q.aula}</span>
                </div>
               
                {!isAnswered ? (
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => handleAnswer(q.id, true)}
                      className="flex-1 py-2 px-4 bg-slate-50 border border-slate-200 rounded-lg hover:bg-green-50 hover:border-green-300 hover:text-green-700 font-bold transition-colors"
                    >
                      VERDADEIRO
                    </button>
                    <button
                      onClick={() => handleAnswer(q.id, false)}
                      className="flex-1 py-2 px-4 bg-slate-50 border border-slate-200 rounded-lg hover:bg-red-50 hover:border-red-300 hover:text-red-700 font-bold transition-colors"
                    >
                      FALSO
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 bg-slate-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                        {isCorrect ? (
                            <span className="text-green-600 font-bold flex items-center gap-1"><CheckCircle2 className="w-5 h-5"/> Correto! +30pts</span>
                        ) : (
                            <span className="text-red-600 font-bold flex items-center gap-1"><XCircle className="w-5 h-5"/> Incorreto</span>
                        )}
                        <span className="text-slate-600">
                             A afirmação é <strong className="uppercase">{q.isTrue ? 'VERDADEIRA' : 'FALSA'}</strong>.
                        </span>
                    </div>
                    {/* Show Justification if it's False (or if they got it wrong) */}
                    {(!q.isTrue || !isCorrect) && q.justification && (
                        <p className="text-sm text-slate-600 border-t border-slate-200 pt-2 mt-2">
                            <span className="font-semibold text-slate-800">Por que?</span> {q.justification}
                        </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
