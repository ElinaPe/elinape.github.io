import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Laskuri from '../src/components/Calculator';
import { Calculator } from '../src/types';

const mockCalculator: Calculator = {
    id: '123',
    title: 'Esimerkki Laskuri',
    fields: [
        { name: 'Esimerkki Field', variable: 'esimerkkiVar', controlType: 'type', type: 'number' }
    ],
    result: {
        name: 'Tulos',
        type: 'number',
        ending: 'yksikkö'
    },
    formula: ''
};
const mockHandleInputChange = jest.fn();

describe('Laskuri-komponentti', () => {
    it('Renderöi laskurin ja käsittelee syötteitä', () => {
        render(<Laskuri calculator={mockCalculator} handleInputChange={mockHandleInputChange} result="Ei tulosta" />);

        // Laskurin otsikko renderöidään
        expect(screen.getByText('Esimerkki Laskuri')).toBeInTheDocument();

        // Löydä syötekenttä ja simuloi syötteen muutos
        const input = screen.getByRole('spinbutton');
        fireEvent.change(input, { target: { value: '123' } });

        // handleInputChange kutsutaan oikein
        expect(mockHandleInputChange).toHaveBeenCalledWith('123', 'esimerkkiVar', '123');
    });
});