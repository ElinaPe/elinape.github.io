import Button from '@mui/material/Button';
import { useContext, useEffect, useState } from 'react';
import Laskuri from '../components/Calculator';
import yamlData from '../laskuri.yaml';
import { Calculator, Diagram, PieDiagram, RootSchema } from '../types';
import BarChartBar from './BarChart';
import PieChartComponent from './PieChart';
import { usePDF } from 'react-to-pdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { TabData } from '../types';
import SaveButton from '../modals/saveModal';
import { CalculatorContext } from './CalculatorContext';

interface CalculatorContainerProps {
    activeSection: string;
    updateTabData: (section: string, data: Record<string, any>) => void;
    tabData: TabData;
    // defaultValues: number,
    showDiagrams: boolean;
    setShowDiagrams: () => void;
    loggedUser: string;
    loginId: number;
}

type ValidatedDataKey = 'Landing' | 'DailyWork' | 'PlanningWork' | 'TransportCosts';
  const CalculatorContainer: React.FC<CalculatorContainerProps> = ({ activeSection, showDiagrams, setShowDiagrams, updateTabData, tabData, loggedUser, loginId }) => {

    //haetaan tieto yamlista
    const validatedData = RootSchema.parse(yamlData);
    //asetetaan otsikot
    const validatedHeadings = validatedData.Headings;
    // const validatedCalculators = validatedData.DailyWork;
    //haetaan diagrammidata
    const validatedDiagrams = validatedData.Pylvasdiagrammit;
    const validatedPieDiagrams = validatedData.Piirakkadiagrammit;

    const [calculators, setCalculators] = useState<Calculator[]>([]);

    const [diagrams, setDiagrams] = useState<Diagram[]>([]);
    const [pieDiagrams, setPieDiagrams] = useState<PieDiagram[]>([]);

    const { globalData, updateCalculatorData } = useContext(CalculatorContext);

    const [endResults, setEndResults] = useState<{ name: string; value: number|null }[]>([]);


    const { toPDF, targetRef } = usePDF({filename: 'calculator.pdf'});

    // useEffect(() => {
    //     const validatedCalculators = validatedData[activeSection as ValidatedDataKey] || [];
    //     setCalculators(validatedCalculators.map(calculator => ({
    //         ...calculator, variables: endResults
    //     })));
    //   }, [activeSection]);

// Laskureiden ja tulosten päivitys, kun aktiivinen osio muuttuu
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
      updateCalculatorData(activeSection, updatedCalculators); //contextiin päivitys
    }, [activeSection]);

    // useEffect(() => {
    //   // Tarkista, onko initialValues asetettu ja päivitä laskurin aloitusarvot
    //   if (defaultValues && defaultValues.taksitUusi) {

    //   }
    // }, [defaultValues]);


      //Otsikkotieto yamlista
      const sectionTitle = validatedHeadings[activeSection]; 

      //Diagrammien määritys ja päivittäminen
      useEffect(() => {
        //Näytetään diagrammit aktiivisen osion mukaan
        const sectionBarDiagrams = validatedDiagrams.filter(diagram => diagram.section === activeSection);
        // Tarkista, tarvitaanko päivitys
        const needsUpdateBar = diagrams.length !== sectionBarDiagrams.length || diagrams.some((diag, index) => diag.id !== sectionBarDiagrams[index]?.id);

        if (needsUpdateBar) {
            setDiagrams(sectionBarDiagrams);
        }
        // Hae aktiivisen osion piirakkadiagrammit
        const sectionPieDiagrams = validatedPieDiagrams.filter(diagram => diagram.section === activeSection);
        // Tarkista, tarvitaanko päivitys
        const needsUpdatePie = pieDiagrams.length !== sectionPieDiagrams.length || pieDiagrams.some((diag, index) => diag.id !== sectionPieDiagrams[index]?.id);

        if (needsUpdatePie) {
            setPieDiagrams(sectionPieDiagrams);
        }

    }, [activeSection, validatedDiagrams, validatedPieDiagrams, diagrams, pieDiagrams]);

      // Päivitä lopputulokset, kun tabData muuttuu
      useEffect(() => {
        const newResults: { name: string; value: number | null }[] = [];

        for (const section in tabData) {
          for (const name in tabData[section]) {
            newResults.push({ name, value: tabData[section][name] });
          }
        }
        setEndResults(newResults);
      }, [tabData]);

    // Laskurin muutoksen käsittely
    const handleCalculatorChange = (section: string, calculatorId: string, result: number|null) => {
      const newValue = typeof result === 'number' ? result : parseFloat(result || '0');
      setCalculators(prevCalculators => {
        const newCalculators = prevCalculators.map(calculator => {
          if (calculator.id === calculatorId) {
            const updatedCalculator = { ...calculator, result: { ...calculator.result, value: newValue } };
            return updatedCalculator;
          }
          return calculator;
        });
        // Päivitä myös globalData
        updateCalculatorData(section, newCalculators);
        return newCalculators;
      });
      };


      // Päivitä tabData, kun laskurit muuttuvat
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

      // Päivitä pylväsdiagrammien data, kun lopputulokset muuttuvat
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
          <button className='printBtn' onClick={() => toPDF()}><FontAwesomeIcon icon={faPrint} aria-label="Print" /></button>
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
                      onCalculatorChange={(calculatorId, result) => handleCalculatorChange(activeSection, calculatorId, result)}                    />
                  </div>
                ))}
                 
                </div>
                <div className='buttons'>
                  {activeSection !== 'Landing' &&
                      <div>
                          <Button className="diagramBtn" variant="outlined" onClick={setShowDiagrams}>
                            {showDiagrams ? 'Piilota pylväät' : 'Näytä pylväät'}
                          </Button>
                      </div> }
                  {activeSection === 'TransportCosts' && loggedUser &&
                  <SaveButton globalData={globalData} loginId={loginId} />}
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