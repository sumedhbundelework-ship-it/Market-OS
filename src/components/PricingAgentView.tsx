import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CircleDollarSign, CloudRain, ShieldCheck, HelpCircle, Activity, Sparkles } from 'lucide-react';

interface PricingAgentViewProps {
  stats: {
    averageSurge: number;
  };
  zones: any[];
  onApplyOverrideSurge: (zoneId: string, value: number) => void;
}

export default function PricingAgentView({ stats, zones, onApplyOverrideSurge }: PricingAgentViewProps) {
  // Dynamic Simulator State
  const [weatherState, setWeatherState] = useState<'clear' | 'rain' | 'storm'>('rain');
  const [passengerState, setPassengerState] = useState<number>(12000); // egress size
  const [trafficDelay, setTrafficDelay] = useState<number>(15); // delay in minutes

  // Calculate simulated pricing recommended surge multiplier
  const baseSurge = 1.0;
  const weatherModifier = weatherState === 'clear' ? 0.0 : weatherState === 'rain' ? 0.20 : 0.45;
  const passengerModifier = (passengerState / 15000) * 0.35;
  const trafficModifier = (trafficDelay / 30) * 0.25;
  const simulatedSurge = Math.min(3.5, Math.max(1.0, baseSurge + weatherModifier + passengerModifier + trafficModifier));

  // Graph data representing pricing trends over 24h
  const trendData = [
    { time: '00:00', historical: 1.0, recommended: 1.0 },
    { time: '03:00', historical: 1.0, recommended: 1.0 },
    { time: '06:00', historical: 1.1, recommended: 1.0 },
    { time: '09:00', historical: 1.35, recommended: 1.4 },
    { time: '12:00', historical: 1.2, recommended: 1.25 },
    { time: '15:00', historical: 1.1, recommended: 1.15 },
    { time: '17:00', historical: 1.45, recommended: 1.65 },
    { time: '18:00', historical: 1.6, recommended: 1.8 },
    { time: '19:00', historical: 1.5, recommended: 1.7 },
    { time: '21:00', historical: 1.25, recommended: 1.3 },
    { time: '23:00', historical: 1.1, recommended: 1.1 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="border-b border-slate-900 pb-5">
        <span className="text-xs font-mono text-cyan-400 tracking-wider">DYNAMIC SURGE & INCENTIVE OPTIMIZATION</span>
        <h2 className="font-display font-bold text-2xl text-white">Dynamic Pricing Engine</h2>
        <p className="text-xs text-slate-500 font-sans">Balances marketplace supply-demand density by altering rider prices and driver payout structures in real-time.</p>
      </div>

      {/* KPI Stats block */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-5 space-y-2">
          <span className="text-xs text-slate-500 font-mono">SYSTEM AVERAGE SURGE</span>
          <div className="flex justify-between items-baseline">
            <span className="text-2xl font-mono font-bold text-white">{stats.averageSurge}x</span>
            <span className="text-xs text-emerald-500 font-mono">+4.2% Net Yield</span>
          </div>
          <p className="text-[11px] text-slate-500">Across all 8 active metropolitan clusters</p>
        </div>

        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-5 space-y-2">
          <span className="text-xs text-slate-500 font-mono">ACTIVE SURGE CONTRACTS</span>
          <div className="flex justify-between items-baseline">
            <span className="text-2xl font-mono font-bold text-cyan-400">1,820 / hr</span>
            <span className="text-xs text-cyan-400 font-mono">Optimal</span>
          </div>
          <p className="text-[11px] text-slate-500">Rider demand capped at 1.8x ceiling</p>
        </div>

        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-5 space-y-2">
          <span className="text-xs text-slate-500 font-mono">DRIVER EARNINGS LIFT</span>
          <div className="flex justify-between items-baseline">
            <span className="text-2xl font-mono font-bold text-violet-400">+$6.82 / ride</span>
            <span className="text-xs text-emerald-500 font-mono">18.4% Churn Choke</span>
          </div>
          <p className="text-[11px] text-slate-500">Average driver bonus supplement</p>
        </div>
      </div>

      {/* Pricing Simulator Panel & Live Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Dynamic Simulator inputs (Col span 5) */}
        <div className="lg:col-span-5 bg-slate-900/50 border border-slate-900 rounded-2xl p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-cyan-400 tracking-wider">REAL-TIME SURGE SIMULATOR</span>
            <h4 className="font-display font-bold text-base text-white">Inbound Environmental Telemetry</h4>
            <p className="text-[11px] text-slate-500">Alter current atmospheric or egress inputs to view predicted AI pricing outcomes.</p>
          </div>

          <div className="space-y-4 flex-1 pt-2">
            
            {/* Weather selector */}
            <div className="space-y-2">
              <label className="text-xs text-slate-400 block font-semibold">Climate Condition Intensity</label>
              <div className="grid grid-cols-3 gap-2 bg-slate-950 p-1 rounded-lg border border-slate-850">
                {(['clear', 'rain', 'storm'] as const).map((w) => (
                  <button
                    key={w}
                    onClick={() => setWeatherState(w)}
                    className={`py-1.5 rounded text-xs font-mono font-medium capitalize cursor-pointer transition-colors ${weatherState === w ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/20' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Stadium Egress passengers capacity slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-semibold">Stadium / Event Egress Volume</span>
                <span className="font-mono text-white font-bold">{passengerState.toLocaleString()} passengers</span>
              </div>
              <input 
                type="range"
                min="0"
                max="45000"
                step="1000"
                value={passengerState}
                onChange={(e) => setPassengerState(parseInt(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
              <span className="block text-[9px] text-slate-500 font-mono">Simulates live stadium egress crowds leaving sports events.</span>
            </div>

            {/* Traffic delay index slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-semibold">Localized Traffic Delays</span>
                <span className="font-mono text-white font-bold">{trafficDelay} minutes backlog</span>
              </div>
              <input 
                type="range"
                min="0"
                max="60"
                step="5"
                value={trafficDelay}
                onChange={(e) => setTrafficDelay(parseInt(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
              <span className="block text-[9px] text-slate-500 font-mono">Friction matrix overlay for dispatch matching routes.</span>
            </div>

          </div>

          {/* Simulated result visualization */}
          <div className="p-4 bg-slate-950 border border-violet-500/20 rounded-xl space-y-3">
            <div className="flex justify-between items-center">
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-500 font-mono block">SIMULATED OPTIMAL SURGE</span>
                <span className="text-3xl font-mono font-black text-cyan-400">{simulatedSurge.toFixed(2)}x</span>
              </div>
              
              <div className="text-right">
                <span className="text-[9px] text-slate-500 font-mono block">CONFIDENCE LIFT</span>
                <span className="text-xs text-emerald-500 font-bold font-mono">+9.4% Margin</span>
              </div>
            </div>
            
            <button 
              onClick={() => {
                // Apply simulated surge multiplier to Downtown core
                onApplyOverrideSurge('zone-1', simulatedSurge);
                alert(`Simulated Surge Multiplier of ${simulatedSurge.toFixed(2)}x applied to Downtown Core!`);
              }}
              className="w-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs py-2.5 rounded-lg transition-all cursor-pointer shadow-lg shadow-cyan-400/15"
            >
              Push Simulated Surge to Production Cluster
            </button>
          </div>
        </div>

        {/* Live Surge prediction graph (Col span 7) */}
        <div className="lg:col-span-7 bg-slate-900/50 border border-slate-900 rounded-2xl p-5 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] font-mono text-violet-400 tracking-wider">AUTONOMOUS PRICE MODULATION TIMELINE</span>
            <h4 className="font-display font-bold text-base text-white">24h Surge Prediction Flow</h4>
            <p className="text-[11px] text-slate-500">Historical static surge caps vs MarketOS agent dynamic pricing projections.</p>
          </div>

          <div className="flex-1 min-h-[220px] w-full pt-4">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorHist" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRec" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} domain={[1.0, 2.2]} tickFormatter={(v) => `${v}x`} />
                <Tooltip contentStyle={{ backgroundColor: '#090d16', borderColor: '#1e293b', borderRadius: '8px' }} labelStyle={{ color: '#94a3b8', fontFamily: 'monospace', fontSize: '11px' }} />
                <Area name="Historical Base Surge" type="monotone" dataKey="historical" stroke="#3b82f6" fillOpacity={1} fill="url(#colorHist)" strokeWidth={1.5} />
                <Area name="MarketOS AI Recommended" type="monotone" dataKey="recommended" stroke="#22d3ee" fillOpacity={1} fill="url(#colorRec)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-900/80">
            <span>MODEL: SURGE_REGRESSOR_v4.2</span>
            <span>INTEGRATED PLATFORMS: STRIPE INVOICING API</span>
          </div>
        </div>

      </div>

      {/* Dynamic pricing recommendation cards */}
      <div className="space-y-3">
        <h4 className="font-display font-bold text-sm text-white">Surge Control Recommendations</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-900/30 border border-slate-900 rounded-xl space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] bg-amber-500/10 text-amber-500 border border-amber-500/15 px-1.5 py-0.5 rounded font-mono">SUPPLY REBALANCER</span>
              <span className="text-xs font-mono text-slate-500">Confidence: 91%</span>
            </div>
            <h5 className="font-semibold text-white text-xs">Financial District Rush-Hour Surge Override</h5>
            <p className="text-[11px] text-slate-400">Pre-emptively apply 1.25x surge multiplier to Financial District before standard commuter rush to secure active driver inflow.</p>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-emerald-500 font-medium">Expected revenue: +$8,400</span>
              <button onClick={() => { onApplyOverrideSurge('zone-2', 1.25); alert('Override applied!'); }} className="text-cyan-400 font-semibold hover:text-cyan-300 cursor-pointer">Apply override</button>
            </div>
          </div>

          <div className="p-4 bg-slate-900/30 border border-slate-900 rounded-xl space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] bg-rose-500/10 text-rose-500 border border-rose-500/15 px-1.5 py-0.5 rounded font-mono">CRITICAL SURGENCY</span>
              <span className="text-xs font-mono text-slate-500">Confidence: 94%</span>
            </div>
            <h5 className="font-semibold text-white text-xs">Mission District Spatial Incentive Boost</h5>
            <p className="text-[11px] text-slate-400">Deploy a $4.50 driver shift guarantee inside Mission District to suppress cancellation surges and absorb pending customer orders.</p>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-emerald-500 font-medium">Expected wait time: -3.5 mins</span>
              <button onClick={() => { onApplyOverrideSurge('zone-4', 1.45); alert('Override applied!'); }} className="text-cyan-400 font-semibold hover:text-cyan-300 cursor-pointer">Apply override</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
