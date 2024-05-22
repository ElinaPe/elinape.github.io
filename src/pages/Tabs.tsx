import React, { useEffect, useState } from 'react';
import { AppBar, Tabs, Tab, Typography, Box, styled } from '@mui/material';
import CalculatorContainer from '../components/CalculatorContainer';
import LoginModal from '../modals/loginModal';
import ResultsList from './ResultsList';

interface TabData {
  [section: string]: { [name: string]: number | null };
}

function TabPanel(props: { [x: string]: any; children: any; value: any; index: any; }) {
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
  const [open, setOpen] = useState(false);
  const [tabData, setTabData] = useState<TabData>({
    Landing: {},
    DailyWork: {},
    PlanningWork: {},
    TransportCosts: {},
  });

  const [showDiagrams, setShowDiagrams] = useState<{ [key: string]: boolean }>(
    sections.reduce((acc, section) => ({ ...acc, [section]: false }), {})
  );

  const [loggedUser, setLoggedUser] = useState<string>('')

 useEffect(() => {
    const storedUser = localStorage.getItem("username")
    if (storedUser !== null)
      setLoggedUser(storedUser)
  
 }, [])

  const handleChange = (_event: any, newValue: number) => {
    console.log('testataan sectioiden määrä',sections.length +1)
    if (newValue === sections.length) {
      if (loggedUser) {
        setSelectedTab(newValue); // Avaa "X" -välilehti ja näyttää ResultsList
      } else {
        setOpen(true); // Avaa modaalin
      }
    } else {
      setSelectedTab(newValue);
    }
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
          <CustomTab label="X" /> 
        </Tabs>
      </BottomAppBar>
      {sections.map((section, index) => (
        <TabPanel key={section} value={selectedTab} index={index}>
          <CalculatorContainer
            activeSection={section}
            tabData={tabData}
            updateTabData={updateTabData}
            showDiagrams={showDiagrams[section]}
            setShowDiagrams={() => handleToggleDiagrams(section)}
          />
        </TabPanel>
      ))}
      <TabPanel value={sections.length} index={sections.length}>
        {loggedUser && selectedTab === sections.length ? (
          <ResultsList
            setLoggedUser={setLoggedUser}
            setSelectedTab={setSelectedTab}
            setOpen={setOpen}
          />
        ) : (
          <LoginModal open={open} onClose={() => setOpen(false)} setLoggedUser={setLoggedUser} />
        )}
      </TabPanel>
    </div>
  );
}
