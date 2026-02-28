import React, { useState, useEffect } from 'react';
import { Plus, AlertCircle, TrendingUp, WalletCards, ShieldCheck, Loader2, X } from 'lucide-react';
import api from '../services/api';

const Budgets = () => {
    const [budgets, setBudgets] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newBudget, setNewBudget] = useState({
        category: 'General',
        limit_amount: '',
        period: 'monthly'
    });

    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [budgetsRes, transRes] = await Promise.all([
                api.get('/budgets'),
                api.get('/transactions')
            ]);
            setBudgets(budgetsRes.data);
            setTransactions(transRes.data);
        } catch (err) {
            console.error('Error fetching budget data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpsertBudget = async (e) => {
        e.preventDefault();
        setError('');

        const amount = parseFloat(newBudget.limit_amount);
        if (isNaN(amount) || amount <= 0) {
            setError('Please enter a valid positive allocation limit.');
            return;
        }

        try {
            setSubmitting(true);
            await api.post('/budgets', {
                ...newBudget,
                limit_amount: amount
            });
            setIsModalOpen(false);
            setNewBudget({ category: 'General', limit_amount: '', period: 'monthly' });
            fetchData();
        } catch (err) {
            console.error('Error saving budget:', err);
            setError(err.response?.data?.error || 'Authorization or system failure. Protocol denied.');
        } finally {
            setSubmitting(false);
        }
    };

    const calculateSpent = (category) => {
        return transactions
            .filter(t => t.category === category && t.type === 'expense')
            .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
    };

    const getCategoryStyles = (category) => {
        const styles = {
            'Groceries': 'bg-primary',
            'Entertainment': 'bg-emerald-500',
            'Dining Out': 'bg-rose-500',
            'Transport': 'bg-amber-500',
            'General': 'bg-blue-500',
            'Housing': 'bg-indigo-500',
            'Health': 'bg-teal-500'
        };
        return styles[category] || 'bg-primary';
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <WalletCards className="w-5 h-5 text-primary" />
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">Budgets</span>
                    </div>
                    <h1 className="text-5xl font-black tracking-tight text-white mb-2">
                        Manage <span className="text-gradient">Budgets</span>
                    </h1>
                    <p className="text-gray-500 text-lg font-medium">Plan your spending and stay within your limits.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="group relative overflow-hidden bg-primary px-8 py-3.5 rounded-2xl font-black text-sm transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-primary/20 flex items-center gap-3 text-white"
                >
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                    Create Budget
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                </button>
            </header>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4 text-gray-500">
                    <Loader2 className="w-12 h-12 animate-spin text-primary" />
                    <p className="text-xs font-black uppercase tracking-widest">Loading Budgets...</p>
                </div>
            ) : budgets.length === 0 ? (
                <div className="glass p-20 rounded-[2.5rem] flex flex-col items-center justify-center gap-6 text-center border border-white/5">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-gray-500 opacity-50">
                        <WalletCards className="w-10 h-10" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-white mb-2">No budgets set</h3>
                        <p className="text-gray-500 max-w-md mx-auto">Create a budget to better manage your spending.</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-primary font-black uppercase tracking-widest text-xs hover:underline"
                    >
                        + Create Your First Budget
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {budgets.map((budget, idx) => {
                        const spent = calculateSpent(budget.category);
                        const percent = Math.min((spent / budget.limit_amount) * 100, 100);
                        const isOver = spent > budget.limit_amount;

                        return (
                            <div key={idx} className="glass p-8 rounded-[2.5rem] space-y-6 border border-white/5 hover:border-primary/20 transition-all group relative overflow-hidden">
                                <div className="flex justify-between items-start relative z-10">
                                    <div>
                                        <h3 className="text-2xl font-black text-white">{budget.category}</h3>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black mt-1">{budget.period}</p>
                                    </div>
                                    {isOver ? (
                                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 text-[10px] font-black uppercase tracking-widest">
                                            <AlertCircle className="w-3.5 h-3.5" />
                                            Over Budget
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                                            <ShieldCheck className="w-3.5 h-3.5" />
                                            On Track
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4 relative z-10">
                                    <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                                        <span className="text-gray-500">Spent</span>
                                        <span className={isOver ? 'text-rose-500' : 'text-primary'}>{Math.round(percent)}%</span>
                                    </div>
                                    <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden p-1 border border-white/5">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 shadow-lg ${isOver ? 'bg-rose-500' : getCategoryStyles(budget.category)
                                                }`}
                                            style={{ width: `${percent}%` }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-between items-end pt-2 border-t border-white/5 mt-4">
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black mb-1">Spent</p>
                                            <p className="text-xl font-black text-white">${spent.toLocaleString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black mb-1">Limit</p>
                                            <p className="text-lg font-bold opacity-40">${budget.limit_amount.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <div className="glass p-10 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-10 border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                <div className="relative z-10 w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shadow-2xl group-hover:scale-110 transition-transform">
                    <TrendingUp className="text-primary w-10 h-10" />
                </div>
                <div className="relative z-10 flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-black text-white mb-2">Spending Insights</h3>
                    <p className="text-gray-500 text-lg leading-relaxed max-w-2xl font-medium">
                        Your budgets are compared against your <span className="text-white font-bold">real-time spending</span> to help you manage your money effectively.
                    </p>
                </div>
            </div>

            {/* Upsert Budget Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <div className="glass w-full max-w-xl p-10 rounded-[2.5rem] relative z-10 border border-white/10 shadow-2xl animate-in zoom-in duration-300">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h3 className="text-3xl font-black text-white">Set <span className="text-gradient">Budget</span></h3>
                                <p className="text-gray-500 text-sm mt-1 font-medium">Set a spending limit for a category.</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-white/5 rounded-2xl transition-all">
                                <X className="w-6 h-6 text-gray-400" />
                            </button>
                        </div>

                        <form onSubmit={handleUpsertBudget} className="space-y-8">
                            {error && (
                                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 p-4 rounded-2xl text-xs font-black uppercase tracking-widest animate-in fade-in slide-in-from-top-2">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Category Identifier</label>
                                    <select
                                        disabled={submitting}
                                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-primary/30 focus:bg-white/10 transition-all font-medium appearance-none disabled:opacity-50"
                                        value={newBudget.category}
                                        onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
                                    >
                                        <option value="General">General</option>
                                        <option value="Groceries">Food</option>
                                        <option value="Transport">Transport</option>
                                        <option value="Housing">Housing</option>
                                        <option value="Entertainment">Entertainment</option>
                                        <option value="Health">Health</option>
                                        <option value="Dining Out">Eating Out</option>
                                    </select>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Spending Limit (USD)</label>
                                    <input
                                        required
                                        type="number"
                                        disabled={submitting}
                                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-primary/30 focus:bg-white/10 transition-all font-medium disabled:opacity-50"
                                        placeholder="Value (e.g. 500)"
                                        value={newBudget.limit_amount}
                                        onChange={(e) => setNewBudget({ ...newBudget, limit_amount: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Period</label>
                                    <select
                                        disabled={submitting}
                                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-primary/30 focus:bg-white/10 transition-all font-medium appearance-none disabled:opacity-50"
                                        value={newBudget.period}
                                        onChange={(e) => setNewBudget({ ...newBudget, period: e.target.value })}
                                    >
                                        <option value="monthly">Monthly</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="yearly">Yearly</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-primary py-4 rounded-2xl font-black text-sm text-white shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all mt-4 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>Save Budget</>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Budgets;
