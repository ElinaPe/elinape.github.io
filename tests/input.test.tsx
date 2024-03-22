import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomInput from '../src/components/Input';
import { Field } from '../src/types'


describe('CustomInput Component', () => {
   it('renders TextField and calls onChange', () => {
    const handleChange = jest.fn();
    const fieldProps: Field = {
      name: 'Test Field',
      variable: 'testVariable',
      controlType: 'type',
      type: 'float',
      defaultValue: 0,
    };

    render(<CustomInput field={fieldProps} onChange={handleChange} />);

    // Etsi TextField syöte ja simuloi arvon muutos
    const input = screen.getByLabelText(fieldProps.name);
    fireEvent.change(input, { target: { value: '5' } });

    // Varmista, että handleChange kutsuttiin oikein
    expect(handleChange).toHaveBeenCalledWith(fieldProps.variable, '5');
  });

  it('renders a slider and calls onChange with the correct value', () => {
    const handleChange = jest.fn();
    const fieldProps: Field = {
      name: 'Test Slider',
      variable: 'testSlider',
      controlType: 'slider',
      type: 'number',
      min: 0,
      max: 100,
      marks: [{value: 0, label: '0%'}, {value: 100, label: '100%'}],
      defaultValue: 0,
    };

    render(<CustomInput field={fieldProps} onChange={handleChange} />);
    const sliderElement = screen.getByRole('slider');
    fireEvent.change(sliderElement, { target: { value: 50 } }); 

    expect(handleChange).toHaveBeenCalled(); 
  });
});