import { useEffect, useState } from 'react';
import yamlData from '../laskuri.yaml';
import { RootSchema } from '../types';
import Laskuri from '../components/Calculator';
import BarChartBar from './BarChart';
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';

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

    const [showDiagram, setShowDiagram] = useState<boolean>(false)


    const handleCalculatorChange = (calculatorId: string, result: number) => {
        const newValue = typeof result === 'number' ? result : parseFloat(result);
        const updatedCalculators = calculators.map(calculator =>
                calculator.id === calculatorId ? { ...calculator, result: { ...calculator.result, value: newValue } } : calculator
            )
        setCalculators(updatedCalculators);

        const newResults = updatedCalculators.map(calculator => ({
            name: `result_${calculator.id}`,
            value: calculator.result.value,
          }));  

        setEndResults(newResults)          
    }
    
    useEffect(() => {
        const updatedDiagrams = diagrams.map(diagram => {
            const updatedBarDataKey = diagram.barDataKey.map(key => {
                if (key.id) { 
                const correspondingResult = endResults.find(result => result.name === key.id); 
                return correspondingResult ? { ...key, value: correspondingResult.value } : key; 
                } else {
                return key;
                }
            });
            return { ...diagram, barDataKey: updatedBarDataKey }; 
            });
            setDiagrams(updatedDiagrams);

      }, [endResults])

      const handleDiagram = () => {
        setShowDiagram(!showDiagram)
      }


    return (
        <div className='calculatorContainer'>
            <h2>{validatedContainer.title}</h2>
            <div className='calculatorTesti'>
                <div className='calculatorContent'>
                    {calculators.map((calculator) => (
                        <Laskuri
                            key={calculator.id}
                            calculator={{...calculator, variables: endResults}}
                            onCalculatorChange={handleCalculatorChange}
                        />
                    ))}
                    {/* <Form.Label>Range</Form.Label>
                    <Form.Range /> */}

                    <Button className='diagramBtn' variant={'outlined'} onClick={handleDiagram}>Näytä pylväät</Button>
                    {/* <Button className='diagramBtn' variant={'outlined'} onClick={handleDiagram}>Sovelluksen kanssa tee checkbox</Button> */}
                </div>
                
                {showDiagram &&
                <div className='calculatorContainerChartBar'>
                {diagrams.map((diagram) => (
                     <BarChartBar
                     key={diagram.id}
                     diagram={{...diagram }}
                     />
                ))}

            </div>
                }
                
            </div>
        </div>
    );
}

export default CalculatorContainer;