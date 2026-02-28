import React from 'react';
import { ArrowRight, Shield, Zap, BarChart3, PieChart, TrendingUp, Users, Wallet, CheckCircle2, Receipt } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, desc }) => (
    <div className="glass p-8 rounded-3xl border border-white/5 hover:border-primary/20 transition-all group">
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-gray-400 leading-relaxed text-sm">{desc}</p>
    </div>
);

const Landing = ({ onGetStarted, onLogin }) => {
    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-primary/30">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/50 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                            <Wallet className="text-white w-6 h-6" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent">
                            FinanceAI
                        </span>
                    </div>
                    <div className="flex items-center gap-8">
                        <button onClick={onLogin} className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">
                            Sign In
                        </button>
                        <button
                            onClick={onGetStarted}
                            className="bg-primary hover:bg-primary/90 px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-95"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-48 pb-32 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[100px] animate-pulse delay-700"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-8">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Smart Finance</span>
                    </div>
                    <h1 className="text-7xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.9]">
                        Take Control Of Your <span className="text-gradient">Money</span>
                    </h1>
                    <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
                        A simple way to track spending, set budgets, and reach your savings goals.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 animate-in delay-200">
                        <button
                            onClick={onGetStarted}
                            className="group bg-primary text-white px-10 py-5 rounded-2xl font-black text-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-3 shadow-2xl shadow-primary/40"
                        >
                            Start Your Journey
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="px-10 py-5 rounded-2xl font-bold text-lg border border-white/10 hover:bg-white/5 transition-all">
                            Watch System Overview
                        </button>
                    </div>

                    {/* Productivity Mockup */}
                    <div className="mt-24 relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <div className="relative glass rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1611974717482-48ac8f7a69cc?auto=format&fit=crop&q=80&w=2070"
                                alt="Dashboard Preview"
                                className="w-full h-auto opacity-90 group-hover:scale-[1.02] transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-24 border-y border-white/5 bg-background/30">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    <div>
                        <div className="text-4xl font-black mb-2">$2B+</div>
                        <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Assets Tracked</div>
                    </div>
                    <div>
                        <div className="text-4xl font-black mb-2">500k+</div>
                        <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Daily Users</div>
                    </div>
                    <div>
                        <div className="text-4xl font-black mb-2">99.9%</div>
                        <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">System Uptime</div>
                    </div>
                    <div>
                        <div className="text-4xl font-black mb-2">4.9/5</div>
                        <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">User Rating</div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-32 max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Simple, Powerful Features.</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">Everything you need to manage your money with ease and clarity.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="glass p-10 rounded-[3rem] border border-white/5 hover:border-primary/20 transition-all hover:translate-y-[-8px] group">
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-all">
                            <Receipt className="w-7 h-7 text-primary" />
                        </div>
                        <h3 className="text-3xl font-black text-white mb-4">Track Spending</h3>
                        <p className="text-gray-400 leading-relaxed font-medium">
                            Log your daily transactions and see exactly where your money goes with clear categories and history.
                        </p>
                    </div>

                    <div className="glass p-10 rounded-[3rem] border border-white/5 hover:border-primary/20 transition-all hover:translate-y-[-8px] group">
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-all">
                            <Shield className="w-7 h-7 text-primary" />
                        </div>
                        <h3 className="text-3xl font-black text-white mb-4">Secure Storage</h3>
                        <p className="text-gray-400 leading-relaxed font-medium">
                            Your data is protected with secure encryption, ensuring your financial information stays private.
                        </p>
                    </div>

                    <div className="glass p-10 rounded-[3rem] border border-white/5 hover:border-primary/20 transition-all hover:translate-y-[-8px] group">
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-all">
                            <Users className="w-7 h-7 text-primary" />
                        </div>
                        <h3 className="text-3xl font-black text-white mb-4">Split Bills</h3>
                        <p className="text-gray-400 leading-relaxed font-medium">
                            Easily share expenses with friends or family and keep track of who owes what in simple groups.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 border-t border-white/5 bg-background/50">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                            <Wallet className="text-primary w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">FinanceAI</span>
                    </div>
                    <div className="flex items-center gap-8 text-sm text-gray-500">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Security</a>
                        <a href="#" className="hover:text-white transition-colors">Contact</a>
                    </div>
                    <p className="text-sm text-gray-600">© 2025 FinanceAI Intelligence Systems.</p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
