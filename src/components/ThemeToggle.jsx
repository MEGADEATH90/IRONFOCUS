import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
    const [isLight, setIsLight] = useState(() => {
        // Initialize from localStorage or default to dark
        const stored = localStorage.getItem('theme');
        return stored === 'light';
    });

    useEffect(() => {
        const root = document.documentElement;
        if (isLight) {
            root.classList.add('light');
            localStorage.setItem('theme', 'light');
        } else {
            root.classList.remove('light');
            localStorage.setItem('theme', 'dark');
        }
    }, [isLight]);

    return (
        <button
            onClick={() => setIsLight(!isLight)}
            className="btn-3d p-2 rounded-full bg-zinc-800/50 hover:bg-zinc-700/70 transition-colors"
            aria-label="Toggle theme"
        >
            {isLight ? (
                // Moon icon for switching to dark mode
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-700 icon-3d" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293a8 8 0 01-11.586-11.586 8.001 8.001 0 0011.586 11.586z" />
                </svg>
            ) : (
                // Sun icon for switching to light mode
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 icon-3d" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 5a1 1 0 011 1v1a1 1 0 11-2 0V6a1 1 0 011-1zm0 8a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm5-3a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zm-8 0a1 1 0 01-1 1H5a1 1 0 110-2h1a1 1 0 011 1zm3.657-4.657a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zm-4.95 4.95a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zm4.95 4.95a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zm-4.95-4.95a1 1 0 010-1.414l.707-.707a1 1 0 111.414 1.414l-.707.707a1 1 0 01-1.414 0z" />
                </svg>
            )}
        </button>
    );
};

export default ThemeToggle;
