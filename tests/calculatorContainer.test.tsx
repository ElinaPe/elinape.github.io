import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CalculatorContainer from '../src/components/CalculatorContainer';
import { Calculator, Diagram, PieDiagram } from '../src/types';
import * as pdfLib from 'react-to-pdf'; // Mock this if used in the component

// Mock for usePDF hook from react-to-pdf
jest.mock('react-to-pdf', () => ({
  usePDF: () => ({
    toPDF: jest.fn(),
    targetRef: React.createRef(),
  })
}));

// Provide some fake data similar to what the yaml might load
const mockData = {
  Headings: { DailyWork: "Daily Work Calculations" },
  Pylvasdiagrammit: [{ id: 'bar1', section: 'DailyWork', barDataKey: [] }],
  Piirakkadiagrammit: [{ id: 'pie1', section: 'DailyWork', data: [] }],
  // Include other necessary mock setup data here
};

// Tests go here
describe('CalculatorContainer', () => {
    it('renders without crashing', () => {
        render(<CalculatorContainer activeSection="DailyWork" updateTabData={jest.fn()} tabData={{}} showDiagrams={false} setShowDiagrams={jest.fn()} />);
        // Adjust the expected text to match what is actually being rendered
        expect(screen.getByText('Ajansäästö päivittäisessä koordinoinnissa')).toBeInTheDocument();
      });

    it('toggles diagrams visibility when the button is clicked', () => {
    const setShowDiagramsMock = jest.fn();
    render(<CalculatorContainer activeSection="DailyWork" updateTabData={jest.fn()} tabData={{}} showDiagrams={false} setShowDiagrams={setShowDiagramsMock} />);
    const button = screen.getByText(/näytä pylväät/i);
    fireEvent.click(button);
    expect(setShowDiagramsMock).toHaveBeenCalled();
    });
    
    // it('generates a PDF when print button is clicked', () => {
    // const { toPDF } = pdfLib.usePDF();
    // render(<CalculatorContainer activeSection="TransportCosts" updateTabData={jest.fn()} tabData={{}} showDiagrams={true} setShowDiagrams={jest.fn()} />);
    // const printBtn = screen.getByRole('button', { name: /print/i });
    // fireEvent.click(printBtn);
    // expect(toPDF).toHaveBeenCalled();
    // });

});