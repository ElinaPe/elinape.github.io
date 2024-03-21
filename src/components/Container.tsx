import { useState } from 'react';
import yamlData from '../laskuri.yaml';
import { CalculatorsSchema, Calculator, InputValues, RootSchema, Results } from '../types';
import useCalculateResult from '../hooks/calculateResult';
import Laskuri from '../components/Calculator';
import TotalResults from './TotalComponent';
// import AdditionalInfo from '../components/CalculateTotal';

function CalculatorContainer() {
    const [inputValues, setInputValues] = useState<InputValues>({});

    const validatedData = RootSchema.parse(yamlData)
    // const validatedCalculators = CalculatorsSchema.parse(yamlData);
    const validatedContainer = validatedData.Container
    const validatedCalculators = validatedData.Laskurit;
    
    const { results, calculateResult } = useCalculateResult(validatedCalculators, inputValues);

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
        <h2>{validatedContainer.title}</h2>
        <div className='calculatorContent'>
            {validatedCalculators.map((calculator, index) => (
                <Laskuri
                    key={index}
                    calculator={calculator}
                    handleInputChange={handleInputChange}
                    result={results[calculator.title] || 'Ei tulosta'}
                    cssClasses={calculator.cssClasses}
                />
            ))}
        </div>
        <div className='calculatorResults'>
            <TotalResults 
            results={results}/>
        </div>
    </div>
    );
}

export default CalculatorContainer;