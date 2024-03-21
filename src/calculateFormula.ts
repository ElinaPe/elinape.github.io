import { parse } from 'mathjs';

export function calculateFormula(formula: string, variables: Record<string, number>): number { //ottaa vastaan laskukaavan ja calculateResultissa loopatut muuttujat
  
  const expression = parse(formula); //muutetaan annettu kaava evaluoitavaksi lausekkeeksi, muuttaa merkkijonona annetun kaavan ymmärrettävään muotoon laskutoimituksia varten

  const result = expression.evaluate(variables); //käyttää muuttujia .. miten tän selittää a + b onkin nyt 1 + 2

  if (typeof result !== 'number') {
    throw new Error('Expected number result from expression evaluation');
  }

  return result;
}