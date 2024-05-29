import React, { useState, useEffect } from 'react'
import ResultsList from '../services/resultsService'
import { ResultList } from '../types';
import CalculatorDetails from '../components/CalculatorDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

interface ListedResultsProps {
    setLoggedUser: (value: string) => void;
    loggedUser: string
    setSelectedTab: (value: number) => void;
    setOpen: (value: boolean) => void;
    loginId: number;
  }

const ListedResults: React.FC<ListedResultsProps> = ({setLoggedUser, loggedUser, setSelectedTab, setOpen, loginId}) => {
    const [cityNames, setCityNames] = useState<ResultList[]>([]);
    const [selectedCity, setSelectedCity] = useState<ResultList | null>(null);
    // const [showCalculators, setShowCalculators] = useState<boolean>(false)
    const [showOnlyOwn, setShowOnlyOwn] = useState(false);

    const [isCitySelected, setIsCitySelected] = useState<boolean>(false)

    // Haetaan kaupungit ja asetetaan token
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

    // Haetaan kaupungit kun näytetään vain omat tai loginId muuttuu
    useEffect(() => {
    // Varmistetaan, että token on asetettu ennen hakuja
        if (showOnlyOwn && loginId) {
            // Hakee vain kirjautuneen käyttäjän kaupungit
            ResultsList.getCityNamesById(loginId)
                .then(setCityNames)
                .catch(error => console.error('Failed to fetch my city names', error));
        } else {
            // Hakee kaikki kaupungit
            ResultsList.getCityNames()
                .then(setCityNames)
                .catch(error => console.error('Failed to fetch city names', error));
        }
    }, [showOnlyOwn, loginId]);

    // Käsitellään kaupungin valinta
    const handleCitySelection = (city: ResultList) => {
        setSelectedCity(city);
        setIsCitySelected(true)
    }

    // Näytetään vain omat kaupungit tai kaikki kaupungit
    const toggleOwnResults = () => {
        setShowOnlyOwn(!showOnlyOwn);
    }

    const logout = () => {
        localStorage.clear()
        setLoggedUser('')
        setSelectedTab(0);
        setOpen(false)
      }

    return (
        <div className='resultsPageContainer'>
             <div className='userNameInfo'> 
                    <div className='userNameInfoBorder'>
                        <FontAwesomeIcon icon={faUser} /> {loggedUser} 
                    </div>
                    <button className='btn' onClick={logout}>
                        Ulos
                    </button>
                </div>
            <div className={`showCitysContainer ${isCitySelected ? '' : 'centered'}`}>
                <div className='infoHeaderWithButton'>
                    <h1>Tallennetut tiedot</h1>
                    <button className='btn savedBtn' onClick={toggleOwnResults}>{showOnlyOwn ? "Näytä kaikki" : "Vain omat"}</button>
                </div>
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
            {<div className={`showResultsContainer ${isCitySelected ? 'active' : ''}`}>
                {selectedCity && <CalculatorDetails cityId={selectedCity.resultsListId} placeName={selectedCity.placeName} />}
            </div>}
        </div>
    );
}

export default ListedResults