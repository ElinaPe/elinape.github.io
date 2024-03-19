// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import CustomInput from '../../src/components/Input';
// import { TextField } from '@mui/material';
// import { Field } from '../../src/types';


// describe('CustomInput Component', () => {
//   it('renders TextField and calls onChange on input change for type controlType', () => {
//     const mockOnChange = jest.fn();
//     const fieldProps = {
//       name: 'Test Field',
//       variable: 'test',
//       controlType: 'type',
//       type: 'number',
//     };

    

//     render(<CustomInput field={fieldProps} onChange={mockOnChange} />);
//     const inputElement = screen.getByRole('textbox');
//     fireEvent.change(inputElement, { target: { value: '123' } });

//     expect(inputElement).toBeInTheDocument();
//     expect(mockOnChange).toHaveBeenCalledWith('test', '123');
//   });

//   // Voit lisätä vastaavan testin Slider-komponentille
// });