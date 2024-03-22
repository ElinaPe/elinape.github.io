import React, { useEffect, useState } from 'react';
import { Calculator, Field } from '../types';
import CustomInput from './Input';
// import calculateResult from '../hooks/calculateResult';
import { parser } from "mathjs"

interface CalculatorProps {
    calculator: Calculator;
    // handleInputChange: (formulaName: string, variable: string, value: string | number) => void;
    onCalculatorChange: (calculatorId: string, result: number) => void;
    result: number | string;
    cssClasses?: string[]
}

const Laskuri: React.FC<CalculatorProps> = ({ calculator, onCalculatorChange }) => {
    // const [inputValues, setInputValues] = useState<InputValues>({});
    const [result, setResult] = useState(0)

    const { id } = calculator

  // field names and default values
  const [fields, setFields] = useState(calculator.fields)

  // calculate the result
  useEffect(() => {
    const p = parser()

    // create variables for the fields
    fields?.forEach(field => {
        // Aseta kunkin kentän arvo parserille. Käytä `field.variable` nimellä ja `field.currentValue` arvolla.
        p.set(field.variable, field.defaultValue);
    });

    try {
        // Arvioi kaava käyttäen parseria
        const res = p.evaluate(calculator.formula);
        setResult(res)
        // Tee jotain tuloksella, esim. päivitä komponentin tilaa
        console.log(res);
    } catch (error) {
        console.error('Kaavan arviointivirhe:', error);
    }
}, [fields, calculator.formula]); 

  useEffect(() => {
    onCalculatorChange(id, result)
  }, [result])
   
const handleFieldChange = (variable: string, value: string) => {
    const parsedValue = parseFloat(value) || 0; // Muunna arvo numeroksi
    setFields((prevFields) =>
        prevFields?.map((field) =>
            field.variable === variable ? { ...field, defaultValue: parsedValue } : field
        )
    );
};
    
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
            {hasResult ? (<p className='calculatorResult'>{calculator.result.name}: {parseInt(result.toString())} {calculator.result.ending} </p>)
            : (<p className='calculatorResult'>{calculator.result.name}: {result} </p>)}
        </div>
    );
};
export default Laskuri;