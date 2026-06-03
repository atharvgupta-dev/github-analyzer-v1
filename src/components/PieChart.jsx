import React from 'react'
import { PieChart as RePieChart, Pie, Cell, Label } from 'recharts'

const data = [];
const COLORS = [];

const renderLabel = (props) => {
    const { cx, cy, midAngle, outerRadius, language } = props;
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 0.65;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text 
            x={x} 
            y={y} 
            fill="#0a0e0e" 
            textAnchor="middle" 
            dominantBaseline="central"
            fontSize="12"
            fontFamily="Georgia, sans-serif"
            fontWeight="bold"
        >
            {language}
        </text>
    );
};

function PieChart({ data }) {
    return (
        <div>
            <h3><u>Language Distribution</u></h3>
            <RePieChart width={500} height={300}>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="language"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#0f0f0f"
                    label={renderLabel}
                    labelLine={false}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
            </RePieChart>
        </div>
    )
}

export default PieChart