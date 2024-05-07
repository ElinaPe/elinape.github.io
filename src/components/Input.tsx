import React, { useState } from 'react';
import { TextField, Slider, Input, styled } from '@mui/material';
import { Field } from '../types';


interface CustomInputProps {
    field: Field;
    onChange: (variable: string, value: string | number) => void;
}


const InputBox = styled(Input)({
  width: '6em',
  height: '1.5em',
  alignItems: 'center',
  fontSize:'15px',
  fontWeight: 'bold',
})
  

const CustomInput: React.FC<CustomInputProps> = ({ field, onChange }) => {

  const [sliderValue, setSliderValue] = useState(field.defaultValue)


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
                <div className='sliderValue'>
                <Slider
                    defaultValue={field.defaultValue}
                    step={field.step}
                    min={field.min}
                    max={field.max}

                    onChangeCommitted={(event, newValue) => {
                      onChange(field.variable, Array.isArray(newValue) ? newValue[0] : newValue)
                      setSliderValue(Array.isArray(newValue) ? newValue[0] : newValue)}
                    }
                    valueLabelDisplay="auto"
                    aria-labelledby="input-slider"
                    marks={field.marks}
                />
                <InputBox
                    type="number"
                    value={sliderValue || ''}
                    onChange={(e) => {
                        const newValue = parseFloat(e.target.value);
                        setSliderValue(isNaN(newValue) ? 0 : newValue);
                        onChange(field.variable, isNaN(newValue) ? 0 : newValue);
                    }}
                    onBlur={() => {
                      if (field && field.min !== undefined && field.max !== undefined) {
                        if (sliderValue < field.min) {
                            setSliderValue(field.min);
                            onChange(field.variable, field.min);
                        } else if (sliderValue > field.max) {
                            setSliderValue(field.max);
                            onChange(field.variable, field.max);
                        }
                      }
                    }}
                />
                {/* <label>{sliderValue}</label> */}
                </div>
              </div>
            );
        default:
            // Return null for unrecognized control types.
            return null;
    }
  };

export default CustomInput;
