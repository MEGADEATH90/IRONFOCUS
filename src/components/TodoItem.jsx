import React from 'react';
import { motion } from 'framer-motion';

const CATEGORY_ICONS = {
    work: '💼',
    gym: '💪',
    life: '🌱',
};

const CATEGORY_COLORS = {
    work: 'border-blue-500/30 hover:border-blue-500/60',
    gym: 'border-red-500/30 hover:border-red-500/60',
    life: 'border-green-500/30 hover:border-green-500/60',
};

const TodoItem = ({ todo, toggleTodo, deleteTodo }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className={`card-3d flex items-center justify-between p-4 bg-zinc-900 rounded-xl mb-3 border ${CATEGORY_COLORS[todo.category] || 'border-zinc-800'} group`}
        >
            <div className="flex items-center gap-4 flex-1 cursor-pointer" onClick={() => toggleTodo(todo.id)}>
                <div className={`btn-3d w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${todo.completed ? 'bg-zinc-200 border-zinc-200' : 'border-zinc-600 group-hover:border-zinc-400'}`}>
                    {todo.completed && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-zinc-900 icon-3d" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    )}
                </div>

                <div className="flex flex-col">
                    <span className={`text-lg font-medium transition-all duration-300 ${todo.completed ? 'line-through text-zinc-600' : 'text-zinc-100'}`}>
                        {todo.text}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                        {todo.category && (
                            <span className="text-xs text-zinc-500 uppercase tracking-wider font-bold flex items-center gap-1">
                                {CATEGORY_ICONS[todo.category]} {todo.category}
                            </span>
                        )}
                        {todo.completed && todo.completed_at && (
                            <span className="text-xs text-zinc-600 flex items-center gap-1">
                                • 🕒 {new Date(todo.completed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <button
                onClick={() => deleteTodo(todo.id)}
                className="btn-3d p-2 text-zinc-600 hover:text-red-500 hover:bg-zinc-800 rounded-full transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Delete todo"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 icon-3d" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </motion.div>
    );
};

export default TodoItem;
