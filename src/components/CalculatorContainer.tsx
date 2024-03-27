import { useEffect, useState } from 'react';
import yamlData from '../laskuri.yaml';
import { RootSchema } from '../types';
import Laskuri from '../components/Calculator';
import BarChartBar from './BarChart';
// import TotalResults from './TotalComponent';
// import AdditionalInfo from '../components/CalculateTotal';

function CalculatorContainer() {
    const validatedData = RootSchema.parse(yamlData)
    const validatedContainer = validatedData.Container
    const validatedCalculators = validatedData.Laskurit;

    const [endResults, setEndResults] = useState<{ name: string; value: number }[]>([])
    const [calculators, setCalculators] = useState(validatedCalculators.map(calculator => ({
        ...calculator, variables:endResults
    })));
    const palkatYhtCalculator = calculators.find(calculator => calculator.id === "palkatYht");
    const aikaYhtCalculator = calculators.find(calculator => calculator.id === "peruutusYht");

    const currentTotalCost = palkatYhtCalculator?.result?.value || 0;
    const growthRate = 1.1
    const currentTotalTime = aikaYhtCalculator?.result?.value || 0;


    const handleCalculatorChange = (calculatorId: string, result: number) => {
        const newValue = typeof result === 'number' ? result : parseFloat(result);
        setCalculators(prevCalculators =>
            prevCalculators.map(calculator =>
                calculator.id === calculatorId ? { ...calculator, result: { ...calculator.result, value: newValue } } : calculator
                
            )
        );
        console.log('uus arvo :' ,newValue)
    };

    useEffect(() => {
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
        console.log('uuudet arvot',newResults)
    }, [calculators])



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
                    <BarChartBar currentTotalCost={currentTotalTime} growthRate={growthRate}  />

                    <BarChartBar currentTotalCost={currentTotalCost} growthRate={growthRate}  />
                </div>
            </div>
        </div>
    );
}

export default CalculatorContainer;