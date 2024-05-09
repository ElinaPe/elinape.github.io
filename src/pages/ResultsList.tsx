import React, { useState, useEffect } from 'react'
import ResultsList from '../services/resultsService'
import { ResultList } from '../types';
import CalculatorDetails from '../components/CalculatorDetails';


const ListedResults = () => {
    const [cityNames, setCityNames] = useState<ResultList[]>([]);
    const [selectedCity, setSelectedCity] = useState<ResultList | null>(null);
    // const [showCalculators, setShowCalculators] = useState<boolean>(false)

    useEffect(() => {
        ResultsList.getCityNames()
        .then(data => {
            console.log('listed results data:', data)
            setCityNames(data)
        })
    },[]
    )
    console.log('citynames: ', cityNames)
    console.log('selected city', selectedCity)

    console.log('selected city id', selectedCity?.resultsListId)

    return (
        <div className='resultsPageContainer'>
            <div className='showCitysContainer'>
                <h1>hello</h1>
                {cityNames.map(c => (
                    <div className='cityList' key={c.resultsListId} onClick={() => setSelectedCity(c)}>
                        <h3>{c.placeName}</h3> <p>({new Date(c.savingDate).toLocaleDateString("fi-FI")})</p>
                    </div>
                ))}
            </div>
            <div className='showResultsContainer'>
                {selectedCity && <CalculatorDetails cityId={selectedCity.resultsListId} />}
            </div>
        </div>
    );
}

export default ListedResults