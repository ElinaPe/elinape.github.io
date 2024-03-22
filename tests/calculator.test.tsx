import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Calculator from '../src/components/Calculator';
import '@testing-library/jest-dom';

// Mock data for calculator props
const mockCalculator = {
  id: 'test-calculator',
  title: 'Test Calculator',
  formula: 'a + b',
  fields: [
    { name: 'Field A', variable: 'a', controlType: 'type', defaultValue: 1 },
    { name: 'Field B', variable: 'b', controlType: 'type', defaultValue: 2 }
  ],
  result: {
    name: 'Result',
    type: 'number',
    ending: ''
  }
};

describe('Calculator Component', () => {
  it('renders correctly and handles input changes', () => {
    const mockOnCalculatorChange = jest.fn();

    render(<Calculator calculator={mockCalculator} onCalculatorChange={mockOnCalculatorChange} />);

    // Check if the title is rendered
    expect(screen.getByText('Test Calculator')).toBeInTheDocument();

    // Simulate input changes
    const inputA = screen.getByLabelText('Field A');
    fireEvent.change(inputA, { target: { value: '3' } });
    const inputB = screen.getByLabelText('Field B');
    fireEvent.change(inputB, { target: { value: '4' } });

    // Since your Calculator component might handle the calculation and call the onCalculatorChange
    // asynchronously, you may need to use waitFor or other async utilities from React Testing Library
    // to wait for the expected callback call or state change.

    // Example of waiting for the onCalculatorChange callback to be called
    // await waitFor(() => expect(mockOnCalculatorChange).toHaveBeenCalled());
  });

  // You can add more tests to cover other functionalities
});

// import React from 'react';
// import { render, fireEvent, screen } from '@testing-library/react';
// import Laskuri from '../src/components/Calculator';
// import { Calculator } from '../src/types';

// const mockCalculator: Calculator = {
//     id: '123',
//     title: 'Esimerkki Laskuri',
//     fields: [
//         { name: 'Esimerkki Field', variable: 'esimerkkiVar', controlType: 'type', type: 'number', defaultValue: 0 }
//     ],
//     result: {
//         name: 'Tulos',
//         type: 'number',
//         ending: 'yksikkö'
//     },
//     formula: ''
// };
// const mockHandleInputChange = jest.fn();

// describe('Laskuri-komponentti', () => {
//     it('Renderöi laskurin ja käsittelee syötteitä', () => {
//         render(<Laskuri calculator={mockCalculator} onCalculatorChange={function (calculatorId: string, result: number): void {
//             throw new Error('Function not implemented.');
//         } } result={''} />);

//         // Laskurin otsikko renderöidään
//         expect(screen.getByText('Esimerkki Laskuri')).toBeInTheDocument();

//         // Löydä syötekenttä ja simuloi syötteen muutos
//         const input = screen.getByRole('spinbutton');
//         fireEvent.change(input, { target: { value: '123' } });

//         // handleInputChange kutsutaan oikein
//         expect(mockHandleInputChange).toHaveBeenCalledWith('123', 'esimerkkiVar', '123');
//     });
// });