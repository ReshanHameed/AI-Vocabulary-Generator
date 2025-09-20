import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import GeneratorForm from './components/GeneratorForm';
import VocabularyList from './components/VocabularyList';
import ErrorMessage from './components/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner';
import { generateVocabulary } from './services/geminiService';
import { VocabularyWord, FormData } from './types';

const App: React.FC = () => {
    const [formData, setFormData] = useState<FormData | null>(null);
    const [vocabulary, setVocabulary] = useState<VocabularyWord[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [generatedWordsHistory, setGeneratedWordsHistory] = useState<string[]>([]);

    const handleGenerate = useCallback(async (data: FormData) => {
        setIsLoading(true);
        setError(null);
        setVocabulary([]);
        setFormData(data);

        try {
            const words = await generateVocabulary({
                vocabType: data.vocabType,
                wordCount: data.wordCount,
                includeExample: data.includeExample,
                previouslyGeneratedWords: generatedWordsHistory,
            });
            setVocabulary(words);
            const newWords = words.map(w => w.word.toLowerCase());
            setGeneratedWordsHistory(prev => [...new Set([...prev, ...newWords])]);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    }, [generatedWordsHistory]);

    const handleReset = () => {
        setVocabulary([]);
        setError(null);
    };

    return (
        <div className="min-h-screen text-slate-800 dark:text-slate-200 flex flex-col">
            <Header />
            <main className="container mx-auto p-4 md:p-8 flex-grow">
                {error && <div className="mb-6 max-w-3xl mx-auto"><ErrorMessage message={error} /></div>}
                
                {isLoading ? (
                    <LoadingSpinner />
                ) : vocabulary.length > 0 && formData ? (
                    <VocabularyList 
                        name={formData.name}
                        rollNo={formData.rollNo}
                        vocabulary={vocabulary}
                        onReset={handleReset}
                    />
                ) : (
                    <GeneratorForm 
                        onSubmit={handleGenerate} 
                        isLoading={isLoading}
                        initialData={formData} 
                    />
                )}
            </main>
             <footer className="text-center py-6 text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800">
                <p>Powered by Google Gemini</p>
            </footer>
        </div>
    );
};

export default App;