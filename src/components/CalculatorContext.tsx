import React, { createContext, useContext, useState } from 'react';

interface EndResult {
  name: string;
  value: number | null;
}

interface CalculatorContextType {
  endResults: EndResult[];
  setEndResults: (results: EndResult[]) => void;
  updateEndResult: (name: string, value: number | null) => void;
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

export const useCalculatorContext = () => {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error("useCalculatorContext must be used within a CalculatorProvider");
  }
  return context;
};

export const CalculatorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [endResults, setEndResults] = useState<EndResult[]>([]);

  const updateEndResult = (name: string, value: number | null) => {
    setEndResults(prev => {
      const index = prev.findIndex(result => result.name === name);
      if (index !== -1) {
        const newResults = [...prev];
        newResults[index] = { name, value };
        return newResults;
      }
      return [...prev, { name, value }];
    });
  };

  return (
    <CalculatorContext.Provider value={{ endResults, setEndResults, updateEndResult }}>
      {children}
    </CalculatorContext.Provider>
  );
};