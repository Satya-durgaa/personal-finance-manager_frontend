import React, { useState, useEffect } from 'react';
import { Search, Filter, ArrowUpRight, ArrowDownRight, Download, Receipt, Calendar, Plus, Trash2, Loader2, X } from 'lucide-react';
import api from '../services/api';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newTransaction, setNewTransaction] = useState({
        description: '',
        amount: '',
        type: 'expense',
        category: 'General',
        date: new Date().toISOString().split('T')[0]
    });

    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const response = await api.get('/transactions');
            setTransactions(response.data);
        } catch (err) {
            console.error('Error fetching transactions:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTransaction = async (e) => {
        e.preventDefault();
        setError('');

        const amount = parseFloat(newTransaction.amount);
        if (isNaN(amount) || amount <= 0) {
            setError('Please enter a valid amount.');
            return;
        }

        try {
            setSubmitting(true);
            await api.post('/transactions', {
                ...newTransaction,
                amount
            });
            setIsAddModalOpen(false);
            setNewTransaction({
                description: '',
                amount: '',
                type: 'expense',
                category: 'General',
                date: new Date().toISOString().split('T')[0]
            });
            fetchTransactions();
        } catch (err) {
            console.error('Error adding transaction:', err);
            setError(err.response?.data?.error || 'System failure. Could not save transaction.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteTransaction = async (id) => {
        if (!window.confirm('Are you sure you want to delete this transaction?')) return;
        try {
            await api.delete(`/transactions/${id}`);
            fetchTransactions();
        } catch (err) {
            console.error('Error deleting transaction:', err);
        }
    };

    const filteredTransactions = transactions.filter(t =>
        t.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Receipt className="w-5 h-5 text-primary" />
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">Transactions</span>
                    </div>
                    <h1 className="text-5xl font-black tracking-tight text-white mb-2">
                        My <span className="text-gradient">History</span>
                    </h1>
                    <p className="text-gray-500 text-lg font-medium">Full record of all your money movements.</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="group relative overflow-hidden bg-primary px-8 py-3.5 rounded-2xl font-black text-sm transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-primary/20 flex items-center gap-3 text-white"
                    >
                        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                        Add Transaction
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                    </button>
                    <button
                        onClick={() => alert('Transactions exported successfully.')}
                        className="group relative overflow-hidden bg-white/5 border border-white/10 px-8 py-3.5 rounded-2xl font-black text-sm transition-all hover:bg-white/10 flex items-center gap-3"
                    >
                        <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                        Export
                    </button>
                </div>
            </header>

            <div className="glass rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
                <div className="p-8 border-b border-white/5 flex flex-col md:flex-row gap-6">
                    <div className="flex-1 relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-primary transition-colors" />
                        <input
                            className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-primary/30 focus:bg-white/10 transition-all font-medium"
                            placeholder="Search by description or category..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => alert('More filters coming soon.')}
                        className="px-8 py-3.5 bg-white/5 border border-white/5 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-3 hover:bg-white/10 transition-all"
                    >
                        <Filter className="w-4 h-4" />
                        More Filters
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 border-b border-white/5 bg-white/2">
                                <th className="px-8 py-6">Description</th>
                                <th className="px-8 py-6">Category</th>
                                <th className="px-8 py-6">Date</th>
                                <th className="px-8 py-6 text-right">Amount (USD)</th>
                                <th className="px-8 py-6 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center gap-4 text-gray-500">
                                            <Loader2 className="w-10 h-10 animate-spin text-primary" />
                                            <p className="text-xs font-black uppercase tracking-widest">Loading...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredTransactions.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center gap-4 text-gray-500 opacity-50">
                                            <Receipt className="w-10 h-10" />
                                            <p className="text-xs font-black uppercase tracking-widest text-center">No transactions found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredTransactions.map((t) => (
                                    <tr key={t.id} className="hover:bg-white/2 transition-all text-sm group cursor-pointer">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                <span className="font-bold text-white group-hover:text-primary transition-colors">{t.description || t.category}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-400 border border-white/5">{t.category}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 text-gray-500 font-medium whitespace-nowrap">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {new Date(t.date).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className={`px-8 py-6 text-right font-black tracking-tight ${t.type === 'income' ? 'text-emerald-500' : 'text-white'}`}>
                                            {t.type === 'income' ? '+' : '-'}${Math.abs(t.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex justify-center">
                                                <button
                                                    onClick={() => handleDeleteTransaction(t.id)}
                                                    className="p-2 hover:bg-rose-500/10 hover:text-rose-500 rounded-lg transition-all text-gray-500 opacity-0 group-hover:opacity-100"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Transaction Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)}></div>
                    <div className="glass w-full max-w-xl p-10 rounded-[2.5rem] relative z-10 border border-white/10 shadow-2xl animate-in zoom-in duration-300">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h3 className="text-3xl font-black text-white">Add <span className="text-gradient">Transaction</span></h3>
                                <p className="text-gray-500 text-sm mt-1 font-medium">Enter a new transaction manually.</p>
                            </div>
                            <button onClick={() => setIsAddModalOpen(false)} className="p-3 hover:bg-white/5 rounded-2xl transition-all">
                                <X className="w-6 h-6 text-gray-400" />
                            </button>
                        </div>

                        <form onSubmit={handleAddTransaction} className="space-y-6">
                            {error && (
                                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 p-4 rounded-2xl text-xs font-black uppercase tracking-widest animate-in fade-in slide-in-from-top-2">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        disabled={submitting}
                                        onClick={() => setNewTransaction({ ...newTransaction, type: 'expense' })}
                                        className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${newTransaction.type === 'expense'
                                            ? 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                                            : 'bg-white/5 text-gray-500 border-white/5'
                                            } ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        Expenditure
                                    </button>
                                    <button
                                        type="button"
                                        disabled={submitting}
                                        onClick={() => setNewTransaction({ ...newTransaction, type: 'income' })}
                                        className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${newTransaction.type === 'income'
                                            ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                            : 'bg-white/5 text-gray-500 border-white/5'
                                            } ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        Income
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div className="relative group">
                                        <input
                                            required
                                            disabled={submitting}
                                            className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-primary/30 focus:bg-white/10 transition-all font-medium disabled:opacity-50"
                                            placeholder="Description (e.g. Shopping)"
                                            value={newTransaction.description}
                                            onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            required
                                            type="number"
                                            step="0.01"
                                            disabled={submitting}
                                            className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-primary/30 focus:bg-white/10 transition-all font-medium disabled:opacity-50"
                                            placeholder="Amount (USD)"
                                            value={newTransaction.amount}
                                            onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                                        />
                                        <select
                                            disabled={submitting}
                                            className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-primary/30 focus:bg-white/10 transition-all font-medium appearance-none disabled:opacity-50"
                                            value={newTransaction.category}
                                            onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                                        >
                                            <option value="General">General</option>
                                            <option value="Income">Income</option>
                                            <option value="Food">Food</option>
                                            <option value="Transport">Transport</option>
                                            <option value="Housing">Housing</option>
                                            <option value="Entertainment">Entertainment</option>
                                            <option value="Health">Health</option>
                                        </select>
                                    </div>
                                    <input
                                        required
                                        type="date"
                                        disabled={submitting}
                                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-primary/30 focus:bg-white/10 transition-all font-medium disabled:opacity-50"
                                        value={newTransaction.date}
                                        onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                                    />
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
                                    <>Save Transaction</>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Transactions;
