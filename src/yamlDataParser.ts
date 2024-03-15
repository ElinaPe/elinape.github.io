import fs from 'fs';
import yaml from 'js-yaml';
import { ZodError } from 'zod';

import { YamlDataSchema } from './types';

// Määrittele tyyppi, jonka funktio palauttaa. Tässä esimerkissä oletamme,
// että YamlDataSchema.parse palauttaa tietyn tyyppisen objektin.
// Jos skeemasi on monimutkainen, voit joko luoda erillisen TypeScript-tyypin
// tai käyttää Zodin automaattista tyypinjohtoa.
export type YamlDataType = ReturnType<(typeof YamlDataSchema)['parse']>;

export function loadAndValidateYamlData(filePath: string): YamlDataType {
	const fileContents = fs.readFileSync(filePath, 'utf8');

	try {
		const data = yaml.load(fileContents);
		const parsed = YamlDataSchema.parse(data); // Suorittaa validoinnin

		return parsed; // Palauttaa validoidun datan
	} catch (error) {
		if (error instanceof ZodError) {
			console.error('Validation error', error.flatten());
		} else {
			console.error('Error reading or parsing YAML file', error);
		}
		throw error; // Heitä virhe eteenpäin, jotta sovellus voi käsitellä sen
	}
}
