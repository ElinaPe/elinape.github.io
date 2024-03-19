import React, { useState } from 'react';
import { Field, Calculator } from '../types';
import CustomInput from './Input';

interface LaskuriKomponenttiProps {
    calculator: Calculator;
    handleInputChange: (formulaName: string, variable: string, value: string | number) => void;
    result: number | string;
}

const Laskuri: React.FC<LaskuriKomponenttiProps> = ({ calculator, handleInputChange, result }) => {

    const [totals, setTotals] = useState({
        kuljetettavatLapset: null,
        henkilot: null,
        yksiPeruutus: null
      });   
       
    const hasResult = result !== "Ei tulosta";

    return (
        <div className="oneCalculatorContainer">
            <h4>{calculator.title}</h4>
            <div className='inputFields'>
                {calculator.fields.map((field: Field, index: number) => (
                    <CustomInput
                        key={index}
                        field={field}
                        onChange={(variable, value) => handleInputChange(calculator.title, variable, value)}
                    />
                ))}
            </div>
            {hasResult ? (<p className='calculatorResult'>{calculator.result.name}: {parseInt(result.toString())} {calculator.result.ending} </p>)
            : (<p className='calculatorResult'>{calculator.result.name}: {result} </p>)}
        </div>
    );
};

export default Laskuri;