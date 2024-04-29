import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import Laskuri from '../components/Calculator';
import yamlData from '../laskuri.yaml';
import { Calculator, Diagram, PieDiagram, RootSchema } from '../types';
import BarChartBar from './BarChart';
import PieChartComponent from './PieChart';
import { usePDF } from 'react-to-pdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { TabData } from '../types';

interface CalculatorContainerProps {
    activeSection: string;
    updateTabData: (section: string, data: Record<string, any>) => void;
    tabData: TabData;
    // defaultValues: number,
    showDiagrams: boolean;
    setShowDiagrams: () => void;
}

type ValidatedDataKey = 'Landing' | 'DailyWork' | 'PlanningWork' | 'TransportCosts';  
  const CalculatorContainer: React.FC<CalculatorContainerProps> = ({ activeSection, showDiagrams, setShowDiagrams, updateTabData, tabData }) => {

    const validatedData = RootSchema.parse(yamlData);
    const validatedHeadings = validatedData.Headings;
    // const validatedCalculators = validatedData.DailyWork;
    const validatedDiagrams = validatedData.Pylvasdiagrammit;
    const validatedPieDiagrams = validatedData.Piirakkadiagrammit;

    const [calculators, setCalculators] = useState<Calculator[]>([]);
    
    const [diagrams, setDiagrams] = useState<Diagram[]>([]);
    const [pieDiagrams, setPieDiagrams] = useState<PieDiagram[]>([]);

    const [endResults, setEndResults] = useState<{ name: string; value: number|null }[]>([]);
    // const [calculators, setCalculators] = useState(validatedCalculators.map(calculator => ({
    //     ...calculator, variables:endResults
    // })));
   
    const { toPDF, targetRef } = usePDF({filename: 'calculator.pdf'});

    // useEffect(() => {
    //     const validatedCalculators = validatedData[activeSection as ValidatedDataKey] || [];
    //     setCalculators(validatedCalculators.map(calculator => ({
    //         ...calculator, variables: endResults
    //     })));
    //   }, [activeSection]);

    useEffect(() => {
      const sectionData = validatedData[activeSection as ValidatedDataKey] || [];
      const updatedCalculators = sectionData.map(calculator => {
        const resultKey = `result_${calculator.id}`;
        const existingResult = tabData[activeSection]?.[resultKey];
    
        return {
            ...calculator,
            result: {
                ...calculator.result,
                value: existingResult !== undefined ? existingResult : calculator.result.value
            }
        };
      });
      
      setCalculators(updatedCalculators);
    }, [activeSection]);

    // useEffect(() => {
    //   // Tarkista, onko initialValues asetettu ja päivitä laskurin aloitusarvot
    //   if (defaultValues && defaultValues.taksitUusi) {
        
    //   }
    // }, [defaultValues]);
    

      const sectionTitle = validatedHeadings[activeSection];

      useEffect(() => {
        const sectionBarDiagrams = validatedDiagrams.filter(diagram => diagram.section === activeSection);
        const needsUpdateBar = diagrams.length !== sectionBarDiagrams.length || diagrams.some((diag, index) => diag.id !== sectionBarDiagrams[index]?.id);
    
        if (needsUpdateBar) {
            setDiagrams(sectionBarDiagrams);
        }
    
        const sectionPieDiagrams = validatedPieDiagrams.filter(diagram => diagram.section === activeSection);
        const needsUpdatePie = pieDiagrams.length !== sectionPieDiagrams.length || pieDiagrams.some((diag, index) => diag.id !== sectionPieDiagrams[index]?.id);
    
        if (needsUpdatePie) {
            setPieDiagrams(sectionPieDiagrams);
        }
    
    }, [activeSection, validatedDiagrams, validatedPieDiagrams, diagrams, pieDiagrams]);
    
      useEffect(() => {
        const newResults: { name: string; value: number | null }[] = [];
      
        for (const section in tabData) {
          for (const name in tabData[section]) {
            newResults.push({ name, value: tabData[section][name] });
          }
        }
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
        if (JSON.stringify(newResults) !== JSON.stringify(endResults)) {
          // setEndResults(newResults);
          updateTabData(activeSection, newResults.reduce((acc, curr) => ({ ...acc, [curr.name]: curr.value }), {}));
          
      }
        // setEndResults(newResults);
        // updateTabData(activeSection, newResults.reduce((acc, curr) => ({ ...acc, [curr.name]: curr.value }), {}));
      }, [calculators]);

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

      useEffect(() => {
        const updatedPieData = pieDiagrams.map(pieDiagram => {
          const updatedData = pieDiagram.data.map(dataItem => {
            const result = endResults.find(result => result.name === dataItem.id);
            return result ? { ...dataItem, value: result.value } : dataItem;
          });
      
          return { ...pieDiagram, data: updatedData };
        });
        setPieDiagrams(updatedPieData);
      }, [endResults]);

    return (
        <div ref={targetRef} className='calculatorContainer'>
          <p className='printBtn' onClick={() => toPDF()}><FontAwesomeIcon icon={faPrint} /></p>
            <h2>{sectionTitle}</h2>
            <div className='calculatorTesti'>
                <div className={`calculatorContent ${showDiagrams ? '' : 'Full'}`}>
                    
                {calculators.map((calculator) => (
                  <div 
                    key={calculator.id} 
                    style={{ display: calculator.isVisible ? 'block' : 'none' }}
                  >
                    <Laskuri
                      calculator={{...calculator, variables: endResults}}
                      onCalculatorChange={handleCalculatorChange}
                    />
                  </div>
                ))}
                 {activeSection !== 'Landing' &&
                    <div>
                        <Button className="diagramBtn" variant="outlined" onClick={setShowDiagrams}>
                          {showDiagrams ? 'Piilota pylväät' : 'Näytä pylväät'}
                        </Button>
                    </div> }
                </div>

                {showDiagrams &&
                <div className='calculatorContainerChartBar'>
                    {diagrams.map((diagram) => (
                        <BarChartBar
                        key={diagram.id}
                        diagram={diagram}
                        />
                    ))}
                </div>
                }
                {showDiagrams &&
                <div className='calculatorContainerChartPie'>
                  {pieDiagrams.map((diagram) => (
                        <PieChartComponent 
                        key={diagram.id}
                        data={diagram.data}
                        />
                    ))}
                </div>
                }

            </div>
        </div>
    );
}

export default CalculatorContainer;