import React, { useState, useEffect } from 'react';
import { Target, Plus, CheckCircle2, TrendingUp, Calendar, Compass, Loader2, X } from 'lucide-react';
import api from '../services/api';

const SavingsGoals = () => {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newGoal, setNewGoal] = useState({
        name: '',
        target_amount: '',
        current_amount: '',
        deadline: ''
    });

    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchGoals();
    }, []);

    const fetchGoals = async () => {
        try {
            setLoading(true);
            const response = await api.get('/goals');
            setGoals(response.data);
        } catch (err) {
            console.error('Error fetching goals:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddGoal = async (e) => {
        e.preventDefault();
        setError('');

        const target = parseFloat(newGoal.target_amount);
        if (isNaN(target) || target <= 0) {
            setError('Please enter a valid positive target value.');
            return;
        }

        try {
            setSubmitting(true);
            await api.post('/goals', {
                ...newGoal,
                target_amount: target,
                current_amount: parseFloat(newGoal.current_amount || 0)
            });
            setIsModalOpen(false);
            setNewGoal({ name: '', target_amount: '', current_amount: '', deadline: '' });
            fetchGoals();
        } catch (err) {
            console.error('Error adding goal:', err);
            setError(err.response?.data?.error || 'Authorization or system failure. Protocol denied.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Target className="w-5 h-5 text-primary" />
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">Savings Goals</span>
                    </div>
                    <h1 className="text-5xl font-black tracking-tight text-white mb-2">
                        My <span className="text-gradient">Goals</span>
                    </h1>
                    <p className="text-gray-500 text-lg font-medium">Track your progress towards what you're saving for.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="group relative overflow-hidden bg-primary px-8 py-3.5 rounded-2xl font-black text-sm transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-primary/20 flex items-center gap-3 text-white"
                >
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                    Add Goal
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                </button>
            </header>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4 text-gray-500">
                    <Loader2 className="w-12 h-12 animate-spin text-primary" />
                    <p className="text-xs font-black uppercase tracking-widest">Loading Goals...</p>
                </div>
            ) : goals.length === 0 ? (
                <div className="glass p-20 rounded-[3rem] text-center border border-white/5 opacity-50 flex flex-col items-center gap-6">
                    <Target className="w-16 h-16 text-gray-500" />
                    <div>
                        <h3 className="text-2xl font-black text-white mb-2">No goals yet</h3>
                        <p className="text-gray-500 max-w-md mx-auto">Add a goal to see your progress here.</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-primary font-black uppercase tracking-widest text-xs hover:underline"
                    >
                        + Add Your First Goal
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-white">
                    {goals.map((goal, idx) => {
                        const current = parseFloat(goal.current_amount || 0);
                        const target = parseFloat(goal.target_amount);
                        const percent = Math.min((current / target) * 100, 100);
                        const isDone = current >= target;

                        return (
                            <div key={goal.id || idx} className="glass p-10 rounded-[3rem] relative overflow-hidden group border border-white/5 hover:border-primary/20 transition-all">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl"></div>

                                {isDone && (
                                    <div className="absolute top-8 right-8 text-emerald-500 animate-bounce z-10">
                                        <CheckCircle2 className="w-10 h-10" />
                                    </div>
                                )}

                                <div className="flex items-center gap-6 mb-10 relative z-10">
                                    <div className={`p-5 rounded-3xl ${isDone ? 'bg-emerald-500/10 text-emerald-500' : 'bg-primary/10 text-primary'} border border-white/5 shadow-inner`}>
                                        <Target className="w-10 h-10 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div className="overflow-hidden">
                                        <h3 className="text-2xl font-black text-white truncate">{goal.name}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Calendar className="w-3.5 h-3.5 text-gray-500" />
                                            <p className="text-xs text-gray-400 font-black uppercase tracking-widest truncate">
                                                {isDone ? 'Milestone Achieved' : (goal.deadline ? `Deadline: ${new Date(goal.deadline).toLocaleDateString()}` : 'No Deadline')}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6 relative z-10">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black mb-1">Saved</p>
                                            <p className="text-4xl font-black text-white leading-tight">${current.toLocaleString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black mb-1">Goal</p>
                                            <p className="text-xl font-bold opacity-30">${target.toLocaleString()}</p>
                                        </div>
                                    </div>

                                    <div className="relative pt-4">
                                        <div className="w-full h-5 bg-white/5 rounded-full overflow-hidden p-1 border border-white/5">
                                            <div
                                                className={`h-full rounded-full transition-all duration-1000 shadow-xl ${isDone ? 'bg-emerald-500 shadow-emerald-500/20' : 'bg-primary shadow-primary/20'
                                                    }`}
                                                style={{ width: `${percent}%` }}
                                            ></div>
                                        </div>
                                        <span className="absolute -top-1 right-0 text-xs font-black text-primary uppercase tracking-widest">{Math.round(percent)}% Complete</span>
                                    </div>
                                </div>

                                {!isDone && (
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="w-full mt-10 border border-white/10 hover:border-primary/50 hover:bg-primary/5 text-xs font-black uppercase tracking-widest py-4 rounded-2xl transition-all"
                                    >
                                        Inject Money
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Create Goal Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <div className="glass w-full max-w-xl p-10 rounded-[2.5rem] relative z-10 border border-white/10 shadow-2xl animate-in zoom-in duration-300">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h3 className="text-3xl font-black text-white">New <span className="text-gradient">Goal</span></h3>
                                <p className="text-gray-500 text-sm mt-1 font-medium">Set a new savings goal.</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-white/5 rounded-2xl transition-all">
                                <X className="w-6 h-6 text-gray-400" />
                            </button>
                        </div>

                        <form onSubmit={handleAddGoal} className="space-y-6">
                            {error && (
                                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 p-4 rounded-2xl text-xs font-black uppercase tracking-widest animate-in fade-in slide-in-from-top-2">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Goal Name</label>
                                    <input
                                        required
                                        disabled={submitting}
                                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-primary/30 focus:bg-white/10 transition-all font-medium disabled:opacity-50"
                                        placeholder="e.g. New Car"
                                        value={newGoal.name}
                                        onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Goal Amount (USD)</label>
                                        <input
                                            required
                                            type="number"
                                            disabled={submitting}
                                            className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-primary/30 focus:bg-white/10 transition-all font-medium disabled:opacity-50"
                                            placeholder="50000"
                                            value={newGoal.target_amount}
                                            onChange={(e) => setNewGoal({ ...newGoal, target_amount: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Current Savings</label>
                                        <input
                                            type="number"
                                            disabled={submitting}
                                            className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-primary/30 focus:bg-white/10 transition-all font-medium disabled:opacity-50"
                                            placeholder="0"
                                            value={newGoal.current_amount}
                                            onChange={(e) => setNewGoal({ ...newGoal, current_amount: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Target Date</label>
                                    <input
                                        type="date"
                                        disabled={submitting}
                                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-primary/30 focus:bg-white/10 transition-all font-medium disabled:opacity-50"
                                        value={newGoal.deadline}
                                        onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
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
                                    <>Save Goal</>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SavingsGoals;
