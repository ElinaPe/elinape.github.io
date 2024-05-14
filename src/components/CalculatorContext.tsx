import React, { ReactNode, createContext, useContext, useState } from 'react';
import { Calculator } from '../types';


interface GlobalData {
  [key: string]: Calculator[];
}


interface CalculatorContextType {
  globalData: GlobalData;
  updateCalculatorData: (section: string, calculatorData: Calculator[]) => void;
}

const defaultContextValue: CalculatorContextType = {
  globalData: {
    Landing: [],
    DailyWork: [],
    PlanningWork: [],
    TransportCosts: [],
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateCalculatorData: () => {}  
};

export const CalculatorContext = createContext<CalculatorContextType>(defaultContextValue);

export const CalculatorProvider = ({ children }: { children: ReactNode }) => {
  const [globalData, setGlobalData] = useState({
    Landing: [],
    DailyWork: [],
    PlanningWork: [],
    TransportCosts: [],
  });

  const updateCalculatorData = (section: string, calculators: Calculator[]) => {
    setGlobalData(prev => ({
      ...prev,
      [section]: calculators
    }));
};
  console.log('globaldata', globalData);

  return (
    <CalculatorContext.Provider value={{ globalData, updateCalculatorData }}>
      {children}
    </CalculatorContext.Provider>
  );
};