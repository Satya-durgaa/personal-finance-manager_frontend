import React from 'react';
import { Sparkles, Brain, ArrowDownCircle, Lightbulb } from 'lucide-react';

const AIRecommendations = ({ transactions = [] }) => {
    // Find the highest spending category dynamically
    const categorySpending = transactions.reduce((acc, t) => {
        if (t.type === 'expense') {
            acc[t.category] = (acc[t.category] || 0) + parseFloat(t.amount);
        }
        return acc;
    }, {});

    const sortedCategories = Object.entries(categorySpending).sort((a, b) => b[1] - a[1]);
    const topCategory = sortedCategories.length > 0 ? sortedCategories[0][0] : null;
    const topCategoryAmount = sortedCategories.length > 0 ? sortedCategories[0][1] : 0;

    const recommendations = [];

    if (topCategory) {
        recommendations.push({
            title: `High ${topCategory} Spending`,
            desc: `You've spent $${Math.round(topCategoryAmount)} on ${topCategory} recently. Consider setting a strict budget to save more.`,
            icon: Brain,
            color: 'text-rose-500'
        });
    }

    if (transactions.filter(t => t.type === 'income').length === 0) {
        recommendations.push({
            title: 'Track Your Income',
            desc: 'Start logging your income streams to get a more accurate Financial Health Score and better predictions.',
            icon: Sparkles,
            color: 'text-amber-500'
        });
    }

    if (recommendations.length === 0) {
        recommendations.push({
            title: 'Looking Good!',
            desc: 'Your spending habits are perfectly balanced. Keep up the good work and maintain your budget.',
            icon: Sparkles,
            color: 'text-emerald-500'
        });
    }

    return (
        <div className="glass p-6 rounded-2xl space-y-6">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Brain className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold">AI Recommendations</h3>
            </div>

            <div className="space-y-4">
                {recommendations.map((rec, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all group">
                        <div className={`p-3 rounded-lg bg-white/5 ${rec.color}`}>
                            <rec.icon className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-bold text-sm text-white">{rec.title}</p>
                            <p className="text-xs text-gray-400 mt-1 leading-relaxed">{rec.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-xl border border-primary/20">
                <Lightbulb className="w-5 h-5 text-primary shrink-0" />
                <p className="text-[10px] text-gray-300">
                    Pro Tip: Setting up an <span className="text-primary font-bold">Auto-Save</span> rule could help you reach your Tesla goal 3 months faster.
                </p>
            </div>
        </div>
    );
};

export default AIRecommendations;
