import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface BarChartBarProps {
  currentTotalCost: number;
  growthRate: number;
}

const BarChartBar: React.FC<BarChartBarProps> = ({ currentTotalCost, growthRate }) => {// Oletetaan, että tämä arvo on saatu jostain laskurista
// const currentTotalCost = 1576; // Nykyiset kokonaiskustannukset tältä vuodelta
const joskusTotalKoulukyytiCost= 15000;
// Kerroin tulevaisuuden vuosien kustannusten kasvulle
// const growthRate = 1.1; // 10% kasvu per vuosi

const data = [
  {
    name: "Vuosi 1",
    Kustannukset: currentTotalCost,
    KouluKustannukset: joskusTotalKoulukyytiCost,
  },
  {
    name: "Vuosi 2",
    Kustannukset: currentTotalCost * growthRate, // Kasvata nykyisiä kustannuksia 10%
    KouluKustannukset: joskusTotalKoulukyytiCost * growthRate,
  },
  {
    name: "Vuosi 3",
    Kustannukset: currentTotalCost * growthRate * growthRate, // Kasvata ensi vuoden kustannuksia vielä 10%
    KouluKustannukset: joskusTotalKoulukyytiCost * growthRate * growthRate,
  },
];


  return (
    // <ResponsiveContainer width="100%" height="300" aspect={0}>
      <BarChart
        width={700}
        height={500}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Kustannukset" fill="#8884d8" />
        <Bar dataKey="KouluKustannukset" fill="#7784d8" />

      </BarChart>
    // </ResponsiveContainer>
  );
}

export default BarChartBar