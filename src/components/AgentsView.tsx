import React from 'react';
import { Agent } from '../types';
import { Bot, ShieldCheck, TrendingUp, Activity, AlertTriangle, Compass, CheckCircle } from 'lucide-react';

interface AgentsViewProps {
  agents: Agent[];
}

export default function AgentsView({ agents }: AgentsViewProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="border-b border-slate-900 pb-5">
        <span className="text-xs font-mono text-cyan-400 tracking-wider">AUTONOMOUS CONSTELLATION OVERVIEW</span>
        <h2 className="font-display font-bold text-2xl text-white">AI Agent Workspace</h2>
        <p className="text-xs text-slate-500 font-sans">
          Each specialized agent continuously processes live streams of telemetry to execute micro-transactions and spatial interventions.
        </p>
      </div>

      {/* Constraints Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-5 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-500 font-mono">
            <span>FLEET CAPACITY HEALTH</span>
            <span className="text-emerald-400 font-bold">OPTIMAL</span>
          </div>
          <span className="text-xl font-bold text-white font-mono">8 / 8 Active Agents</span>
          <p className="text-[11px] text-slate-500">No core model drift registered over 30 days</p>
        </div>

        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-5 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-500 font-mono">
            <span>DAILY DECISION LOAD</span>
            <span className="text-cyan-400 font-bold">14.8k / day</span>
          </div>
          <span className="text-xl font-bold text-white font-mono">99.8% Match Rate</span>
          <p className="text-[11px] text-slate-500">14,820 autonomous micro-incentives dispatched</p>
        </div>

        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-5 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-500 font-mono">
            <span>AVERAGE MODEL LATENCY</span>
            <span className="text-emerald-400 font-bold">12ms SLA</span>
          </div>
          <span className="text-xl font-bold text-white font-mono">Sub-15ms Target</span>
          <p className="text-[11px] text-slate-500">Distributed spatial telemetry processing</p>
        </div>
      </div>

      {/* Grid of Agent Profile cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {agents.map((agent) => {
          const isWarning = agent.status === 'warning';
          const isOptimizing = agent.status === 'optimizing';

          return (
            <div 
              key={agent.id}
              className={`bg-slate-900/50 border rounded-2xl p-5 space-y-4 flex flex-col justify-between transition-all ${
                isWarning ? 'border-amber-500/20 hover:border-amber-500/40' : 'border-slate-900 hover:border-slate-850'
              }`}
            >
              <div className="space-y-2">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg ${
                      isWarning ? 'bg-amber-500/10 text-amber-500' : 'bg-cyan-400/10 text-cyan-400'
                    }`}>
                      <Bot size={18} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-white">{agent.name}</h4>
                      <span className="text-[10px] text-slate-500 font-mono uppercase">{agent.role}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[9px] text-slate-500 font-mono block">HEALTH SCORE</span>
                    <span className={`font-mono text-xs font-bold ${agent.healthScore > 90 ? 'text-emerald-400' : 'text-amber-500'}`}>{agent.healthScore} / 100</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed pt-1">{agent.description}</p>
              </div>

              {/* Footer specs */}
              <div className="flex items-center justify-between pt-3.5 border-t border-slate-900 text-xs">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    isWarning ? 'bg-amber-500' : isOptimizing ? 'bg-cyan-400 animate-pulse' : 'bg-emerald-500'
                  }`} />
                  <span className="text-slate-500 font-mono uppercase text-[9px]">STATUS: {agent.status}</span>
                </div>

                <div className="text-right flex items-center gap-1.5 font-mono">
                  <span className="text-slate-500 text-[10px]">{agent.metricName}:</span>
                  <span className="font-bold text-white">{agent.metricValue}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
