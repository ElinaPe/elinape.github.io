import React, { useState } from 'react';
import { usePDF } from 'react-to-pdf';
import CalculatorContainer from './CalculatorContainer';
import { TabData } from '../types';


interface PdfReportProps {
    tabData: TabData;
    updateTabData: (section: string, data: Record<string, any>) => void;
    showDiagrams: boolean;
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
        }, 50); 
    };


    return (
        <div className='printingPdf'>
            <button onClick={handleCreatePdf} aria-label="Print">Luo PDF</button>
            <div ref={targetRef} style={{ 
            visibility: isCreatingPdf ? 'visible' : 'hidden',
            // position: isCreatingPdf ? 'relative' : 'absolute',
            // left: isCreatingPdf ? '0' : '-9999px',
            padding: 20
        }}>
            
            <CalculatorContainer
                activeSection="Landing"
                updateTabData={updateTabData}
                tabData={tabData}
                showDiagrams={showDiagrams}
                setShowDiagrams={setShowDiagrams} loggedUser={''} loginId={0}           
                /> 
           <div style={{height:200}}></div>
            <CalculatorContainer 
                activeSection="DailyWork" 
                updateTabData={updateTabData}
                tabData={tabData}
                showDiagrams={showDiagrams}
                setShowDiagrams={setShowDiagrams}
                loggedUser={''} 
                loginId={0}
            />
            <div className='pageChange'>
            <CalculatorContainer  
                activeSection="PlanningWork" 
                updateTabData={updateTabData}
                tabData={tabData}
                showDiagrams={showDiagrams}
                setShowDiagrams={setShowDiagrams} 
                loggedUser={''} 
                loginId={0}
                />
            </div>
            <div style={{height:200}}></div>
                <CalculatorContainer 
                activeSection="TransportCosts" 
                updateTabData={updateTabData}
                tabData={tabData}
                showDiagrams={showDiagrams}
                setShowDiagrams={setShowDiagrams}
                loggedUser={''} 
                loginId={0}
                />
            </div>
        </div>
    );
}

export default PdfReport;