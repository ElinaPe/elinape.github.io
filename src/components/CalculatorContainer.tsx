import { useEffect, useState } from 'react';
import yamlData from '../laskuri.yaml';
import { RootSchema } from '../types';
import Laskuri from '../components/Calculator';
import BarChartBar from './BarChart';

function CalculatorContainer() {
    const validatedData = RootSchema.parse(yamlData)
    const validatedContainer = validatedData.Container
    const validatedCalculators = validatedData.Laskurit;
    const validatedDiagrams = validatedData.Pylvasdiagrammit;

    const [endResults, setEndResults] = useState<{ name: string; value: number }[]>([])
    const [calculators, setCalculators] = useState(validatedCalculators.map(calculator => ({
        ...calculator, variables:endResults
    })));

    const [diagrams, setDiagrams] = useState(validatedDiagrams)
    const [growthRate, setGrowthRate] = useState(0);


    // const handleGrowthRateChange = (event, newValue) => {
    //     setGrowthRate(newValue);
    //   };

    const handleCalculatorChange = (calculatorId: string, result: number) => {
        const newValue = typeof result === 'number' ? result : parseFloat(result);
        setCalculators(prevCalculators =>
            prevCalculators.map(calculator =>
                calculator.id === calculatorId ? { ...calculator, result: { ...calculator.result, value: newValue } } : calculator
            )
        );
        const newResults: {
            name: string
            value: number
        }[] = []
        for (const calculator of calculators){
            newResults.push({
                name: `result_${calculator.id}`,
                value: calculator.result.value,
            })
        }
        setEndResults(newResults)
        console.log('endresults: ', endResults)
        // const updatedDiagrams = validatedDiagrams.map(diagram => {
        //     const updatedBarDataKey = diagram.barDataKey.map(key => {
        //       if (key.id) { //noniin tsekataan onko id perhanan kenttiä (kaikilla ei oo)
        //         const correspondingResult = endResults.find(result => result.name === key.id); //jos se perhanan id arvo löytyy ja samalla nimellä löytyy endresult
        //         console.log('Löydetty vastaava tulos:', correspondingResult, 'päivitettävälle key:lle', key);
        //         return correspondingResult ? { ...key, value: correspondingResult.value } : key; //ni tallennetaan sille perhanan id:lle arvoksi sama arvo mikä endresultilla
        //       } else {
        //         // console.log('Ei tarvetta päivittää:', key);
        //         return key;
        //       }
        //     });

        //     return { ...diagram, barDataKey: updatedBarDataKey }; //tässä palautetaan päivitetty perhanan bardatakey
        //   });
        //   setDiagrams(updatedDiagrams);
        //   console.log('diagramilista containerista', updatedDiagrams) //ja täällähän näkyy päivitetyt arvot
    };
    useEffect(() => {
        const updatedDiagrams = validatedDiagrams.map(diagram => {
            const updatedBarDataKey = diagram.barDataKey.map(key => {
                if (key.id) { //noniin tsekataan onko id perhanan kenttiä (kaikilla ei oo)
                const correspondingResult = endResults.find(result => result.name === key.id); //jos se perhanan id arvo löytyy ja samalla nimellä löytyy endresult
                console.log('Löydetty vastaava tulos:', correspondingResult, 'päivitettävälle key:lle', key);
                return correspondingResult ? { ...key, value: correspondingResult.value } : key; //ni tallennetaan sille perhanan id:lle arvoksi sama arvo mikä endresultilla
                } else {
                // console.log('Ei tarvetta päivittää:', key);
                return key;
                }
            });
            return { ...diagram, barDataKey: updatedBarDataKey }; //tässä palautetaan päivitetty perhanan bardatakey
            });
            setDiagrams(updatedDiagrams);
            console.log('diagramilista containerista', updatedDiagrams) //ja täällähän näkyy päivitetyt arvot      }, [result])

      }, [endResults])

console.log('vielä yks diagramlista containerin loppuun:' , diagrams)

    return (
        <div className='calculatorContainer'>
            <h2>{validatedContainer.title}</h2>
            <div className='calculatorTesti'>
                <div className='calculatorContent'>
                    {validatedCalculators.map((calculator) => (
                        <Laskuri
                            key={calculator.id}
                            calculator={{...calculator, variables: endResults}}
                            onCalculatorChange={handleCalculatorChange}
                        />
                    ))}

                </div>
                <div className='calculatorContainerChartBar'>
                    {diagrams.map((diagram) => (
                         <BarChartBar
                         key={diagram.id}
                         diagram={{...diagram }}
                        //  handleGrowthRateChange={(newValue)}
                         />
                    ))}

                </div>
            </div>
        </div>
    );
}

export default CalculatorContainer;