import React, { useState, useEffect } from 'react';
import ResultsList from '../services/resultsService'
import DeleteButton from './DeleteButton';
import { Snackbar } from '@mui/material';
import { CalculatorsList } from '../types'



const CalculatorDetails = ({ cityId, placeName }: { cityId: number, placeName: string }) => {
    const [calculators, setCalculators] = useState<CalculatorsList[]>([]);

    const sectionTitles:{ [key: string]: string } = {
        Landing: 'Esitiedot',
        DailyWork: 'Ajansäästö päivittäisessä koordinoinnissa',
        PlanningWork: 'Ajansäästö kuljetussuunnittelussa',
        TransportCosts: 'Kuljetuskustannukset ja säästö'
    };

    useEffect(() => {
        if (cityId) {
            ResultsList.getCalculatorsByCityId(cityId).then(response => {
                if (response && response.calculators && Array.isArray(response.calculators)) {
                    setCalculators(response.calculators);
                } else {
                    setCalculators([]);  // Handle unexpected API response
                }
            }).catch(error => {
                console.error('Failed to fetch calculators:', error);
                setCalculators([]);  // Handle error
            });
        }
    }, [cityId]);

    // Group calculators by section
    const groupedCalculators = calculators.reduce((acc, calculator) => {
        const section = sectionTitles[calculator.section] || calculator.section;
        if (!acc[section]) {
            acc[section] = [];
        }
        acc[section].push(calculator);
        return acc;
    }, {} as Record<string, CalculatorsList[]>);



    const handleDeleteSuccess = () => {
        console.log('Tietue poistettu onnistuneesti!');
        window.location.reload();
      };

    return (
        <>
        <h1>{placeName}</h1>
            {Object.entries(groupedCalculators).map(([section, calculatorsList], index) => (
                <div className='calculatorsStatsCont' key={index}>
                    <h2>{section}</h2>
                    <div className='calculatorsStats'>
                    {calculatorsList.map((calculator, index) => (
                        <div key={index}>
                            <h5>{calculator.title}</h5>
                            {calculator.result && calculator.result.value !== null ? (
                                <p>
                                    {calculator.result.name}: <b>{calculator.result.value} {calculator.result.unit ?? ""}</b>
                                </p>
                            ) : (
                                <p>Ei tulosta</p>
                            )}
                        </div>
                    ))}
                    </div>
                </div>
            ))}
            <br/>
            <DeleteButton id={cityId} onSuccessfulDelete={handleDeleteSuccess} />
        </>
    );
};

export default CalculatorDetails;