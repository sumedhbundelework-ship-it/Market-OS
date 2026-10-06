import React, { useState } from 'react';
import { ArrowUpDown, ShieldCheck, RefreshCw, BarChart2, CheckCircle } from 'lucide-react';

interface SimulatedMerchant {
  id: string;
  name: string;
  distanceKm: number; // raw
  rating: number; // out of 5
  etaMin: number; // in mins
  acceptanceRate: number; // %
  popularityScore: number; // 0-100
  basePrice: number;
}

const SIMULATED_MERCHANTS: SimulatedMerchant[] = [
  { id: 'm-1', name: 'Downtown Burger Hub', distanceKm: 1.2, rating: 4.8, etaMin: 8, acceptanceRate: 98, popularityScore: 92, basePrice: 15 },
  { id: 'm-2', name: 'Sushi Palace (Financial)', distanceKm: 3.4, rating: 4.9, etaMin: 14, acceptanceRate: 95, popularityScore: 88, basePrice: 24 },
  { id: 'm-3', name: 'Pizzeria Bella Vista', distanceKm: 0.8, rating: 4.2, etaMin: 5, acceptanceRate: 85, popularityScore: 75, basePrice: 18 },
  { id: 'm-4', name: 'Noodle House Express', distanceKm: 2.1, rating: 4.5, etaMin: 11, acceptanceRate: 91, popularityScore: 80, basePrice: 12 },
  { id: 'm-5', name: 'La Taqueria Organica', distanceKm: 4.5, rating: 4.7, etaMin: 19, acceptanceRate: 99, popularityScore: 96, basePrice: 14 },
];

