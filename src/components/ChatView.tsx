import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Recommendation } from '../types';
import { Send, Sparkles, Compass, AlertCircle, BarChart2, ShieldCheck, Play } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChatViewProps {
  onApproveRecommendation: (id: string) => void;
}

export default function ChatView({ onApproveRecommendation }: ChatViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Welcome to MarketOS Decision Intelligence. I am your autonomous marketplace analyst. Ask me any question regarding supply shortages, driver attrition, regional surge, or structural metrics. I will answer with live spatial telemetry, metrics, and actionable recommendations.",
      timestamp: '08:13 AM'
    }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    { text: "Why are cancellations increasing?", id: "q-cancels" },
    { text: "Why is revenue decreasing?", id: "q-revenue" },
    { text: "Where should we increase supply?", id: "q-supply" },
    { text: "What promotions should we run?", id: "q-promos" },
    { text: "How should pricing change tomorrow?", id: "q-pricing" }
  ];

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // 1. Add user message
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // 2. Simulate AI thinking & reply with structured agent data
    setTimeout(() => {
      let aiResponse: Partial<ChatMessage> = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const normalizedText = text.toLowerCase();

      if (normalizedText.includes('cancel') || normalizedText.includes('increasing')) {
        aiResponse.text = "Analysis complete. Localized customer ride cancellations have spiked by 240% over the last 40 minutes, concentrated heavily inside SOMA and Mission District. The core driver is an extreme supply-density gap (-120 drivers) caused by rain. Couriers are turning away orders because wait times at food merchants have breached 14 minutes, resulting in dispatch expirations.";
        aiResponse.chartType = 'bar';
        aiResponse.chartData = [
          { district: 'Downtown', cancels: 4.2 },
          { district: 'Financial', cancels: 2.1 },
          { district: 'SOMA', cancels: 8.5 },
          { district: 'Mission', cancels: 9.8 },
          { district: 'Marina', cancels: 1.8 }
        ];
        aiResponse.chartKeys = ['cancels'];
        aiResponse.recommendations = [
          {
            id: 'rec-chat-1',
            title: 'Deploy $4.50 driver shift bonus in Mission District',
            category: 'supply',
            description: 'Triggers instant supply migration to resolve local cancel bottlenecks.',
            priority: 'critical',
            businessImpact: 'Cut cancels by 65% in 30 mins.',
            confidence: 94,
            expectedRevenueImpact: '+$4,200 (retained trips)',
            evidence: [],
            status: 'pending',
            date: 'June 27, 2026'
          }
        ];
      } else if (normalizedText.includes('revenue') || normalizedText.includes('decreasing')) {
        aiResponse.text = "Diagnostic query processed. Net revenue decreases (-4.8% below MTD baseline) are attributed to an over-saturation of dynamic promotions redemptions inside SOMA and Marina. While order volumes remain stable, net-commission margins contracted from 18% to 14.5% due to high coupon-matching triggers on non-peak orders.";
        aiResponse.chartType = 'bar';
        aiResponse.chartData = [
          { category: 'Base Fare', revenue: 24.2 },
          { category: 'Surge Delta', revenue: 12.8 },
          { category: 'Promos Cost', revenue: -14.5 },
          { category: 'Driver Cut', revenue: -12.9 },
          { category: 'Net Revenue', revenue: 9.6 }
        ];
        aiResponse.chartKeys = ['revenue'];
        aiResponse.recommendations = [
          {
            id: 'rec-chat-2',
            title: 'Deactivate off-peak general promo coupons in Marina',
            category: 'pricing',
            description: 'Reduces margin erosion in stable supply zones.',
            priority: 'high',
            businessImpact: 'Reclaim 3.4% core commission yield.',
            confidence: 89,
            expectedRevenueImpact: '+$6,800 MTD',
            evidence: [],
            status: 'pending',
            date: 'June 27, 2026'
          }
        ];
      } else if (normalizedText.includes('supply') || normalizedText.includes('increase')) {
        aiResponse.text = "Spatial rebalancer evaluation complete. Severe courier deficiencies are currently registered inside Mission District (-150 drivers) and Downtown (-120 drivers) as stadium sports games conclude. We observe 182 idle couriers staging inside Sunset and Marina districts with average wait gaps of 18 minutes.";
        aiResponse.chartType = 'bar';
        aiResponse.chartData = [
          { district: 'Sunset', idleDrivers: 80 },
          { district: 'Marina', idleDrivers: 62 },
          { district: 'Mission', idleDrivers: -150 },
          { district: 'Downtown', idleDrivers: -120 }
        ];
        aiResponse.chartKeys = ['idleDrivers'];
        aiResponse.recommendations = [
          {
            id: 'rec-chat-3',
            title: 'Broadcast $3.50 commuter bonus to idle Sunset drivers',
            category: 'supply',
            description: 'Directs idle supply to high-density downtown dispatch zones.',
            priority: 'high',
            businessImpact: 'Migrate 45+ drivers in 15 mins.',
            confidence: 91,
            expectedRevenueImpact: '+$5,400',
            evidence: [],
            status: 'pending',
            date: 'June 27, 2026'
          }
        ];
      } else if (normalizedText.includes('promo') || normalizedText.includes('discount')) {
        aiResponse.text = "Targeted promotions engine computed. Standard broad promotions are causing margin dilution. I recommend deploying an automated loyal streak voucher to our At-Risk Promo-Driven customer cohort. Vouchers are geofenced to lunch and afternoon off-peak hours to avoid adding wait-times during peak commute hours.";
        aiResponse.chartType = 'bar';
        aiResponse.chartData = [
          { cohort: 'Power Users', conversionRate: 14 },
          { cohort: 'Promo-Driven', conversionRate: 32 },
          { cohort: 'At-Risk', conversionRate: 21 },
          { cohort: 'New Users', conversionRate: 11 }
        ];
        aiResponse.chartKeys = ['conversionRate'];
        aiResponse.recommendations = [
          {
            id: 'rec-chat-4',
            title: 'Deploy $5 lunch streak vouchers to At-Risk segment',
            category: 'personalization',
            description: 'Fosters transaction frequency while preserving peak margins.',
            priority: 'medium',
            businessImpact: 'Lift segment active volume by +18%.',
            confidence: 86,
            expectedRevenueImpact: '+$18,900',
            evidence: [],
            status: 'pending',
            date: 'June 27, 2026'
          }
        ];
      } else if (normalizedText.includes('pricing') || normalizedText.includes('tomorrow')) {
        aiResponse.text = "Dynamic pricing forecaster completed. Heavy storm radar overlays predict heavy rainfall between 16:00 and 19:00 PST tomorrow. Commuter request baseline will increase by 160% across the Financial District and SOMA sectors. I advise applying a pre-emptive 1.4x surge cap modifier to attract regional suburban drivers.";
        aiResponse.chartType = 'bar';
        aiResponse.chartData = [
          { hour: '14:00', predSurge: 1.0 },
          { hour: '15:00', predSurge: 1.15 },
          { hour: '16:00', predSurge: 1.45 },
          { hour: '17:00', predSurge: 1.75 },
          { hour: '18:00', predSurge: 1.9 },
          { hour: '19:00', predSurge: 1.6 }
        ];
        aiResponse.chartKeys = ['predSurge'];
        aiResponse.recommendations = [
          {
            id: 'rec-chat-5',
            title: 'Apply 1.4x pre-emptive surge caps tomorrow in Fin District',
            category: 'pricing',
            description: 'Insulates fulfillment rates from rainfall-induced supply collapse.',
            priority: 'high',
            businessImpact: 'Maintains fulfillment > 90%.',
            confidence: 91,
            expectedRevenueImpact: '+$28,500',
            evidence: [],
            status: 'pending',
            date: 'June 27, 2026'
          }
        ];
      } else {
        // Generic response
        aiResponse.text = `Understood. I have initiated a deep telemetry scan across the database using keyword "${text}". The database registers full health and is working under regular operational coefficients. Let me know if you would like me to compile specific stats on cancellations, drivers, or dynamic pricing.`;
      }

      setMessages(prev => [...prev, aiResponse as ChatMessage]);
      setIsTyping(false);
    }, 1200);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-slate-950 border border-slate-900 rounded-2xl overflow-hidden animate-fade-in">
      
      {/* Upper header */}
      <div className="p-4 bg-slate-900/40 border-b border-slate-900 flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-violet-500/15 text-violet-400 border border-violet-500/20 flex items-center justify-center">
            <Sparkles size={16} />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm text-white">MarketOS Copilot</h3>
            <span className="text-[10px] text-slate-500 font-mono">AUTONOMOUS AGENT INTEGRATOR</span>
          </div>
        </div>

        <div className="text-right text-[10px] font-mono text-slate-500">
          <span>MODEL: MARKET_NLP_v4.5</span>
        </div>
      </div>

      {/* Main transcript dialogue stream */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-thin">
        {messages.map((msg) => {
          const isAssistant = msg.sender === 'assistant';

          return (
            <div 
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${isAssistant ? '' : 'ml-auto flex-row-reverse'}`}
            >
              {/* Profile letter avatar */}
              <div className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs border ${
                isAssistant ? 'bg-violet-500/10 text-violet-400 border-violet-500/20 shrink-0' : 'bg-slate-800 text-slate-300 border-slate-700 shrink-0'
              }`}>
                {isAssistant ? 'AI' : 'US'}
              </div>

              {/* Message box */}
              <div className={`space-y-3.5 p-4 rounded-2xl text-xs leading-relaxed ${
                isAssistant ? 'bg-slate-900/60 border border-slate-900 text-slate-200' : 'bg-cyan-400/5 border border-cyan-400/15 text-slate-200'
              }`}>
                {/* Text */}
                <p className="font-sans text-slate-300 whitespace-pre-line">{msg.text}</p>

                {/* Optional Chart built into Chat bubble! */}
                {msg.chartData && msg.chartType === 'bar' && msg.chartKeys && (
                  <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-850/80 w-full min-h-[140px] pt-4">
                    <span className="block text-[9px] text-slate-500 font-mono mb-2 uppercase tracking-widest">SUPPORTING TELEMETRY GRAPH</span>
                    <ResponsiveContainer width="100%" height={120}>
                      <BarChart data={msg.chartData} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="2 2" stroke="#1e293b" />
                        <XAxis dataKey={Object.keys(msg.chartData[0])[0]} stroke="#64748b" fontSize={9} tickLine={false} />
                        <YAxis stroke="#64748b" fontSize={9} tickLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#090d16', borderColor: '#1e293b', borderRadius: '6px' }} />
                        <Bar dataKey={msg.chartKeys[0]} fill="#22d3ee" radius={[3, 3, 0, 0]} maxBarSize={20} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {/* Inline Actionable Recommendation card inside chat bubble! */}
                {msg.recommendations && msg.recommendations.map((rec) => (
                  <div key={rec.id} className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-2.5 animate-fade-in text-xs">
                    <div className="flex justify-between items-center border-b border-slate-900 pb-1.5">
                      <span className="text-[10px] font-mono text-rose-400 bg-rose-500/10 px-1.5 py-0.2 rounded font-bold uppercase">{rec.priority} action</span>
                      <span className="text-[10px] text-slate-500 font-mono">Confidence: {rec.confidence}%</span>
                    </div>
                    <h5 className="font-bold text-white text-xs">{rec.title}</h5>
                    <p className="text-[11px] text-slate-400">{rec.description}</p>
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-emerald-400">Impact: {rec.businessImpact}</span>
                      <span className="text-cyan-400">{rec.expectedRevenueImpact}</span>
                    </div>
                    <button
                      onClick={() => {
                        onApproveRecommendation(rec.id);
                        alert(`Action approved successfully via chat copilot!`);
                        // Set recommended as approved
                        msg.recommendations = msg.recommendations?.map(r => r.id === rec.id ? { ...r, status: 'approved' } : r);
                        setMessages([...messages]);
                      }}
                      disabled={rec.status === 'approved'}
                      className={`w-full font-bold text-[10px] py-1.5 rounded cursor-pointer transition-all ${
                        rec.status === 'approved' 
                          ? 'bg-slate-900 text-slate-500 border border-slate-800' 
                          : 'bg-cyan-400 hover:bg-cyan-300 text-slate-950'
                      }`}
                    >
                      {rec.status === 'approved' ? '✓ ACTION APPROVED & DEPLOYED' : 'APPROVE & EXECUTE DISPATCH'}
                    </button>
                  </div>
                ))}

                <span className="block text-[9px] text-slate-500 font-mono text-right pt-1">{msg.timestamp}</span>
              </div>
            </div>
          );
        })}

        {/* Typing Loader */}
        {isTyping && (
          <div className="flex gap-3 max-w-lg">
            <div className="w-7 h-7 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 flex items-center justify-center font-mono text-xs">
              AI
            </div>
            <div className="bg-slate-900/60 border border-slate-900 p-4 rounded-2xl flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Chip Questions */}
      <div className="px-5 py-2.5 border-t border-slate-900/80 flex flex-wrap gap-2 overflow-x-auto bg-slate-950/40 select-none">
        {quickQuestions.map((q) => (
          <button
            key={q.id}
            onClick={() => handleSendMessage(q.text)}
            className="shrink-0 bg-slate-900/60 border border-slate-850 hover:border-slate-700 hover:text-white text-[11px] text-slate-400 px-3.5 py-1.5 rounded-full transition-all cursor-pointer"
          >
            {q.text}
          </button>
        ))}
      </div>

      {/* Text bottom input bar */}
      <div className="p-4 bg-slate-950 border-t border-slate-900 flex gap-2">
        <input 
          type="text"
          placeholder="Ask anything (e.g., 'Why are cancellations increasing?' or 'What promotions should we run?')..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
          className="flex-1 bg-slate-900/80 border border-slate-850 focus:border-cyan-400 hover:border-slate-800 text-xs text-white placeholder-slate-600 px-4 py-3 rounded-xl outline-none"
        />
        <button
          onClick={() => handleSendMessage(inputText)}
          className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 p-3 rounded-xl cursor-pointer transition-colors"
        >
          <Send size={16} />
        </button>
      </div>

    </div>
  );
}
