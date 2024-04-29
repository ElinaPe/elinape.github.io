import React, { useState } from 'react';
import { usePDF } from 'react-to-pdf';
import CalculatorContainer from './CalculatorContainer';
import { TabData } from '../types';


interface PdfReportProps {
    tabData: TabData;
    updateTabData: (section: string, data: Record<string, any>) => void;
    showDiagrams: boolean; // Oletan että tämä on yksittäinen boolean arvo joka hallitsee näkyvyyttä
    setShowDiagrams: () => void;
}
  
  function PdfReport({ tabData, updateTabData, showDiagrams, setShowDiagrams }: PdfReportProps) {

    const { toPDF, targetRef } = usePDF({
        filename: 'complete-report.pdf',
    });
    const [isCreatingPdf, setIsCreatingPdf] = useState(false);

    const handleCreatePdf = async () => {
        setIsCreatingPdf(true); 
        setTimeout(async () => {
            await toPDF();
            setIsCreatingPdf(false); 
        }, 10); 
    };


    return (
        <div className='printingPdf'>
            <button onClick={handleCreatePdf}>Luo PDF</button>
            <div ref={targetRef} style={{ 
            // opacity: isCreatingPdf ? 1 : 0,
            padding: 20
        }}>
            
            <CalculatorContainer
                activeSection="Landing"
                updateTabData={updateTabData}
                tabData={tabData}
                showDiagrams={showDiagrams}
                setShowDiagrams={setShowDiagrams}
            /> 
            <CalculatorContainer 
                activeSection="DailyWork" 
                updateTabData={updateTabData}
                tabData={tabData}
                showDiagrams={showDiagrams}
                setShowDiagrams={setShowDiagrams}
            />
            <div className='pageChange'>
            <CalculatorContainer  
                activeSection="PlanningWork" 
                updateTabData={updateTabData}
                tabData={tabData}
                showDiagrams={showDiagrams}
                setShowDiagrams={setShowDiagrams} 
                />
            </div>
                <CalculatorContainer 
                activeSection="TransportCosts" 
                updateTabData={updateTabData}
                tabData={tabData}
                showDiagrams={showDiagrams}
                setShowDiagrams={setShowDiagrams}
                />
            </div>
        </div>
    );
}

export default PdfReport;