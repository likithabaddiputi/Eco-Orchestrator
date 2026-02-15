
import React, { useState } from 'react';
import { Send, MessageSquare, User, Tag, HelpCircle, CheckCircle, Sparkles, AlertCircle } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { GoogleGenAI } from "@google/genai";

interface Review {
    id: number;
    user: string;
    role: string;
    category: string;
    content: string;
    type: 'review' | 'doubt';
    timestamp: string;
    sentiment?: 'positive' | 'neutral' | 'negative';
    aiAnalysis?: string;
}

export const ReviewForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: 'Student',
    category: 'General', 
    type: 'doubt',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [reviews, setReviews] = useState<Review[]>([
      { id: 1, user: "Sarah Jenkins", role: "Sustainability Officer", category: "Food", content: "The new waste diversion strategy in the North Cafeteria is working well, but we need more bins.", type: 'review', timestamp: '2 hours ago', sentiment: 'positive' },
      { id: 2, user: "Dr. Alistair", role: "Faculty", category: "Energy", content: "Why are the lights in Block B on during the weekend when no classes are scheduled?", type: 'doubt', timestamp: '5 hours ago', sentiment: 'negative' }
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message.trim()) return;
    
    setIsSubmitting(true);
    setError(null);

    let analysis = { category: 'General', sentiment: 'neutral', autoResponse: '' };

    try {
        // Attempt AI Analysis
        // @ts-ignore
        if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
             // @ts-ignore
             const hasKey = await window.aistudio.hasSelectedApiKey();
             // @ts-ignore
             if (!hasKey) await window.aistudio.openSelectKey();
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const systemInstruction = `
            Analyze the user's campus sustainability feedback.
            Return a JSON object with:
            - "category": Choose best from [Food, Energy, Compute, Transport, Waste, General]
            - "sentiment": [positive, neutral, negative]
            - "autoResponse": A very brief (1 sentence) polite acknowledgement.
        `;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-preview',
            contents: formData.message,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json"
            }
        });

        if (response.text) {
             analysis = JSON.parse(response.text);
        }

    } catch (err) {
        console.warn("AI Analysis Failed (using fallback):", err);
        // Fallback Logic: Simple Keyword Matching
        const lowerMsg = formData.message.toLowerCase();
        if (lowerMsg.includes('food') || lowerMsg.includes('waste')) analysis.category = 'Food';
        else if (lowerMsg.includes('energy') || lowerMsg.includes('light')) analysis.category = 'Energy';
        else if (lowerMsg.includes('server') || lowerMsg.includes('compute')) analysis.category = 'Compute';
        
        analysis.autoResponse = "Thank you for your submission. Our team will review it shortly.";
    }

    // Always submit the review, even if AI failed
    const newReview: Review = {
        id: Date.now(),
        user: formData.name || "Anonymous",
        role: formData.role,
        category: analysis.category || formData.category,
        content: formData.message,
        type: formData.type as 'review' | 'doubt',
        timestamp: 'Just now',
        sentiment: analysis.sentiment as any,
        aiAnalysis: analysis.autoResponse
    };
    
    setReviews([newReview, ...reviews]);
    setSubmitted(true);
    setFormData({ name: '', role: 'Student', category: 'General', type: 'doubt', message: '' });
    setIsSubmitting(false);
    
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/20 rounded-xl">
                <HelpCircle className="h-8 w-8 text-emerald-400" />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-white">Community Reviews & Doubts</h2>
                <p className="text-slate-400 text-sm">AI-Enhanced feedback portal. We categorize and route your inputs automatically.</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <GlassCard title="Submit New Entry">
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1.5 flex items-center gap-1">
                                <User className="h-3 w-3" /> Name (Optional)
                            </label>
                            <input 
                                type="text" 
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-200 text-sm focus:border-emerald-500 focus:outline-none"
                                placeholder="Enter name"
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1.5">Role</label>
                            <select 
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-200 text-sm focus:border-emerald-500 focus:outline-none"
                                value={formData.role}
                                onChange={e => setFormData({...formData, role: e.target.value})}
                            >
                                <option>Student</option>
                                <option>Faculty</option>
                                <option>Staff</option>
                                <option>Admin</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1.5 flex items-center gap-1">
                                <Tag className="h-3 w-3" /> Category Preference
                            </label>
                            <select 
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-200 text-sm focus:border-emerald-500 focus:outline-none opacity-70 hover:opacity-100 transition-opacity"
                                value={formData.category}
                                onChange={e => setFormData({...formData, category: e.target.value})}
                            >
                                <option>General</option>
                                <option>Food Waste</option>
                                <option>Energy Usage</option>
                                <option>Compute/IT</option>
                                <option>Transportation</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-400 mb-1.5">Type</label>
                            <div className="flex gap-2">
                                <button 
                                    type="button"
                                    onClick={() => setFormData({...formData, type: 'doubt'})}
                                    className={`flex-1 py-2.5 text-xs font-medium rounded-lg border transition-all ${formData.type === 'doubt' ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'bg-slate-900 border-slate-700 text-slate-400'}`}
                                >
                                    Doubt
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setFormData({...formData, type: 'review'})}
                                    className={`flex-1 py-2.5 text-xs font-medium rounded-lg border transition-all ${formData.type === 'review' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-slate-900 border-slate-700 text-slate-400'}`}
                                >
                                    Review
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1.5 flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" /> Message
                        </label>
                        <textarea 
                            required
                            className="w-full h-32 bg-slate-900 border border-slate-700 rounded-lg p-3 text-slate-200 text-sm focus:border-emerald-500 focus:outline-none resize-none"
                            placeholder={formData.type === 'doubt' ? "Describe the issue or question..." : "Share your feedback or suggestion..."}
                            value={formData.message}
                            onChange={e => setFormData({...formData, message: e.target.value})}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={isSubmitting || submitted}
                        className={`w-full py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                            submitted 
                            ? 'bg-green-500 text-white cursor-default' 
                            : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                        }`}
                    >
                        {submitted ? (
                            <>
                                <CheckCircle className="h-4 w-4" /> Submitted
                            </>
                        ) : isSubmitting ? (
                            <>
                                <Sparkles className="h-4 w-4 animate-spin" /> AI Processing...
                            </>
                        ) : (
                            <>
                                <Send className="h-4 w-4" /> Submit Entry
                            </>
                        )}
                    </button>
                </form>
            </GlassCard>

            <div className="space-y-4">
                <h3 className="text-lg font-bold text-white px-2">Recent Community Inputs</h3>
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-slate-900/50 border border-white/5 rounded-xl p-4 hover:border-emerald-500/30 transition-colors animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${
                                        review.type === 'review' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                                    }`}>
                                        {review.user.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">{review.user}</p>
                                        <p className="text-[10px] text-slate-500">{review.role} • {review.timestamp}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                     {review.sentiment && (
                                        <span className={`text-[10px] px-2 py-1 rounded border uppercase tracking-wide ${
                                            review.sentiment === 'positive' ? 'text-green-400 border-green-500/20' : 
                                            review.sentiment === 'negative' ? 'text-red-400 border-red-500/20' : 'text-slate-400 border-slate-500/20'
                                        }`}>
                                            {review.sentiment}
                                        </span>
                                     )}
                                    <span className={`text-[10px] px-2 py-1 rounded border uppercase tracking-wide ${
                                        review.type === 'review' 
                                        ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400' 
                                        : 'border-amber-500/20 bg-amber-500/10 text-amber-400'
                                    }`}>
                                        {review.type}
                                    </span>
                                </div>
                            </div>
                            <p className="text-sm text-slate-300 leading-relaxed mb-3">
                                {review.content}
                            </p>
                            
                            {review.aiAnalysis && (
                                <div className="mb-3 pl-3 border-l-2 border-indigo-500/50">
                                    <p className="text-[10px] text-indigo-300 flex items-center gap-1 mb-0.5"><Sparkles className="h-3 w-3" /> Auto-Response</p>
                                    <p className="text-xs text-slate-400 italic">"{review.aiAnalysis}"</p>
                                </div>
                            )}

                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-slate-500 bg-slate-800 px-2 py-0.5 rounded border border-white/5">
                                    {review.category}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};
