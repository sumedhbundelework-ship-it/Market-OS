import React, { useState } from 'react';
import { Settings, ShieldCheck, ToggleLeft, Cpu, Sliders, Bell, BadgePercent, KeyRound } from 'lucide-react';

export default function SettingsView() {
  const [autonomyMode, setAutonomyMode] = useState<'semi' | 'manual' | 'auto'>('semi');
  const [notifySlack, setNotifySlack] = useState<boolean>(true);
  const [stripeSync, setStripeSync] = useState<boolean>(true);
  const [weatherSync, setWeatherSync] = useState<boolean>(true);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="border-b border-slate-900 pb-5">
        <span className="text-xs font-mono text-cyan-400 tracking-wider">PLATFORM ADMINISTRATION CONFIGS</span>
        <h2 className="font-display font-bold text-2xl text-white">System Settings</h2>
        <p className="text-xs text-slate-500 font-sans">
          Manage core dispatch constraints, specialized agent autonomy multipliers, and connected API webhooks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Core AI configurations (Col span 7) */}
        <div className="lg:col-span-7 bg-slate-900/50 border border-slate-900 rounded-2xl p-5 space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-850 pb-3">
            <Cpu size={16} className="text-cyan-400" />
            <h3 className="font-display font-bold text-base text-white">Autonomous Agent Privileges</h3>
          </div>

          {/* Autonomy multi-select */}
          <div className="space-y-2.5">
            <label className="text-xs text-slate-400 font-semibold block">Incentive Autonomy Grade</label>
            <div className="grid grid-cols-3 gap-3 bg-slate-950 p-1 rounded-xl border border-slate-850">
              <button
                type="button"
                onClick={() => setAutonomyMode('manual')}
                className={`py-2 rounded-lg text-xs font-mono font-medium cursor-pointer transition-colors ${autonomyMode === 'manual' ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/20' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Manual (Read-Only)
              </button>
              <button
                type="button"
                onClick={() => setAutonomyMode('semi')}
                className={`py-2 rounded-lg text-xs font-mono font-medium cursor-pointer transition-colors ${autonomyMode === 'semi' ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/20' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Hybrid (Recommend)
              </button>
              <button
                type="button"
                onClick={() => setAutonomyMode('auto')}
                className={`py-2 rounded-lg text-xs font-mono font-medium cursor-pointer transition-colors ${autonomyMode === 'auto' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Fully Autonomous
              </button>
            </div>
            <p className="text-[10px] text-slate-500 font-mono leading-relaxed pt-1">
              {autonomyMode === 'manual' && 'Manual Mode: AI drafts recommendations but never writes modifiers. PM approval required.'}
              {autonomyMode === 'semi' && 'Hybrid Mode: AI executes minor pricing balancing under 1.25x surge automatically. High impact alerts require PM check.'}
              {autonomyMode === 'auto' && 'Fully Autonomous: AI agent handles all surge peaks and driver subsidies up to $20,000/day pool silently.'}
            </p>
          </div>

          {/* Threshold configurations */}
          <div className="space-y-4 pt-2">
            <span className="text-xs text-slate-400 font-semibold block">Friction Alerting Thresholds</span>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <span className="text-[10px] text-slate-500 font-mono block">CRITICAL ETA VIOLATION (MINS)</span>
                <input 
                  type="number" 
                  defaultValue={8}
                  className="w-full bg-slate-950 border border-slate-850 hover:border-slate-800 px-3 py-2 rounded-lg text-xs font-mono text-white"
                />
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] text-slate-500 font-mono block">CRITICAL CANCEL THRESHOLD (%)</span>
                <input 
                  type="number" 
                  defaultValue={7.5}
                  step="0.5"
                  className="w-full bg-slate-950 border border-slate-850 hover:border-slate-800 px-3 py-2 rounded-lg text-xs font-mono text-white"
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => alert('Settings successfully committed to config clusters!')}
            className="w-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs py-2.5 rounded-lg cursor-pointer"
          >
            Save Administrative Configurations
          </button>
        </div>

        {/* Connections & Third-Party integration statuses (Col span 5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-850 pb-2">
              <KeyRound size={16} className="text-cyan-400" />
              <h3 className="font-display font-bold text-base text-white">System Integrations</h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-950 border border-slate-850">
                <span className="text-slate-300 font-semibold">Stripe Payout Gateway</span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/15">CONNECTED</span>
              </div>

              <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-950 border border-slate-850">
                <span className="text-slate-300 font-semibold">Google Maps Geocoding</span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/15">CONNECTED</span>
              </div>

              <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-950 border border-slate-850">
                <span className="text-slate-300 font-semibold">AccuWeather Radar Ingestion</span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/15">CONNECTED</span>
              </div>

              <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-950 border border-slate-850">
                <span className="text-slate-300 font-semibold">Slack Alerts Integration</span>
                <span className="text-[10px] font-mono text-slate-500 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-850">DISABLED</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
