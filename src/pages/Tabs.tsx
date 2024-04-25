import React, { useMemo, useState } from 'react';
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


  const [selectedTab, setSelectedTab] = useState(0);
  const [tabData, setTabData] = useState<TabData>({
    LaskuritEtusivu: {},
    Laskurit: {},
    Suunnittelu: {},
    Kuljetuskustannukset: {},
  });

  const handleChange = (_event: unknown, newValue: number) => {
    setSelectedTab(newValue);
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
  const tabNames = ['LaskuritEtusivu', 'Laskurit', 'Suunnittelu', 'Kuljetuskustannukset'];

  return (
    <div>
      <BottomAppBar position="fixed">
        <Tabs value={selectedTab} onChange={handleChange} aria-label="tabs" centered>
          <CustomTab label="Esitiedot" />
          <CustomTab label="Peruutukset" />
          <CustomTab label="Suunnittelu" />
          <CustomTab label="Kuljetuskustannukset" />
        </Tabs>
      </BottomAppBar>
      <TabPanel value={0} index={0}>
        <div style={{ display: selectedTab === 0 ? 'block' : 'none' }}>
          <CalculatorContainer activeSection="LaskuritEtusivu" updateTabData={updateTabData} tabData={tabData} />
        </div>
        <div style={{ display: selectedTab === 1 ? 'block' : 'none' }}>
          <CalculatorContainer activeSection="Laskurit" updateTabData={updateTabData} tabData={tabData} />
        </div>
        <div style={{ display: selectedTab === 2 ? 'block' : 'none' }}>
          <CalculatorContainer activeSection="Suunnittelu" updateTabData={updateTabData} tabData={tabData} />
        </div>
        <div style={{ display: selectedTab === 3 ? 'block' : 'none' }}>
          <CalculatorContainer activeSection="Kuljetuskustannukset" updateTabData={updateTabData} tabData={tabData} />
        </div>
      </TabPanel>
    </div>
  );
}