import React from 'react';
import { Heart, ShieldCheck, Zap } from 'lucide-react';

const FinancialHealthScore = () => {
    const score = 842;
    const maxScore = 1000;
    const percentage = (score / maxScore) * 100;

    return (
        <div className="glass p-6 rounded-2xl flex flex-col items-center justify-center text-center">
            <h3 className="text-lg font-semibold mb-6 self-start text-white/90">Financial Health Score</h3>

            <div className="relative w-40 h-40 mb-6">
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="currentColor"
                        strokeWidth="10"
                        fill="transparent"
                        className="text-white/5"
                    />
                    <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="currentColor"
                        strokeWidth="10"
                        fill="transparent"
                        strokeDasharray={440}
                        strokeDashoffset={440 - (440 * percentage) / 100}
                        className="text-primary transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black text-white">{score}</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Excellent</span>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2 w-full mt-4">
                {[
                    { label: 'Savings', icon: Heart, color: 'text-emerald-500' },
                    { label: 'Spending', icon: Zap, color: 'text-primary' },
                    { label: 'Security', icon: ShieldCheck, color: 'text-amber-500' },
                ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center p-2 rounded-xl bg-white/5 border border-white/5">
                        <item.icon className={`w-4 h-4 mb-2 ${item.color}`} />
                        <span className="text-[10px] text-gray-400 font-medium">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FinancialHealthScore;
