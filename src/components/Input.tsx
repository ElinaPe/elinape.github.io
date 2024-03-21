import React from 'react';
import { TextField, Slider } from '@mui/material';
import { Field } from '../types';

/**
 * CustomInput is a component that renders an input field based on the type specified in the `field` prop. 
 * It supports rendering a text field for numeric inputs and a slider. The component is controlled via the `onChange` prop,
 * which is called with the field's variable name and the new value whenever an input changes.
 * 
 * @param {CustomInputProps} props The props for the CustomInput component.
 * @param {Field} props.field The field object containing the configuration for the input. 
 * This includes the type of control (text field or slider), the variable name for the input, and additional parameters like min and max values for sliders.
 * @param {(variable: string, value: string | number) => void} props.onChange A callback function that is called when the value of the input changes. 
 * It receives the variable name of the field and the new value as parameters.
 * 
 * @returns {JSX.Element | null} A JSX element representing the input field based on the provided field configuration, or null if the control type is unrecognized.
 */

interface CustomInputProps {
    field: Field;
    onChange: (variable: string, value: string | number) => void;
}
const CustomInput: React.FC<CustomInputProps> = ({ field, onChange }) => {
    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        onChange(field.variable, Array.isArray(newValue) ? newValue[0] : newValue);
    };

    switch (field.controlType) {
        case 'type':
            // Render a TextField for numeric input with debounce feature (not implemented in this code snippet).
            return (
              <div className='inputTextField'>
                <label>{field.name}</label>
                <TextField
                type="number"
                onChange={(e) => onChange(field.variable, e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                />
              </div>
            );
            
        case 'slider':
            // Render a Slider component configured according to the field properties.
            return (
              <div className='slider'>
                <label>{field.name}</label>
                <Slider
                    defaultValue={typeof field.min === 'number' ? field.min : 0}
                    step={1}
                    min={field.min}
                    max={field.max}
                    onChange={handleSliderChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="input-slider"
                    marks={field.marks}
                />
              </div>
            );
        default:
            // Return null for unrecognized control types.
            return null; 
    }
  };

export default CustomInput;
