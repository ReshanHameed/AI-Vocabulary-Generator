import React, { useState, useEffect } from 'react';

const MESSAGES = [
    'Consulting the digital lexicon...',
    'Crafting your custom word list...',
    'Unearthing rare vocabulary...',
    'Polishing your new words...',
    'Just a moment, brilliance awaits...'
];

const LoadingSpinner: React.FC = () => {
    const [message, setMessage] = useState(MESSAGES[0]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setMessage(prevMessage => {
                const currentIndex = MESSAGES.indexOf(prevMessage);
                const nextIndex = (currentIndex + 1) % MESSAGES.length;
                return MESSAGES[nextIndex];
            });
        }, 2000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center text-center p-8 transition-opacity duration-300">
            <svg className="animate-spin h-12 w-12 text-indigo-500 mb-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-xl font-semibold text-slate-700 dark:text-slate-300">{message}</p>
        </div>
    );
};

export default LoadingSpinner;