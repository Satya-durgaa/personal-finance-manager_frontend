import React from 'react';
import { ArrowRight, Shield, Users, Wallet, Receipt, Star, CheckCircle2 } from 'lucide-react';

const Landing = ({ onGetStarted, onLogin }) => {
    return (
        <div className="min-h-screen text-white selection:bg-amber-400/30" style={{
            background: 'linear-gradient(135deg, #020508 0%, #050d1a 30%, #030a12 60%, #040810 100%)'
        }}>

            {/* Classic grid background overlay */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `
                        linear-gradient(rgba(212,175,55,0.04) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(212,175,55,0.04) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px'
                }} />
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[160px] animate-pulse" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)' }} />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[140px] animate-pulse delay-1000" style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)' }} />
                <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full blur-[120px]" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)' }} />
            </div>

            {/* Nav */}
            <nav className="fixed top-0 w-full z-50 backdrop-blur-xl border-b" style={{ backgroundColor: 'rgba(2,5,8,0.85)', borderColor: 'rgba(212,175,55,0.12)' }}>
                <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}>
                            <Wallet className="text-white w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-2xl font-black tracking-tighter text-white">Finance</span>
                            <span className="text-2xl font-black tracking-tighter" style={{ color: '#D4AF37' }}>AI</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <button onClick={onLogin} className="text-sm font-semibold text-gray-400 hover:text-white transition-colors px-4 py-2">
                            Sign In
                        </button>
                        <button onClick={onGetStarted} className="px-6 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:scale-105 active:scale-95 shadow-lg border" style={{
                            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                            borderColor: 'rgba(59,130,246,0.3)',
                            boxShadow: '0 4px 20px rgba(59,130,246,0.3)'
                        }}>
                            Get Started Free
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero — Split Layout */}
            <section className="relative min-h-screen flex items-center pt-20" style={{ zIndex: 1 }}>
                <div className="max-w-7xl mx-auto px-8 py-24 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Text */}
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-widest" style={{ borderColor: 'rgba(212,175,55,0.3)', backgroundColor: 'rgba(212,175,55,0.05)', color: '#D4AF37' }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                            Premium Financial Intelligence
                        </div>

                        <h1 className="text-6xl xl:text-7xl font-black tracking-tight leading-none text-white">
                            Master Your<br />
                            <span style={{ background: 'linear-gradient(90deg, #D4AF37, #F5E6A0, #D4AF37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                Financial
                            </span>
                            <br />
                            <span className="text-white/90">Future.</span>
                        </h1>

                        <p className="text-lg text-gray-400 leading-relaxed max-w-xl font-medium">
                            A sophisticated platform to track spending, manage budgets, and achieve your savings goals — all in one secure place.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={onGetStarted}
                                className="group flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-black text-base text-white transition-all hover:scale-105 active:scale-95"
                                style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', boxShadow: '0 8px 32px rgba(59,130,246,0.35)' }}
                            >
                                Start For Free
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={onLogin}
                                className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-base transition-all hover:bg-white/5 border"
                                style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#aaa' }}
                            >
                                Sign In
                            </button>
                        </div>

                        {/* Trust badges */}
                        <div className="flex flex-wrap gap-6 pt-4">
                            {[
                                { icon: Shield, text: 'Bank-grade security' },
                                { icon: CheckCircle2, text: 'Free forever plan' },
                                { icon: Star, text: '4.9 / 5 rating' },
                            ].map(({ icon: Icon, text }) => (
                                <div key={text} className="flex items-center gap-2 text-sm text-gray-500">
                                    <Icon className="w-4 h-4" style={{ color: '#D4AF37' }} />
                                    <span>{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Image */}
                    <div className="relative group">
                        <div className="absolute -inset-4 rounded-[3rem] blur-2xl opacity-40 group-hover:opacity-60 transition-all duration-1000" style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.3) 0%, rgba(59,130,246,0.2) 60%, transparent 100%)' }} />
                        <div className="relative rounded-[2.5rem] overflow-hidden border-2 p-1" style={{ borderColor: 'rgba(212,175,55,0.25)', background: 'rgba(212,175,55,0.03)', boxShadow: '0 0 60px rgba(212,175,55,0.1), 0 32px 80px rgba(0,0,0,0.6)' }}>
                            <div className="rounded-[2rem] overflow-hidden relative">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWY6489Fdy7srJOiATsfQisivjJ-xQry8q6A&s"
                                    alt="Financial Growth"
                                    className="w-full h-auto object-cover group-hover:scale-[1.04] transition-transform duration-700"
                                    style={{ filter: 'brightness(0.9) contrast(1.1) saturate(1.1)' }}
                                />
                                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(2,5,8,0.6) 0%, transparent 50%)' }} />
                            </div>
                        </div>
                        {/* Floating stat cards */}
                        <div className="absolute -left-6 bottom-12 px-5 py-3 rounded-2xl border backdrop-blur-xl shadow-2xl" style={{ background: 'rgba(2,5,8,0.9)', borderColor: 'rgba(212,175,55,0.25)' }}>
                            <p className="text-[10px] uppercase tracking-widest font-bold" style={{ color: '#D4AF37' }}>Portfolio Value</p>
                            <p className="text-2xl font-black text-white mt-0.5">$124,850</p>
                            <p className="text-xs text-emerald-500 font-bold mt-0.5">↑ +12.4% this month</p>
                        </div>
                        <div className="absolute -right-4 top-10 px-4 py-3 rounded-2xl border backdrop-blur-xl shadow-xl" style={{ background: 'rgba(2,5,8,0.9)', borderColor: 'rgba(59,130,246,0.25)' }}>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-blue-400">Savings Rate</p>
                            <p className="text-2xl font-black text-white mt-0.5">34%</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats bar */}
            <section className="relative border-t border-b py-16" style={{ zIndex: 1, borderColor: 'rgba(212,175,55,0.1)', background: 'rgba(212,175,55,0.02)' }}>
                <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { num: '$2B+', label: 'Assets Tracked' },
                        { num: '500k+', label: 'Active Users' },
                        { num: '99.9%', label: 'Uptime' },
                        { num: '4.9★', label: 'User Rating' },
                    ].map(({ num, label }) => (
                        <div key={label}>
                            <div className="text-4xl font-black mb-2" style={{ color: '#D4AF37' }}>{num}</div>
                            <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">{label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section className="relative py-32 max-w-7xl mx-auto px-8" style={{ zIndex: 1 }}>
                <div className="text-center mb-20">
                    <p className="text-xs uppercase tracking-[0.3em] mb-4 font-bold" style={{ color: '#D4AF37' }}>Why FinanceAI</p>
                    <h2 className="text-5xl font-black tracking-tight text-white">Everything You Need.</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: Receipt, title: 'Track Spending', desc: 'Log daily transactions and visualize exactly where your money goes with smart categories.' },
                        { icon: Shield, title: 'Secure & Private', desc: 'Your financial data is encrypted with bank-grade security. Only you have access.' },
                        { icon: Users, title: 'Split Bills', desc: 'Share group expenses with friends or family effortlessly and settle debts in seconds.' },
                    ].map(({ icon: Icon, title, desc }) => (
                        <div key={title} className="p-10 rounded-[2rem] border hover:translate-y-[-8px] transition-all duration-300 group cursor-pointer"
                            style={{ background: 'rgba(212,175,55,0.02)', borderColor: 'rgba(212,175,55,0.1)' }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)'}
                            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(212,175,55,0.1)'}
                        >
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all group-hover:scale-110" style={{ background: 'rgba(212,175,55,0.1)' }}>
                                <Icon className="w-7 h-7" style={{ color: '#D4AF37' }} />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-4">{title}</h3>
                            <p className="text-gray-400 leading-relaxed">{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="relative py-24 mx-8 mb-16 rounded-[3rem] border overflow-hidden" style={{ zIndex: 1, borderColor: 'rgba(212,175,55,0.2)', background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(212,175,55,0.05) 100%)' }}>
                <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(212,175,55,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.03) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
                <div className="text-center relative z-10 px-8">
                    <h2 className="text-5xl font-black tracking-tight text-white mb-6">Start Your Journey Today.</h2>
                    <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">Join thousands of users who've taken control of their finances.</p>
                    <button onClick={onGetStarted}
                        className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-black text-lg transition-all hover:scale-105 active:scale-95"
                        style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #b8962e 100%)', boxShadow: '0 8px 32px rgba(212,175,55,0.3)', color: '#020508' }}
                    >
                        Create Free Account
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative py-12 border-t px-8" style={{ zIndex: 1, borderColor: 'rgba(212,175,55,0.1)', background: 'rgba(2,5,8,0.9)' }}>
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}>
                            <Wallet className="text-white w-4 h-4" />
                        </div>
                        <span className="text-lg font-black text-white">Finance<span style={{ color: '#D4AF37' }}>AI</span></span>
                    </div>
                    <div className="flex items-center gap-8 text-sm text-gray-500">
                        {['Privacy', 'Terms', 'Security', 'Contact'].map(item => (
                            <a key={item} href="#" className="hover:text-white transition-colors">{item}</a>
                        ))}
                    </div>
                    <p className="text-sm text-gray-600">© 2025 FinanceAI. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
