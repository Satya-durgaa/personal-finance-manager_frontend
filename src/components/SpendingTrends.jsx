import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Jan', spending: 4000, income: 5000 },
    { name: 'Feb', spending: 3000, income: 5200 },
    { name: 'Mar', spending: 2000, income: 5000 },
    { name: 'Apr', spending: 2780, income: 5300 },
    { name: 'May', spending: 1890, income: 5100 },
    { name: 'Jun', spending: 2390, income: 5400 },
    { name: 'Jul', spending: 3490, income: 5500 },
];

const SpendingTrends = () => {
    return (
        <div className="glass p-6 rounded-2xl h-[400px]">
            <h3 className="text-lg font-semibold mb-6 text-white/90">Spending vs Income Trends</h3>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                        dataKey="name"
                        stroke="#6b7280"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        stroke="#6b7280"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.8)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(10px)' }}
                        itemStyle={{ color: '#fff' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="spending"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorSpending)"
                    />
                    <Area
                        type="monotone"
                        dataKey="income"
                        stroke="#10b981"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorIncome)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SpendingTrends;
