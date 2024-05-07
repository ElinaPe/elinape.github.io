import React, { useState, useEffect } from 'react';
import { Calculator } from '../types';
import ListedResults from '../pages/ResultsList';
import ResultsList from '../services/resultsService'


const CalculatorDetails = ({ cityId }: { cityId: number }) => {
    const [calculators, setCalculators] = useState<{ title: string; result: { name: string; unit: string | null; value: number | null } | null }[]>([]);

    useEffect(() => {
        ResultsList.getCalculatorsByCityId(cityId).then(data => {
            setCalculators(data.calculators);
        });
    }, [cityId]);

    return (
        <>
            {calculators.map(calculator => (
                <div key={calculator.title}>
                    <h5>{calculator.title}</h5>
                    {calculator.result ? (
                        <p>
                            Tulos: {calculator.result.value} {calculator.result.unit ?? ""}
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