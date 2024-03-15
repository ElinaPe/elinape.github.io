import { useState } from 'react';
import { calculateFormula } from '../calculateFormula';
import { InputValuesT, ResultsT, FormulaT } from '../types';

const useCalculateResult = (typedYamlData: FormulaT[]) => {
    const [results, setResults] = useState<ResultsT>({});

    const calculateResult = (currentInputValues: InputValuesT) => {
        const newResults: ResultsT = typedYamlData.reduce((acc: ResultsT, formula: FormulaT) => {
            const scope: Record<string, number> = {};

            formula.fields.forEach((field) => {
                const value = currentInputValues[formula.title]?.[field.muuttuja];
                if (value !== undefined) {
                    scope[field.muuttuja] = value;
                } else {
                    console.error(`Value for ${field.muuttuja} in formula ${formula.title} is undefined.`);
                    scope[field.muuttuja] = 0;
                }
            });

            try {
                const result = calculateFormula(formula.formula, scope);
                acc[formula.title] = result;
            } catch (error) {
                console.error(`Error calculating formula for ${formula.name}:`, error);
                acc[formula.title] = -1;
            }

            return acc;
        }, {});

        setResults(newResults);
    };

    return { results, calculateResult };
};

export default useCalculateResult;
  