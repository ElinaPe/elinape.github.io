import React, { useState } from 'react';
import { TextField, Slider } from '@mui/material';
import { Field } from '../types';



interface CustomInputProps {
    field: Field;
    onChange: (variable: string, value: string | number) => void;
}
const CustomInput: React.FC<CustomInputProps> = ({ field, onChange }) => {

    switch (field.controlType) {
        case 'type':
            // Render a TextField for numeric input with debounce feature (not implemented in this code snippet).
            return (
              <div className='inputTextField'>
                <label htmlFor="inputId">{field.name}</label>
                <TextField id="inputId"
                type="number"
                defaultValue={field.defaultValue}
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
                    defaultValue={field.defaultValue}
                    step={field.step}
                    min={field.min}
                    max={field.max}
                    onChange={(event, newValue) => onChange(field.variable, Array.isArray(newValue) ? newValue[0] : newValue)}
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
