import { Results } from "../types";

interface TotalResultsProps {
    results: Results;
}

const TotalResults: React.FC<TotalResultsProps> = ({ results }) => {

    const totalLapset = results['Montako kuljetettavaa lasta?']
    const totalHenkilot = results['Kuinka monta henkilöä osallistuu kuljetusmuutoksiin?'];
    const totalPalkat = results['Palkkakulut'];
    const totalPeruutukset = results['Kuinka kauan menee yhdessä peruutuksessa?'];
  
    const peruutukset = totalLapset * totalPeruutukset
  
    return (
      <div>
        <p>Peruutukset yht: {peruutukset} minuuttia</p>
        <p>Total Lapset: {totalLapset}</p>
        <p>Total Henkilöt: {totalHenkilot}</p>
        <p>Total Palkat: {totalPalkat}</p>
        <p>Peruutukset: {totalPeruutukset} minaa</p>
        
      </div>
    );
  }

  export default TotalResults;