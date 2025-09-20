import React, { useState } from 'react';
import { FormData } from '../types';

interface GeneratorFormProps {
    onSubmit: (formData: FormData) => void;
    isLoading: boolean;
    initialData: FormData | null;
}

const VOCAB_TYPES = ["Sweet & soft", "Dark Traits", "Professional", "Technical & sci-fi"];
const WORD_COUNTS = [3, 4, 5, 6, 7, 8];

const GeneratorForm: React.FC<GeneratorFormProps> = ({ onSubmit, isLoading, initialData }) => {
    const [name, setName] = useState(initialData?.name || '');
    const [rollNo, setRollNo] = useState(initialData?.rollNo || '');
    const [vocabType, setVocabType] = useState(initialData?.vocabType || VOCAB_TYPES[0]);
    const [wordCount, setWordCount] = useState(initialData?.wordCount || 3);
    const [includeExample, setIncludeExample] = useState(initialData?.includeExample ?? true);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit({ name, rollNo, vocabType, wordCount: Number(wordCount), includeExample });
    };

    const isFormValid = name.trim() && rollNo.trim();

    return (
        <div className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-2xl shadow-slate-200/50 dark:shadow-black/50 transition-all">
            <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-8">Create Your Vocabulary List</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Name</label>
                        <div className="relative">
                             <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                                 <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                               </svg>
                            </div>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 dark:text-slate-100 transition"
                                required
                            />
                        </div>
                    </div>
                     <div>
                        <label htmlFor="rollNo" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Roll No</label>
                        <div className="relative">
                             <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 011-1h2a1 1 0 110 2H8a1 1 0 01-1-1zm-1 4a1 1 0 100 2h6a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="rollNo"
                                value={rollNo}
                                onChange={(e) => setRollNo(e.target.value)}
                                placeholder="Enter your roll number"
                                className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 dark:text-slate-100 transition"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="vocabType" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Vocabulary Type</label>
                        <select
                            id="vocabType"
                            value={vocabType}
                            onChange={(e) => setVocabType(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 dark:text-slate-100"
                        >
                            {VOCAB_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="wordCount" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Number of vocabulary words</label>
                        <select
                            id="wordCount"
                            value={wordCount}
                            onChange={(e) => setWordCount(parseInt(e.target.value))}
                            className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 dark:text-slate-100"
                        >
                            {WORD_COUNTS.map(count => <option key={count} value={count}>{count}</option>)}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Include Example?</label>
                    <label htmlFor="example-toggle" className="flex items-center cursor-pointer">
                        <div className="relative">
                            <input id="example-toggle" type="checkbox" className="sr-only" checked={includeExample} onChange={() => setIncludeExample(!includeExample)} />
                            <div className="block bg-slate-200 dark:bg-slate-600 w-14 h-8 rounded-full"></div>
                            <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform"></div>
                        </div>
                        <div className="ml-3 text-slate-700 dark:text-slate-300 font-medium">
                            {includeExample ? "Yes" : "No"}
                        </div>
                    </label>
                    <style>{`
                        input:checked ~ .dot {
                            transform: translateX(100%);
                            background-color: #4f46e5;
                        }
                         input:checked ~ .block {
                            background-color: #c7d2fe;
                         }
                         .dark input:checked ~ .block {
                            background-color: #3730a3;
                         }
                    `}</style>
                </div>

                <button
                    type="submit"
                    disabled={isLoading || !isFormValid}
                    className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 dark:disabled:bg-indigo-800 dark:disabled:text-slate-400 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 disabled:cursor-not-allowed disabled:scale-100 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40"
                >
                    Generate Vocabulary
                </button>
            </form>
        </div>
    );
};

export default GeneratorForm;