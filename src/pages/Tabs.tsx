import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Typography, Box, styled } from '@mui/material';
import CalculatorContainer from '../components/CalculatorContainer';

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
        <Box sx={{ p: 3, borderColor: 'divider'}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
} 

export default function SimpleTabs() {
    const BottomAppBar = styled(AppBar)({
        top: 'auto',
        bottom: 0,
        background: '#fff',
      });

  const [value, setValue] = useState(0);
  const [tabData, setTabData] = useState<TabData>({
    LaskuritEtusivu: {},
    Laskurit: {},
});

  const handleChange = (_event: unknown, newValue: number) => {
    setValue(newValue);
  };

  const updateTabData = (section:string, data:object) => {
    setTabData(prev => ({
        ...prev,
        [section]: {
            ...prev[section],
            ...data,
        },
    }));
};
const tabNames=['LaskuritEtusivu', 'Laskurit', 'Suunnittelu'];

return (
    <div>
      <BottomAppBar position="fixed">
        <Tabs value={value} onChange={handleChange} aria-label="tabs" centered>
          <Tab label="Esitiedot" />
          <Tab label="Peruutukset" />
          <Tab label="Suunnittelu" />
        </Tabs>
      </BottomAppBar>
      <TabPanel value={value} index={0}>
      <CalculatorContainer activeSection={tabNames[0]} updateTabData={updateTabData} tabData={tabData} />
      </TabPanel>
      <TabPanel value={value} index={1}>
      <CalculatorContainer activeSection={tabNames[1]} updateTabData={updateTabData} tabData={tabData} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Suunnittelu sisältö...
      </TabPanel>
    </div>
  );
}