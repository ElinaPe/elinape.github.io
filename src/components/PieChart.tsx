import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, TooltipProps } from "recharts";
import { PieDiagram } from "../types";

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload }) => {
  if (active && payload && payload.length > 0 && payload[0].value !== undefined) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '5px', border: '1px solid #ccc', borderRadius: '10px' }}>
        <p className="label">{`${payload[0].name}: ${payload[0].value.toFixed(0)} €`}</p>
      </div>
    );
  }

  return null;
};

const COLORS = ["#0088FE", "#FFBB28", "#00C49F", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

interface PieChartComponentProps {
    data: PieDiagram['data']
}
const PieChartComponent: React.FC<PieChartComponentProps> = ({ data }) => {
    
  
    return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip active={undefined} payload={undefined} />} />
      <Legend align="right" verticalAlign="middle" layout="vertical" />
    </PieChart>
  );
}
export default PieChartComponent