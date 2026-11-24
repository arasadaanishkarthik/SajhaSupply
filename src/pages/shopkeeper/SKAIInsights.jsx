import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Brain, TrendingUp, TrendingDown, Send, Bot, User, Sparkles, CheckCircle2 } from 'lucide-react';
import { aiInsights } from '../../data/aiInsights';

const chatInit = [
  { role: 'bot', text: 'Namaste! I am your AI Procurement Assistant. I analyze seasonal purchasing patterns, recommend bulk ordering windows, and compare supplier discounts across Uttar Pradesh. How can I help your shop today?' }
];

function getResponse(msg) {
  const m = msg.toLowerCase();
  if (m.includes('buy') || m.includes('purchase') || m.includes('recommend') || m.includes('stock')) return aiInsights.chatResponses['which products should i buy'].response;
  if (m.includes('best price') || m.includes('supplier') || m.includes('price') || m.includes('cheap')) return aiInsights.chatResponses['best price'].response;
  if (m.includes('save') || m.includes('saving') || m.includes('discount')) return aiInsights.chatResponses['savings'].response;
  if (m.includes('deliver') || m.includes('track') || m.includes('status')) return aiInsights.chatResponses['delivery'].response;
  return aiInsights.chatResponses['default'].response;
}

export default function SKAIInsights() {
  const [messages, setMessages] = useState(chatInit);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, typing]);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setTyping(true);
    await new Promise(r => setTimeout(r, 900));
    setTyping(false);
    setMessages(prev => [...prev, { role: 'bot', text: getResponse(userMsg) }]);
  };

  return (
    <div className="space-y-6">
      {/* Title Card */}
      <div className="glass-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-white/80">
        <div>
          <span className="badge bg-purple-100/80 text-purple-800 border border-purple-200 mb-1.5 flex items-center gap-1.5 w-fit">
            <Sparkles className="w-3 h-3 text-purple-600" /> AI Procurement Intelligence
          </span>
          <h2 className="text-2xl font-extrabold text-[#17251F] tracking-tight">AI Insights & Demand Forecasting</h2>
          <p className="text-xs sm:text-sm text-[#64746B] mt-0.5">
            Predictive demand patterns, cross-supplier cost benchmarking, and procurement timing advice
          </p>
        </div>
        <div className="text-right text-[11px] text-[#64746B] bg-white/60 p-2.5 rounded-xl border border-white/80">
          <span className="font-semibold text-forest-700">Model Engine:</span> Predefined rural FMCG behavioral model
        </div>
      </div>

      {/* Demand Predictions & Price Benchmarking */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Demand Predictions */}
        <div className="glass-card p-6 border border-white/80 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-700">
                <Brain className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-[#17251F]">Demand Predictions (Next 30 Days)</h3>
            </div>
            <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
              Winter Seasonal Model
            </span>
          </div>

          <div className="space-y-3">
            {aiInsights.demandPredictions.map((pred, i) => (
              <div key={i} className="p-3.5 bg-white/50 backdrop-blur-sm rounded-xl border border-white/70">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-bold text-xs text-[#17251F]">{pred.productName}</div>
                  <div className={`flex items-center gap-1 text-xs font-bold ${
                    pred.trend === 'up' ? 'text-forest-700' : 'text-amber-600'
                  }`}>
                    {pred.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    <span>{pred.predictedDemand} units est.</span>
                  </div>
                </div>
                <div className="text-[11px] text-[#64746B] leading-relaxed">{pred.reason}</div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100/60 text-[11px]">
                  <span className="text-[#64746B]">Confidence: <strong className="text-[#17251F]">{pred.confidence}%</strong></span>
                  <span className="text-forest-700 font-bold">Suggested Reorder: {pred.suggestedOrder} units</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Smart Price Comparison */}
        <div className="glass-card p-6 border border-white/80 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-700">
                <TrendingDown className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-[#17251F]">Smart Supplier Price Comparison</h3>
            </div>
            <span className="text-[11px] font-semibold text-forest-700 bg-forest-50 px-2 py-0.5 rounded-md">
              Factory Wholesale
            </span>
          </div>

          <div className="space-y-4">
            {aiInsights.priceComparisons.map((pc, i) => (
              <div key={i} className="space-y-2">
                <div className="font-bold text-xs text-[#17251F]">{pc.productName}</div>
                <div className="space-y-1.5">
                  {pc.suppliers.map((s, si) => {
                    const isRec = s.name === pc.recommended;
                    return (
                      <div
                        key={si}
                        className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-all ${
                          isRec ? 'bg-forest-50/80 border-forest-300 shadow-xs' : 'bg-white/40 border-white/70'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-[#17251F] flex items-center gap-1.5">
                            {s.name} {isRec && <span className="badge bg-forest-600 text-white text-[9px] py-0 px-1.5">Recommended</span>}
                          </div>
                          <div className="text-[11px] text-[#64746B] mt-0.5">MOQ: {s.moq} units · {s.delivery}d delivery · ★{s.rating}</div>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-extrabold ${isRec ? 'text-forest-700' : 'text-[#17251F]'}`}>₹{s.price}</div>
                          {isRec && <div className="text-[10px] text-forest-600 font-semibold">Save ₹{pc.savings}/unit</div>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Procurement Assistant Chat Panel */}
      <div className="glass-card border border-white/80 overflow-hidden shadow-card-hover">
        <div className="px-6 py-4 border-b border-gray-100/70 flex items-center justify-between bg-white/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-forest-600 rounded-xl flex items-center justify-center text-white shadow-xs">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#17251F]">AI Procurement Assistant</h3>
              <p className="text-[11px] text-[#64746B]">Interactive Q&A regarding optimal buying schedules & savings</p>
            </div>
          </div>
          <span className="text-[11px] text-[#64746B] italic hidden sm:block">Predefined AI responses</span>
        </div>

        {/* Chat Stream */}
        <div ref={chatRef} className="h-72 overflow-y-auto p-5 space-y-3 bg-[#F8FAF8]/40">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
              {m.role === 'bot' && (
                <div className="w-7 h-7 rounded-xl bg-forest-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}
              <div className={`max-w-md rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-forest-600 text-white rounded-br-xs shadow-xs'
                  : 'bg-white/80 backdrop-blur-md text-[#17251F] border border-white/90 rounded-bl-xs shadow-xs'
              }`}>
                {m.text}
              </div>
              {m.role === 'user' && (
                <div className="w-7 h-7 rounded-xl bg-gray-200 text-[#17251F] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">
                  RY
                </div>
              )}
            </div>
          ))}
          {typing && (
            <div className="flex justify-start gap-2">
              <div className="w-7 h-7 rounded-xl bg-forest-600 text-white flex items-center justify-center flex-shrink-0">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="bg-white/80 backdrop-blur-md border border-white/90 rounded-2xl rounded-bl-xs px-4 py-2.5">
                <div className="flex gap-1 py-1">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
                      className="w-1.5 h-1.5 bg-forest-600 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3.5 border-t border-gray-100/70 bg-white/60 flex gap-2">
          <input
            className="input py-2 text-xs sm:text-sm"
            placeholder='Ask: "Which products should I purchase this week?"'
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
          />
          <button onClick={send} className="btn-primary px-5 flex items-center gap-1.5 text-xs shadow-xs">
            <Send className="w-3.5 h-3.5" /> Send
          </button>
        </div>

        {/* Quick query buttons */}
        <div className="px-4 pb-3 pt-1 flex gap-2 flex-wrap bg-white/40">
          {[
            'Which products should I buy this week?',
            'Which supplier offers the best price?',
            'How much can I save through collective purchasing?',
            'What is my delivery status?',
          ].map(q => (
            <button
              key={q}
              onClick={() => { setInput(q); }}
              className="text-[11px] bg-white/80 hover:bg-white text-forest-700 px-3 py-1 rounded-full border border-forest-100 transition-colors shadow-xs"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
