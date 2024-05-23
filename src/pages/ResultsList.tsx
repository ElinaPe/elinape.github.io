import React, { useState, useEffect } from 'react'
import ResultsList from '../services/resultsService'
import { ResultList } from '../types';
import CalculatorDetails from '../components/CalculatorDetails';

interface ListedResultsProps {
    setLoggedUser: (value: string) => void;
    setSelectedTab: (value: number) => void;
    setOpen: (value: boolean) => void;
  }

const ListedResults: React.FC<ListedResultsProps> = ({setLoggedUser, setSelectedTab, setOpen}) => {
    const [cityNames, setCityNames] = useState<ResultList[]>([]);
    const [selectedCity, setSelectedCity] = useState<ResultList | null>(null);
    // const [showCalculators, setShowCalculators] = useState<boolean>(false)
    const [isSelected, setIsSelected] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token)
            ResultsList
                .setToken(token)
        ResultsList.getCityNames()
        .then(data => {
            setCityNames(data)
        })
        setSelectedTab(4)
    },[]
    )

    const handleCitySelection = (city: ResultList) => {
        setSelectedCity(city);
    }

    const logout = () => {
        localStorage.clear()
        setLoggedUser('')
        setSelectedTab(0);
        setOpen(false)
      }

    return (
        <div className='resultsPageContainer'>
            <div className='showCitysContainer'>
                <button onClick={logout}>Ulos</button>
                <h1>Tallennetut tiedot</h1>
                {cityNames.map(city => (
                    <div
                        className={selectedCity && city.resultsListId === selectedCity.resultsListId ? 'citylistActive' : 'cityList'}
                        key={city.resultsListId}
                        onClick={() => handleCitySelection(city)}
                    >
                        <h3>{city.placeName}</h3>
                        <p>({new Date(city.savingDate).toLocaleDateString("fi-FI")})</p>
                    </div>
                ))}

            </div>
            {selectedCity && <div className='showResultsContainer'>
                {selectedCity && <CalculatorDetails cityId={selectedCity.resultsListId} placeName={selectedCity.placeName} />}
            </div>}
        </div>
    );
}

export default ListedResults