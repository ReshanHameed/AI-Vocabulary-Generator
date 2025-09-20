import React, { useEffect, useState } from 'react';
import { VocabularyWord } from '../types';

interface VocabularyListProps {
    name: string;
    rollNo: string;
    vocabulary: VocabularyWord[];
    onReset: () => void;
}

const VocabularyList: React.FC<VocabularyListProps> = ({ name, rollNo, vocabulary, onReset }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
    }, []);

    const handleShare = () => {
        let message = `*Name :* ${name}\n*Roll No :* ${rollNo}\n\n*Vocabulary Words*\n\n`;
        vocabulary.forEach(item => {
            if (item.word && item.definition) {
                 message += `▪️ *${item.word}* : ${item.definition}\n`;
                 if (item.example) {
                    message += `  _e.g. "${item.example}"_\n\n`;
                 } else {
                    message += `\n`;
                 }
            }
        });

        const encodedMessage = encodeURIComponent(message.trim());
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <div 
            className={`w-full max-w-3xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-2xl shadow-slate-200/50 dark:shadow-black/50 transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
        >
            <div className="text-left mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
                <p className="text-lg text-slate-800 dark:text-slate-200"><span className="font-semibold">Name :</span> {name}</p>
                <p className="text-lg text-slate-800 dark:text-slate-200"><span className="font-semibold">Roll No :</span> {rollNo}</p>
            </div>

            <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-8">
                Your Vocabulary List
            </h2>

            <div className="space-y-6">
                {vocabulary.map((item, index) => (
                    <div 
                        key={index}
                        className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-lg border-l-4 border-indigo-500 transition-all duration-300 hover:shadow-lg hover:border-indigo-600"
                        style={{ transitionDelay: `${index * 100}ms`}}
                    >
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 capitalize">{item.word}</h3>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{item.definition}</p>
                        {item.example && (
                            <p className="text-slate-500 dark:text-slate-400 italic mt-4 pt-3 border-t border-slate-200 dark:border-slate-700">
                                "{item.example}"
                            </p>
                        )}
                    </div>
                ))}
            </div>
            
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                    onClick={onReset}
                    className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40"
                >
                    Generate Another
                </button>
                <button
                    onClick={handleShare}
                    className="w-full sm:w-auto flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M1.161,21.524l2.293-8.021L1.161,5.482l1.92-1.28a1,1,0,0,1,1.256.042l3.414,3.414a.5.5,0,0,0,.707,0l1.414-1.414a.5.5,0,0,0,0-.707L6.457,2.121a1,1,0,0,1,0-1.414L7.871.293A1,1,0,0,1,8.578,0h2.844a1,1,0,0,1,.707.293l1.414,1.414a.5.5,0,0,0,.707,0l1.414-1.414a.5.5,0,0,0,0-.707L12.25,2.028A1,1,0,0,1,12.25.614l.707-.707A1,1,0,0,1,13.664,0h2.844a1,1,0,0,1,.707.293l2.293,2.293a1,1,0,0,1,0,1.414l-3.414,3.414a.5.5,0,0,0,0,.707l1.414,1.414a.5.5,0,0,0,.707,0l3.414-3.414a1,1,0,0,1,1.256-.042l1.92,1.28-2.293,8.021,2.293,8.021-1.92,1.28a1,1,0,0,1-1.256-.042l-3.414-3.414a.5.5,0,0,0-.707,0l-1.414,1.414a.5.5,0,0,0,0,.707l3.414,3.414a1,1,0,0,1,0,1.414l-2.293,2.293a1,1,0,0,1-1.414,0l-.707-.707a1,1,0,0,1-.614-1.25l2.028-3.414a.5.5,0,0,0-.707-.707l-1.414,1.414a.5.5,0,0,0,0,.707l1.414,1.414a1,1,0,0,1,.293.707v2.844a1,1,0,0,1-.293.707l-2.293,2.293a1,1,0,0,1-1.414,0l-3.414-3.414a.5.5,0,0,0-.707,0L8.6,22.879a.5.5,0,0,0,0,.707l3.414,3.414a1,1,0,0,1,.042,1.256l-1.28,1.92-8.021-2.293Z"/></svg>
                    Share on WhatsApp
                </button>
            </div>
        </div>
    );
};

export default VocabularyList;