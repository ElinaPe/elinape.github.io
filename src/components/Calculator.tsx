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
    onCalculatorChange: (calculatorId: string, result: number|null) => void;
    cssClasses?: string[]
}

const Laskuri: React.FC<CalculatorProps> = ({ calculator, onCalculatorChange }) => {
  const [result, setResult] = useState({value: calculator.result.value, name: '', unit: ''});
  const { id, variables } = calculator
  // field names and default values
  const [fields, setFields] = useState(calculator.fields)
  const [open, setOpen] = useState(false);


  useEffect(() => {
    const p = parser();
    let allFieldsValid = true;

    fields?.forEach(field => {
        const value = field.defaultValue;
        if (isNaN(value)) { // Tarkistaa, että kaikki kentät ovat numeerisia
            allFieldsValid = false;
        } else {
            p.set(field.variable, value);
        }
    });
      variables?.forEach(variable => {
        const varValue = variable.value
        if (varValue === null || isNaN(varValue)) { // Tarkistaa, että kaikki kentät ovat numeerisia
          allFieldsValid = false;
        }else {
          p.set(variable.name, variable.value);
        }
      });

      if (allFieldsValid) {
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
            // setErrorMsg('Virhe')
        }
    } else {
        console.error('Kaikki kentät eivät ole kelvollisia.');
    }
}, [fields, calculator.formula, variables]);
  
  
  useEffect(() => {
    if(result.value != null)
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

const parseDuration = (durationMin: number) => {
  const m = Number(durationMin);
  const h = Math.floor(m / 60);
  const remainingMinutes = m % 60;
  const hDisplay = h === 0 ? "" : `${h}h `;
  const mDisplay = remainingMinutes === 0 ? "" : (remainingMinutes < 10 ? `${remainingMinutes}min` : `${remainingMinutes}min`);
  return hDisplay + mDisplay;
};


  const displayResult = () => {
    if (result.value !== null) 
    if (result.value !== 0) {
      if (calculator.isTime) {
        const totalMinutes = Math.round(result.value);
        return parseDuration(totalMinutes);
      } else if (calculator.isInteger) {
        return Math.round(result.value).toString();
      } else {
        return Number(result.value).toFixed(2);
      }
    }
    return 'Ei tulosta';
  };
  const resultValue = displayResult();


    return (
        <div className="oneCalculatorContainer">
            <h5>{calculator.title} <button className='btn' onClick={handleOpen}>
            <FontAwesomeIcon icon={faInfo} /></button></h5>

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
            <div>
              <p className='calculatorResult'>{calculator.result.name}: {resultValue} {calculator.result.unit} </p>
           </div>
        </div>
    );
};
export default Laskuri;