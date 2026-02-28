import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, DollarSign, Target, Plus, LayoutDashboard, Calendar, Search, Loader2 } from 'lucide-react';
import api from '../services/api';
import SpendingTrends from '../components/SpendingTrends';
import FinancialHealthScore from '../components/FinancialHealthScore';
import AIRecommendations from '../components/AIRecommendations';

const SummaryCard = ({ title, amount, change, type, icon: Icon, loading }) => {
    const isPositive = change >= 0;

    return (
        <div className="glass p-8 rounded-[2.5rem] space-y-6 border border-white/5 hover:border-primary/20 transition-all group cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-primary/10 transition-colors"></div>

            <div className="flex justify-between items-start relative z-10">
                <div className={`p-4 rounded-2xl ${type === 'income' ? 'bg-emerald-500/10 text-emerald-500' :
                    type === 'expense' ? 'bg-rose-500/10 text-rose-500' :
                        'bg-primary/10 text-primary'
                    }`}>
                    <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </div>
                {!loading && change !== undefined && (
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${isPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                        }`}>
                        {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                        {Math.abs(change)}%
                    </div>
                )}
            </div>

            <div className="relative z-10">
                <p className="text-gray-500 text-xs font-black uppercase tracking-[0.15em] mb-1">{title}</p>
                {loading ? (
                    <div className="h-8 w-32 bg-white/5 animate-pulse rounded-lg"></div>
                ) : (
                    <h2 className="text-3xl font-black text-white leading-tight">${amount.toLocaleString()}</h2>
                )}
            </div>
        </div>
    );
};

const Dashboard = ({ onNavigate }) => {
    const [transactions, setTransactions] = useState([]);
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState({
        balance: 0,
        income: 0,
        expenses: 0,
        savings: 0
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const [transRes, goalsRes] = await Promise.all([
                    api.get('/transactions'),
                    api.get('/goals')
                ]);

                const trans = transRes.data;
                const gls = goalsRes.data;

                setTransactions(trans);
                setGoals(gls);

                // Calculate summary
                const income = trans
                    .filter(t => t.type === 'income')
                    .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

                const expenses = trans
                    .filter(t => t.type === 'expense')
                    .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

                const savings = gls.reduce((acc, curr) => acc + parseFloat(curr.current_amount || 0), 0);

                setSummary({
                    income,
                    expenses,
                    balance: income - expenses,
                    savings
                });
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-20">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <LayoutDashboard className="w-5 h-5 text-primary" />
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">Overview</span>
                    </div>
                    <h1 className="text-5xl font-black tracking-tight text-white mb-2">
                        My <span className="text-gradient">Dashboard</span>
                    </h1>
                    <p className="text-gray-500 text-lg font-medium flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Active Period: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
                        <input
                            className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-primary/30 focus:bg-white/10 transition-all font-medium"
                            placeholder="Search data..."
                        />
                    </div>
                    <button
                        onClick={() => onNavigate('transactions')}
                        className="group relative overflow-hidden bg-primary px-8 py-3.5 rounded-2xl font-black text-sm transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-primary/20 flex items-center gap-3"
                    >
                        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                        Add Transaction
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div onClick={() => onNavigate('transactions')} className="cursor-pointer">
                    <SummaryCard title="Total Balance" amount={summary.balance} type="total" icon={DollarSign} loading={loading} />
                </div>
                <div onClick={() => onNavigate('transactions')} className="cursor-pointer">
                    <SummaryCard title="Income" amount={summary.income} type="income" icon={ArrowUpRight} loading={loading} />
                </div>
                <div onClick={() => onNavigate('transactions')} className="cursor-pointer">
                    <SummaryCard title="Expenses" amount={summary.expenses} type="expense" icon={ArrowDownRight} loading={loading} />
                </div>
                <div onClick={() => onNavigate('goals')} className="cursor-pointer">
                    <SummaryCard title="Savings" amount={summary.savings} type="goal" icon={Target} loading={loading} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <SpendingTrends transactions={transactions} />
                </div>
                <div className="glass p-8 rounded-[2.5rem] flex flex-col h-full border border-white/5">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-black">Recent Transactions</h3>
                        <button
                            onClick={() => onNavigate('transactions')}
                            className="text-xs font-black uppercase tracking-widest text-primary hover:underline"
                        >
                            View All
                        </button>
                    </div>
                    <div className="space-y-6 flex-1 overflow-y-auto pr-2 scrollbar-hide">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-500">
                                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                                <p className="text-xs font-black uppercase tracking-widest">Loading...</p>
                            </div>
                        ) : transactions.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-500 opacity-50">
                                <Plus className="w-8 h-8" />
                                <p className="text-xs font-black uppercase tracking-widest text-center">No transactions yet</p>
                            </div>
                        ) : (
                            transactions.slice(0, 5).map((t, i) => (
                                <div key={t.id || i} className="flex justify-between items-center group cursor-pointer hover:bg-white/5 p-3 -mx-3 rounded-2xl transition-all">
                                    <div className="flex gap-4 items-center overflow-hidden">
                                        <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ${t.type === 'income' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                                            }`}>
                                            <DollarSign className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="font-bold text-white leading-tight truncate">{t.description || t.category}</p>
                                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black mt-1 truncate">
                                                {t.category} • {new Date(t.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <p className={`font-black tracking-tight flex-shrink-0 ml-4 ${t.type === 'income' ? 'text-emerald-500' : 'text-white'}`}>
                                        {t.type === 'income' ? '+' : '-'}${Math.abs(t.amount).toLocaleString()}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <FinancialHealthScore summary={summary} transactions={transactions} />
                <AIRecommendations transactions={transactions} />
            </div>
        </div>
    );
};

export default Dashboard;
