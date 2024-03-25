import React, { useEffect, useState } from 'react';
import { Calculator, Field, InputValues } from '../types';
import CustomInput from './Input';
// import calculateResult from '../hooks/calculateResult';
import { parser } from "mathjs"

interface CalculatorProps {
    calculator: Calculator;
    // handleInputChange: (formulaName: string, variable: string, value: string | number) => void;
    // result: number | string;
    onCalculatorChange: (calculatorId: string, result: number | string) => void;
    cssClasses?: string[]
}

const Laskuri: React.FC<CalculatorProps> = ({ calculator, onCalculatorChange }) => {
    // const [result, setResult] = useState(0)
    const [result, setResult] = useState({value: 0, name: '', unit: ''});

    const { id } = calculator

  // field names and default values
  const [fields, setFields] = useState(calculator.fields)

  // calculate the result

  useEffect(() => {
    const p = parser();
    fields?.forEach(field => {
      p.set(field.variable, field.defaultValue);
    });
    
    try {
      const value = p.evaluate(calculator.formula);
      setResult(prev => ({...prev, value})); // Päivitä vain value, säilytä muut tiedot
    } catch (error) {
      console.error('Kaavan arviointivirhe:', error);
    }
  }, [fields, calculator.formula]);
  
  useEffect(() => {
    onCalculatorChange(id, result.value)
  }, [result])

//   const handleInputChange = (variable: string, value: string | number) => {
//     const parsedValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
//     const inputValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
   
const handleFieldChange = (variable: string, value: string) => {
    const parsedValue = parseFloat(value) || 0; // Muunna arvo numeroksi
    setFields((prevFields) =>
        prevFields?.map((field) =>
            field.variable === variable ? { ...field, defaultValue: parsedValue } : field
        )
    );
};


    // const handleInputChange = (calculatorId: string, variable: string, value: string | number) => {
    //     const inputValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
    //     updateInputValues(calculatorId, variable, inputValue);
    // };

    // const updateInputValues = (calculatorId: string, variable: string, inputValue: number) => {
    //     setInputValues((prev) => {
    //         const newInputValues = {
    //             ...prev,
    //             [calculatorId]: {
    //                 ...prev[calculatorId],
    //                 [variable]: inputValue,
    //             },
    //         };

    //         calculateResult(newInputValues);
    //         return newInputValues;
    //     });
    
    const hasResult = result.toString() !== "Ei tulosta";

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
                {/* <p>{calculator.result.name}: {result}</p> se onkin tossa alempana */}
            </div>
            {hasResult ? (<p className='calculatorResult'>{calculator.result.name}: {parseInt(result.value.toString())} {calculator.result.unit} </p>)
            : (<p className='calculatorResult'>{calculator.result.name}: {result.value} </p>)}
        </div>
    );
};
export default Laskuri;