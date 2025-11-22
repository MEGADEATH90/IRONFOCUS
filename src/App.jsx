import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TodoItem from './components/TodoItem';
import { supabase } from './supabaseClient';

const QUOTES = [
  "Discipline is doing what needs to be done, even if you don't want to do it.",
  "The only bad workout is the one that didn't happen.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "Don't stop when you're tired. Stop when you're done.",
  "Your future is created by what you do today, not tomorrow.",
  "Sweat is just fat crying.",
  "Focus on the process, not the outcome.",
  "Pain is temporary. Quitting lasts forever.",
  "The body achieves what the mind believes.",
  "Motivation is what gets you started. Habit is what keeps you going.",
  "A one-hour workout is only 4% of your day. No excuses.",
  "Fitness is not about being better than someone else. It’s about being better than you were yesterday.",
  "Discipline is the bridge between goals and accomplishment.",
  "You don’t have to be extreme, just consistent.",
  "Excuses don’t burn calories.",
  "Suffer the pain of discipline, or suffer the pain of regret.",
  "It never gets easier, you just get better.",
  "Action is the foundational key to all success.",
  "Don't count the days, make the days count.",
  "Strength does not come from physical capacity. It comes from an indomitable will.",
  "Believe you can and you're halfway there.",
  "What hurts today makes you stronger tomorrow.",
  "Clear your mind of can't.",
  "Your body can stand almost anything. It’s your mind that you have to convince.",
  "Make yourself proud.",
  "Run when you can, walk if you have to, crawl if you must; just never give up.",
  "Go the extra mile. It’s never crowded.",
  "Hard work beats talent when talent doesn’t work hard.",
  "Dream big. Start small. Act now."
];

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [category, setCategory] = useState('work'); // work, gym, life
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTodos(data || []);
    } catch (error) {
      console.error('Error fetching todos:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    try {
      const newTodo = {
        text: inputValue,
        completed: false,
        category: category,
        created_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('todos')
        .insert([newTodo])
        .select();

      if (error) throw error;

      if (data) {
        setTodos([data[0], ...todos]);
        setInputValue('');
      }
    } catch (error) {
      console.error('Error adding todo:', error.message);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todoToToggle = todos.find(t => t.id === id);
      if (!todoToToggle) return;

      const { error } = await supabase
        .from('todos')
        .update({ completed: !todoToToggle.completed })
        .eq('id', id);

      if (error) throw error;

      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } catch (error) {
      console.error('Error toggling todo:', error.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error.message);
    }
  };

  const completedCount = todos.filter(t => t.completed).length;
  const totalCount = todos.length;
  const progress = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-black text-zinc-100 py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-zinc-700 selection:text-white">
      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-extrabold text-center mb-2 tracking-tight text-white">
            IRON<span className="text-red-600">FOCUS</span>
          </h1>
          <p className="text-center text-zinc-500 text-xs uppercase tracking-widest font-medium mb-6">
            Forged in Discipline
          </p>

          <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800 text-center">
            <p className="text-zinc-400 italic text-sm">"{quote}"</p>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-2 bg-zinc-900 rounded-full h-3 overflow-hidden border border-zinc-800">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 to-red-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
        <div className="flex justify-between text-xs text-zinc-500 font-medium mb-8 px-1">
          <span>{completedCount}/{totalCount} Crushed</span>
          <span>{progress}%</span>
        </div>

        <form onSubmit={addTodo} className="mb-8">
          <div className="relative group mb-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Next Mission..."
              className="w-full px-6 py-5 rounded-2xl bg-zinc-900 text-zinc-100 placeholder-zinc-600 shadow-xl border border-zinc-800 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 outline-none text-lg transition-all"
            />
            <button
              type="submit"
              className="absolute right-3 top-3 bottom-3 bg-white text-black rounded-xl w-12 flex items-center justify-center hover:bg-zinc-200 hover:scale-105 active:scale-95 transition-all shadow-lg disabled:opacity-50 disabled:hover:scale-100"
              disabled={!inputValue.trim()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          {/* Category Selector */}
          <div className="flex gap-2 justify-center">
            <button
              type="button"
              onClick={() => setCategory('work')}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all border ${category === 'work' ? 'bg-blue-900/30 border-blue-500 text-blue-400' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:bg-zinc-800'}`}
            >
              💼 WORK
            </button>
            <button
              type="button"
              onClick={() => setCategory('gym')}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all border ${category === 'gym' ? 'bg-red-900/30 border-red-500 text-red-400' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:bg-zinc-800'}`}
            >
              💪 GYM
            </button>
            <button
              type="button"
              onClick={() => setCategory('life')}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all border ${category === 'life' ? 'bg-green-900/30 border-green-500 text-green-400' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:bg-zinc-800'}`}
            >
              🌱 LIFE
            </button>
          </div>
        </form>

        <div className="space-y-3">
          <AnimatePresence mode='popLayout'>
            {loading ? (
              <div className="text-center text-zinc-500 mt-12">Loading missions...</div>
            ) : todos.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center mt-12"
              >
                <p className="text-zinc-700 text-6xl mb-4">💤</p>
                <p className="text-zinc-600 italic">No missions pending.</p>
              </motion.div>
            ) : (
              todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                />
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;
