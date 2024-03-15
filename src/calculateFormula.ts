import { parse } from 'mathjs';

export function calculateFormula(formula: string, variables: Record<string, number>): number {
  // Parsi kaava ja luo MathNode
  const expression = parse(formula);

  // Käytä MathNode:n evaluate-metodia suoraan
  const result = expression.evaluate(variables);

  // Tarkista tulos
  if (typeof result !== 'number') {
    throw new Error('Expected number result from expression evaluation');
  }

  return result;
}