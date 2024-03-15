import React, { useState } from 'react';

import yamlData from './laskuri.yaml';
import { FieldT, InputValuesT, ResultsT, FormulaT } from './types';
import { InputLabel } from '@mui/material';
import { calculateFormula } from './calculateFormula';
import useCalculateResult from './hooks/calculateResult';

function App() {
	const [inputValues, setInputValues] = useState<InputValuesT>({});
	const typedYamlData = yamlData as FormulaT[];

	const { results, calculateResult } = useCalculateResult(typedYamlData);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		formulaName: string,
		variable: string
	) => {
		const inputValue = e.target.value;
		const newValue = inputValue === '' || undefined ? 0 : parseFloat(e.target.value);

		setInputValues((prev) => {
			const newInputValues: InputValuesT = {
				...prev,
				[formulaName]: {
					...prev[formulaName],
					[variable]: newValue,
				},
			};

			calculateResult(newInputValues);

			return newInputValues;
		});
	};

	

	return (
		<>
			<div className="calculate_container">
				{typedYamlData.map((data: FormulaT, index: number) => (
					<div className="calculcatejuttu" key={index}>
						<h2>{data.title}</h2>
						{data.fields.map((field: FieldT, fieldIndex: number) => (
							<input
								className="calculatebox"
								key={fieldIndex}
								name={field.nimi}
								onChange={(e) => handleInputChange(e, data.title, field.muuttuja)}
								type="number"
							/>
						))}
						<p>Tulos: {results[data.title]}</p>
					</div>
				))}
			</div>
		</>
	);
}

export default App;
