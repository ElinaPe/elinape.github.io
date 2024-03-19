import { useState } from 'react';
import yamlData from '../laskuri.yaml';
import { CalculatorsSchema, Calculator, InputValues, Results } from '../types';
import useCalculateResult from '../hooks/calculateResult';
import Laskuri from '../components/Calculator';
// import AdditionalInfo from '../components/CalculateTotal';

function CalculatorContainer() {
    const [inputValues, setInputValues] = useState<InputValues>({});
    const validatedCalculators = CalculatorsSchema.parse(yamlData);
    const { results, calculateResult } = useCalculateResult(validatedCalculators);

    const handleInputChange = (formulaName: string, variable: string, value: string | number) => {
        const inputValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
        updateInputValues(formulaName, variable, inputValue);
    };

    const updateInputValues = (formulaName: string, variable: string, inputValue: number) => {
        setInputValues((prev) => {
            const newInputValues = {
                ...prev,
                [formulaName]: {
                    ...prev[formulaName],
                    [variable]: inputValue,
                },
            };

            calculateResult(newInputValues);
            return newInputValues;
        });
    };

    return (
    <div className='calculatorContainer'>
        <div className='calculatorContent'>
            {validatedCalculators.map((calculator: Calculator, index: number) => (
                <Laskuri
                    key={index}
                    calculator={calculator}
                    handleInputChange={handleInputChange}
                    result={results[calculator.title] || 'Ei tulosta'}
                />
            ))}
        </div>
        <div className='calculatorResults'>
            
        </div>
    </div>
    );
}

export default CalculatorContainer;