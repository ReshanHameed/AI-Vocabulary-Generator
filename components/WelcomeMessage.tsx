
import React from 'react';

const WelcomeMessage: React.FC = () => {
    return (
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Welcome to VocabGenius!</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
                Unlock the power of words. Enter any topic above to generate a curated list of vocabulary words, complete with definitions and examples.
            </p>
            <p className="text-gray-500 dark:text-gray-400">
                Perfect for students, writers, and curious minds looking to expand their lexicon.
            </p>
        </div>
    );
};

export default WelcomeMessage;
