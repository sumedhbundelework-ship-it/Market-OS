import React, { useState } from 'react';
import { ZoneData } from '../types';
import { AlertTriangle, Users, Compass, ShieldAlert, BadgePercent, ArrowUpRight, CheckCircle } from 'lucide-react';

interface InteractiveMapProps {
  zones: ZoneData[];
  selectedZone: ZoneData | null;
  onSelectZone: (zone: ZoneData) => void;
  onApplyOverrideSurge: (zoneId: string, value: number) => void;
}

export default function InteractiveMap({ zones, selectedZone, onSelectZone, onApplyOverrideSurge }: InteractiveMapProps) {
  const [mapMode, setMapMode] = useState<'demand' | 'supply' | 'surge'>('demand');
  const [customSurgeInputs, setCustomSurgeInputs] = useState<{ [key: string]: string }>({});

  const handleSurgeSubmit = (zoneId: string, recommendedValue: number) => {
    onApplyOverrideSurge(zoneId, recommendedValue);
  };

  const handleCustomSurgeSubmit = (zoneId: string) => {
    const val = parseFloat(customSurgeInputs[zoneId]);
    if (!isNaN(val) && val >= 1.0 && val <= 5.0) {
      onApplyOverrideSurge(zoneId, val);
      // clear input
      setCustomSurgeInputs(prev => ({ ...prev, [zoneId]: '' }));
    } else {
      alert('Please enter a valid surge multiplier between 1.0x and 5.0x');
    }
  };

  // Get color for SVG path depending on selected mode
  const getZoneFillColor = (zone: ZoneData) => {
    if (selectedZone && selectedZone.id === zone.id) {
      return 'fill-slate-800 stroke-cyan-400 stroke-2';
    }

    if (mapMode === 'demand') {
      const d = zone.demandIntensity;
      if (d > 90) return 'fill-rose-500/30 hover:fill-rose-500/40 stroke-rose-500/80';
      if (d > 75) return 'fill-rose-400/20 hover:fill-rose-400/30 stroke-rose-400/60';
      if (d > 50) return 'fill-amber-500/15 hover:fill-amber-500/25 stroke-amber-500/50';
      return 'fill-slate-900/40 hover:fill-slate-900/60 stroke-slate-800';
    } else if (mapMode === 'supply') {
      const s = zone.supplyDensity;
      if (s > 85) return 'fill-emerald-500/30 hover:fill-emerald-500/40 stroke-emerald-500/80';
      if (s > 65) return 'fill-emerald-400/20 hover:fill-emerald-400/30 stroke-emerald-400/60';
      if (s > 45) return 'fill-amber-500/15 hover:fill-amber-500/25 stroke-amber-500/50';
      return 'fill-rose-500/20 hover:fill-rose-500/30 stroke-rose-500/60';
    } else {
      const surge = zone.currentSurge;
      if (surge > 1.3) return 'fill-violet-500/35 hover:fill-violet-500/45 stroke-violet-500/80';
      if (surge > 1.1) return 'fill-violet-400/20 hover:fill-violet-400/30 stroke-violet-400/60';
      return 'fill-slate-900/40 hover:fill-slate-900/60 stroke-slate-800';
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
      {/* Map visualization panel (Col span 7) */}
      <div className="xl:col-span-7 bg-slate-900/50 border border-slate-900 rounded-2xl p-5 flex flex-col h-[520px] relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <span className="text-[10px] font-mono text-cyan-400 tracking-wider">LIVE METROPOLITAN REGION GEOLOGY</span>
            <h3 className="font-display font-bold text-lg text-white">Marketplace Spatial Heatmap</h3>
          </div>
          
          {/* Map display controls */}
          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-850 self-start">
            <button 
              onClick={() => setMapMode('demand')}
              className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors ${mapMode === 'demand' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'text-slate-400 hover:text-white'}`}
            >
              Demand
            </button>
            <button 
              onClick={() => setMapMode('supply')}
              className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors ${mapMode === 'supply' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-400 hover:text-white'}`}
            >
              Supply
            </button>
            <button 
              onClick={() => setMapMode('surge')}
              className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors ${mapMode === 'surge' ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20' : 'text-slate-400 hover:text-white'}`}
            >
              Surge Zones
            </button>
          </div>
        </div>

        {/* The Map Stage */}
        <div className="flex-1 relative bg-slate-950 border border-slate-850/60 rounded-xl overflow-hidden flex items-center justify-center">
          <svg viewBox="0 0 500 400" className="w-full h-full max-h-[380px] p-4">
            {/* SVG custom geometric map shapes representing SF districts */}
            {/* Zone 1: Downtown Core */}
            <path 
              d="M 220,110 L 320,110 L 340,180 L 250,200 L 220,110 Z" 
              className={`transition-colors duration-200 cursor-pointer ${getZoneFillColor(zones[0])}`}
              onClick={() => onSelectZone(zones[0])}
            />
            
            {/* Zone 2: Financial District */}
            <path 
              d="M 320,70 L 400,60 L 420,120 L 320,110 Z" 
              className={`transition-colors duration-200 cursor-pointer ${getZoneFillColor(zones[1])}`}
              onClick={() => onSelectZone(zones[1])}
            />

            {/* Zone 3: SOMA / Tech Hub */}
            <path 
              d="M 250,200 L 340,180 L 390,240 L 280,260 Z" 
              className={`transition-colors duration-200 cursor-pointer ${getZoneFillColor(zones[2])}`}
              onClick={() => onSelectZone(zones[2])}
            />

            {/* Zone 4: Mission District */}
            <path 
              d="M 180,240 L 280,260 L 310,340 L 200,320 Z" 
              className={`transition-colors duration-200 cursor-pointer ${getZoneFillColor(zones[3])}`}
              onClick={() => onSelectZone(zones[3])}
            />

            {/* Zone 5: Marina District */}
            <path 
              d="M 140,80 L 220,110 L 250,200 L 120,190 Z" 
              className={`transition-colors duration-200 cursor-pointer ${getZoneFillColor(zones[4])}`}
              onClick={() => onSelectZone(zones[4])}
            />

            {/* Zone 6: Sunset District */}
            <path 
              d="M 20,220 L 120,190 L 180,280 L 40,310 Z" 
              className={`transition-colors duration-200 cursor-pointer ${getZoneFillColor(zones[5])}`}
              onClick={() => onSelectZone(zones[5])}
            />

            {/* Zone 7: Richmond Sector */}
            <path 
              d="M 40,110 L 140,80 L 120,190 L 20,220 Z" 
              className={`transition-colors duration-200 cursor-pointer ${getZoneFillColor(zones[6])}`}
              onClick={() => onSelectZone(zones[6])}
            />

            {/* Zone 8: airport (SFO) */}
            <path 
              d="M 330,310 L 440,290 L 470,370 L 360,390 Z" 
              className={`transition-colors duration-200 cursor-pointer ${getZoneFillColor(zones[7])}`}
              onClick={() => onSelectZone(zones[7])}
            />

            {/* Map Pin Overlays representing names and values */}
            {zones.map((zone) => {
              // Approximate centers of each custom polygon
              const centers: { [key: string]: { x: number, y: number } } = {
                'zone-1': { x: 280, y: 150 },
                'zone-2': { x: 360, y: 85 },
                'zone-3': { x: 315, y: 220 },
                'zone-4': { x: 240, y: 290 },
                'zone-5': { x: 180, y: 140 },
                'zone-6': { x: 100, y: 250 },
                'zone-7': { x: 80, y: 150 },
                'zone-8': { x: 400, y: 340 }
              };
              const coords = centers[zone.id];
              if (!coords) return null;

              const isSelected = selectedZone && selectedZone.id === zone.id;

              return (
                <g key={zone.id} className="pointer-events-none select-none">
                  {/* Outer circle pointer */}
                  <circle cx={coords.x} cy={coords.y} r={isSelected ? "14" : "10"} className={`${isSelected ? 'fill-cyan-400/25 stroke-cyan-400 animate-ping' : 'fill-slate-950/80 stroke-slate-700'} stroke`} />
                  <circle cx={coords.x} cy={coords.y} r="4" className={zone.alerts.length > 0 ? "fill-rose-500" : "fill-cyan-400"} />
                  
                  {/* Simple text popup badge overlay */}
                  <rect x={coords.x - 30} y={coords.y - 25} width="60" height="15" rx="3" className="fill-slate-950/90 stroke-slate-800/80 stroke-1" />
                  <text x={coords.x} y={coords.y - 14} className="text-[8px] font-mono fill-slate-300 font-bold" textAnchor="middle">
                    {mapMode === 'demand' ? `D: ${zone.demandIntensity}%` : mapMode === 'supply' ? `S: ${zone.supplyDensity}%` : `${zone.currentSurge}x`}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Map Legend */}
          <div className="absolute bottom-3 left-3 bg-slate-950/90 border border-slate-850/80 px-3 py-2 rounded-lg text-[10px] space-y-1 font-mono">
            <span className="text-slate-500 block">LEGEND ({mapMode.toUpperCase()})</span>
            <div className="flex items-center gap-1.5">
              <span className={`w-3 h-3 rounded ${mapMode === 'demand' ? 'bg-rose-500/40' : mapMode === 'supply' ? 'bg-emerald-500/40' : 'bg-violet-500/40'}`} />
              <span className="text-slate-300">High Intensity</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`w-3 h-3 rounded ${mapMode === 'demand' ? 'bg-amber-500/15' : mapMode === 'supply' ? 'bg-amber-500/15' : 'bg-violet-400/20'}`} />
              <span className="text-slate-300">Moderate</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-slate-900/40 border border-slate-850" />
              <span className="text-slate-300">Equilibrium / Quiet</span>
            </div>
          </div>

          <div className="absolute top-3 right-3 flex items-center gap-2 bg-slate-950/80 px-2.5 py-1 rounded border border-slate-850 text-[10px] font-mono text-slate-400">
            <Compass size={12} className="text-slate-500 animate-spin" style={{ animationDuration: '60s' }} />
            <span>METROPOLIS CLUSTER</span>
          </div>
        </div>
      </div>

      {/* Selected Zone Regional Insights Side Panel (Col span 5) */}
      <div className="xl:col-span-5 flex flex-col justify-between">
        <div className="bg-slate-900/50 border border-slate-900 rounded-2xl p-5 h-full flex flex-col justify-between space-y-4">
          {selectedZone ? (
            <div className="space-y-4 flex-1">
              <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">ZONE CODE: {selectedZone.id.toUpperCase()}</span>
                  <h4 className="font-display font-bold text-lg text-white">{selectedZone.name}</h4>
                </div>
                <span className="text-xs bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 px-2 py-0.5 rounded font-mono">
                  {selectedZone.driversCount} Drivers Active
                </span>
              </div>

              {/* Regional Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono">DEMAND LOAD</span>
                  <span className="block text-xl font-bold font-mono text-rose-400">{selectedZone.demandIntensity}%</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono">SUPPLY DENSITY</span>
                  <span className="block text-xl font-bold font-mono text-emerald-400">{selectedZone.supplyDensity}%</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono">CANCEL RATE</span>
                  <span className={`block text-xl font-bold font-mono ${selectedZone.cancellations > 6 ? 'text-rose-500' : 'text-slate-300'}`}>{selectedZone.cancellations}%</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 space-y-1">
                  <span className="text-[10px] text-slate-500 font-mono">ACTIVE TRIPS / ORDERS</span>
                  <span className="block text-xl font-bold font-mono text-cyan-400">{selectedZone.activeOrders}</span>
                </div>
              </div>

              {/* Real-time Alerts */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-slate-500 tracking-wider block">REAL-TIME FIELD TELEMETRY</span>
                {selectedZone.alerts.length > 0 ? (
                  <div className="space-y-1.5">
                    {selectedZone.alerts.map((alert, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400">
                        <AlertTriangle size={14} className="flex-shrink-0" />
                        <span>{alert}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/15 text-emerald-400">
                    <CheckCircle size={14} className="flex-shrink-0" />
                    <span>Spatial equilibrium secure. No warnings logged in zone.</span>
                  </div>
                )}
              </div>

              {/* Dynamic Override Surge / Rebalance triggers */}
              <div className="pt-2 border-t border-slate-800 space-y-3">
                <span className="text-[10px] font-mono text-slate-500 tracking-wider block">AI PRICE & DISPATCH RECALIBRATOR</span>
                
                {selectedZone.currentSurge !== selectedZone.recommendedSurge ? (
                  <div className="p-3 bg-slate-950 border border-violet-500/20 rounded-xl space-y-2.5">
                    <div className="flex justify-between items-center">
                      <div className="text-xs">
                        <span className="text-violet-400 font-medium block">Recommended Surge: {selectedZone.recommendedSurge}x</span>
                        <span className="text-slate-500 text-[11px]">Current Surge multiplier is lower: {selectedZone.currentSurge}x</span>
                      </div>
                      <span className="text-[10px] bg-violet-500/10 text-violet-400 px-1.5 py-0.5 rounded font-mono">DEFICIT</span>
                    </div>
                    <button 
                      onClick={() => handleSurgeSubmit(selectedZone.id, selectedZone.recommendedSurge)}
                      className="w-full bg-violet-500 hover:bg-violet-600 text-slate-950 font-bold text-xs py-2 rounded-lg cursor-pointer transition-colors"
                    >
                      Apply Recommended {selectedZone.recommendedSurge}x Surge Multiplier
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs p-2.5 rounded-lg bg-slate-950 border border-slate-850 text-slate-400">
                    <BadgePercent size={14} className="text-emerald-500" />
                    <span>Surge pricing matches AI optimal setting ({selectedZone.currentSurge}x)</span>
                  </div>
                )}

                {/* Manual overriding */}
                <div className="flex gap-2">
                  <input 
                    type="number" 
                    step="0.05"
                    min="1.0"
                    max="5.0"
                    placeholder="Enter manual surge (e.g. 1.5)"
                    value={customSurgeInputs[selectedZone.id] || ''}
                    onChange={(e) => setCustomSurgeInputs({ ...customSurgeInputs, [selectedZone.id]: e.target.value })}
                    className="flex-1 bg-slate-950 border border-slate-850 hover:border-slate-800 focus:border-cyan-400 px-3 py-2 rounded-lg text-xs font-mono text-white placeholder-slate-600 outline-none"
                  />
                  <button 
                    onClick={() => handleCustomSurgeSubmit(selectedZone.id)}
                    className="bg-slate-950 border border-slate-800 hover:border-slate-700 hover:text-white text-slate-300 font-semibold px-4 py-2 rounded-lg text-xs cursor-pointer transition-colors"
                  >
                    Override
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-500 space-y-2">
              <Compass size={40} className="text-slate-700 animate-pulse" />
              <p className="text-sm font-semibold text-slate-400">No Zone Selected</p>
              <p className="text-xs">Select any zone on the physical metropolitan map to drill down into localized spatial liquidity KPIs and issue real-time overrides.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
