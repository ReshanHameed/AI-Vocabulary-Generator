export interface VocabularyWord {
  word: string;
  definition: string;
  example?: string;
}

export interface FormData {
    name: string;
    rollNo: string;
    vocabType: string;
    wordCount: number;
    includeExample: boolean;
}