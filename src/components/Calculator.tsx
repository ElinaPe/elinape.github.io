import React, { useEffect, useState } from 'react';
import { Calculator, Field } from '../types'; // Tuo tarvittavat tyypit
import CustomInput from './Input'; // Tuo räätälöity syötekenttäkomponentti
import { parser } from "mathjs"; // Tuo matemaattisten lausekkeiden jäsentäjä
import CalculatorInfoModal from '../modals/calculatorInfo'; // Tuo modaalikomponentti, joka näyttää laskurin tiedot
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/free-solid-svg-icons';

// Props-tyyppimäärittely
interface CalculatorProps {
    calculator: Calculator;
    onCalculatorChange: (calculatorId: string, result: number|null) => void; // Funktio, joka kutsutaan, kun laskurin tulos muuttuu
    cssClasses?: string[]
}

const Laskuri: React.FC<CalculatorProps> = ({ calculator, onCalculatorChange }) => {
  // Laskurin tuloksen tila
  const [result, setResult] = useState({value: calculator.result.value, name: '', unit: ''});
  const { id, variables } = calculator;
  // Kenttien tila
  const [fields, setFields] = useState(calculator.fields);
  // Modaalin tila
  const [open, setOpen] = useState(false); 

  // Tuloksen laskeminen ja päivitys, kun laskuriin liittyvät kentät tai muuttujat muuttuvat
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
  }, [fields, variables, calculator.formula]);
  
  // Kutsutaan onCalculatorChange aina kun result muuttuu
  useEffect(() => {
    if(result.value != null)
    onCalculatorChange(id, result.value)
  }, [result])

// Käsittelee kentän arvon muutoksen ja päivittää kentät
const handleFieldChange = (variable: string, value: string) => {
    const parsedValue = parseFloat(value) || 0; 
    setFields((prevFields) =>
        prevFields?.map((field) =>
            field.variable === variable ? { ...field, defaultValue: parsedValue } : field
        )
    );
};

const handleOpen = () => setOpen(true); // Avaa modaalikomponentin
const handleClose = () => setOpen(false); // Sulkee modaalikomponentin

// Muuttaa keston esitysmuotoa
const parseDuration = (durationMin: number) => {
  const m = Number(durationMin);
  const h = Math.floor(m / 60);
  const remainingMinutes = m % 60;
  const hDisplay = h === 0 ? "" : `${h}h `;
  const mDisplay = remainingMinutes === 0 ? "" : `${remainingMinutes}min`;
  return hDisplay + mDisplay;
};

// Näyttää laskurin tuloksen
  const displayResult = () => {
    if (result.value !== null) 
    if (result.value !== 0) {
      if (calculator.isTime) {
        return parseDuration(Math.round(result.value));
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
