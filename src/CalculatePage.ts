// import { Field, Formula, InputValues } from './types';

// const CalculatePage = ({ formula: Formula, inputValues, onInputChange }) => {
//   return (
//     <div>
//       <h2>{formula.name}</h2>
//       {formula.fields.map((field, index) => (
//         <input
//           className="calculatebox"
//           key={index}
//           name={field.nimi}
//           value={inputValues[formula.name]?.[field.muuttuja] || ''}
//           onChange={(e) => onInputChange(e, formula.name, field.muuttuja)}
//           type="number"
//         />
//       ))}
//     </div>
//   );
// };

// export default CalculatePage;