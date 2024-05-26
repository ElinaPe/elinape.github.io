import React, { ReactNode, createContext, useContext, useState } from 'react';
import { Calculator, GlobalData } from '../types';

interface AuthInfo {
  username: string | null;
  loginId: number | null;
}

interface CalculatorContextType {
  globalData: GlobalData;
  updateCalculatorData: (section: string, calculatorData: Calculator[]) => void;
  authInfo: AuthInfo;
  setAuthInfo: (authInfo: AuthInfo) => void;
}

const defaultContextValue: CalculatorContextType = {
  globalData: {
    Landing: [],
    DailyWork: [],
    PlanningWork: [],
    TransportCosts: [],
  },
  updateCalculatorData: () => {},  // eslint-disable-line @typescript-eslint/no-empty-function
  authInfo: {
    username: null,
    loginId: null,
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAuthInfo: () => {},
};

export const CalculatorContext = createContext<CalculatorContextType>(defaultContextValue);

export const CalculatorProvider = ({ children }: { children: ReactNode }) => {
  const [globalData, setGlobalData] = useState<GlobalData>({
    Landing: [],
    DailyWork: [],
    PlanningWork: [],
    TransportCosts: [],
  });

  const [authInfo, setAuthInfo] = useState<AuthInfo>({ username: null, loginId: null });

  const updateCalculatorData = (section: string, calculators: Calculator[]) => {
    setGlobalData(prev => ({
      ...prev,
      [section]: calculators
    }));
  };

  return (
    <CalculatorContext.Provider value={{ globalData, updateCalculatorData, authInfo, setAuthInfo }}>
      {children}
    </CalculatorContext.Provider>
  );
};
