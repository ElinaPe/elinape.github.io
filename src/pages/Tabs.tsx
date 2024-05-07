import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Typography, Box, styled } from '@mui/material';
import CalculatorContainer from '../components/CalculatorContainer';
import PdfReport from '../components/pdf';
import SaveButton from '../modals/saveModal';

interface TabData {
  [section: string]: { [name: string]: number | null };
}

function TabPanel(props: { [x: string]: any; children: any; value: any; index: any; }) { // TabPanel vastaa yksittäisen välilehden sisällön renderöinnistä
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, borderColor: 'divider' }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const BottomAppBar = styled(AppBar)({
  top: 'auto',
  bottom: 0,
  background: '#fff',
});

const CustomTab = styled(Tab)({
  fontSize: '1.3rem'
});

export default function SimpleTabs() {

  const sections = ['Landing', 'DailyWork', 'PlanningWork', 'TransportCosts'];
  const [selectedTab, setSelectedTab] = useState(0);
  const [tabData, setTabData] = useState<TabData>({
    Landing: {},
    DailyWork: {},
    PlanningWork: {},
    TransportCosts: {},
  });

  const [showDiagrams, setShowDiagrams] = useState<{ [key: string]: boolean }>(
    sections.reduce((acc, section) => ({ ...acc, [section]: false }), {})
  );

 const handleChange = (_event: any, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleToggleDiagrams = (section: string) => {
    setShowDiagrams(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const updateTabData = (section: string, data: object) => {
    setTabData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }));
  };

  return (
    <div>
      <BottomAppBar position="fixed">
        <Tabs value={selectedTab} onChange={handleChange} aria-label="tabs" centered>
          <CustomTab label="Esitiedot" />
          <CustomTab label="Päivittäinen työ" />
          <CustomTab label="Suunnittelutyö" />
          <CustomTab label="Kuljetuskustannukset" />
        </Tabs>
      </BottomAppBar>
      <TabPanel value={0} index={0}>
      
        <div>
            {sections.map((section, index) => (
                <div key={section} style={{ display: index === selectedTab ? 'block' : 'none' }}>
                  <CalculatorContainer
                    activeSection={section}
                    tabData={tabData}
                    updateTabData={updateTabData}
                    // defaultValues={{
                    //   taksitUusi: tabData.Landing['result_taksitLkm'] // Tässä välitetään ensimmäisen laskurin tulosta toiselle laskurille.
                    // }}
                    showDiagrams={showDiagrams[section]}
                    setShowDiagrams={() => handleToggleDiagrams(section)}
                    />
                    {/* {index === sections.length - 1 && (
                      <PdfReport tabData={tabData} updateTabData={updateTabData} showDiagrams={showDiagrams[section]} setShowDiagrams={() => handleToggleDiagrams(section)} />
                  )} */}
                </div>
            ))}
        </div>
        
      </TabPanel>
    </div>
  );
}