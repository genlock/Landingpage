import React from 'react';

interface CounterDisplayProps {
  count: number;
  isLoading: boolean;
}

export const CounterDisplay: React.FC<CounterDisplayProps> = ({ count, isLoading }) => {
  const isInitializing = isLoading && count === 0;

  return (
    <div className="relative mt-2 text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 h-24 flex items-center justify-center">
      {isInitializing ? (
         <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-slate-500 border-t-transparent rounded-full animate-spin"></div>
         </div>
      ) : (
        <span className={`transition-opacity duration-300 ${isLoading ? 'opacity-30' : 'opacity-100'}`}>
          {count}
        </span>
      )}
    </div>
  );
};