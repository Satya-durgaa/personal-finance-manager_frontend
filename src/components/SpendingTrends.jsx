import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SpendingTrends = ({ transactions = [] }) => {
    // Group transactions by month
    const monthlyData = transactions.reduce((acc, t) => {
        const date = new Date(t.date);
        const monthYear = date.toLocaleString('default', { month: 'short' }); // e.g. "Mar"

        if (!acc[monthYear]) {
            acc[monthYear] = { name: monthYear, spending: 0, income: 0 };
        }

        if (t.type === 'expense') {
            acc[monthYear].spending += parseFloat(t.amount);
        } else if (t.type === 'income') {
            acc[monthYear].income += parseFloat(t.amount);
        }

        return acc;
    }, {});

    // Convert to array and sort by date conceptually (or just use map order for now)
    // We'll just take the Object values. For a real app, you'd sort by actual month/year.
    const data = Object.values(monthlyData);

    // If no data, provide a flatline or empty state so the chart still renders
    if (data.length === 0) {
        data.push({ name: 'No Data', spending: 0, income: 0 });
    }

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
