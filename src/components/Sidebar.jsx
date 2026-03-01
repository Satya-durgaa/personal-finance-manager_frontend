import React from 'react';
import {
    LayoutDashboard,
    Receipt,
    WalletCards,
    Target,
    Users,
    LogOut,
    Plus,
    ChevronRight,
    TrendingUp,
    Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NavItem = ({ icon: Icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 group ${isActive
            ? 'bg-primary/20 text-white shadow-lg shadow-primary/10 border border-white/5'
            : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
    >
        <div className="flex items-center gap-3">
            <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-primary' : ''}`} />
            <span className="font-semibold text-sm tracking-tight">{label}</span>
        </div>
        {isActive && (
            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
        )}
        {!isActive && (
            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-40 transition-opacity" />
        )}
    </button>
);

const Sidebar = ({ activeTab, setActiveTab }) => {
    const { logout, user } = useAuth();

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'transactions', label: 'Transactions', icon: Receipt },
        { id: 'budgets', label: 'Budgets', icon: WalletCards },
        { id: 'goals', label: 'Savings Goals', icon: Target },
        { id: 'shared', label: 'Shared Expenses', icon: Users },
    ];

    return (
        <aside className="w-80 h-screen flex flex-col glass border-r border-white/5 relative z-20">
            <div className="p-8">
                <div className="flex items-center gap-3 mb-10 group cursor-pointer">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform">
                        <TrendingUp className="text-white w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-black tracking-tighter bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
                            WealthWise
                        </span>
                        <div className="flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/80">Personal Finance</span>
                        </div>
                    </div>
                </div>

                <nav className="space-y-2">
                    {menuItems.map((item) => (
                        <NavItem
                            key={item.id}
                            icon={item.icon}
                            label={item.label}
                            isActive={activeTab === item.id}
                            onClick={() => setActiveTab(item.id)}
                        />
                    ))}
                </nav>
            </div>

            <div className="mt-auto p-6 space-y-4">
                <div className="glass-morphism p-4 rounded-3xl border border-white/5 flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white shadow-inner">
                        {user?.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-sm font-bold truncate text-white">{user?.email?.split('@')[0] || 'User'}</span>
                        <span className="text-[10px] text-gray-500 truncate">{user?.email || 'user@example.com'}</span>
                    </div>
                </div>

                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all group font-semibold text-sm"
                >
                    <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
