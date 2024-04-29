import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Laskuri from '../src/components/Calculator';
import { Calculator } from '../src/types'



describe('Laskuri', () => {
  let mockCalculator: Calculator;
  beforeEach(() => {
    mockCalculator = {
      id: 'test',
      title: 'Test Calculator',
      description: 'This is a test calculator.',
      isTime: false,
      isInteger: false,
      fields: [
        { name: 'Length', variable: 'length', controlType: 'type', defaultValue: 100 },
        { name: 'Width', variable: 'width', controlType: 'type', defaultValue: 10 }
      ],
      formula: 'length * width',
      result: {
        name: 'Area',
        value: 1000,
        unit: 'cm²'
      },
      cssClasses: ['calculator-class'],
      isVisible: true
    };
  });

  const mockOnCalculatorChange = jest.fn();

  it('renders the calculator title and input fields correctly', () => {
    render(<Laskuri calculator={mockCalculator} onCalculatorChange={mockOnCalculatorChange} />);
    expect(screen.getByText('Test Calculator')).toBeInTheDocument();
    const input = screen.getByDisplayValue('100');
    expect(input).toBeInTheDocument();
  });

  it('updates the field value on user input', () => {
    render(<Laskuri calculator={mockCalculator} onCalculatorChange={mockOnCalculatorChange} />);
    const input = screen.getByDisplayValue('100') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '150' } });
    expect(input.value).toBe('150');
  });

  it('displays the correct result based on input', () => {
    mockCalculator.fields![0].defaultValue = 150;
    mockCalculator.result.value = 1500; // Since width is 50 and length is now 150
    render(<Laskuri calculator={mockCalculator} onCalculatorChange={mockOnCalculatorChange} />);
  
    // Use a regular expression to allow for flexible matching
    const resultRegex = /Area\s*:\s*1500\.00\s*cm²/;
    const result = screen.getByText(resultRegex);
    expect(result).toBeInTheDocument();
  });

  it('calls onCalculatorChange when the result changes', async () => {
    render(<Laskuri calculator={mockCalculator} onCalculatorChange={mockOnCalculatorChange} />);
    const input = screen.getByDisplayValue('100') as HTMLInputElement;

    // Simulate changing the input value which should trigger calculation
    fireEvent.change(input, { target: { value: '200' } });

    // Wait for any asynchronous effects to complete before checking the final call
    await waitFor(() => {
      // Assuming the calculation should be length 200 * width 50
      // You need to ensure the `width` is considered correctly in the component
      expect(mockOnCalculatorChange).toHaveBeenLastCalledWith('test', 2000); // width 50 * new length 200
    });
});
});