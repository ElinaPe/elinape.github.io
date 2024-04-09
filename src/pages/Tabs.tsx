import React from 'react';
import { AppBar, Tabs, Tab, Typography, Box, styled } from '@mui/material';
import CalculatorContainer from '../components/CalculatorContainer';

function TabPanel(props: { [x: string]: any; children: any; value: any; index: any; }) { // TabPanel vastaa yksittäisen välilehden sisällön renderöinnistä
  const { children, value, index, ...other } = props; /*children: Sisältää välilehden sisällön, joka näytetään, kun tämä välilehti on valittu.
  value: Nykyisen valitun välilehden indeksi.
  index: Tämän TabPanelin indeksi. Jos value (valitun välilehden indeksi) vastaa tätä index-arvoa, niin tämän TabPanelin sisältö näytetään.
  ...other: Muut propsit, jotka voivat sisältää esim. tyylejä tai muita attribuutteja. */
  

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
} //Tämä komponentti tarkistaa, vastaako sen index prop value propia. Jos ne vastaavat, komponentti näyttää sisältönsä; muussa tapauksessa sisältö pysyy piilossa.

export default function SimpleTabs() {
    const BottomAppBar = styled(AppBar)({
        top: 'auto',
        bottom: 0,
      });
    /*Aluksi määritellään tila value käyttäen useState-hookkia, alkuarvona 0. Tämä tila pitää kirjaa siitä, mikä välilehti on tällä hetkellä valittu.
handleChange-funktio muuttaa value-tilaa, kun käyttäjä vaihtaa välilehteä. Tämä funktio asetetaan Tabs-komponentin onChange-propille. */
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 /*AppBar luo sovelluspalkin, joka toimii välilehtirivin "taustana".
Tabs-komponentti sisältää välilehdet (Tab). Sen value-prop on sidottu value-tilaan, 
mikä tarkoittaa, että Tabs näyttää visuaalisesti, mikä välilehti on aktiivinen. 
Kun välilehtien välillä vaihdetaan, onChange käynnistää handleChange-funktion, joka päivittää tilan.

Lopuksi renderöidään kolme TabPanel-komponenttia, jotka vastaavat välilehtien sisältöjä:

Esitiedot: Tämä sisältö näytetään, kun ensimmäinen välilehti on valittu.
Peruutukset: Tämä sisältö näytetään, kun toinen välilehti on valittu.
Suunnittelu: Tämä sisältö näytetään, kun kolmas välilehti on valittu.*/
  return (
    <div>
      <BottomAppBar position="fixed">
        <Tabs value={value} onChange={handleChange} aria-label="tabs">
          <Tab label="Esitiedot" />
          <Tab label="Peruutukset" />
          <Tab label="Suunnittelu" />
        </Tabs>
      </BottomAppBar>
      <TabPanel value={value} index={0}>
        Esitiedot sisältö...
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CalculatorContainer />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Suunnittelu sisältö...
      </TabPanel>
    </div>
  );
}