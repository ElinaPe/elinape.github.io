import { parse } from 'mathjs';

export function calculateFormula(formula: string, variables: Record<string, number>): number {
  const expression = parse(formula);

  const result = expression.evaluate(variables);

  if (typeof result !== 'number') {
    throw new Error('Expected number result from expression evaluation');
  }

  return result;
}