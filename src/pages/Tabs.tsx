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
  const [loginId, setLoginId] = useState<number>(0);

 useEffect(() => {
    const storedUser = localStorage.getItem("username")
    if (storedUser !== null)
      setLoggedUser(storedUser)
  
 }, [])

  const handleChange = (_event: any, newValue: number) => {
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

  const handleClose = () => {
    setOpen(false);
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
      <TabPanel value={0} index={0}>
      
        <div>
            {sections.map((section, index) => (
                <div key={section} style={{ display: index === selectedTab ? 'block' : 'none' }}>
                  <CalculatorContainer
                  activeSection={section}
                  tabData={tabData}
                  updateTabData={updateTabData}
                  showDiagrams={showDiagrams[section]}
                  setShowDiagrams={() => handleToggleDiagrams(section)}
                  loggedUser={loggedUser} 
                  loginId={loginId}                    
                  // globalData={globalData}
                    // setGlobalData={handleSetGlobalData}
                    />
                    {/* {index === sections.length - 1 && (
                      <PdfReport tabData={tabData} updateTabData={updateTabData} showDiagrams={showDiagrams[section]} setShowDiagrams={() => handleToggleDiagrams(section)} />
                  )} */}
                </div>
            ))}
        </div>
        
      </TabPanel>
      <TabPanel value={1} index={1}>
        {loggedUser && selectedTab === sections.length ? (
          <ResultsList
            setLoggedUser={setLoggedUser}
            loggedUser={loggedUser}
            setSelectedTab={setSelectedTab}
            setOpen={setOpen} 
            loginId={loginId}          />
        ) : (
          <LoginModal open={open} onClose={handleClose} setLoggedUser={setLoggedUser} setSelectedTab={setSelectedTab} setLoginId={setLoginId} />
        )}
      </TabPanel>
    </div>
  );
}
