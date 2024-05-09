import React, { useState, useEffect } from 'react';
import ResultsList from '../services/resultsService'

interface CalculatorsList {
    title: string;
    resultName: string;
    resultUnit: string;
    resultValue: number;
}

const CalculatorDetails = ({ cityId }: { cityId: number }) => {
    const [calculators, setCalculators] = useState<CalculatorsList[]>([]);

    useEffect(() => {
        if (cityId) {
            ResultsList.getCalculatorsByCityId(cityId).then(response => {
                console.log('API response:', response);  // Varmista, että näet koko vastauksen
                if (response && response.calculators && Array.isArray(response.calculators)) {
                    setCalculators(response.calculators);  // Aseta calculators tilaan suoraan vastauksesta
                } else {
                    console.error('Unexpected API response:', response);
                    setCalculators([]);  // Aseta tyhjä taulukko, jos calculators ei ole saatavilla
                }
            }).catch(error => {
                console.error('Failed to fetch calculators:', error);
                setCalculators([]);  // Aseta tyhjä taulukko virhetilanteessa
            });
        }
    }, [cityId]);

    // const groupedCalculators = calculators.reduce((acc, calculator) => {
    //     if (!acc[calculator.section]) {
    //         acc[calculator.section] = [];
    //     }
    //     acc[calculator.section].push(calculator);
    //     return acc;
    // }, {} as Record<string, { title: string; result: { name: string; unit: string | null; value: number | null } | null; fields: Field[] }[]>);


    return (
        <>
           {calculators.map((calculator, index) => (
            <div key={index}>
                <h5>{calculator.title}</h5>
                {calculator.resultValue !== null && calculator.resultValue !== undefined ? (
                    <p>
                        {calculator.resultName}: {calculator.resultValue} {calculator.resultUnit}
                    </p>
                ) : (
                    <p>Ei tulosta</p>
                )}
            </div>
            ))}
        </>
    );
};

export default CalculatorDetails