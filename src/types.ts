import { z } from 'zod';

const Mark = z.object({
    value: z.number(),
    label: z.string(),
});

export const Field = z.object({
	name: z.string(),
	variable: z.string(),
	controlType: z.enum(["type", "slider"]),
	type: z.string(),
	min: z.number().optional(),
	max: z.number().optional(),
	marks: z.array(Mark).optional(),
});

export const CalculatorSchema = z.object({
	title: z.string(),
	description: z.string().optional().nullable(),
	fields: z.array(Field),
	formula: z.string(),
	result: z.object({
		id: z.string(),
		name: z.string(),
		type: z.string(),
		ending: z.string(),
	}),
});

export const CalculatorsSchema = z.array(CalculatorSchema)

const InputValues = z.record(z.string(), z.record(z.string(), z.number()));

const Results = z.record(z.string(), z.number());

export type Field = z.infer<typeof Field>;
export type Calculator = z.infer<typeof CalculatorSchema>;
export type InputValues = z.infer<typeof InputValues>;
export type Results = z.infer<typeof Results>;
