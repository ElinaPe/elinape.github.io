import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import Laskuri from '../components/Calculator';
import yamlData from '../laskuri.yaml';
import { Calculator, Diagram, RootSchema } from '../types';
import BarChartBar from './BarChart';


interface TabData {
    [section: string]: {
      [name: string]: number | null;
    };
  }
interface CalculatorContainerProps {
    activeSection: string;
    updateTabData: (section: string, data: Record<string, any>) => void;
    tabData: TabData;
}

type ValidatedDataKey = 'LaskuritEtusivu' | 'Laskurit' | 'Suunnittelu' | 'Kuljetuskustannukset';  
  const CalculatorContainer: React.FC<CalculatorContainerProps> = ({ activeSection, updateTabData, tabData }) => {

    const validatedData = RootSchema.parse(yamlData);
    const validatedOtsikot = validatedData.Otsikot;
    // const validatedCalculators = validatedData.Laskurit;
    const validatedDiagrams = validatedData.Pylvasdiagrammit;

    const [calculators, setCalculators] = useState<Calculator[]>([]);
    const [diagrams, setDiagrams] = useState<Diagram[]>([]);

    const [endResults, setEndResults] = useState<{ name: string; value: number|null }[]>([]);
    // const [calculators, setCalculators] = useState(validatedCalculators.map(calculator => ({
    //     ...calculator, variables:endResults
    // })));

    const [showDiagram, setShowDiagram] = useState<boolean>(false);
   

    useEffect(() => {
        const validatedCalculators = validatedData[activeSection as ValidatedDataKey] || [];
        setCalculators(validatedCalculators.map(calculator => ({
            ...calculator, variables: endResults
        })));
      }, [activeSection]);

      const sectionTitle = validatedOtsikot[activeSection];

      useEffect(() => {
        const sectionDiagrams = validatedDiagrams.filter(diagram => diagram.section === activeSection);
    
        const needsUpdate = diagrams.length !== sectionDiagrams.length || diagrams.some((diag, index) => diag.id !== sectionDiagrams[index]?.id);
    
        if (needsUpdate) {
            setDiagrams(sectionDiagrams);
            console.log("Päivitetään diagrammit, koska tiedoissa on eroja.");
        }
        console.log("Hook suoritettu aktiivisen osion muutoksessa.");
    }, [activeSection, validatedDiagrams]);

    
    console.log('tabdata ', tabData)

      useEffect(() => {
        const newResults: { name: string; value: number | null }[] = [];
      
        // Käy läpi tabData ja lisää sen tiedot newResultsiin
        for (const section in tabData) {
          for (const name in tabData[section]) {
            newResults.push({ name, value: tabData[section][name] });
          }
        }
      
        // Aseta uusi endResults-tila
        setEndResults(newResults);
      }, [tabData]);
      
    const handleCalculatorChange = (calculatorId: string, result: number|null) => {
        const newValue = typeof result === 'number' ? result : parseFloat(result || '0');
        setCalculators(prevCalculators =>
          prevCalculators.map(calculator =>
            calculator.id === calculatorId
              ? { ...calculator, result: { ...calculator.result, value: newValue } }
              : calculator
          )
        );
      };

      useEffect(() => {
        const newResults = calculators.map(calculator => ({
          name: `result_${calculator.id}`,
          value: calculator.result.value,
        }));
        setEndResults(newResults);
        updateTabData(activeSection, newResults.reduce((acc, curr) => ({ ...acc, [curr.name]: curr.value }), {}));
      }, [calculators]);


    // useEffect(() => {
    //         console.log('useEffectistä' , calculators)
    // }, [])

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
            <h2>{sectionTitle}</h2>
            <div className='calculatorTesti'>
                <div className={`calculatorContent ${showDiagram ? '' : 'Full'}`}>
                    {calculators.map((calculator) => (
                        <Laskuri
                            key={calculator.id}
                            calculator={{...calculator, variables: endResults}}
                            onCalculatorChange={handleCalculatorChange}
                        />
                    ))}
                    {activeSection !== 'LaskuritEtusivu' &&
                    <div>
                        <Button className='diagramBtn' variant={'outlined'} onClick={handleDiagram}>Näytä pylväät</Button>
                        {/* <Button className='diagramBtn' variant={'outlined'} onClick={handleDiagram}>Sovelluksen kanssa tee checkbox</Button> */}
                    </div> }
                </div>

                {showDiagram &&
                <div className='calculatorContainerChartBar'>
                    {diagrams.map((diagram) => (
                        <BarChartBar
                        key={diagram.id}
                        diagram={diagram}
                        />
                    ))}
                </div>
                }

            </div>
        </div>
    );
}

export default CalculatorContainer;