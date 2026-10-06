import React, { useState } from 'react';
import { Truck, ShieldAlert, Award, TrendingUp, AlertTriangle, Compass, CheckCircle } from 'lucide-react';

interface SupplyShortage {
  id: string;
  zoneName: string;
  deficit: number; // missing drivers
  currentDrivers: number;
  averageEta: number; // minutes
  cancellationRate: number; // %
  recommendedBonus: number; // in dollars
  resolved: boolean;
}

const INITIAL_SHORTAGES: SupplyShortage[] = [
  { id: 'sh-1', zoneName: 'Downtown Core', deficit: 120, currentDrivers: 450, averageEta: 9.2, cancellationRate: 8.2, recommendedBonus: 3.50, resolved: false },
  { id: 'sh-2', zoneName: 'Mission District', deficit: 150, currentDrivers: 190, averageEta: 12.4, cancellationRate: 9.8, recommendedBonus: 4.50, resolved: false },
  { id: 'sh-3', zoneName: 'Richmond Sector', deficit: 45, currentDrivers: 110, averageEta: 7.1, cancellationRate: 5.4, recommendedBonus: 2.00, resolved: false },
];

export default function SupplyAgentView() {
  const [shortages, setShortages] = useState<SupplyShortage[]>(INITIAL_SHORTAGES);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleResolveShortage = (id: string) => {
    setLoadingId(id);
    // Simulate rebalancing: wait 1s, then mark as resolved and increase current drivers
    setTimeout(() => {
      setShortages((prev) => 
        prev.map((s) => {
          if (s.id === id) {
            return {
              ...s,
              resolved: true,
              deficit: 0,
              currentDrivers: s.currentDrivers + s.deficit,
              averageEta: Math.round((s.averageEta * 0.5) * 10) / 10, // ETA cut in half
              cancellationRate: Math.round((s.cancellationRate * 0.2) * 10) / 10 // cancellations drop
            };
          }
          return s;
        })
      );
      setLoadingId(null);
    }, 1000);
  };

  const activeCount = shortages.filter((s) => !s.resolved).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="border-b border-slate-900 pb-5">
        <span className="text-xs font-mono text-cyan-400 tracking-wider">FLEET OPTIMIZATION & INCENTIVES</span>
        <h2 className="font-display font-bold text-2xl text-white">Supply Optimization & Balancer</h2>
        <p className="text-xs text-slate-500 font-sans">
          Triggers dynamic driver incentives and shift allocations to re-route empty transit fleets toward active localized demand spikes.
        </p>
      </div>

      {/* KPI Stats Block */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-5 space-y-2">
          <span className="text-xs text-slate-500 font-mono">ACTIVE FLEET CAPACITY</span>
          <div className="flex justify-between items-baseline">
            <span className="text-2xl font-mono font-bold text-white">26,410 Drivers</span>
            <span className="text-xs text-emerald-500 font-mono">+2.4% Online</span>
          </div>
          <p className="text-[11px] text-slate-500">3,820 currently online and active in metro</p>
        </div>

        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-5 space-y-2">
          <span className="text-xs text-slate-500 font-mono">CRITICAL DEFICIT SECTORS</span>
          <div className="flex justify-between items-baseline">
            <span className="text-2xl font-mono font-bold text-rose-500">{activeCount} Sectors</span>
            <span className="text-xs text-slate-500 font-mono">Real-time alerts</span>
          </div>
          <p className="text-[11px] text-slate-500">Wait times breached standard 5-min SLAs</p>
        </div>

        <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-5 space-y-2">
          <span className="text-xs text-slate-500 font-mono">COURIER IDLE TIME</span>
          <div className="flex justify-between items-baseline">
            <span className="text-2xl font-mono font-bold text-cyan-400">18.2% Idle Ratio</span>
            <span className="text-xs text-emerald-500 font-mono">-3.1% friction</span>
          </div>
          <p className="text-[11px] text-slate-500">Average time waiting for dispatch requests</p>
        </div>
      </div>

      {/* Main Table: Localized Deficits */}
      <div className="bg-slate-900/50 border border-slate-900 rounded-2xl p-5 space-y-4">
        <div className="flex justify-between items-center border-b border-slate-850 pb-3">
          <div>
            <h3 className="font-display font-bold text-base text-white">Active District Supply Shortages</h3>
            <p className="text-[11px] text-slate-500">AI monitors driver density thresholds. Trigger customized bonuses to attract drivers.</p>
          </div>
          <span className="text-xs font-mono text-slate-400">June 2026, 08:13 PST</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="text-[10px] uppercase font-mono text-slate-500 border-b border-slate-900">
              <tr>
                <th className="pb-3 pt-1">District Zone</th>
                <th className="pb-3 pt-1">Fulfillment Slap</th>
                <th className="pb-3 pt-1">Deficit Size</th>
                <th className="pb-3 pt-1">Average Wait (ETA)</th>
                <th className="pb-3 pt-1">Cancel Rate</th>
                <th className="pb-3 pt-1">Recommended Bonus</th>
                <th className="pb-3 pt-1 text-right">Autonomous Override</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/60">
              {shortages.map((s) => (
                <tr key={s.id} className="hover:bg-slate-900/10 transition-colors">
                  <td className="py-4 font-semibold text-white">{s.zoneName}</td>
                  <td className="py-4">
                    {s.resolved ? (
                      <span className="text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                        EQUILIBRIUM
                      </span>
                    ) : (
                      <span className="text-rose-500 font-semibold bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded">
                        DEFICIT ALERT
                      </span>
                    )}
                  </td>
                  <td className="py-4 font-mono font-bold">
                    {s.resolved ? '0 (Balanced)' : `-${s.deficit} Drivers`}
                  </td>
                  <td className="py-4 font-mono">{s.averageEta} mins</td>
                  <td className="py-4 font-mono text-rose-400">{s.cancellationRate}%</td>
                  <td className="py-4 font-mono text-emerald-400 font-bold">+${s.recommendedBonus.toFixed(2)} / ride</td>
                  <td className="py-4 text-right">
                    {s.resolved ? (
                      <span className="inline-flex items-center gap-1.5 text-emerald-400 font-mono text-xs font-bold bg-emerald-500/10 border border-emerald-500/15 px-3 py-1.5 rounded-lg">
                        <CheckCircle size={14} />
                        Dispatched
                      </span>
                    ) : (
                      <button
                        onClick={() => handleResolveShortage(s.id)}
                        disabled={loadingId !== null}
                        className="bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-slate-950 font-bold text-[11px] px-3.5 py-1.5 rounded-lg cursor-pointer transition-all hover:shadow-lg hover:shadow-cyan-400/15"
                      >
                        {loadingId === s.id ? 'Attracting...' : 'Dispatch Incentive Bonus'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Driver optimization strategies cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-slate-900/30 border border-slate-900 rounded-xl space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <Award size={20} />
          </div>
          <h4 className="font-semibold text-white text-sm">Automated Shift Guarantees</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            MarketOS can auto-payout shift floor guarantees (e.g. $42/hr) during predicted atmospheric rains to prevent drivers from choosing offline resting sessions. This reduces peak wait spikes by up to 22%.
          </p>
        </div>

        <div className="p-5 bg-slate-900/30 border border-slate-900 rounded-xl space-y-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-400/10 text-cyan-400 flex items-center justify-center">
            <TrendingUp size={20} />
          </div>
          <h4 className="font-semibold text-white text-sm">Spatial Staging Re-Direction</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Broadcast targeted spatial nudge notifications to 220 offline drivers inside Richmond, letting them know that high sushi-order backlogs in Marina and Downtown Core are yielding +1.35x fare multipliers.
          </p>
        </div>
      </div>

    </div>
  );
}
