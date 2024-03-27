import React, { useEffect, useState } from 'react';
import { Calculator, Field } from '../types';
import CustomInput from './Input';
import Tex2SVG from "react-hook-mathjax"
import { parser } from "mathjs"

interface CalculatorProps {
    calculator: Calculator;
    // handleInputChange: (formulaName: string, variable: string, value: string | number) => void;
    // result: number | string;
    onCalculatorChange: (calculatorId: string, result: number) => void;
    cssClasses?: string[]
}

const Laskuri: React.FC<CalculatorProps> = ({ calculator, onCalculatorChange }) => {
    // const [result, setResult] = useState(0)
  const [result, setResult] = useState({value: 0, name: '', unit: ''});
  const { id, variables } = calculator
  // field names and default values
  const [fields, setFields] = useState(calculator.fields)

  // calculate the result

  useEffect(() => {
    const p = parser();
    fields?.forEach(field => {
      p.set(field.variable, field.defaultValue);
    });
    variables?.forEach(variable => {
      p.set(variable.name, variable.value);
    });

    try {
      const value = p.evaluate(calculator.formula);
      setResult(prev => {
        if (prev.value !== value) {
          return {...prev, value};
        }
        return prev;
      });
    } catch (error) {
      console.error('Kaavan arviointivirhe:', error);
    }
  }, [fields, calculator.formula, variables]);
  
  useEffect(() => {
    onCalculatorChange(id, result.value)
  }, [result])


const handleFieldChange = (variable: string, value: string) => {
    const parsedValue = parseFloat(value) || 0; 
    setFields((prevFields) =>
        prevFields?.map((field) =>
            field.variable === variable ? { ...field, defaultValue: parsedValue } : field
        )
    );
};

    
    const hasResult = result.value !== 0;
    const resultValue = hasResult
    ? calculator.isInteger
    ? Math.round(result.value)
    : Number(result.value).toFixed(2)
  : 'Ei tulosta';

    return (
        <div className="oneCalculatorContainer">
            <h4>{calculator.title}</h4>
            {/* <div className={cssClasses ? cssClasses.join(" ") : ""}> */}
            <div>
                {calculator.fields?.map((field: Field) => (
                    <CustomInput
                        key={field.variable}
                        field={field}
                        onChange={(variable, value) => handleFieldChange(variable, value.toString())}
                    />
                ))}
            </div>
            <Tex2SVG display="inline" latex={calculator.formula} />
            {hasResult ? (<p className='calculatorResult'>{calculator.result.name}: {resultValue} {calculator.result.unit} </p>)
            : (<p className='calculatorResult'>{calculator.result.name}:</p>)}
        </div>
    );
};
export default Laskuri;