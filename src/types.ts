import { z } from 'zod';


const HeadingsSchema = z.record(z.string());

const Mark = z.object({
	value: z.number(),
	label: z.string(),
});

const Variable = z.object({
	variableId: z.number().optional(),
	name: z.string(),
	value: z.number().nullable(),
})

export const Field = z.object({
	fieldId: z.number().optional(),
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
		value: z.number().nullable()
	}),
	cssClasses: z.array(z.string()).optional(),
	isVisible: z.boolean(),
});


const barDataKeys = z.object({
	id: z.string(),
	name: z.string(),
	value: z.number().nullable(),
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
	section: z.string(),
})

const PieData = z.object({
	id: z.string(),
	name: z.string(),
	value: z.number().nullable()
})

export const PieDiagramSchema = z.object({
	id: z.string(),
	section: z.string(),
	data: z.array(PieData),
	unit: z.string().optional(),
})

export const RootSchema = z.object({
	Headings: HeadingsSchema,
	Calculators: z.array(CalculatorSchema),
	Pylvasdiagrammit: z.array(DiagramSchema),
	Piirakkadiagrammit: z.array(PieDiagramSchema),
});

const InputValues = z.record(z.string(), z.record(z.string(), z.number()));

const Result = z.record(z.string(), z.number());

export const CalculatorsSchema = z.array(CalculatorSchema)

export interface CalculatorState {
	[section: string]: {
		[id: string]: number | null; 
	};
  }
  
  export interface CalculatorContextType {
	calculatorsState: CalculatorState;
	updateCalculatorState: (section: string, id: string, value: number | null) => void;
  }

  export interface TabData {
	[section: string]: { [name: string]: number | null };
  }

export type Field = z.infer<typeof Field>;
export type Calculator = z.infer<typeof CalculatorSchema>;
export type Calculators = z.infer<typeof CalculatorsSchema>;
export type InputValues = z.infer<typeof InputValues>;
export type Result = z.infer<typeof Result>;
export type Diagram = z.infer<typeof DiagramSchema>;
export type PieDiagram = z.infer<typeof PieDiagramSchema>;

//db
export type ResultList = {
    resultsListId: number;
	loginId: number
    placeName: string;
    savingDate: string;
};

export type CalculatorsList = {
    section: string;
    title: string;
    result: {
        name: string;
        value: number | null;
        unit?: string | null;
    }
}

export type ApiResponse = {
    resultsListId: number;
    loginId: number;
    placeName: string;
    savingDate: string;
    calculators: CalculatorsList[];
}

export type GlobalData = {
	[section: string]: Calculator[];
  }