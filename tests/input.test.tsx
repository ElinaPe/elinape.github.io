import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomInput from '../src/components/Input';
import { Field } from '../src/types'

/**
 * Tests the `CustomInput` component for proper rendering and functionality.
 * This includes checking if text fields render correctly and trigger onChange events.
 */
describe('CustomInput Component', () => {
   /**
   * Ensures that the CustomInput component renders a TextField and that
   * the onChange handler is called when its value changes.
   */
   it('renders TextField and calls onChange', () => {
     // Mock function to handle changes
    const handleChange = jest.fn();
     // Field properties used for the CustomInput component
    const fieldProps: Field = {
      name: 'Test Field',
      variable: 'testVariable',
      controlType: 'type',
      defaultValue: 0,
    };
    // Render the CustomInput with the specified properties
    render(<CustomInput field={fieldProps} onChange={handleChange} />);

    // Find the input by its label and simulate a change event
    const input = screen.getByLabelText(fieldProps.name);
    fireEvent.change(input, { target: { value: '5' } });

    // Expect the handleChange function to be called correctly
    expect(handleChange).toHaveBeenCalledWith(fieldProps.variable, '5');
  });

  /**
   * Verifies that a slider input is rendered correctly and that it triggers onChange
   * with the correct value when interacted with.
   */
  it('renders a slider and calls onChange with the correct value', () => {
    const handleChange = jest.fn();
    const fieldProps: Field = {
      name: 'Test Slider',
      variable: 'testSlider',
      controlType: 'slider',
      min: 0,
      max: 100,
      marks: [{value: 0, label: '0%'}, {value: 100, label: '100%'}],
      defaultValue: 0,
    };

    // Render the CustomInput with a slider
    render(<CustomInput field={fieldProps} onChange={handleChange} />);
    const sliderElement = screen.getByRole('slider');
    fireEvent.change(sliderElement, { target: { value: 50 } }); 

    // Check if the onChange handler was invoked
    expect(handleChange).toHaveBeenCalledWith(fieldProps.variable, 50); 
  });
});