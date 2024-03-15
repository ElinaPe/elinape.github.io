import { z } from 'zod';

const Field = z.object({
	nimi: z.string(),
	muuttuja: z.string(),
	controlType: z.string().optional(),
	tyyppi: z.string(),
});

const Formula = z.object({
	name: z.string(),
	description: z.string().optional(),
	fields: z.array(Field),
	formula: z.string(),
	result: z.object({
		nimi: z.string(),
		tyyppi: z.string(),
	}),
});

const InputValues = z.record(z.string(), z.record(z.string(), z.number()));

const Results = z.record(z.string(), z.number());

export type FieldT = z.infer<typeof Field>;
export type FormulaT = z.infer<typeof Formula>;
export type InputValuesT = z.infer<typeof InputValues>;
export type ResultsT = z.infer<typeof Results>;

// export interface Field {
// 	name: string;
// 	amount: string;
// 	'control-type'?: string;
// 	tyyppi: string;
// }

// export interface Formula {
// 	name: string;
// 	description?: string;
// 	fields: Field[];
// 	formula: string;
// 	result: {
// 		name: string;
// 		tyyppi: string;
// 	};
// }

// export interface InputValues {
// 	[key: string]: {
// 		[variable: string]: number;
// 	};
// }

// export interface Results {
// 	[key: string]: number;
// }

// import { z } from 'zod';

// export const fieldSchema = z.object({
// 	name: z.string(),
// 	amount: z.string(),
// 	controlType: z.union([z.literal('type'), z.literal('slider')]),
// 	tyyppi: z.literal('float'),
// });

// export const configSchema = z.object({
// 	name: z.string(),
// 	description: z.string(),
// 	fields: z.array(fieldSchema),
// 	formula: z.string(),
// 	result: z.object({
// 		name: z.string(),
// 		tyyppi: z.literal('float'),
// 	}),
// });

// export type Config = z.infer<typeof configSchema>;
