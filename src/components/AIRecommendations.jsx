import React from 'react';
import { Sparkles, Brain, ArrowDownCircle, Lightbulb } from 'lucide-react';

const AIRecommendations = () => {
    const recommendations = [
        { title: 'Reduce Subscriptions', desc: 'You have 4 active streaming services. Cancelling one could save you $180/year.', icon: Sparkles, color: 'text-primary' },
        { title: 'Dining Out High', desc: 'Spending on restaurants is 25% higher than last month. Consider meal prepping.', icon: Brain, color: 'text-emerald-500' },
    ];

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
