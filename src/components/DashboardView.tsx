import React, { useState } from 'react';
import { Recommendation, Agent, ZoneData } from '../types';
import MetricCard from './MetricCard';
import { 
  Sparkles, 
  ArrowRight, 
  AlertCircle, 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Activity, 
  ShieldAlert,
  ArrowUpRight,
  TrendingDown
} from 'lucide-react';

interface DashboardViewProps {
  stats: {
    activeCustomers: number;
    activeDrivers: number;
    totalTripsMTD: number;
    gmvMTD: number;
    netRevenueMTD: number;
    healthScore: number;
    fulfillmentRate: number;
    averageWaitTime: number;
    averageSurge: number;
    cancellationRate: number;
  };
  recommendations: Recommendation[];
  onApproveRecommendation: (id: string) => void;
  onRejectRecommendation: (id: string) => void;
  agents: Agent[];
  zones: ZoneData[];
  onSelectZone: (zone: ZoneData) => void;
  onNavigateToTab: (tab: any) => void;
}

export default function DashboardView({
  stats,
  recommendations,
  onApproveRecommendation,
  onRejectRecommendation,
  agents,
  zones,
  onSelectZone,
  onNavigateToTab
}: DashboardViewProps) {
  const [explainingId, setExplainingId] = useState<string | null>(null);

  // Filter pending recommendations
  const pendingRecs = recommendations.filter(r => r.status === 'pending');

  // Sum revenue of approved recommendations as visual feedback
  const approvedRecs = recommendations.filter(r => r.status === 'approved');
  const rejectedRecs = recommendations.filter(r => r.status === 'rejected');

  // Find critical alerts in zones
  const activeAlerts = zones.flatMap(z => z.alerts.map(a => ({ zone: z, alert: a })));

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Upper Welcome and MTD Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-5">
        <div>
          <span className="text-xs font-mono text-cyan-400 tracking-wider">MARKETOS EXECUTIVE HUB</span>
          <h2 className="font-display font-bold text-2xl text-white">AI Marketplace Intelligence Platform</h2>
          <p className="text-xs text-slate-500">Autonomous balancing active across SF districts. Simulated temporal frame: June 2026.</p>
        </div>

        {/* Rapid Overview Badges */}
        <div className="flex gap-4">
          <div className="bg-slate-900/60 border border-slate-850 px-4 py-2.5 rounded-xl text-right">
            <span className="block text-[9px] text-slate-500 font-mono">HEALTH SCORE</span>
            <span className="text-xl font-bold font-mono text-white flex items-center justify-end gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              {stats.healthScore} <span className="text-slate-500 text-xs">/100</span>
            </span>
          </div>
          <div className="bg-slate-900/60 border border-slate-850 px-4 py-2.5 rounded-xl text-right">
            <span className="block text-[9px] text-slate-500 font-mono">APPROVED ACTIONS</span>
            <span className="text-xl font-bold font-mono text-cyan-400">{approvedRecs.length}</span>
          </div>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Gross Merchandise Value"
          value={`$${(stats.gmvMTD / 1000000).toFixed(2)}M`}
          change="+12.4%"
          trend="up"
          subtitle="MTD volume accumulation"
          category="success"
          tooltip="Sum total order values across rides, deliveries, and merchant listings this month."
        />
        <MetricCard 
          title="Marketplace Liquidity Index"
          value={`${stats.fulfillmentRate}%`}
          change="+0.8%"
          trend="up"
          subtitle="Order fulfillment percentage"
          category="success"
          tooltip="Percentage of match requests successfully matched and completed without customer cancellations."
        />
        <MetricCard 
          title="Average Courier Wait Time"
          value={`${stats.averageWaitTime} mins`}
          change="-14.2%"
          trend="down" // Wait time going down is good!
          subtitle="From request to match arrival"
          category="info"
          tooltip="Median arrival dispatch delay in active metropolitan sectors."
        />
        <MetricCard 
          title="Platform Cancel Ratio"
          value={`${stats.cancellationRate}%`}
          change="-1.4%"
          trend="down" // Cancels down is good
          subtitle="Active trip dropouts"
          category="success"
          tooltip="Percentage of total matched rides cancelled by either driver or passenger before fulfillment."
        />
      </div>

      {/* Row 2: Today's AI Recommendations (Col span 8) & Real-time alerts (Col span 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* AI Decision Recommendations list (LSP standard) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-cyan-400" />
              <h3 className="font-display font-bold text-lg text-white">Today's AI Recommendations</h3>
              <span className="text-[10px] bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 px-2 py-0.5 rounded font-mono">
                {pendingRecs.length} Actionable
              </span>
            </div>
            
            {approvedRecs.length > 0 && (
              <span className="text-[11px] text-emerald-400 font-mono">
                +{approvedRecs.length} Approved actions queued for pipeline
              </span>
            )}
          </div>

          {pendingRecs.length === 0 ? (
            <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-8 text-center space-y-3">
              <CheckCircle2 size={40} className="text-emerald-500 mx-auto" />
              <h4 className="font-semibold text-white">All Recommendations Handled</h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Excellent work. The MarketOS spatial rebalancing engine is operating in optimal equilibrium with no outstanding actions.
              </p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-slate-900 border border-slate-800 text-slate-300 px-4 py-2 rounded-lg text-xs hover:border-slate-700 cursor-pointer"
              >
                Reset Dashboard Sim
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingRecs.map((rec) => (
                <div 
                  key={rec.id} 
                  className={`bg-slate-900/60 border rounded-2xl p-5 space-y-4 transition-all ${
                    rec.priority === 'critical' ? 'border-rose-500/30 hover:border-rose-500/50' :
                    rec.priority === 'high' ? 'border-amber-500/20 hover:border-amber-500/40' :
                    'border-slate-900 hover:border-slate-800'
                  }`}
                >
                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-mono px-2 py-0.5 rounded border font-semibold ${
                          rec.priority === 'critical' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                          rec.priority === 'high' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                          'bg-slate-950 text-slate-400 border-slate-800'
                        }`}>
                          {rec.priority.toUpperCase()} PRIORITY
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 uppercase">CATEGORY: {rec.category}</span>
                      </div>
                      <h4 className="font-display font-bold text-base text-white">{rec.title}</h4>
                    </div>

                    <div className="flex sm:flex-col items-end gap-1.5 shrink-0 text-right">
                      <div className="text-xs">
                        <span className="text-slate-500 text-[10px] block font-mono">CONFIDENCE SCORE</span>
                        <span className="font-mono font-bold text-white">{rec.confidence}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Body description */}
                  <p className="text-xs text-slate-400 leading-relaxed">{rec.description}</p>

                  {/* Impact Summary row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-950/80 p-3 rounded-xl border border-slate-850/80 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 font-mono block">EXPECTED IMPACT</span>
                      <span className="text-emerald-400 font-semibold">{rec.businessImpact}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 font-mono block">ESTIMATED NET GMV DELTA</span>
                      <span className="text-cyan-400 font-mono font-bold">{rec.expectedRevenueImpact}</span>
                    </div>
                  </div>

                  {/* Explainer Accordion */}
                  {explainingId === rec.id && (
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 text-xs space-y-2 animate-fade-in">
                      <span className="font-mono text-[10px] text-slate-500 uppercase block tracking-wider">AI AGENT REASONING EVIDENCE</span>
                      <ul className="list-disc pl-4 space-y-1.5 text-slate-400">
                        {rec.evidence.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Interaction Controls */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-900/60">
                    <button 
                      onClick={() => setExplainingId(explainingId === rec.id ? null : rec.id)}
                      className="text-xs text-slate-500 hover:text-slate-300 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      {explainingId === rec.id ? 'Hide Evidence Log' : 'Review Supporting Evidence'}
                      <ArrowRight size={12} className={`transition-transform ${explainingId === rec.id ? 'rotate-90' : ''}`} />
                    </button>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => onRejectRecommendation(rec.id)}
                        className="flex items-center gap-1 border border-slate-850 hover:bg-slate-900 hover:text-white text-slate-400 text-xs px-3.5 py-2 rounded-lg font-semibold cursor-pointer transition-colors"
                      >
                        <XCircle size={14} className="text-rose-500" />
                        Reject
                      </button>
                      <button 
                        onClick={() => onApproveRecommendation(rec.id)}
                        className="flex items-center gap-1 bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs px-5 py-2 rounded-lg font-bold cursor-pointer transition-colors hover:shadow-lg hover:shadow-cyan-400/15"
                      >
                        <CheckCircle2 size={14} />
                        Approve Action
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Spatial Alerts & Risk Factors sidebar (Col span 4) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Spatial Alerts panel */}
          <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-850 pb-2">
              <h4 className="font-display font-bold text-sm text-white">Spatial Deficiency Alerts</h4>
              <span className="text-[10px] font-mono text-rose-500 bg-rose-500/10 px-1.5 py-0.5 rounded font-bold animate-pulse">
                {activeAlerts.length} Warnings
              </span>
            </div>

            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
              {activeAlerts.map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => {
                    onSelectZone(item.zone);
                    onNavigateToTab('map');
                  }}
                  className="p-3 bg-slate-950 border border-slate-850 hover:border-slate-800 rounded-xl space-y-1.5 cursor-pointer text-xs group"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors">{item.zone.name}</span>
                    <span className="text-[10px] font-mono text-rose-400 bg-rose-500/5 px-1.5 py-0.5 rounded">ETA VIOLATION</span>
                  </div>
                  <p className="text-[11px] text-slate-400">{item.alert}</p>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => onNavigateToTab('map')} 
              className="w-full text-center text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center justify-center gap-1 pt-1 cursor-pointer"
            >
              Analyze Spatial Map
              <ArrowRight size={12} />
            </button>
          </div>

          {/* Core Opportunities panel */}
          <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-5 space-y-4">
            <h4 className="font-display font-bold text-sm text-white border-b border-slate-850 pb-2">Marketplace Optimization Potential</h4>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-xs">
                <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-400 mt-0.5">
                  <TrendingUp size={14} />
                </div>
                <div>
                  <h5 className="font-semibold text-white">Dynamic Surge Uplift</h5>
                  <p className="text-slate-400 text-[11px] leading-relaxed">Adjust SOMA & Airport core multipliers by 15% to capture surge delta.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs">
                <div className="p-1.5 rounded bg-cyan-400/10 text-cyan-400 mt-0.5">
                  <Activity size={14} />
                </div>
                <div>
                  <h5 className="font-semibold text-white">Shift-Balance Matching</h5>
                  <p className="text-slate-400 text-[11px] leading-relaxed">Direct 140 idle couriers in Richmond toward Downtown high-wait merchants.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs">
                <div className="p-1.5 rounded bg-violet-500/10 text-violet-400 mt-0.5">
                  <ShieldAlert size={14} />
                </div>
                <div>
                  <h5 className="font-semibold text-white">Fraud Protection Shield</h5>
                  <p className="text-slate-400 text-[11px] leading-relaxed">Simulated GPS spoof checks can recover up to $2,400 daily in voucher payouts.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Row 3: Specialized Agent Fleet overview */}
      <div className="space-y-3">
        <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
          <Activity size={16} className="text-cyan-400" />
          Autonomous Specialized AI Agent Fleet Status
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {agents.map((agent) => (
            <div 
              key={agent.id}
              onClick={() => onNavigateToTab('agents')}
              className="bg-slate-900/30 border border-slate-900 hover:border-slate-800 rounded-xl p-4.5 space-y-2 cursor-pointer transition-all group"
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-slate-500">{agent.name.split(' ')[0].toUpperCase()}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  agent.status === 'active' || agent.status === 'optimizing' ? 'bg-emerald-500' : 'bg-amber-500'
                }`} />
              </div>
              <div>
                <span className="block text-xs font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors">{agent.name}</span>
                <span className="text-[10px] text-slate-500 block">{agent.role}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-900 text-xs">
                <span className="text-slate-500">{agent.metricName}</span>
                <span className="font-mono font-bold text-white">{agent.metricValue}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
