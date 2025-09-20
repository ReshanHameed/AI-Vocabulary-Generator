
import React from 'react';

interface SearchFormProps {
    topic: string;
    setTopic: (topic: string) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
}

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const SearchForm: React.FC<SearchFormProps> = ({ topic, setTopic, onSubmit, isLoading }) => {
    return (
        <form onSubmit={onSubmit} className="w-full max-w-2xl mx-auto">
            <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full shadow-md overflow-hidden p-2">
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter a topic (e.g., 'astronomy', 'renaissance art')..."
                    className="w-full bg-transparent border-none focus:ring-0 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 px-4 py-2 text-lg"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={isLoading || !topic.trim()}
                    className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 dark:disabled:bg-indigo-800 dark:disabled:text-gray-400 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 disabled:cursor-not-allowed disabled:scale-100"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating...
                        </>
                    ) : (
                        <>
                            <SearchIcon />
                            Generate
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default SearchForm;
