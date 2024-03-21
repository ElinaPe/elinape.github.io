import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomInput from '../src/components/Input';
import { Field } from '../src/types'


describe('CustomInput Component', () => {
  it('renders TextField and calls onChange on input change for type controlType', () => {
    const mockOnChange = jest.fn();
    const fieldProps: Field = {
      name: 'Test Field',
      variable: 'test',
      controlType: 'type', 
      type: 'number',
    };

    render(<CustomInput field={fieldProps} onChange={mockOnChange} />);
    const inputElement = screen.getByRole('spinbutton');
    fireEvent.change(inputElement, { target: { value: '123' } });

    expect(inputElement).toBeInTheDocument();
    expect(mockOnChange).toHaveBeenCalledWith('test', '123');
  });

  it('renders a slider and calls onChange with the correct value', () => {
    const mockOnChange = jest.fn();
    const fieldProps: Field = {
      name: 'Test Slider',
      variable: 'testSlider',
      controlType: 'slider',
      type: 'number',
      min: 0,
      max: 100,
      marks: [{value: 0, label: '0%'}, {value: 100, label: '100%'}],
    };

    render(<CustomInput field={fieldProps} onChange={mockOnChange} />);
    const sliderElement = screen.getByRole('slider');
    fireEvent.change(sliderElement, { target: { value: 50 } }); 

    expect(mockOnChange).toHaveBeenCalled(); 
  });
});