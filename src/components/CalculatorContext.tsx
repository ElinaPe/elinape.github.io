import React, { ReactNode, createContext, useContext, useState } from 'react';
import { Calculator, GlobalData } from '../types';

// Määritellään AuthInfo-rajapinta käyttäjän kirjautumistietoja varten
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

// Määritellään kontekstin oletusarvot
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

// Luodaan CalculatorContext, joka käyttää oletusarvoja
export const CalculatorContext = createContext<CalculatorContextType>(defaultContextValue);

// CalculatorProvider-komponentti tarjoaa kontekstin arvot lapsikomponenteille
export const CalculatorProvider = ({ children }: { children: ReactNode }) => {
   // Tilanhallinta globalData:lle ja authInfo:lle

  const [globalData, setGlobalData] = useState<GlobalData>({
    Landing: [],
    DailyWork: [],
    PlanningWork: [],
    TransportCosts: [],
  });

  const [authInfo, setAuthInfo] = useState<AuthInfo>({ username: null, loginId: null });

   // Funktio päivittää laskuridataa osion mukaan
  const updateCalculatorData = (section: string, calculators: Calculator[]) => {
    setGlobalData(prev => ({
      ...prev,
      [section]: calculators
    }));
  };

  // Palautetaan kontekstin Provider-komponentti, joka välittää arvot lapsikomponenteille
  return (
    <CalculatorContext.Provider value={{ globalData, updateCalculatorData, authInfo, setAuthInfo }}>
      {children}
    </CalculatorContext.Provider>
  );
};
