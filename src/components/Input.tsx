import React, { useState } from 'react';
import { TextField, Slider, Input, styled, Checkbox, FormControlLabel } from '@mui/material';
import { Field } from '../types';


interface CustomInputProps {
    field: Field; // Kentän tiedot, kuten nimi, tyyppi, oletusarvo jne.
    onChange: (variable: string, value: string | number | boolean) => void; // Muutoksen käsittelyfunktio
}

// Tyylitelty syötekenttä, jossa määriteltyä leveyttä ja fonttityyliä
const InputBox = styled(Input)({
  width: '6em',
  height: '1.5em',
  alignItems: 'center',
  fontSize:'15px',
  fontWeight: 'bold',
})
  
const CustomInput: React.FC<CustomInputProps> = ({ field, onChange }) => {

  const [sliderValue, setSliderValue] = useState(field.defaultValue)
  const [checkboxValue, setCheckboxValue] = useState(true); 

    switch (field.controlType) { // Tarkastetaan kentän tyyppi ja renderöidään sen mukaan
        case 'type':
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
            case 'checkbox':
              return (
                <div className='checkboxField'>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkboxValue}
                        onChange={(e) => {
                          setCheckboxValue(e.target.checked);
                          onChange(field.variable, e.target.checked ? field.defaultValue : 0);
                        }}
                        name={field.name}
                        color="primary"
                      />
                    }
                    label={field.name}
                  />
                </div>
              );
        default: // Jos kentän tyyppiä ei tunnisteta, ei renderöidä mitään
            return null;
    }
  };

export default CustomInput;
