
import React from 'react';
import { VocabularyWord } from '../types';

interface VocabularyCardProps {
    item: VocabularyWord;
}

const VocabularyCard: React.FC<VocabularyCardProps> = ({ item }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 border-indigo-500 dark:border-indigo-400 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 capitalize">{item.word}</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{item.definition}</p>
            <p className="text-gray-600 dark:text-gray-400 italic bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                "{item.example}"
            </p>
        </div>
    );
};

export default VocabularyCard;
