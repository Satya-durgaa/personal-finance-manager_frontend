import React, { useState, useEffect } from 'react';
import { Users, Plus, UserPlus, ArrowUpRight, ArrowDownRight, Share2, Shield, Loader2, X, MessageSquare } from 'lucide-react';
import api from '../services/api';

const SharedExpenses = () => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newGroup, setNewGroup] = useState({
        name: '',
        description: '',
        members: ''
    });

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            setLoading(true);
            const response = await api.get('/shared/groups');
            setGroups(response.data);
        } catch (err) {
            console.error('Error fetching groups:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateGroup = async (e) => {
        e.preventDefault();
        try {
            const memberList = newGroup.members.split(',').map(m => m.trim()).filter(m => m !== '');
            await api.post('/shared/groups', {
                ...newGroup,
                members: memberList
            });
            setIsModalOpen(false);
            setNewGroup({ name: '', description: '', members: '' });
            fetchGroups();
        } catch (err) {
            console.error('Error creating group:', err);
        }
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-20">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Share2 className="w-5 h-5 text-primary" />
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-primary">Shared Expenses</span>
                    </div>
                    <h1 className="text-5xl font-black tracking-tight text-white mb-2">
                        Expense <span className="text-gradient">Groups</span>
                    </h1>
                    <p className="text-gray-500 text-lg font-medium">Split bills and track shared costs with friends and family.</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => alert('Stakeholder invitation protocol initiated. Please provide the secondary email in the circle creation menu.')}
                        className="px-8 py-3.5 bg-white/5 border border-white/10 rounded-2xl font-black text-sm transition-all hover:bg-white/10 flex items-center gap-3"
                    >
                        <UserPlus className="w-5 h-5" />
                        Invite
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="group relative overflow-hidden bg-primary px-8 py-3.5 rounded-2xl font-black text-sm transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-primary/20 flex items-center gap-3 text-white"
                    >
                        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                        Create Group
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                    </button>
                </div>
            </header>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4 text-gray-500">
                    <Loader2 className="w-12 h-12 animate-spin text-primary" />
                    <p className="text-xs font-black uppercase tracking-widest">Loading Groups...</p>
                </div>
            ) : groups.length === 0 ? (
                <div className="glass p-20 rounded-[2.5rem] flex flex-col items-center justify-center gap-6 text-center border border-white/5 opacity-50">
                    <Users className="w-16 h-16 text-gray-500" />
                    <div>
                        <h3 className="text-2xl font-black text-white mb-2">No groups found</h3>
                        <p className="text-gray-500 max-w-md mx-auto">Create a group to share expenses with friends.</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-primary font-black uppercase tracking-widest text-xs hover:underline"
                    >
                        + Create First Group
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {groups.map((group, idx) => (
                        <div key={group.id || idx} className="glass p-8 rounded-[2.5rem] relative overflow-hidden group border border-white/5 hover:border-primary/20 transition-all flex flex-col h-full cursor-pointer">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-primary/10 transition-colors"></div>

                            <div className="flex justify-between items-start mb-8 relative z-10">
                                <div className="p-4 bg-primary/10 rounded-2xl text-primary border border-primary/20">
                                    <Users className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                </div>
                                <div className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-500 border border-white/5">
                                    {group.members?.length || 0} Members
                                </div>
                            </div>

                            <div className="flex-1 relative z-10">
                                <h3 className="text-2xl font-black text-white mb-1 truncate">{group.name}</h3>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black mb-6">Status</p>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black mb-1">Total Spent</p>
                                        <p className="text-2xl font-black text-white">${(group.total_expenses || 0).toLocaleString()}</p>
                                    </div>
                                    <div className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-black uppercase tracking-widest ${group.status === 'active' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/10' : 'bg-white/5 text-gray-400 border border-white/5'
                                        }`}>
                                        <Shield className="w-4 h-4 opacity-50" />
                                        {group.status || 'Active'}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => alert('Accessing secure circle dashboard...')}
                                className="w-full mt-8 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest transition-all border border-white/5 group-hover:border-primary/30 relative z-10"
                            >
                                View Group
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div className="glass p-10 rounded-[2.5rem] border border-white/5">
                <div className="flex justify-between items-center mb-10">
                    <h3 className="text-2xl font-black text-white">Recent Activity</h3>
                    <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">View All</button>
                </div>
                <div className="flex flex-col items-center justify-center py-10 text-gray-500 opacity-50 text-center">
                    <MessageSquare className="w-10 h-10 mb-4" />
                    <p className="text-xs font-black uppercase tracking-widest">No activity yet</p>
                </div>
            </div>

            {/* Create Group Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <div className="glass w-full max-w-xl p-10 rounded-[2.5rem] relative z-10 border border-white/10 shadow-2xl animate-in zoom-in duration-300">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h3 className="text-3xl font-black text-white">New <span className="text-gradient">Group</span></h3>
                                <p className="text-gray-500 text-sm mt-1 font-medium">Create a new group to share expenses.</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-white/5 rounded-2xl transition-all">
                                <X className="w-6 h-6 text-gray-400" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateGroup} className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Group Name</label>
                                    <input
                                        required
                                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-primary/30 focus:bg-white/10 transition-all font-medium"
                                        placeholder="e.g. Household Ledger"
                                        value={newGroup.name}
                                        onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Description</label>
                                    <input
                                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-primary/30 focus:bg-white/10 transition-all font-medium"
                                        placeholder="Purpose of this group"
                                        value={newGroup.description}
                                        onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Member Emails (Comma separated)</label>
                                    <input
                                        required
                                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-primary/30 focus:bg-white/10 transition-all font-medium"
                                        placeholder="alex@example.com, sarah@example.com"
                                        value={newGroup.members}
                                        onChange={(e) => setNewGroup({ ...newGroup, members: e.target.value })}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary py-4 rounded-2xl font-black text-sm text-white shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all mt-4"
                            >
                                Create Group
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SharedExpenses;
