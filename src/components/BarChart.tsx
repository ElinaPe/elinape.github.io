import { Slider } from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from "recharts";
import { Diagram } from "../types";

//Määritellään Entry-rajapinta, joka sisältää nimen ja avain-arvo-pareja 
interface Entry {
  name: string;
  [key: string]: string | number;
}

interface BarChartBarProps {
  diagram: Diagram;
}

const BarChartBar: React.FC<BarChartBarProps> = ({ diagram }) => {

  //tilanhallinta kasvuprosentille, alustettu 3
  const [growthRate, setGrowthRate] = useState(3);

  //Muuntaa diagrammin datan Entry-taulukoksi
  const convertDiagramData = (diagram: Diagram): Entry[] => {
    //Growthrate kerroin (prosentit)
    const growthMultiplier = 1 + (growthRate / 10)

    return diagram.xAxisDatakey.map((xAxisItem, index) => {
      const entry: Entry = { name: xAxisItem.name };
      diagram.barDataKey.forEach((barItem) => {
        let valueYear
        if(barItem.value !== null){
          if(!barItem.isTime) { //Jos ei ole aikatieto, kerrotaan arvo 12
            valueYear = barItem.value * 12
          }
        else{
          const year = barItem.value / 60 / 24 * 22 * 12 //Jos on aikatieto, muunnetaan minuutit vuosiksi
          valueYear = Math.round(year)
        }
        //Lisätään arvo entryyn kasvukertoimen mukaan
        switch (index) {
          case 0:
            entry[barItem.name] = valueYear;
            break;
          case 1:
            entry[barItem.name] = valueYear * growthMultiplier;
            break;
          case 2:
            entry[barItem.name] = valueYear * growthMultiplier * growthMultiplier;
            break;
          default:
            entry[barItem.name] = valueYear;
            break;
        }
      }
      });
      return entry;
    });
  };
  //Muunnetaan diagrammin data
  const diagramData = convertDiagramData(diagram);

  //kasvuprosentin muutoksen käsittely
  const handleGrowthRateChange = (event: Event | SyntheticEvent<Element, Event>, newValue: number | number[]) => {
    setGrowthRate(Array.isArray(newValue) ? newValue[0] : newValue);
  };

// const parseDuration = (durationMin: number) => {
//   const minutes = Number(durationMin);
//   const hours = Math.floor(minutes / 60);
//   const days = Math.floor(hours / 24);
//   const remainingHours = hours % 24;
//   const remainingMinutes = minutes % 60;

//   const dDisplay = days === 0 ? "" : `${days}pv `;
//   const hDisplay = remainingHours === 0 ? "" : `${remainingHours}h `;
//   const mDisplay = remainingMinutes === 0 ? "" : `${remainingMinutes}min`;

//   return dDisplay + hDisplay + mDisplay;
// };

//Palkkien luonti datasta
const bars = diagram.barDataKey.map((barItem, index) => (
  <Bar
    key={index}
    dataKey={barItem.name}
    fill={index % 2 === 0 ? '#8884d8' : '#82ca9d'}
    unit={diagram.unit}
  >
    <LabelList
      formatter={(value: number) =>
        typeof value === 'number' ? `${value.toFixed(0)}${diagram.unit ?? ""}` : value
      }
      dataKey={barItem.name}
      position="top"
    />
  </Bar>
));

  return (
    <div className="barChartDiv">
      <ResponsiveContainer width="70%" aspect={1.4}>
        <BarChart data={diagramData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis unit={diagram.unit} />
          <Tooltip formatter={(value, name) => [typeof value === "number" ? value.toFixed(0) : value, name ]}/>
          <Legend />
          {bars}
        </BarChart>
      </ResponsiveContainer>
        {diagram.growthRate.isVisible && (
          <div className="chartSlider">
            <Slider
              step={0.1}
              min={diagram.growthRate.min}
              max={diagram.growthRate.max}
              defaultValue={3}
              onChangeCommitted={(event: Event | SyntheticEvent<Element, Event>, newValue: number | number[]) => {
                if(event instanceof Event){
                  handleGrowthRateChange(event, newValue)
                }
              }}
              valueLabelDisplay="auto"
              aria-labelledby="input-slider"
              marks={diagram.growthRate.marks}
            />
          </div>
        )}
    </div>
  );
}

export default BarChartBar