import React, { useState, useCallback, useEffect } from 'react';
import { supabase } from './supabase';
import { Button } from './components/Button';
import { CounterDisplay } from './components/CounterDisplay';
import { ConstructionIcon } from './components/icons';

const App: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialCount = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data, error: fetchError, status } = await supabase
          .from('waitlist')
          .select('id')
          .order('id', { ascending: false })
          .limit(1)
          .single();
        
        if (status === 401) {
             throw new Error("Authentication failed. Please check your Supabase credentials in supabase.ts.");
        }
        
        // PGRST116 means no rows were found, which is a valid state for an empty waitlist.
        if (fetchError && fetchError.code !== 'PGRST116') {
          throw fetchError;
        }

        setCount(data ? data.id : 0);
      } catch (err: any) {
        console.error('Error fetching initial count:', err);
        setError(err.message || 'Could not connect to the waitlist. Please check the console for more details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialCount();
  }, []); // Run once on component mount

  const handleIncrement = useCallback(async () => {
    if (!supabase) return;

    setIsLoading(true);
    setError(null);
    const newCount = count + 1;

    try {
      const { error: insertError } = await supabase
        .from('waitlist')
        .insert({ id: newCount });

      if (insertError) throw insertError;

      setCount(newCount);
    } catch (err: any) {
      console.error('Error inserting new record:', err);
      setError('Could not join the waitlist. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [count]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-6 font-sans">
      <div className="w-full max-w-md mx-auto text-center">
        
        <div className="mb-8">
          <ConstructionIcon className="w-20 h-20 mx-auto text-amber-400" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-slate-100 tracking-tight">
          Under Construction
        </h1>
        <p className="mt-4 text-lg text-slate-400">
          Our new site is being built. Join the waitlist to be notified when we launch!
        </p>
        
        {error && (
          <div className="my-8 p-4 bg-red-900/50 text-red-300 border border-red-700 rounded-lg text-left" role="alert">
            <p className="font-bold">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="my-10">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Your Spot in Line</p>
          <CounterDisplay count={count} isLoading={isLoading} />
        </div>

        <Button onClick={handleIncrement} disabled={isLoading || !!error}>
          {isLoading ? 'Reserving...' : 'Join the Waitlist'}
        </Button>
        
        <footer className="mt-16 text-center">
          <p className="mt-2 text-sm text-slate-600">&copy; {new Date().getFullYear()} Launch Soon Inc. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
};

export default App;
