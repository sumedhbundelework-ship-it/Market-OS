import React, { useState } from 'react';
import { Driver } from '../types';
import { INITIAL_DRIVERS } from '../data/mockData';
import { UserCheck, ShieldAlert, Award, TrendingUp, AlertTriangle, Compass, Search } from 'lucide-react';

export default function DriverView() {
  const [drivers, setDrivers] = useState<Driver[]>(INITIAL_DRIVERS);
  const [selectedDriverId, setSelectedDriverId] = useState<string>(drivers[0].id);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [dispatchedSubsidy, setDispatchedSubsidy] = useState<{ [key: string]: boolean }>({});

  const handleDispatchSubsidy = (driverId: string) => {
    setDispatchedSubsidy(prev => ({ ...prev, [driverId]: true }));
    
    // Simulate updating driver metrics on successful payout
    setDrivers(prev => 
      prev.map(d => {
        if (d.id === driverId) {
          return {
            ...d,
            earnings: d.earnings + 150,
            acceptanceRate: Math.min(100, d.acceptanceRate + 8),
            churnRisk: d.churnRisk === 'critical' ? 'high' : d.churnRisk === 'high' ? 'medium' : 'low'
          };
        }
        return d;
      })
    );
  };

  const selectedDriver = drivers.find(d => d.id === selectedDriverId) || drivers[0];

  const filteredDrivers = drivers.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.churnRisk.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="border-b border-slate-900 pb-5">
        <span className="text-xs font-mono text-cyan-400 tracking-wider">FLEET RETENTION & LIFELINE TELEMETRY</span>
        <h2 className="font-display font-bold text-2xl text-white">Driver Analytics & Fleet Insights</h2>
        <p className="text-xs text-slate-500 font-sans">
          Monitors driver behavior, acceptance rates, and idle time thresholds to issue proactive earnings retention modifiers.
        </p>
      </div>

      {/* Driver Fleet Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] text-slate-500 font-mono">TOTAL ACTIVE COHORT</span>
          <span className="block text-2xl font-mono font-bold text-white">26,410</span>
          <span className="text-[10px] text-emerald-500 font-mono">92% active on-street</span>
        </div>
        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] text-slate-500 font-mono">MEDIAN FLEET IDLE TIME</span>
          <span className="block text-2xl font-mono font-bold text-amber-500">8.4 mins</span>
          <span className="text-[10px] text-rose-500 font-mono">+1.2 mins commute delays</span>
        </div>
        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] text-slate-500 font-mono">ACCEPTANCE RATE THRESHOLD</span>
          <span className="block text-2xl font-mono font-bold text-white">88.2%</span>
          <span className="text-[10px] text-slate-500 font-mono">SLA compliance secure</span>
        </div>
        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] text-slate-500 font-mono">CRITICAL CHURN RISKS</span>
          <span className="block text-2xl font-mono font-bold text-rose-500">2 Alerts</span>
          <span className="text-[10px] text-rose-500 font-mono">Immediate rescue required</span>
        </div>
      </div>

      {/* Directory Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Driver List (Col span 5) */}
        <div className="lg:col-span-5 bg-slate-900/50 border border-slate-900 rounded-2xl p-5 flex flex-col h-[480px]">
          <div className="space-y-3 mb-4">
            <h4 className="font-display font-bold text-base text-white">Active Fleet Roster</h4>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={14} />
              <input 
                type="text" 
                placeholder="Search drivers by name or status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 hover:border-slate-800 focus:border-cyan-400 text-xs text-white placeholder-slate-600 pl-9 pr-4 py-2.5 rounded-lg outline-none"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {filteredDrivers.map((drv) => {
              const isSelected = selectedDriverId === drv.id;

              return (
                <div 
                  key={drv.id}
                  onClick={() => setSelectedDriverId(drv.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                    isSelected ? 'bg-slate-900 border-cyan-400/30' : 'bg-slate-950/40 border-slate-900 hover:border-slate-850'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={drv.avatar} 
                      alt={drv.name} 
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full border border-slate-850 object-cover" 
                    />
                    <div>
                      <h5 className="font-bold text-xs text-white">{drv.name}</h5>
                      <span className="text-[10px] text-slate-500 font-mono">MTD: ${drv.earnings.toLocaleString()}</span>
                    </div>
                  </div>

                  <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded ${
                    drv.churnRisk === 'critical' ? 'bg-rose-500/10 text-rose-400' :
                    drv.churnRisk === 'high' ? 'bg-amber-500/10 text-amber-400' :
                    'bg-emerald-500/10 text-emerald-400'
                  }`}>
                    {drv.churnRisk.toUpperCase()} CHURN RISK
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Driver Profile details (Col span 7) */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900/50 border border-slate-900 rounded-2xl p-5 h-full flex flex-col justify-between space-y-4">
            
            {selectedDriver ? (
              <div className="space-y-4 flex-1">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src={selectedDriver.avatar} 
                      alt={selectedDriver.name} 
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full border border-slate-800 object-cover" 
                    />
                    <div>
                      <h4 className="font-display font-bold text-lg text-white">{selectedDriver.name}</h4>
                      <span className="text-xs text-slate-500">Status: <b className="text-cyan-400">{selectedDriver.status.toUpperCase()}</b></span>
                    </div>
                  </div>

                  <div className="bg-slate-950 px-3 py-1.5 rounded-lg text-right font-mono text-[10px]">
                    <span className="text-slate-500 block">CHURN ATTRITION FORECAST</span>
                    <span className={`font-bold text-sm ${
                      selectedDriver.churnRisk === 'critical' ? 'text-rose-500 animate-pulse' :
                      selectedDriver.churnRisk === 'high' ? 'text-amber-500' : 'text-emerald-500'
                    }`}>
                      {selectedDriver.churnRisk.toUpperCase()} RISK
                    </span>
                  </div>
                </div>

                {/* KPI Metrics */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 space-y-0.5 text-center">
                    <span className="text-[9px] text-slate-500 font-mono block">MTD EARNINGS</span>
                    <span className="text-sm font-bold text-white font-mono">${selectedDriver.earnings}</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 space-y-0.5 text-center">
                    <span className="text-[9px] text-slate-500 font-mono block">ACCEPT RATE</span>
                    <span className="text-sm font-bold text-white font-mono">{selectedDriver.acceptanceRate}%</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 space-y-0.5 text-center">
                    <span className="text-[9px] text-slate-500 font-mono block">COMPLETE RATE</span>
                    <span className="text-sm font-bold text-white font-mono">{selectedDriver.completionRate}%</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 space-y-0.5 text-center">
                    <span className="text-[9px] text-slate-500 font-mono block">IDLE / REQUEST</span>
                    <span className="text-sm font-bold text-white font-mono">{selectedDriver.idleTimeMin} mins</span>
                  </div>
                </div>

                {/* Actionable recommendations */}
                <div className="space-y-3 pt-2">
                  <span className="text-[10px] font-mono text-cyan-400 tracking-wider block">RECOMMENDED RETENTION OUTCOMES</span>
                  
                  <div className="space-y-2">
                    {selectedDriver.recommendations.map((rec, idx) => (
                      <div key={idx} className="p-3 bg-slate-950 border border-slate-850 rounded-xl text-xs flex items-center gap-3">
                        <Award size={16} className="text-violet-400 shrink-0" />
                        <span className="text-slate-300 font-medium">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subsidizing attrition action */}
                {selectedDriver.churnRisk !== 'low' && (
                  <div className="pt-2">
                    {dispatchedSubsidy[selectedDriver.id] ? (
                      <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-lg flex items-center gap-2">
                        <UserCheck size={16} />
                        <span>$150.00 Retention Bonus dispatched instantly to {selectedDriver.name}'s driver purse. Churn probability mitigated!</span>
                      </div>
                    ) : (
                      <div className="p-3 bg-rose-500/5 border border-rose-500/10 rounded-xl space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-rose-400 font-medium block">Rescue Driver Retention</span>
                          <span className="text-[9px] text-slate-500 font-mono font-bold">COST: $150.00</span>
                        </div>
                        <p className="text-[11px] text-slate-400">Deploy a dedicated direct retention subsidy of $150 to resolve acceptance friction and restore loyalty indicators.</p>
                        <button 
                          onClick={() => handleDispatchSubsidy(selectedDriver.id)}
                          className="w-full bg-rose-500 hover:bg-rose-600 text-slate-950 font-bold text-xs py-2 rounded-lg cursor-pointer"
                        >
                          Push Direct Retention Subsidy
                        </button>
                      </div>
                    )}
                  </div>
                )}

              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-500">
                <p className="text-sm">Select a driver from the roster database</p>
              </div>
            )}

            <div className="text-[10px] font-mono text-slate-500 border-t border-slate-900/80 pt-2 flex justify-between">
              <span>MODEL: CHURN_SURVIVAL_FORECASTER</span>
              <span>SYNCHRONIZATION: COMPLETED</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
