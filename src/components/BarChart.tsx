import { Slider } from "@mui/material";
import React, { useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
// import { Diagram } from "../types";



// Määritellään BarItem ja Entry interfaceja
interface BarItem {
  value: number;
  name: string;
  id?: string;
}

interface Entry {
  name: string;
  [key: string]: string | number; // Lisätään indeksiallekirjoitus
}

// Oletetaan, että Diagram interface sisältää kaikki tarvittavat kentät
interface Diagram {
  xAxisDatakey: Array<{ name: string }>;
  barDataKey: BarItem[];
}
interface BarChartBarProps {
  diagram: Diagram;
}

const BarChartBar: React.FC<BarChartBarProps> = ({ diagram }) => {
  console.log('diagram: ', diagram)

  const convertDiagramData = (diagram: Diagram): Entry[] => {
    return diagram.xAxisDatakey.map((xAxisItem) => {
      console.log('xAxisItemit',xAxisItem)
      const entry: Entry = { name: xAxisItem.name };
      console.log('entry: ', entry)
      diagram.barDataKey.forEach((barItem) => {
        entry[barItem.name] = barItem.value;
        console.log('bar itemien nimi:', barItem.name, 'bar itemien arvo:', barItem.value);      });
      return entry;
    });
  };

const diagramData = convertDiagramData(diagram);
console.log('diagramdata barchartista',diagramData)
console.log('diagramdata[0]',diagramData[0])


  return (
    <div>
      <ResponsiveContainer width="100%" aspect={1.5}>
        <BarChart data={diagramData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.keys(diagramData[0] || {}).filter(key => key !== 'name').map((dataKey, index) => (
            <Bar key={index} dataKey={dataKey} fill={index % 2 === 0 ? "#8884d8" : "#82ca9d"} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    {/* <Slider
      step={1}
      min={growthRate.min}
      max={growthRate.max}
      onChange={(event, newValue) => onGrowthRateChange(growthRate.value, Array.isArray(newValue) ? newValue[0] : newValue)}
      valueLabelDisplay="auto"
      aria-labelledby="input-slider"
      marks={growthRate.marks}
    /> */}
    </div>
  );
}

export default BarChartBar