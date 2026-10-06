import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { LineChart, CloudRain, Music, Calendar, HelpCircle, RefreshCw } from 'lucide-react';

export default function DemandAgentView() {
  const [isRaining, setIsRaining] = useState<boolean>(false);
  const [hasEvent, setHasEvent] = useState<boolean>(false);
  const [isWeekend, setIsWeekend] = useState<boolean>(false);

  // Hourly base predicted demand
  const hourlyBase = [
    { hour: '08:00', basePred: 800, actual: 810 },
    { hour: '10:00', basePred: 760, actual: 750 },
    { hour: '12:00', basePred: 870, actual: 890 },
    { hour: '14:00', basePred: 650, actual: 640 },
    { hour: '16:00', basePred: 990, actual: 980 },
    { hour: '18:00', basePred: 1350 },
    { hour: '20:00', basePred: 1200 },
    { hour: '22:00', basePred: 950 },
    { hour: '00:00', basePred: 600 },
    { hour: '02:00', basePred: 280 },
    { hour: '04:00', basePred: 140 },
    { hour: '06:00', basePred: 480 },
  ];

  // Adjust predicted curves dynamically depending on checked options
  const chartData = hourlyBase.map((item) => {
    let multiplier = 1.0;
    if (isRaining) multiplier += 0.25; // +25% rain factor
    if (isWeekend) multiplier += 0.15; // +15% weekend factor
    
    // Concert impact is concentrated at evening peak hours
    let eventBoost = 0;
    if (hasEvent && (item.hour === '18:00' || item.hour === '20:00')) {
      eventBoost = 350; // extra orders
    }

    const predictedDemand = Math.round(item.basePred * multiplier + eventBoost);

    return {
      time: item.hour,
      'Actual Transactions': item.actual,
      'AI Predicted Demand': predictedDemand
    };
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="border-b border-slate-900 pb-5">
        <span className="text-xs font-mono text-cyan-400 tracking-wider">PREDICTIVE SPATIAL MODELING</span>
        <h2 className="font-display font-bold text-2xl text-white">Demand Forecast Agent</h2>
        <p className="text-xs text-slate-500 font-sans">
          Ingests weather feeds, regional ticket calendars, and localized holiday coefficients to output hyper-local spatial demand predictions.
        </p>
      </div>

      {/* Grid: Controls (Col span 4) and Interactive Chart (Col span 8) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Modifiers panel */}
        <div className="lg:col-span-4 bg-slate-900/50 border border-slate-900 rounded-2xl p-5 flex flex-col justify-between space-y-5">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-cyan-400 tracking-wider">MODEL BIAS INGESTION</span>
            <h4 className="font-display font-bold text-base text-white">Environmental Modifiers</h4>
            <p className="text-[11px] text-slate-500">Enable various environmental overlays to watch the forecasting model re-calculate active demand curves.</p>
          </div>

          <div className="space-y-4 flex-1 pt-2">
            
            {/* Rain switch */}
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-850 hover:border-slate-800 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isRaining ? 'bg-cyan-400/15 text-cyan-400' : 'bg-slate-900 text-slate-500'}`}>
                  <CloudRain size={16} />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Heavy Rainfall (+25%)</span>
                  <span className="text-[10px] text-slate-500">Increases delivery and short-trip demand</span>
                </div>
              </div>
              <input 
                type="checkbox"
                checked={isRaining}
                onChange={(e) => setIsRaining(e.target.checked)}
                className="w-4 h-4 rounded text-cyan-400 focus:ring-cyan-400 bg-slate-900 border-slate-800 cursor-pointer"
              />
            </label>

            {/* Stadium egress switch */}
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-850 hover:border-slate-800 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${hasEvent ? 'bg-violet-500/15 text-violet-400' : 'bg-slate-900 text-slate-500'}`}>
                  <Music size={16} />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Stadium Concert Event</span>
                  <span className="text-[10px] text-slate-500">Localized surge peaks at Oracle Park (18:00 - 20:00)</span>
                </div>
              </div>
              <input 
                type="checkbox"
                checked={hasEvent}
                onChange={(e) => setHasEvent(e.target.checked)}
                className="w-4 h-4 rounded text-violet-400 focus:ring-violet-400 bg-slate-900 border-slate-800 cursor-pointer"
              />
            </label>

            {/* Weekend switch */}
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-850 hover:border-slate-800 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isWeekend ? 'bg-amber-500/15 text-amber-500' : 'bg-slate-900 text-slate-500'}`}>
                  <Calendar size={16} />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Weekend Coefficient (+15%)</span>
                  <span className="text-[10px] text-slate-500">Broad high demand across leisure hotspots</span>
                </div>
              </div>
              <input 
                type="checkbox"
                checked={isWeekend}
                onChange={(e) => setIsWeekend(e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 bg-slate-900 border-slate-800 cursor-pointer"
              />
            </label>

          </div>

          {/* Forecast performance metrics */}
          <div className="p-3.5 bg-slate-950 border border-slate-850 rounded-xl text-xs space-y-1.5 font-mono">
            <div className="flex justify-between">
              <span className="text-slate-500">HISTORICAL MAPE:</span>
              <span className="text-white font-bold">5.2% (Excellent)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">MODEL RE-LIFT TIME:</span>
              <span className="text-white">Every 15 minutes</span>
            </div>
          </div>
        </div>

        {/* Recharts chart (Col span 8) */}
        <div className="lg:col-span-8 bg-slate-900/50 border border-slate-900 rounded-2xl p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 tracking-wider">ACTIVE PREDICTIONS CLUSTER</span>
              <h4 className="font-display font-bold text-base text-white">Predicted Transaction Frequency</h4>
            </div>
            
            <div className="bg-slate-950 border border-slate-850 px-3 py-1.5 rounded-lg text-right font-mono text-[10px]">
              <span className="text-slate-500 block">TOTAL VOLUME FORECAST (24h)</span>
              <span className="text-cyan-400 font-bold text-sm">
                {chartData.reduce((acc, curr) => acc + (curr['AI Predicted Demand'] || 0), 0).toLocaleString()} orders
              </span>
            </div>
          </div>

          <div className="flex-1 min-h-[260px] w-full pt-4">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="predGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="actGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#090d16', borderColor: '#1e293b', borderRadius: '8px' }} labelStyle={{ color: '#94a3b8', fontFamily: 'monospace', fontSize: '11px' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area name="Actual Transactions" type="monotone" dataKey="Actual Transactions" stroke="#8b5cf6" strokeWidth={1.5} fillOpacity={1} fill="url(#actGlow)" />
                <Area name="AI Predicted Demand" type="monotone" dataKey="AI Predicted Demand" stroke="#22d3ee" strokeWidth={2.5} fillOpacity={1} fill="url(#predGlow)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-900/80">
            <span>PRED_SYSTEM: GRU_AUTOENCODER_LSTM</span>
            <span>INTEGRATIONS: ACCUWEATHER WEATHER INGEST API</span>
          </div>
        </div>

      </div>

    </div>
  );
}
