'use client';

import type { AnalyzeFileAndSuggestFixesOutput } from '@/ai/flows/analyze-file-and-suggest-fixes';
import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

type AppContextType = {
  xmlContent: string | null;
  txtContent: string | null;
  analysisResult: AnalyzeFileAndSuggestFixesOutput | null;
  setFiles: (xmlFile: File, txtFile: File) => Promise<void>;
  setAnalysisResult: (result: AnalyzeFileAndSuggestFixesOutput | null) => void;
  clearState: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [xmlContent, setXmlContent] = useState<string | null>(null);
  const [txtContent, setTxtContent] = useState<string | null>(null);
  const [analysisResult, setAnalysisResultState] = useState<AnalyzeFileAndSuggestFixesOutput | null>(null);

  const setFiles = useCallback(async (xmlFile: File, txtFile: File) => {
    const [xml, txt] = await Promise.all([readFileAsText(xmlFile), readFileAsText(txtFile)]);
    setXmlContent(xml);
    setTxtContent(txt);
    setAnalysisResultState(null); // Clear previous analysis results
  }, []);

  const setAnalysisResult = useCallback((result: AnalyzeFileAndSuggestFixesOutput | null) => {
    setAnalysisResultState(result);
  }, []);

  const clearState = useCallback(() => {
    setXmlContent(null);
    setTxtContent(null);
    setAnalysisResultState(null);
  }, []);

  return (
    <AppContext.Provider
      value={{
        xmlContent,
        txtContent,
        analysisResult,
        setFiles,
        setAnalysisResult,
        clearState
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
