import { useEffect, useState } from 'react';
import yamlData from '../laskuri.yaml';
import { RootSchema, Results, Calculator } from '../types';
import Laskuri from '../components/Calculator';
import { parser } from 'mathjs';
// import TotalResults from './TotalComponent';
// import AdditionalInfo from '../components/CalculateTotal';

function CalculatorContainer() {
    const validatedData = RootSchema.parse(yamlData)
    // const validatedCalculators = CalculatorsSchema.parse(yamlData);
    const validatedContainer = validatedData.Container
    const validatedCalculators = validatedData.Laskurit;
    
    const [calculators, setCalculators] = useState(validatedCalculators.map(calculator => ({
        ...calculator,
        result: 0, 
      })));

      const handleCalculatorChange = (calculatorId: string, result: number) => {
        setCalculators((prevCalculators) =>
        prevCalculators.map((calculator) =>
        calculator.id === calculatorId ? { ...calculator, result } : calculator
        )
      )
    };
    
    const calculateTotalResults = (calculator: Calculator, calculators: Calculator[]) => {
        const p = parser();
        calculator.variables?.forEach(varDependency => {
            const dependentCalculator = calculators.find(c => c.id === varDependency.variable);
            if (dependentCalculator) {
                p.set(varDependency.variable, dependentCalculator.result);
            }
        });
        try {
            return p.evaluate(calculator.formula);
        } catch (error) {
            console.error('Kaavan arviointivirhe:', error);
            return 0;
        }
    };


    // useEffect(() => {
    //     // Lasketaan "total" tyyppisten laskureiden tulokset ilman suoraa tilan päivitystä
    //     const totals = calculators.filter(calculator => calculator.type === "total").map(calculator => {
    //         return calculateTotalResults(calculator, calculators);
    //     });

    //     // Oletetaan, että sinulla on jokin logiikka käsittelemään näitä "totals"-arvoja
    //     console.log(totals);

    //     // Voit myös harkita tilan päivittämistä täällä, mutta varmista, että se ei aiheuta loputonta silmukkaa
    //     // Esimerkiksi, voit verrata, ovatko uudet "total" tulokset erilaiset kuin nykyiset ennen päivittämistä
    // }, [calculators]);
    useEffect(() => {
        let isUpdated = false;
        const updatedCalculators = calculators.map(calculator => {
          if (calculator.type === "total") {
            // Laske uusi tulos
            const newResult = calculateTotalResults(calculator, calculators);
            console.log(newResult)

            // Vertaa, onko uusi tulos eri kuin nykyinen
            if (calculator.result !== newResult) {
              isUpdated = true; // Merkitään, että päivitys on tarpeellinen
              return { ...calculator, result: newResult };
            }
          }
          return calculator;
        });
      
        // Päivitä tila vain, jos päivitys on tarpeellinen
        if (isUpdated) {
          setCalculators(updatedCalculators);
        }
      }, [calculators]); 


    return (
    <div className='calculatorContainer'>
        <h2>{validatedContainer.title}</h2>
        <div className='calculatorContent'>
            {validatedCalculators.map((calculator) => (
                <Laskuri
                    key={calculator.id}
                    calculator={calculator}
                    // result={results[calculator.id] || 'Ei tulosta'} ei täällä resultsia vaan yhteenveto
                    onCalculatorChange={handleCalculatorChange} 
                    result={''}                    // cssClasses={calculator.cssClasses}
                />
            ))}
        </div>
        <div>
        {calculators.map((calculator, index) => (
            <div key={index}>
            {`Laskuri ${calculator.id}: ${calculator.result}`}
            </div>
        ))}
        <div>
            {`Yhteensä: ${calculators.reduce((acc, { result }) => acc + result, 0)}`}
        </div>
        </div>        {/* <div className='calculatorResults'>
            <p>Ekatulos: </p>
        </div> */}
    </div>
    );
}

export default CalculatorContainer;