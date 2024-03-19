import React, { useState } from 'react';
import { Results } from '../types';

// Oletetaan, että Results-tyyppi on määritelty ja se kuvaa results-objektin muotoa
interface AdditionalInfoProps {
    results: Results;
}

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ results }) => {
    const [total, setTotal] = useState<number | null>(null);

    

    const calculateTotal = () => {
        const peruutukset = results['Kuljetettavat lapset']
        setTotal(peruutukset); // Asetetaan laskettu arvo tilaan
        }

    return (
        <div>
            <button onClick={calculateTotal}>Laske kokonaissumma</button>
            {total !== null && <p>Kokonaissumma: {total}</p>}
        </div>
    );
};

export default AdditionalInfo;