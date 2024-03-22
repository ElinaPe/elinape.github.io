// import { useState } from 'react';
// import { calculateFormula } from '../calculateFormula';
// import { InputValues, Results, Calculator } from '../types';

// const useCalculateResult = (validatedCalculators: Calculator[]) => {
//     const [results, setResults] = useState<Results>({});


//     const calculateResult = (currentInputValues: InputValues) => {
//         const newResults: Results = validatedCalculators.reduce((acc: Results, calculator: Calculator) => { //valitadetCalculators on zodvalidoitu lista laskureita, joista luodaan uusi Results -tyyppinen objekti, joka sisältää kaikkien laskureiden tulokset
//             const scope: Record<string, number> = {}; // scope-objekti, johon tallentuu string tyyppinen key ja arvo on numeerinen, aluksi tyhjä. Se säilyttää muuttujien (variable kentät laskurissa) arvoja, jotka välitetään calculateFormula-funktiolle
           
//             // const mergedArrays = [...(calculator.fields || []), ...(calculator.variables || [])];

//             calculator.fields?.forEach((field) => { 
//                 const value = currentInputValues[calculator.id]?.[field.variable]; //Value, yrittää hakea arvon currentInputValues-objektista käyttäen nykyisen laskurin otsikkoa ja muuttujan nimeä avaimina. (Käyttämällä ?, koodi varmistaa, että ei yritetä lukea field.variable-arvoa, jos currentInputValues[formula.title] on undefined. Ei tuu TypeError.
//                 if (value !== undefined) {
//                     scope[field.variable] = value; 

//                 } else {
//                     console.error(`Value for ${field.variable} in formula ${calculator.id} is undefined.`);
//                     scope[field.variable] = 0;
//                 }
//             });

//             // calculator.variables?.forEach(variable => {
//             //     scope[variable.variable] = variable.defaultValue;
//             //   });

//             try {
//                 const result = calculateFormula(calculator.formula, scope); //lähetetään formula ja tallennettu scope -objekti calculateFormulalle
//                 acc[calculator.id] = result;
//             } catch (error) {
//                 console.error(`Error calculating formula for ${calculator.id}:`, error);
//                 acc[calculator.id] = -1;
//             }

//             return acc; // acc on akkumulaattori, joka kerää yhteen kaikkien laskureiden tulokset.
//         }, {});

//         setResults(newResults); //newResults sisältää kaikkien validatedCalculators-taulukon laskureiden tulokset objektina, jossa jokaisen laskurin nimi (calculator.title) toimii avaimena ja laskurin tulos arvona.
//     };

//     return { results, calculateResult }; //lisää tänne vielä valid/errormessage
// };

// export default useCalculateResult;
  