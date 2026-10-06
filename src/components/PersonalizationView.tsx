import React, { useState } from 'react';
import { Customer } from '../types';
import { INITIAL_CUSTOMERS } from '../data/mockData';
import { Users, Search, ArrowRight, Award, UserCheck, ShieldAlert, BadgePercent, Sparkles } from 'lucide-react';

export default function PersonalizationView() {
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>(customers[0].id);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [appliedOpportunities, setAppliedOpportunities] = useState<{ [key: string]: boolean }>({});

  const handleApplyOpportunity = (customerId: string, opportunity: string) => {
    setAppliedOpportunities(prev => ({ ...prev, [`${customerId}-${opportunity}`]: true }));
    
    // Simulate updating customer NPS or Repeat Purchases as feedback
    setCustomers(prev => 
      prev.map(c => {
        if (c.id === customerId) {
          return {
            ...c,
            nps: Math.min(10, c.nps + 1),
            repeatPurchases: c.repeatPurchases + 1
          };
        }
        return c;
      })
    );
  };

  const selectedCustomer = customers.find(c => c.id === selectedCustomerId) || customers[0];

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.segment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="border-b border-slate-900 pb-5">
        <span className="text-xs font-mono text-cyan-400 tracking-wider">BEHAVIORAL FOOTPRINTS & TARGETED RETENTION</span>
        <h2 className="font-display font-bold text-2xl text-white">Customer Insights & Personalization</h2>
        <p className="text-xs text-slate-500 font-sans">
          Analyzes individual customer transaction histories and friction coefficients to deploy highly personalized promotional triggers.
        </p>
      </div>

      {/* Cohort Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] text-slate-500 font-mono">COHORT RETENTION (D30)</span>
          <span className="block text-2xl font-mono font-bold text-white">74.2%</span>
          <div className="h-1 bg-slate-850 rounded-full">
            <div className="h-full bg-cyan-400 rounded-full" style={{ width: '74.2%' }} />
          </div>
        </div>
        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] text-slate-500 font-mono">POWER USER NPS SCORE</span>
          <span className="block text-2xl font-mono font-bold text-emerald-400">9.2</span>
          <div className="h-1 bg-slate-850 rounded-full">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92%' }} />
          </div>
        </div>
        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] text-slate-500 font-mono">AVERAGE CUSTOMER LTV</span>
          <span className="block text-2xl font-mono font-bold text-violet-400">$1,425</span>
          <span className="text-[10px] text-emerald-500 font-mono">+12% YoY growth</span>
        </div>
        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-4 space-y-1">
          <span className="text-[10px] text-slate-500 font-mono">SESSION TO ORDER RATE</span>
          <span className="block text-2xl font-mono font-bold text-white">14.2%</span>
          <div className="h-1 bg-slate-850 rounded-full">
            <div className="h-full bg-white rounded-full" style={{ width: '56.8%' }} />
          </div>
        </div>
      </div>

      {/* Dual Panel Split: User Directory vs Personalized AI opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* User directory sidebar (Col span 5) */}
        <div className="lg:col-span-5 bg-slate-900/50 border border-slate-900 rounded-2xl p-5 flex flex-col h-[480px]">
          <div className="space-y-3 mb-4">
            <h4 className="font-display font-bold text-base text-white">Customer Database directory</h4>
            
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={14} />
              <input 
                type="text" 
                placeholder="Search by customer name or segment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 hover:border-slate-800 focus:border-cyan-400 text-xs text-white placeholder-slate-600 pl-9 pr-4 py-2.5 rounded-lg outline-none"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {filteredCustomers.map((cust) => {
              const isSelected = selectedCustomerId === cust.id;

              return (
                <div 
                  key={cust.id}
                  onClick={() => setSelectedCustomerId(cust.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                    isSelected ? 'bg-slate-900 border-cyan-400/30' : 'bg-slate-950/40 border-slate-900 hover:border-slate-850'
                  }`}
                >
                  <div className="space-y-1">
                    <h5 className="font-bold text-xs text-white">{cust.name}</h5>
                    <div className="flex gap-2 text-[10px] font-mono">
                      <span className={`px-1.5 py-0.2 rounded ${
                        cust.segment === 'Power User' ? 'bg-emerald-500/10 text-emerald-400' :
                        cust.segment === 'At-Risk' ? 'bg-rose-500/10 text-rose-400' :
                        'bg-slate-900 text-slate-500'
                      }`}>
                        {cust.segment}
                      </span>
                      <span className="text-slate-500">LTV: ${cust.ltv}</span>
                    </div>
                  </div>

                  <ArrowRight size={14} className={isSelected ? 'text-cyan-400' : 'text-slate-700'} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Customer Opportunities (Col span 7) */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900/50 border border-slate-900 rounded-2xl p-5 h-full flex flex-col justify-between space-y-4">
            
            {selectedCustomer ? (
              <div className="space-y-4 flex-1">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <h4 className="font-display font-bold text-lg text-white">{selectedCustomer.name}</h4>
                    <span className="text-xs text-slate-500">Segment: <b className="text-slate-300">{selectedCustomer.segment}</b></span>
                  </div>
                  <div className="bg-slate-950 px-3 py-1.5 rounded-lg text-right font-mono text-[10px]">
                    <span className="text-slate-500 block">CUSTOMER NPS SCORE</span>
                    <span className="text-emerald-400 font-bold text-sm">{selectedCustomer.nps} / 10</span>
                  </div>
                </div>

                {/* Micro metrics grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 space-y-0.5">
                    <span className="text-[10px] text-slate-500 font-mono block">LIFETIME VOLUME</span>
                    <span className="text-base font-bold text-white font-mono">${selectedCustomer.ltv}</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 space-y-0.5">
                    <span className="text-[10px] text-slate-500 font-mono block">COMPLETED TRIPS</span>
                    <span className="text-base font-bold text-white font-mono">{selectedCustomer.repeatPurchases}</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 space-y-0.5">
                    <span className="text-[10px] text-slate-500 font-mono block">CANCEL RATE</span>
                    <span className="text-base font-bold text-rose-400 font-mono">{selectedCustomer.cancellationRate}%</span>
                  </div>
                </div>

                {/* AI recommendations */}
                <div className="space-y-2.5 pt-2">
                  <span className="text-[10px] font-mono text-cyan-400 tracking-wider flex items-center gap-1">
                    <Sparkles size={12} />
                    AI-GENERATED OPPORTUNITY ALERTS
                  </span>

                  <div className="space-y-2">
                    {selectedCustomer.opportunities.map((opp, idx) => {
                      const isApplied = appliedOpportunities[`${selectedCustomer.id}-${opp}`];

                      return (
                        <div key={idx} className="p-3.5 bg-slate-950 border border-slate-850 rounded-xl flex items-center justify-between gap-4 text-xs">
                          <p className="text-slate-300 leading-relaxed font-sans">{opp}</p>
                          {isApplied ? (
                            <span className="shrink-0 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded">
                              TRIGGERED
                            </span>
                          ) : (
                            <button
                              onClick={() => handleApplyOpportunity(selectedCustomer.id, opp)}
                              className="shrink-0 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold px-3 py-1 rounded text-[10px] cursor-pointer"
                            >
                              Deploy Trigger
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-500">
                <Users size={32} className="text-slate-850 animate-pulse" />
                <p className="text-sm font-semibold">No Customer Selected</p>
              </div>
            )}

            <div className="text-[10px] font-mono text-slate-500 border-t border-slate-900/80 pt-2 flex justify-between">
              <span>MODEL: USER_AFFINITY_PROPENSITY_v2</span>
              <span>SYNCHRONIZATION: COMPLETED</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
