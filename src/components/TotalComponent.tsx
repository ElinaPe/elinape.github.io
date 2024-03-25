import { Result } from "../types";

interface TotalResultsProps {
    results: Result;
}

const TotalResults: React.FC<TotalResultsProps> = ({ results }) => {

    const totalLapset = results['lapset']
    const totalHenkilot = results['henkilot'];
    const totalPalkat = results['palkat'];
    const totalPeruutukset = results['peruutukset'];
  
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