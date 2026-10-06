import React, { useState } from 'react';
import { Experiment } from '../types';
import { INITIAL_EXPERIMENTS } from '../data/mockData';
import { FlaskConical, Sparkles, CheckCircle2, AlertCircle, PlusCircle, ArrowRight, Play } from 'lucide-react';

export default function ExperimentView() {
  const [experiments, setExperiments] = useState<Experiment[]>(INITIAL_EXPERIMENTS);
  const [showForm, setShowForm] = useState<boolean>(false);

  // Form inputs
  const [name, setName] = useState<string>('');
  const [hypothesis, setHypothesis] = useState<string>('');
  const [expectedLift, setExpectedLift] = useState<string>('');
  const [primaryMetric, setPrimaryMetric] = useState<string>('');
  const [guardrails, setGuardrails] = useState<string>('Customer Session Length, Driver Attrition');
  const [sampleSize, setSampleSize] = useState<string>('20,000 users');
  const [strategy, setStrategy] = useState<string>('50/50 randomized user split');

  const handleLaunchExperiment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !hypothesis || !expectedLift) {
      alert('Please fill out Name, Hypothesis, and Expected Lift.');
      return;
    }

    const newExp: Experiment = {
      id: `exp-${Date.now()}`,
      name,
      hypothesis,
      expectedLift,
      primaryMetric: primaryMetric || 'Fulfillment Rate',
      guardrailMetrics: guardrails.split(',').map(g => g.trim()),
      sampleSize,
      rolloutStrategy: strategy,
      status: 'running'
    };

    setExperiments([newExp, ...experiments]);
    setShowForm(false);
    
    // Clear form
    setName('');
    setHypothesis('');
    setExpectedLift('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="border-b border-slate-900 pb-5">
        <span className="text-xs font-mono text-cyan-400 tracking-wider">A/B CONTROL TESTING STUDIO</span>
        <h2 className="font-display font-bold text-2xl text-white">Experimentation Lab</h2>
        <p className="text-xs text-slate-500 font-sans">
          Automates statistical power, designs sample groups, and monitors guardrail regressions across pricing, matchmaking, and dispatch models.
        </p>
      </div>

      {/* Grid: Header Actions and List */}
      <div className="flex justify-between items-center bg-slate-900/40 p-4 border border-slate-900 rounded-2xl">
        <div className="space-y-1">
          <h4 className="font-display font-bold text-sm text-white">MarketOS Auto-Experimenter</h4>
          <p className="text-[11px] text-slate-400">Design dynamic randomized geo-split or user-id based split tests.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-400 to-violet-600 hover:opacity-90 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-lg cursor-pointer transition-all hover:shadow-lg hover:shadow-cyan-400/15"
        >
          <PlusCircle size={14} />
          {showForm ? 'Cancel Creation' : 'Design New A/B Test'}
        </button>
      </div>

      {/* Experiment creation form */}
      {showForm && (
        <form onSubmit={handleLaunchExperiment} className="bg-slate-900/60 border border-cyan-400/20 rounded-2xl p-5 space-y-4 animate-fade-in">
          <div className="flex items-center gap-2 border-b border-slate-850 pb-2.5 mb-2">
            <Sparkles size={16} className="text-cyan-400" />
            <h4 className="font-display font-bold text-sm text-white">A/B Testing Parameter Design</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-semibold block">Experiment Title</label>
              <input 
                type="text" 
                placeholder="e.g., Dynamic ETA Buffer Smoothing v2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 hover:border-slate-800 focus:border-cyan-400 text-xs text-white px-3.5 py-2.5 rounded-lg outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs text-slate-400 font-semibold block">Primary Success Metric</label>
                <input 
                  type="text" 
                  placeholder="e.g., Ride Completion Rate"
                  value={primaryMetric}
                  onChange={(e) => setPrimaryMetric(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 hover:border-slate-800 focus:border-cyan-400 text-xs text-white px-3.5 py-2.5 rounded-lg outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-400 font-semibold block">Target Sample Size</label>
                <input 
                  type="text" 
                  placeholder="e.g., 45,000 customers"
                  value={sampleSize}
                  onChange={(e) => setSampleSize(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 hover:border-slate-800 focus:border-cyan-400 text-xs text-white px-3.5 py-2.5 rounded-lg outline-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 font-semibold block">Core Hypothesis</label>
            <textarea 
              placeholder="Detail the causal mechanism and expected user behavioral outcome..."
              value={hypothesis}
              onChange={(e) => setHypothesis(e.target.value)}
              rows={2}
              className="w-full bg-slate-950 border border-slate-850 hover:border-slate-800 focus:border-cyan-400 text-xs text-white px-3.5 py-2.5 rounded-lg outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-semibold block">Expected Business Lift</label>
              <input 
                type="text" 
                placeholder="e.g., -15% cancellations, +3% NPS"
                value={expectedLift}
                onChange={(e) => setExpectedLift(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 hover:border-slate-800 focus:border-cyan-400 text-xs text-white px-3.5 py-2.5 rounded-lg outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-semibold block">Guardrail Metrics (comma separated)</label>
              <input 
                type="text" 
                placeholder="Driver Idle, Gross Margins"
                value={guardrails}
                onChange={(e) => setGuardrails(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 hover:border-slate-800 focus:border-cyan-400 text-xs text-white px-3.5 py-2.5 rounded-lg outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-semibold block">Rollout Strategy</label>
              <input 
                type="text" 
                placeholder="e.g., 50/50 randomized geo split"
                value={strategy}
                onChange={(e) => setStrategy(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 hover:border-slate-800 focus:border-cyan-400 text-xs text-white px-3.5 py-2.5 rounded-lg outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button 
              type="button" 
              onClick={() => setShowForm(false)}
              className="border border-slate-850 hover:bg-slate-900 text-slate-400 text-xs px-4 py-2.5 rounded-lg cursor-pointer"
            >
              Discard
            </button>
            <button 
              type="submit"
              className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs px-6 py-2.5 rounded-lg cursor-pointer"
            >
              Deploy & Launch A/B Test
            </button>
          </div>
        </form>
      )}

      {/* List of experiments */}
      <div className="space-y-4">
        {experiments.map((exp) => (
          <div 
            key={exp.id} 
            className={`bg-slate-900/50 border rounded-2xl p-5 space-y-4 transition-all ${
              exp.status === 'running' ? 'border-cyan-400/10 hover:border-cyan-400/20' : 'border-slate-900'
            }`}
          >
            {/* Header */}
            <div className="flex justify-between items-start gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${
                    exp.status === 'running' ? 'bg-cyan-400/10 text-cyan-400 border-cyan-400/20' :
                    exp.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    'bg-slate-950 text-slate-500 border-slate-800'
                  }`}>
                    {exp.status.toUpperCase()}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">SAMPLE SIZE: {exp.sampleSize}</span>
                </div>
                <h4 className="font-display font-bold text-base text-white">{exp.name}</h4>
              </div>
            </div>

            {/* Hypothesis & Details */}
            <p className="text-xs text-slate-400 leading-relaxed">{exp.hypothesis}</p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-950/80 p-3 rounded-xl border border-slate-850/80 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 font-mono block">PRIMARY METRIC</span>
                <span className="text-white font-medium">{exp.primaryMetric}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-mono block">EXPECTED LIFT</span>
                <span className="text-cyan-400 font-mono font-bold">{exp.expectedLift}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-mono block">GUARDRAILS</span>
                <span className="text-slate-400 text-[11px] font-mono truncate">{exp.guardrailMetrics.join(', ')}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-mono block">ROLLOUT STRATEGY</span>
                <span className="text-slate-400 text-[11px] truncate">{exp.rolloutStrategy}</span>
              </div>
            </div>

            {/* If completed, show statistical results */}
            {exp.results && (
              <div className="bg-emerald-500/[0.02] border border-emerald-500/15 p-3.5 rounded-xl space-y-1.5 text-xs">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-emerald-400 font-bold uppercase tracking-wider">STATISTICAL EVALUATION LOG</span>
                  <span className="text-slate-500">P-VALUE = {exp.results.pValue} (STATISTICALLY SIGNIFICANT)</span>
                </div>
                <div className="flex justify-between font-sans">
                  <span className="text-white font-semibold">{exp.results.conclusion}</span>
                  <span className="text-emerald-400 font-bold font-mono">{exp.results.metricChange}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