export default function RankingAgentView() {
  // Weights (user controlled sliders)
  const [distanceWeight, setDistanceWeight] = useState<number>(30);
  const [ratingWeight, setRatingWeight] = useState<number>(30);
  const [etaWeight, setEtaWeight] = useState<number>(20);
  const [acceptanceWeight, setAcceptanceWeight] = useState<number>(10);
  const [popularityWeight, setPopularityWeight] = useState<number>(10);

  // Compute ranking score for each merchant based on normalized values and weights
  // Max score is 1000
  const getRankedMerchants = () => {
    return SIMULATED_MERCHANTS.map((m) => {
      // Normalize each factor (higher is better, between 0 and 100)
      
      // Distance normalization: 5km max. Nearer distance gets higher score.
      const normalizedDistance = Math.max(0, 100 - (m.distanceKm / 5) * 100);
      
      // Rating normalization: 5.0 is max, 3.5 is min for ranking.
      const normalizedRating = Math.max(0, ((m.rating - 3.5) / 1.5) * 100);
      
      // ETA normalization: 25 mins max. Sorter ETA gets higher score.
      const normalizedEta = Math.max(0, 100 - (m.etaMin / 25) * 100);
      
      // Acceptance normalization: directly the percentage
      const normalizedAcceptance = m.acceptanceRate;
      
      // Popularity score is already 0-100
      const normalizedPopularity = m.popularityScore;

      // Weighted sum (Sum of weights is the denominator)
      const totalWeight = distanceWeight + ratingWeight + etaWeight + acceptanceWeight + popularityWeight;
      const weightedScore = (
        normalizedDistance * distanceWeight +
        normalizedRating * ratingWeight +
        normalizedEta * etaWeight +
        normalizedAcceptance * acceptanceWeight +
        normalizedPopularity * popularityWeight
      ) / (totalWeight || 1);

      return {
        ...m,
        score: Math.round(weightedScore * 10) // scale to 0-1000
      };
    }).sort((a, b) => b.score - a.score);
  };

  const rankedMerchants = getRankedMerchants();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="border-b border-slate-900 pb-5">
        <span className="text-xs font-mono text-cyan-400 tracking-wider">GRAPH MATCHING & MERCHANDISER DISPATCH</span>
        <h2 className="font-display font-bold text-2xl text-white">Search & Dispatch Ranking Simulator</h2>
        <p className="text-xs text-slate-500 font-sans">
          Simulate how modifications to core algorithm weights re-order search listing rankings and match dispatching times in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Weight sliders panel (Col span 5) */}
        <div className="lg:col-span-5 bg-slate-900/50 border border-slate-900 rounded-2xl p-5 flex flex-col justify-between space-y-5">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-cyan-400 tracking-wider">GRAPH BIASES & OBJECTIVES</span>
            <h4 className="font-display font-bold text-base text-white">Algorithmic Factor Weights</h4>
            <p className="text-[11px] text-slate-500">Tune the relative importance of match vectors in our core dispatch logic.</p>
          </div>

          <div className="space-y-4 flex-1 pt-2">
            
            {/* ETA Weight */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400 font-semibold">ETA Weight (Courier Speed)</span>
                <span className="text-cyan-400 font-bold">{etaWeight}%</span>
              </div>
              <input 
                type="range"
                min="0"
                max="100"
                value={etaWeight}
                onChange={(e) => setEtaWeight(parseInt(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>

            {/* Distance Weight */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400 font-semibold">Geographic Distance Weight</span>
                <span className="text-cyan-400 font-bold">{distanceWeight}%</span>
              </div>
              <input 
                type="range"
                min="0"
                max="100"
                value={distanceWeight}
                onChange={(e) => setDistanceWeight(parseInt(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>

            {/* Rating Weight */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400 font-semibold">Merchant Rating Weight</span>
                <span className="text-cyan-400 font-bold">{ratingWeight}%</span>
              </div>
              <input 
                type="range"
                min="0"
                max="100"
                value={ratingWeight}
                onChange={(e) => setRatingWeight(parseInt(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>

            {/* Acceptance Rate Weight */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400 font-semibold">Driver Acceptance Weight</span>
                <span className="text-cyan-400 font-bold">{acceptanceWeight}%</span>
              </div>
              <input 
                type="range"
                min="0"
                max="100"
                value={acceptanceWeight}
                onChange={(e) => setAcceptanceWeight(parseInt(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>

            {/* Popularity Weight */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400 font-semibold">Popularity Index Weight</span>
                <span className="text-cyan-400 font-bold">{popularityWeight}%</span>
              </div>
              <input 
                type="range"
                min="0"
                max="100"
                value={popularityWeight}
                onChange={(e) => setPopularityWeight(parseInt(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>

          </div>

          {/* Reset button to standard Uber weights */}
          <button
            onClick={() => {
              setDistanceWeight(30);
              setRatingWeight(30);
              setEtaWeight(20);
              setAcceptanceWeight(10);
              setPopularityWeight(10);
            }}
            className="w-full bg-slate-950 border border-slate-850 text-slate-400 hover:text-white hover:border-slate-700 text-xs py-2 rounded-lg cursor-pointer transition-colors flex items-center justify-center gap-1.5"
          >
            <RefreshCw size={12} />
            Reset to Standard Equilibrium Weights
          </button>
        </div>

        {/* Output list of reordered merchants (Col span 7) */}
        <div className="lg:col-span-7 bg-slate-900/50 border border-slate-900 rounded-2xl p-5 flex flex-col justify-between">
          <div className="space-y-1 mb-4">
            <span className="text-[10px] font-mono text-violet-400 tracking-wider">LIVE RE-RANKING PREVIEW</span>
            <h4 className="font-display font-bold text-base text-white">Dynamic Scoring Output</h4>
            <p className="text-[11px] text-slate-500">Computed real-time scores based on normalized vector mathematics.</p>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto max-h-[350px] pr-1">
            {rankedMerchants.map((merchant, index) => {
              const place = index + 1;
              const isFirst = place === 1;

              return (
                <div 
                  key={merchant.id}
                  className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                    isFirst ? 'bg-cyan-400/[0.04] border-cyan-400/20' : 'bg-slate-950/60 border-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Rank Badge */}
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                      isFirst ? 'bg-cyan-400 text-slate-950' : 'bg-slate-900 text-slate-500 border border-slate-800'
                    }`}>
                      {place}
                    </span>

                    <div>
                      <h5 className="font-bold text-xs text-white">{merchant.name}</h5>
                      
                      {/* Sub-KPI Row */}
                      <div className="flex flex-wrap gap-x-2 text-[10px] text-slate-500 font-mono mt-0.5">
                        <span>Dist: <b className="text-slate-400">{merchant.distanceKm}km</b></span>
                        <span>•</span>
                        <span>ETA: <b className="text-slate-400">{merchant.etaMin}m</b></span>
                        <span>•</span>
                        <span>Rating: <b className="text-slate-400">{merchant.rating}★</b></span>
                        <span>•</span>
                        <span>Accept: <b className="text-slate-400">{merchant.acceptanceRate}%</b></span>
                      </div>
                    </div>
                  </div>

                  {/* Score Indicator */}
                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <div className="text-right">
                      <span className="block text-[9px] text-slate-500 font-mono">CALCULATED RAW SCORE</span>
                      <span className={`text-sm font-mono font-extrabold ${isFirst ? 'text-cyan-400' : 'text-slate-300'}`}>{merchant.score} pts</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-900/80 mt-4 flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>DISPATCH_SYSTEM: BIPARTITE_FLOW_v3</span>
            <span>SIMULATED_RECORDS: 100k+ users</span>
          </div>
        </div>

      </div>

      {/* Analytical explanation card */}
      <div className="p-4 bg-slate-900/30 border border-slate-900 rounded-xl space-y-2">
        <h4 className="font-display font-bold text-xs text-white flex items-center gap-1.5">
          <BarChart2 size={14} className="text-cyan-400" />
          Ranking Factors Decoded
        </h4>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          The dispatch engine uses multi-objective optimization (MOO). Reducing <b>ETA weight</b> during high demand directs riders to nearby couriers regardless of vehicle rating, safeguarding absolute delivery times. Conversely, increasing <b>Acceptance Rate weight</b> rewards reliable partners while squeezing out low-fulfillment merchants.
        </p>
      </div>

    </div>
  );
}
