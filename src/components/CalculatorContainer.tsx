// import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import Laskuri from '../components/Calculator';
import yamlData from '../laskuri.yaml';
import { Calculator, Diagram, PieDiagram, RootSchema } from '../types';
// import BarChartBar from './BarChart';
// import PieChartComponent from './PieChart';
import { usePDF } from 'react-to-pdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { z } from 'zod';
// import SaveButton from '../modals/saveModal';

// interface CalculatorContainerProps {
    // activeSection: string;
    // updateTabData: (section: string, data: Record<string, any>) => void;
    // tabData: TabData;
    // defaultValues: number,
    // showDiagrams: boolean;
    // setShowDiagrams: () => void;
    // loggedUser: string;
    // loginId: number;
// }

// { showDiagrams, setShowDiagrams } <- propseihin

// type ValidatedDataKey = 'Landing' | 'DailyWork' | 'PlanningWork' | 'TransportCosts';
  const CalculatorContainer = () => {

    //haetaan tieto yamlista
    // const validatedData = RootSchema.parse(yamlData);
    console.log("YAML Data before parsing:", yamlData);
    let validatedData;

  try {
    validatedData = RootSchema.parse(yamlData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Zod validation error:", error.errors);
    } else {
      console.error("Unexpected error:", error);
    }
    return <div>Error loading data</div>;
  }
    const validatedCalculators = validatedData.Calculators;
    
    //asetetaan otsikot
    // const validatedHeadings = validatedData.Headings;
    // const validatedCalculators = validatedData.DailyWork;
    // //haetaan diagrammidata
    // const validatedDiagrams = validatedData.Pylvasdiagrammit;
    // const validatedPieDiagrams = validatedData.Piirakkadiagrammit;
    const title = validatedData.Headings.Laskurit;
    const [calculators, setCalculators] = useState<Calculator[]>(validatedCalculators);

    // const [diagrams, setDiagrams] = useState<Diagram[]>([]);
    // const [pieDiagrams, setPieDiagrams] = useState<PieDiagram[]>([]);

    // const { globalData, updateCalculatorData } = useContext(CalculatorContext);

    const [endResults, setEndResults] = useState<{ name: string; value: number|null }[]>([]);
    const { toPDF, targetRef } = usePDF({filename: 'calculator.pdf'});
    console.log("YAML Data:", yamlData);



    // Laskurin muutoksen käsittely
    const handleCalculatorChange = (calculatorId: string, result: number | string | null) => {
      let newValue: number;
      if (typeof result === 'number') {
        newValue = result;
      } else if (result === null) {
        newValue = 0;
      } else {
        newValue = parseFloat(result);
        if (isNaN(newValue)) {
          newValue = 0;
        }
      }
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
      console.log('testiresults', newResults);
      setEndResults(newResults);
    }, [calculators]);

    // useEffect(() => {
    //     const updatedDiagrams = diagrams.map(diagram => {
    //         const updatedBarDataKey = diagram.barDataKey.map(key => {
    //             if (key.id) {
    //             const correspondingResult = endResults.find(result => result.name === key.id);
    //             return correspondingResult ? { ...key, value: correspondingResult.value } : key;
    //             } else {
    //             return key;
    //             }
    //         });
    //         return { ...diagram, barDataKey: updatedBarDataKey };
    //         });
    //         setDiagrams(updatedDiagrams);

    //   }, [endResults])

      // Päivitä pylväsdiagrammien data, kun lopputulokset muuttuvat
      // useEffect(() => {
      //   const updatedPieData = pieDiagrams.map(pieDiagram => {
      //     const updatedData = pieDiagram.data.map(dataItem => {
      //       const result = endResults.find(result => result.name === dataItem.id);
      //       return result ? { ...dataItem, value: result.value } : dataItem;
      //     });

      //     return { ...pieDiagram, data: updatedData };
      //   });
      //   setPieDiagrams(updatedPieData);
      // }, [endResults]);

    return (
        <div ref={targetRef} className='calculatorContainer'>
          <button className='printBtn' onClick={() => toPDF()}><FontAwesomeIcon icon={faPrint} aria-label="Print" /></button>
            <h2>{title}</h2>
            <div className='calculatorTesti'>
                <div className={`calculatorContent`}>

                {calculators.map((calculator) => (
                  <div
                    key={calculator.id}
                    style={{ display: calculator.isVisible ? 'block' : 'none' }}
                  >
                    <Laskuri
                      calculator={{...calculator, variables: endResults}}
                      onCalculatorChange={(calculatorId, result) => handleCalculatorChange(calculatorId, result)}                    />
                  </div>
                ))}
                 
                </div>
                {/* <div className='buttons'>
                      <div>
                          <Button className="diagramBtn" variant="outlined" onClick={setShowDiagrams}>
                            {showDiagrams ? 'Piilota pylväät' : 'Näytä pylväät'}
                          </Button>
                      </div> 
                  {/* {activeSection === 'TransportCosts' && loggedUser &&
                  <SaveButton globalData={globalData} loginId={loginId} />} */}
                {/* </div> */}

                {/* {showDiagrams &&
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
                } */}

            </div>
        </div>
    );
}

export default CalculatorContainer;