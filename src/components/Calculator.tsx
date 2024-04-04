import React, { useEffect, useState } from 'react';
import { Calculator, Field } from '../types';
import CustomInput from './Input';
import { parser } from "mathjs"
import CalculatorInfoModal from '../modals/calculatorInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
interface CalculatorProps {
    calculator: Calculator;
    // handleInputChange: (formulaName: string, variable: string, value: string | number) => void;
    // result: number | string;
    onCalculatorChange: (calculatorId: string, result: number) => void;
    cssClasses?: string[]
}

const Laskuri: React.FC<CalculatorProps> = ({ calculator, onCalculatorChange }) => {
  const [result, setResult] = useState({value: 0, name: '', unit: ''});
  const { id, variables } = calculator
  // field names and default values
  const [fields, setFields] = useState(calculator.fields)
  const [open, setOpen] = useState(false);


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

const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
    
    const hasResult = result.value !== 0;
    const resultValue = hasResult
    ? calculator.isInteger
    ? Math.round(result.value)
    : Number(result.value).toFixed(2)
  : 'Ei tulosta';

    return (
        <div className="oneCalculatorContainer">
            <h4>{calculator.title} <button className='btn' onClick={handleOpen}>
            <FontAwesomeIcon icon={faInfo} /></button></h4>

            <CalculatorInfoModal 
            isOpen={open} 
            handleClose={handleClose}            
            title={calculator.title}
            description={calculator.description}
            formula={calculator.formula}
            />

            <div className={calculator.cssClasses ? calculator.cssClasses.join(" ") : ""}>
                {calculator.fields?.map((field: Field) => (
                    <CustomInput
                        key={field.variable}
                        field={field}
                        onChange={(variable, value) => handleFieldChange(variable, value.toString())}
                    />
                ))}
            </div>
            {hasResult ? (<p className='calculatorResult'>{calculator.result.name}: {resultValue} {calculator.result.unit} </p>)
            : (<p className='calculatorResult'>{calculator.result.name}:</p>)}
        </div>
    );
};
export default Laskuri;