// import { useEffect, useState } from "react";
// import { Calculator, InputValues, Variables } from "../types"; // Oleta, että nämä tyypit on määritelty
// import { calculateFormula } from "../calculateFormula";

// // Päivitetty useCalculator hook, joka ottaa huomioon sekä kentät että muuttujat
// const useCalculator = (calculator: Calculator, inputValues: InputValues) => {
//     const [result, setResult] = useState<number>(0);

//     useEffect(() => {
//         const variablesFromCalculator = calculator.variables?.reduce((acc, variable) => {
//             acc[variable.variable] = parseFloat(variable.value);
//             return acc;
//         }, {} as Record<string, number>);

//         // // Varmista, että inputValues sisältää vain numeroita
//         const safeInputValues: Record<string, number> = Object.keys(inputValues).reduce((acc, key) => {
//             const value = inputValues[key];
//             // Oletetaan, että kaikki arvot ovat numeroita tai merkkijonoja, jotka voidaan muuntaa numeroiksi
//             acc[key] = typeof value === 'number' ? value : parseFloat(value);
//             return acc;
//         }, {} as Record<string, number>);

//         // Yhdistetään inputValues ja variablesFromCalculator
//         const variableValues = { ...safeInputValues, ...variablesFromCalculator };
    
//         // Suoritetaan kaava
//         setResult(calculateFormula(calculator.formula, variableValues));
//     }, [calculator, inputValues]);

//     return result;
// };