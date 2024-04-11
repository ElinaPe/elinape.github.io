import { z } from 'zod';


const ContainerSchema = z.object({
	title: z.string().optional()
});

const Mark = z.object({
	value: z.number(),
	label: z.string(),
});

const Variable = z.object({
	name: z.string(),
	value: z.number(),
})

export const Field = z.object({
	name: z.string(),
	variable: z.string(),
	controlType: z.enum(["type", "slider"]),
	step: z.number().optional(),
	min: z.number().optional(),
	max: z.number().optional(),
	marks: z.array(Mark).optional(),
	defaultValue: z.number(),
});

export const CalculatorSchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string().optional().nullable(),
	isTime: z.boolean(),
	isInteger: z.boolean(),
	fields: z.array(Field).optional(),
	variables: z.array(Variable).optional(),
	formula: z.string(),
	result: z.object({
		name: z.string(),
		unit: z.string().optional().nullable(),
		value: z.number()
	}),
	cssClasses: z.array(z.string()).optional(),
});


const barDataKeys = z.object({
	id: z.string().optional(),
	name: z.string(),
	value: z.number(),
	isTime: z.boolean(),
})

const xAxisdataKeyName = z.object({
	name: z.string(),
})

export const DiagramSchema = z.object({
	id: z.string(),
	xAxisDatakey: z.array(xAxisdataKeyName),
	barDataKey: z.array(barDataKeys),
	growthRate: z.object({
		value: z.number(),
		min: z.number(),
		max: z.number(),
		marks: z.array(Mark),
		isVisible: z.boolean(),
	}),
	unit: z.string().optional(),
})

export const RootSchema = z.object({
	Container: ContainerSchema,
	Laskurit: z.array(CalculatorSchema),
	Pylvasdiagrammit: z.array(DiagramSchema)
});

export const CalculatorsSchema = z.array(CalculatorSchema)

const InputValues = z.record(z.string(), z.record(z.string(), z.number()));

const Result = z.record(z.string(), z.number());

export type Field = z.infer<typeof Field>;
export type Calculator = z.infer<typeof CalculatorSchema>;
export type InputValues = z.infer<typeof InputValues>;
export type Result = z.infer<typeof Result>;
export type Diagram = z.infer<typeof DiagramSchema>;