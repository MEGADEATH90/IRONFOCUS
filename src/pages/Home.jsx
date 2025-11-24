import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TodoItem from '../components/TodoItem';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import ParticleBackground from '../components/ParticleBackground';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import confetti from 'canvas-confetti';

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
    "Fitness is not about being better than someone else. It's about being better than you were yesterday.",
    "Discipline is the bridge between goals and accomplishment.",
    "You don't have to be extreme, just consistent.",
    "Excuses don't burn calories.",
    "Suffer the pain of discipline, or suffer the pain of regret.",
    "It never gets easier, you just get better.",
    "Action is the foundational key to all success.",
    "Don't count the days, make the days count.",
    "Strength does not come from physical capacity. It comes from an indomitable will.",
    "Believe you can and you're halfway there.",
    "What hurts today makes you stronger tomorrow.",
    "Clear your mind of can't.",
    "Your body can stand almost anything. It's your mind that you have to convince.",
    "Make yourself proud.",
    "Run when you can, walk if you have to, crawl if you must; just never give up.",
    "Go the extra mile. It's never crowded.",
    "Hard work beats talent when talent doesn't work hard.",
    "Dream big. Start small. Act now."
];

function Home() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [category, setCategory] = useState('work');
    const [quote, setQuote] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const { signOut, user } = useAuth();
    const navigate = useNavigate();

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
        } catch (err) {
            console.error('Error fetching todos:', err.message);
            setError('Failed to load missions. Check connection.');
        } finally {
            setLoading(false);
        }
    };

    const addTodo = async (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        if (!user) {
            setError('You must be logged in to add a mission.');
            return;
        }
        try {
            setError('');
            const newTodo = {
                text: inputValue,
                completed: false,
                category: category,
                created_at: new Date().toISOString(),
                user_id: user.id
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
        } catch (err) {
            console.error('Error adding todo:', err.message);
            setError('Failed to add mission: ' + err.message);
        }
    };

    const toggleTodo = async (id) => {
        try {
            const todoToToggle = todos.find(t => t.id === id);
            if (!todoToToggle) return;
            const newCompletedStatus = !todoToToggle.completed;
            const updates = {
                completed: newCompletedStatus,
                completed_at: newCompletedStatus ? new Date().toISOString() : null
            };
            const { error } = await supabase
                .from('todos')
                .update(updates)
                .eq('id', id);
            if (error) throw error;
            setTodos(todos.map(todo => todo.id === id ? { ...todo, ...updates } : todo));

            // Confetti on completion
            if (newCompletedStatus) {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        } catch (err) {
            console.error('Error toggling todo:', err.message);
            setError('Failed to update mission.');
        }
    };

    const deleteTodo = async (id) => {
        try {
            const { error } = await supabase
                .from('todos')
                .delete()
                .eq('id', id);
            if (error) throw error;
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (err) {
            console.error('Error deleting todo:', err.message);
            setError('Failed to delete mission.');
        }
    };

    const handleLogout = async () => {
        try {
            await signOut();
            navigate('/login');
        } catch (err) {
            console.error('Error signing out:', err.message);
        }
    };

    const getGroupedTodos = () => {
        const pending = todos.filter(t => !t.completed);
        let completed = todos.filter(t => t.completed);
        if (selectedDate) {
            completed = completed.filter(t => {
                const todoDate = new Date(t.completed_at || t.created_at).toISOString().split('T')[0];
                return todoDate === selectedDate;
            });
        }
        const groupedCompleted = completed.reduce((groups, todo) => {
            const date = new Date(todo.completed_at || todo.created_at).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            if (!groups[date]) groups[date] = [];
            groups[date].push(todo);
            return groups;
        }, {});
        return { pending, groupedCompleted };
    };

    const { pending, groupedCompleted } = getGroupedTodos();
    const completedCount = todos.filter(t => t.completed).length;
    const totalCount = todos.length;
    const progress = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

    return (
        <div className="min-h-screen bg-black text-zinc-100 py-12 px-4 sm:px-6 lg:px-8 font-['Inter',sans-serif] selection:bg-zinc-700 selection:text-white relative overflow-hidden">
            <ParticleBackground />
            <div className="max-w-lg mx-auto relative z-10">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <button onClick={handleLogout} className="text-xs text-zinc-500 hover:text-red-500 transition-colors uppercase tracking-widest font-bold">
                        Logout
                    </button>
                    <ThemeToggle />
                </div>

                {/* Hero Section */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
                    <h1 className="text-5xl font-extrabold tracking-tight text-white mb-2">
                        IRON<span className="text-red-600">FOCUS</span>
                    </h1>
                    <p className="text-zinc-500 text-xs uppercase tracking-widest font-medium">
                        Forge Discipline, Crush Goals
                    </p>
                </motion.div>

                {/* Quote Box */}
                <div className="glass p-5 rounded-2xl text-center mb-8 shadow-2xl">
                    <p className="text-zinc-400 italic text-sm leading-relaxed">{quote}</p>
                </div>

                {/* Circular Progress */}
                <div className="flex items-center justify-center mb-8">
                    <div className="w-32 h-32">
                        <CircularProgressbar
                            value={progress}
                            text={`${progress}%`}
                            styles={buildStyles({
                                textColor: '#f5f5f5',
                                pathColor: progress > 50 ? '#dc2626' : '#3b82f6',
                                trailColor: '#27272a',
                                textSize: '24px',
                            })}
                        />
                    </div>
                </div>
                <div className="text-center text-xs text-zinc-500 font-medium mb-8">
                    {completedCount}/{totalCount} Missions Crushed
                </div>

                {/* Add Todo Form */}
                <form onSubmit={addTodo} className="mb-8">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4 bg-red-900/30 border border-red-500 text-red-400 px-4 py-3 rounded-lg text-sm text-center"
                        >
                            {error}
                        </motion.div>
                    )}
                    <div className="relative group mb-4">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                            placeholder="Next Mission..."
                            className="glass w-full px-6 py-5 rounded-2xl bg-zinc-900/50 text-zinc-100 placeholder-zinc-500 shadow-2xl border border-zinc-700 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-600/50 outline-none text-lg transition-all"
                        />
                        <button
                            type="submit"
                            className="absolute right-3 top-3 bottom-3 bg-gradient-to-r from-blue-600 to-red-600 text-white rounded-xl w-12 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-lg disabled:opacity-50 disabled:hover:scale-100"
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
                            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all border-2 ${category === 'work' ? 'glass bg-blue-900/40 border-blue-500 text-blue-300 scale-105' : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:bg-zinc-800/70 hover:scale-105'}`}
                        >
                            💼 WORK
                        </button>
                        <button
                            type="button"
                            onClick={() => setCategory('gym')}
                            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all border-2 ${category === 'gym' ? 'glass bg-red-900/40 border-red-500 text-red-300 scale-105' : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:bg-zinc-800/70 hover:scale-105'}`}
                        >
                            💪 GYM
                        </button>
                        <button
                            type="button"
                            onClick={() => setCategory('life')}
                            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all border-2 ${category === 'life' ? 'glass bg-green-900/40 border-green-500 text-green-300 scale-105' : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:bg-zinc-800/70 hover:scale-105'}`}
                        >
                            🌱 LIFE
                        </button>
                    </div>
                </form>

                {/* Date Filter */}
                <div className="flex items-center justify-between mt-8 border-b border-zinc-800 pb-3 mb-6">
                    <h3 className="text-zinc-500 text-xs uppercase tracking-widest font-bold">Completed Missions</h3>
                    <div className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5 text-zinc-400" />
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={e => setSelectedDate(e.target.value)}
                            className="glass bg-zinc-900/50 text-zinc-400 text-xs rounded-lg px-3 py-1.5 border border-zinc-700 focus:border-zinc-500 outline-none transition-all"
                        />
                        {selectedDate && (
                            <button
                                onClick={() => setSelectedDate('')}
                                className="text-xs text-red-500 hover:text-red-400 font-medium transition-colors"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>

                {/* Todo Lists */}
                <div className="space-y-6">
                    <AnimatePresence mode="popLayout">
                        {loading ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center text-zinc-500 mt-12"
                            >
                                Loading missions...
                            </motion.div>
                        ) : (
                            <>
                                {/* Pending Tasks */}
                                {pending.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-3"
                                    >
                                        <h3 className="text-zinc-500 text-xs uppercase tracking-widest font-bold mb-4">Active Missions</h3>
                                        {pending.map(todo => (
                                            <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
                                        ))}
                                    </motion.div>
                                )}

                                {/* Completed Tasks Grouped */}
                                {Object.entries(groupedCompleted).map(([date, groupTodos]) => (
                                    <motion.div
                                        key={date}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-3"
                                    >
                                        <h3 className="text-zinc-500 text-xs uppercase tracking-widest font-bold mb-4 mt-6">{date}</h3>
                                        {groupTodos.map(todo => (
                                            <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
                                        ))}
                                    </motion.div>
                                ))}

                                {todos.length === 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="text-center mt-16 glass p-12 rounded-2xl"
                                    >
                                        <p className="text-zinc-700 text-7xl mb-4">💤</p>
                                        <p className="text-zinc-600 italic text-lg">No missions pending.</p>
                                        <p className="text-zinc-700 text-sm mt-2">Time to forge some discipline!</p>
                                    </motion.div>
                                )}
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export default Home;
