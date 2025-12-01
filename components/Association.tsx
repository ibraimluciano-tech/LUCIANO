
import React, { useState, useEffect } from 'react';
import { AssociationPair } from '../types';
import { Link2, RefreshCw } from 'lucide-react';

interface AssociationProps {
  pairs: AssociationPair[];
  onScore: (id: string) => void;
}

// Fisher-Yates shuffle
const shuffleArray = <T,>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};

export const Association: React.FC<AssociationProps> = ({ pairs, onScore }) => {
  const [leftItems, setLeftItems] = useState<AssociationPair[]>([]);
  const [rightItems, setRightItems] = useState<AssociationPair[]>([]);
  
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());

  // Initialize game
  useEffect(() => {
    resetGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pairs]);

  const resetGame = () => {
    setLeftItems(shuffleArray(pairs));
    setRightItems(shuffleArray(pairs));
    setMatchedIds(new Set());
    setSelectedLeft(null);
    setSelectedRight(null);
  };

  const handleMatchAttempt = (side: 'left' | 'right', id: string) => {
    if (matchedIds.has(id)) return;

    if (side === 'left') {
        if (selectedLeft === id) {
            setSelectedLeft(null); // deselect
        } else {
            setSelectedLeft(id);
            if (selectedRight) checkMatch(id, selectedRight);
        }
    } else {
        if (selectedRight === id) {
            setSelectedRight(null); // deselect
        } else {
            setSelectedRight(id);
            if (selectedLeft) checkMatch(selectedLeft, id);
        }
    }
  };

  const checkMatch = (leftId: string, rightId: string) => {
      if (leftId === rightId) {
          // Match!
          setMatchedIds(prev => new Set(prev).add(leftId));
          onScore(leftId); // Score point
          setSelectedLeft(null);
          setSelectedRight(null);
      } else {
          // No match, visual feedback delayed reset could go here, but for simplicity we just let them stay selected or simple visual error?
          // Let's just wait for user to change selection.
          // Alternatively, auto-clear after delay:
          setTimeout(() => {
              setSelectedLeft(null);
              setSelectedRight(null);
          }, 500);
      }
  };

  if (pairs.length === 0) return <div className="p-8 text-center text-slate-500">No items available.</div>;

  const allMatched = matchedIds.size === pairs.length && pairs.length > 0;

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">Term Association</h2>
                <p className="text-slate-500">Match terms (+20 pts each).</p>
            </div>
            <button onClick={resetGame} className="p-2 hover:bg-slate-200 rounded-full transition-colors" title="Restart Game">
                <RefreshCw className="w-5 h-5 text-slate-600" />
            </button>
        </div>

        {allMatched ? (
            <div className="bg-green-100 border border-green-300 text-green-800 p-8 rounded-xl text-center shadow-lg animate-bounce-short">
                <h3 className="text-2xl font-bold mb-2">Perfect!</h3>
                <p>You've mastered the terminology.</p>
                <button onClick={resetGame} className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Play Again</button>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                {/* Connecting Line Placeholder (Visual only, simple logic used instead) */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -ml-px hidden md:block"></div>

                {/* Left Column: Terms */}
                <div className="space-y-4">
                    <h3 className="text-center font-bold text-slate-400 uppercase text-sm mb-4">Terms</h3>
                    {leftItems.map((item) => {
                        const isMatched = matchedIds.has(item.id);
                        const isSelected = selectedLeft === item.id;
                        
                        return (
                            <button
                                key={`L-${item.id}`}
                                onClick={() => handleMatchAttempt('left', item.id)}
                                disabled={isMatched}
                                className={`w-full p-4 rounded-lg shadow-sm border-2 text-left transition-all ${
                                    isMatched 
                                        ? 'bg-green-50 border-green-200 opacity-50 cursor-default' 
                                        : isSelected 
                                            ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-200' 
                                            : 'bg-white border-slate-200 hover:border-yellow-400'
                                }`}
                            >
                                <span className={`font-bold ${isMatched ? 'text-green-800' : 'text-slate-800'}`}>{item.term}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Right Column: Definitions */}
                <div className="space-y-4">
                    <h3 className="text-center font-bold text-slate-400 uppercase text-sm mb-4">Definitions</h3>
                    {rightItems.map((item) => {
                        const isMatched = matchedIds.has(item.id);
                        const isSelected = selectedRight === item.id;

                        return (
                            <button
                                key={`R-${item.id}`}
                                onClick={() => handleMatchAttempt('right', item.id)}
                                disabled={isMatched}
                                className={`w-full p-4 rounded-lg shadow-sm border-2 text-left transition-all h-auto min-h-[80px] flex items-center ${
                                    isMatched 
                                        ? 'bg-green-50 border-green-200 opacity-50 cursor-default' 
                                        : isSelected 
                                            ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-200' 
                                            : 'bg-white border-slate-200 hover:border-yellow-400'
                                }`}
                            >
                                <span className={`text-sm ${isMatched ? 'text-green-800' : 'text-slate-600'}`}>{item.definition}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        )}
    </div>
  );
};
