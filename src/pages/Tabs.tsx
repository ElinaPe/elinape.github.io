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
    

  const [value, setValue] = useState(0);
  const [tabData, setTabData] = useState<TabData>({
    LaskuritEtusivu: {},
    Laskurit: {},
    Suunnittelu: {},
    Kuljetuskustannukset: {},
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
const tabNames=['LaskuritEtusivu', 'Laskurit', 'Suunnittelu', 'Kuljetuskustannukset'];

return (
    <div>
      <BottomAppBar position="fixed">
        <Tabs value={value} onChange={handleChange} aria-label="tabs" centered>
          <CustomTab label="Esitiedot" />
          <CustomTab label="Peruutukset" />
          <CustomTab label="Suunnittelu" />
          <CustomTab label="Kuljetuskustannukset" />
        </Tabs>
      </BottomAppBar>
      <TabPanel value={value} index={0}>
      <CalculatorContainer activeSection={tabNames[0]} updateTabData={updateTabData} tabData={tabData} />
      </TabPanel>
      <TabPanel value={value} index={1}>
      <CalculatorContainer activeSection={tabNames[1]} updateTabData={updateTabData} tabData={tabData} />
      </TabPanel>
      <TabPanel value={value} index={2}>
      <CalculatorContainer activeSection={tabNames[2]} updateTabData={updateTabData} tabData={tabData} />
      </TabPanel>
      <TabPanel value={value} index={3}>
      <CalculatorContainer activeSection={tabNames[3]} updateTabData={updateTabData} tabData={tabData} />
      </TabPanel>
    </div>
  );
}