import React, { useState } from 'react';
import { e, parse } from 'mathjs';
import yamlData from './laskuri.yaml';
import { configSchema } from './types';
import { load } from 'yaml';

const CalculateStudents = () => {
    const [inputValues, setInputValues] = useState<InputValues>({});
    const [results, setResults] = useState<Results>({});

    const yamlData = configSchema;
    console.log(yamlData);




    // // Oletetaan, että käsittelemme vain ensimmäistä kohtaa YAML-tiedostosta.
    // const firstFormula: Formula = yamlData[0] as Formula;

    // const handleInputChange = (
    //     e: React.ChangeEvent<HTMLInputElement>,
    //     formulaName: string,
    //     variable: string
    // ) => {
    //     const inputValue = e.target.value;
    //     const newValue = inputValue === '' ? 0 : parseFloat(inputValue);

    //     setInputValues((prev) => {
    //         const newInputValues: InputValues = {
    //             ...prev,
    //             [formulaName]: {
    //                 ...prev[formulaName],
    //                 [variable]: newValue,
    //             },
    //         };

    //         calculateResult(newInputValues);

    //         return newInputValues;
    //     });
    // };

    // const calculateResult = (currentInputValues: InputValues) => {
    //     // Käytetään vain ensimmäistä kaavaa, ei koko listaa
    //     const expression = parse(firstFormula.formula);
    //     const scope: Record<string, number> = {};

    //     firstFormula.fields.forEach((field: Field) => {
    //         const value = currentInputValues[firstFormula.name]?.[field.name];
    //         if (value !== undefined) {
    //             scope[field.name] = value;
    //         } else {
    //             console.error(`Value for ${field.name} in formula ${firstFormula.name} is undefined.`);
    //             scope[field.name] = 0;
    //         }
    //     });

    //     const result = expression.evaluate(scope);
    //     if (typeof result !== 'number') {
    //         throw new Error('Expected number result from expression evaluation');
    //     }
    //     setResults({ [firstFormula.name]: result });
    // };

    return (<></>
        // <div className="calculate_container">
        //     <div className="calculatejuttu">
        //         <h2>{firstFormula.name}</h2>
        //         {firstFormula.fields.map((field: Field, fieldIndex: number) => (
        //             <input
        //                 className="calculatebox"
        //                 key={fieldIndex}
        //                 name={field.name}
        //                 onChange={(e) => handleInputChange(e, firstFormula.name, field.name)}
        //                 type="number"
        //             />
        //         ))}
        //         <p>Tulos: {results[firstFormula.name]}</p>
        //     </div>
        // </div>
    );
}

export default CalculateStudents;