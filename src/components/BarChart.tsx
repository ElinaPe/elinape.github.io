import { Slider } from "@mui/material";
import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from "recharts";

interface BarItem {
  id?: string;
  name: string;
  value: number;
  isTime: boolean;
}

interface Entry {
  name: string;
  [key: string]: string | number; 
}

interface GrowthRate {
  value: number;
  min: number;
  max: number;
  marks: { value: number; label: string }[];
  isVisible: boolean;
}

interface Diagram {
  xAxisDatakey: Array<{ name: string }>;
  barDataKey: BarItem[];
  growthRate: GrowthRate;
}

interface BarChartBarProps {
  diagram: Diagram;
}

const BarChartBar: React.FC<BarChartBarProps> = ({ diagram }) => {

  const [growthRate, setGrowthRate] = useState(3);
  
  const convertDiagramData = (diagram: Diagram): Entry[] => {
    // Muunnetaan growthRate prosentista kertoimeksi
    const growthMultiplier = 1 + (growthRate / 10)
    
    return diagram.xAxisDatakey.map((xAxisItem, index) => {
      const entry: Entry = { name: xAxisItem.name };
      diagram.barDataKey.forEach((barItem) => {
        let valueYear
        if(!barItem.isTime) {
          valueYear = barItem.value * 12
        }
        else{
          const year = barItem.value / 60 * 22 * 12
          valueYear = Math.round(year)
        }
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
      });
      return entry;
    });
  };
  const diagramData = convertDiagramData(diagram);

    

const handleGrowthRateChange = (event: Event, newValue: number | number[]) => {
  setGrowthRate(Array.isArray(newValue) ? newValue[0] : newValue);
};

// const formatDuration = (value) => {

//   const hours = Math.floor(value / 60);
//   const mins = Math.round(value % 60);
//   return `${hours}h ${mins}min`;
// };


// const parseDuration = (durationMin: number) => {
//   const m = Number(durationMin);
//   const h = Math.floor(m / 60);
//   const remainingMinutes = m % 60;
//   const hDisplay = h === 0 ? "" : `${h}h `;
//   const mDisplay = remainingMinutes === 0 ? "" : (remainingMinutes < 10 ? `${remainingMinutes}min` : `${remainingMinutes}min`);
//   return hDisplay + mDisplay;
// };

  return (
    <div className="barChartDiv">
      <ResponsiveContainer width="70%" aspect={1.4}>
        <BarChart data={diagramData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.keys(diagramData[0] || {}).filter(key => key !== 'name').map((dataKey, index) => (
          <Bar key={index} dataKey={dataKey} fill={index % 2 === 0 ? "#8884d8" : "#82ca9d"}>
            <LabelList dataKey={dataKey} position="top" />
          </Bar>
        ))}
        </BarChart>
      </ResponsiveContainer>
      {diagram.growthRate.isVisible && (
        <div className="chartSlider">
      <Slider
        step={0.1}
        min={diagram.growthRate.min}
        max={diagram.growthRate.max}
        value={growthRate}
        onChange={handleGrowthRateChange}
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