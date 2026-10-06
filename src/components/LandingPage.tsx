import React, { useState } from 'react';
import { ShieldCheck, Activity, TrendingUp, Zap, Users, AlertCircle, ArrowRight, Play, Server, Layers, HelpCircle, Code } from 'lucide-react';

interface LandingPageProps {
  onLaunch: () => void;
}

export default function LandingPage({ onLaunch }: LandingPageProps) {
  const [activeTab, setActiveTab] = useState<'demand' | 'pricing' | 'supply'>('pricing');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden relative font-sans">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Navigation */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center shadow-lg shadow-cyan-400/20">
              <span className="font-display font-bold text-lg text-slate-950">M</span>
            </div>
            <div>
              <span className="font-display font-bold text-xl tracking-tight text-white">Market<span className="text-cyan-400">OS</span></span>
              <span className="block text-[9px] text-slate-500 font-mono tracking-widest uppercase">AI Marketplace Engine</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            <a href="#agents" className="hover:text-white transition-colors">Specialized Agents</a>
            <a href="#problems" className="hover:text-white transition-colors">Core Problems</a>
            <a href="#interactive" className="hover:text-white transition-colors">Interactive Preview</a>
            <a href="#target" className="hover:text-white transition-colors">Target Users</a>
          </div>

          <button 
            id="nav-launch-btn"
            onClick={onLaunch}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-violet-600 hover:opacity-90 text-slate-950 font-semibold px-5 py-2.5 rounded-lg transition-all text-sm cursor-pointer hover:shadow-lg hover:shadow-cyan-400/15"
          >
            Launch Console
            <ArrowRight size={16} />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 pt-20 pb-16 max-w-7xl mx-auto relative text-center md:text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-400 text-xs font-mono">
              <Zap size={12} />
              THE ENTERPRISE SaaS STANDARD
            </div>
            
            <h1 className="font-display font-bold text-5xl md:text-6xl tracking-tight leading-tight text-white">
              The AI Operating System for <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-500">Marketplace Growth</span>
            </h1>

            <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl">
              MarketOS continuously analyzes supply, demand, dynamic pricing, and dispatch signals. 
              Instead of showing passive dashboards, specialized AI agents proactively recommend, optimize, and execute real-time balancing actions.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center md:justify-start">
              <button 
                id="hero-launch-btn"
                onClick={onLaunch}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 to-violet-600 hover:opacity-95 text-slate-950 font-bold px-8 py-4 rounded-lg text-base cursor-pointer transition-all hover:shadow-xl hover:shadow-cyan-400/20"
              >
                Launch Sandbox Console
                <ArrowRight size={18} />
              </button>
              <a 
                href="#interactive"
                className="w-full sm:w-auto flex items-center justify-center gap-2 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 bg-slate-950 text-slate-300 hover:text-white px-8 py-4 rounded-lg text-base transition-colors"
              >
                <Play size={16} fill="currentColor" />
                See How It Works
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-slate-900 max-w-lg">
              <div>
                <span className="block font-display font-extrabold text-3xl text-white">100k+</span>
                <span className="text-xs text-slate-500">Simulated Customers</span>
              </div>
              <div>
                <span className="block font-display font-extrabold text-3xl text-white">25k+</span>
                <span className="text-xs text-slate-500">Active Fleet Drivers</span>
              </div>
              <div>
                <span className="block font-display font-extrabold text-3xl text-white">14+</span>
                <span className="text-xs text-slate-500">Autonomous Agents</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual (Simulating a premium agent interface) */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 bg-slate-900/80 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 max-w-md mx-auto">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono text-slate-400">AGENTS.CORE_BALANCER</span>
                </div>
                <span className="text-[10px] font-mono bg-cyan-400/10 text-cyan-400 px-2 py-0.5 rounded border border-cyan-400/20">ACTIVE</span>
              </div>

              {/* Live Card simulation */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-xs text-slate-400 bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded font-mono font-medium">HIGH PRIORITY</span>
                  <div className="text-right">
                    <span className="block text-[10px] text-slate-500 font-mono">CONFIDENCE</span>
                    <span className="text-xs font-bold text-white font-mono">94%</span>
                  </div>
                </div>

                <h3 className="font-semibold text-sm text-white">Increase driver incentive in Downtown by 12%</h3>
                
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Expected Impact:</span>
                    <span className="text-emerald-500 font-medium">Reduce ETA by 16%, +9% Rides</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Expected Revenue:</span>
                    <span className="text-cyan-400 font-mono font-medium">+$14,200 (6h)</span>
                  </div>
                </div>

                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-850 text-[11px] text-slate-400">
                  <span className="text-slate-500 block font-semibold mb-0.5">SUPPORTING EVIDENCE</span>
                  Demand exceeds local active supply by 31%. 48 cancellations occurred in SOMA in the last 10 mins.
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button onClick={onLaunch} className="bg-cyan-500 text-slate-950 font-semibold text-xs py-2 rounded-lg cursor-pointer hover:bg-cyan-400 transition-colors">
                    Approve
                  </button>
                  <button onClick={onLaunch} className="bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-semibold text-xs py-2 rounded-lg cursor-pointer transition-colors">
                    Analyze Core
                  </button>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                <span>SIM_TRIPS: 2,410,500</span>
                <span>LATENCY: 12ms</span>
              </div>
            </div>
            {/* Background design accents */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-violet-600 rounded-3xl blur opacity-15 max-w-md mx-auto pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Trust & Logos */}
      <section className="py-10 border-y border-slate-900 bg-slate-950/40 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <p className="text-xs font-mono uppercase text-slate-500 tracking-wider">
            Engineered for high-liquidity marketplace platforms
          </p>
          <div className="flex flex-wrap gap-8 items-center justify-center text-slate-400 text-lg font-display font-semibold">
            <span className="hover:text-white transition-colors">Uber</span>
            <span className="hover:text-white transition-colors">Airbnb</span>
            <span className="hover:text-white transition-colors">DoorDash</span>
            <span className="hover:text-white transition-colors">Lyft</span>
            <span className="hover:text-white transition-colors">Instacart</span>
          </div>
        </div>
      </section>

      {/* Core Problem Section */}
      <section id="problems" className="py-20 px-6 max-w-7xl mx-auto relative">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white">
            Marketplace Analytics is Broken
          </h2>
          <p className="text-slate-400">
            Operations teams spend hours querying SQL, evaluating static dashboards, and manually calculating surge multipliers while supply slips away.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-900 hover:border-slate-800 transition-all space-y-4">
            <div className="w-12 h-12 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <AlertCircle size={24} />
            </div>
            <h3 className="text-lg font-semibold text-white">Supply Deficit Lag</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              By the time static dashboards register driver shortages, customers have already cancelled, ETAs have ballooned, and passenger conversion is lost.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-900 hover:border-slate-800 transition-all space-y-4">
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-lg font-semibold text-white">Inaccurate Dynamic Pricing</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Generic surge models fail to integrate upcoming live radar storm metrics or hyper-local egress events, leading to suboptimal margins or empty fleets.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-900 hover:border-slate-800 transition-all space-y-4">
            <div className="w-12 h-12 rounded-lg bg-cyan-400/10 text-cyan-400 flex items-center justify-center">
              <Activity size={24} />
            </div>
            <h3 className="text-lg font-semibold text-white">Black-Box Search Ranking</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Matching models lack visual explanation. Operations managers are blind as to why specific courier drivers are skipped or high-value partners are deprioritized.
            </p>
          </div>
        </div>
      </section>

      {/* Target User & Value Section */}
      <section id="target" className="py-20 bg-slate-900/30 border-t border-slate-900 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <h2 className="font-display font-bold text-3xl md:text-4xl text-white">
                Designed for the Minds behind Uber and Airbnb
              </h2>
              <p className="text-slate-400 leading-relaxed">
                MarketOS satisfies the exact technical rigor demanded by top-tier growth and pricing engineering teams. We focus entirely on decision intelligence rather than passive graph visualization.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-400/10 text-cyan-400 flex items-center justify-center font-mono text-xs">1</div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">Marketplace PMs</h4>
                    <p className="text-xs text-slate-500">Deploy automated agent actions and monitor real-time spatial liquidity KPIs.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-400/10 text-cyan-400 flex items-center justify-center font-mono text-xs">2</div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">Pricing & Incentives Teams</h4>
                    <p className="text-xs text-slate-500">Simulate surge multiplier adjustments and dynamic driver bonuses instantly.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-400/10 text-cyan-400 flex items-center justify-center font-mono text-xs">3</div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">Ops & Strategy leaders</h4>
                    <p className="text-xs text-slate-500">Ask structural questions to our natural-language AI Chatbot and generate A/B experiments.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual representation of user roles */}
            <div className="lg:col-span-7 bg-slate-950 p-6 rounded-2xl border border-slate-850 space-y-4">
              <h3 className="font-display font-bold text-lg text-white">Specialized AI Operating Profiles</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-slate-500">AGENT_01</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <h4 className="font-semibold text-white text-sm">Marketplace Health</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">Continuous analysis of fulfillment rates, cancellations, and customer wait metrics.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-slate-500">AGENT_02</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  </div>
                  <h4 className="font-semibold text-white text-sm">Dynamic Pricing</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">Real-time optimization of peak pricing, commuter discounts, and location-based modifiers.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-slate-500">AGENT_03</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                  </div>
                  <h4 className="font-semibold text-white text-sm">Ranking Optimization</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">Maintains perfect dispatch matching and dynamic merchant ranking for maximum capture.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-slate-500">AGENT_04</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  </div>
                  <h4 className="font-semibold text-white text-sm">Supply Rebalancer</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">Foretells fleet shortages, driver churn probability, and automates incentive allocations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tabs preview (Pricing vs Demand vs Supply) */}
      <section id="interactive" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-mono bg-violet-500/10 text-violet-400 px-3 py-1 rounded-full border border-violet-500/20 uppercase tracking-widest">INTERACTIVE CONSOLE SIMULATION</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white">
            Simulate Autonomous Operations
          </h2>
          <p className="text-slate-400">
            Click through the core decision metrics below to preview how MarketOS orchestrates live marketplace balancing.
          </p>
        </div>

        {/* Tab triggers */}
        <div className="flex justify-center border-b border-slate-900 mb-8 max-w-md mx-auto">
          <button 
            onClick={() => setActiveTab('pricing')}
            className={`flex-1 pb-4 text-sm font-semibold text-center border-b-2 transition-all cursor-pointer ${activeTab === 'pricing' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
          >
            Dynamic Pricing
          </button>
          <button 
            onClick={() => setActiveTab('demand')}
            className={`flex-1 pb-4 text-sm font-semibold text-center border-b-2 transition-all cursor-pointer ${activeTab === 'demand' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
          >
            Demand Forecast
          </button>
          <button 
            onClick={() => setActiveTab('supply')}
            className={`flex-1 pb-4 text-sm font-semibold text-center border-b-2 transition-all cursor-pointer ${activeTab === 'supply' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
          >
            Supply Alerts
          </button>
        </div>

        {/* Tab content */}
        <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6 md:p-8 max-w-3xl mx-auto transition-all">
          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="font-semibold text-lg text-white">Dynamic Pricing Multiplier</h3>
                  <p className="text-xs text-slate-500">Calculated continuously based on live supply-density ratio.</p>
                </div>
                <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
                  <span className="block text-[10px] text-slate-500 font-mono">CURRENT HARMONIZED SURGE</span>
                  <span className="text-2xl font-display font-bold text-cyan-400 font-mono">1.24x</span>
                </div>
              </div>

              {/* Slider simulation */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-4">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Simulated Demand Intensity</span>
                  <span className="font-mono text-cyan-400 font-semibold">92% (Heavy Load)</span>
                </div>
                <div className="h-1 bg-slate-800 rounded-full relative">
                  <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full" style={{ width: '92%' }} />
                  <div className="absolute w-3.5 h-3.5 rounded-full bg-white shadow-md border border-cyan-400 top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer" style={{ left: '92%' }} />
                </div>
                <div className="flex justify-between items-center pt-2">
                  <div className="text-xs space-y-1">
                    <span className="text-slate-500 block">AI RECOMMENDATION</span>
                    <span className="text-white font-semibold">Adjust multiplier to 1.35x in Downtown immediately</span>
                  </div>
                  <button onClick={onLaunch} className="bg-cyan-400 text-slate-950 font-semibold text-xs px-3 py-1.5 rounded cursor-pointer hover:bg-cyan-300">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'demand' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="font-semibold text-lg text-white">Demand Forecast Modeling</h3>
                  <p className="text-xs text-slate-500">Continuous predictive spatial modeling based on atmospheric conditions.</p>
                </div>
                <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
                  <span className="block text-[10px] text-slate-500 font-mono">PREDICTION CONFIDENCE</span>
                  <span className="text-2xl font-display font-bold text-violet-400 font-mono">94.8%</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-1">
                  <span className="block text-[10px] text-slate-500 font-mono">HEAVY RAIN INFLOW</span>
                  <span className="text-lg font-bold text-white">+28% Requests</span>
                  <span className="block text-[10px] text-emerald-500 font-mono">Forecast Model Fed</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-1">
                  <span className="block text-[10px] text-slate-500 font-mono">CONCERT EGRESS</span>
                  <span className="text-lg font-bold text-white">+140% Spatial Peak</span>
                  <span className="block text-[10px] text-emerald-500 font-mono">Oracle Park Area</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 space-y-1">
                  <span className="block text-[10px] text-slate-500 font-mono">WEEKEND MODIFIER</span>
                  <span className="text-lg font-bold text-white">+14% Baseline</span>
                  <span className="block text-[10px] text-slate-500 font-mono">Recurring cohort</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'supply' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="font-semibold text-lg text-white">Spatial Fleet Shortage Alerts</h3>
                  <p className="text-xs text-slate-500">Autonomous alerting indicating dynamic geographic balancing actions.</p>
                </div>
                <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
                  <span className="block text-[10px] text-slate-500 font-mono">CRITICAL ALERTS</span>
                  <span className="text-2xl font-display font-bold text-rose-500 font-mono">2 ACTIVE</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-xl bg-rose-500/5 border border-rose-500/20 text-xs">
                  <div className="space-y-1">
                    <span className="font-semibold text-rose-500">Mission District Fleet Deficiency (-150 Drivers)</span>
                    <span className="text-slate-400 block">Average wait times spiked to 12.4 minutes. Cancel rates hit 9.8%.</span>
                  </div>
                  <button onClick={onLaunch} className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/30 px-3 py-1.5 rounded cursor-pointer font-semibold text-xs">
                    Rebalance
                  </button>
                </div>

                <div className="flex justify-between items-center p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs">
                  <div className="space-y-1">
                    <span className="font-semibold text-amber-500">SFO Airport Arrivals Surge (+240 incoming requests)</span>
                    <span className="text-slate-400 block">High density of flight landings. Idle staging area empty.</span>
                  </div>
                  <button onClick={onLaunch} className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/30 px-3 py-1.5 rounded cursor-pointer font-semibold text-xs">
                    Dispatch
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA section */}
      <section className="py-24 px-6 max-w-7xl mx-auto text-center relative border-t border-slate-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-cyan-400/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
          <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-white leading-tight">
            Ready to experience decision intelligence?
          </h2>
          <p className="text-slate-400 text-lg">
            Launch the interactive MarketOS console loaded with 100,000+ simulated users, real-time spatial analytics, dynamic pricing controllers, and interactive AI agent chat.
          </p>
          <div className="pt-4">
            <button 
              id="cta-launch-btn"
              onClick={onLaunch}
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-600 text-slate-950 font-bold px-10 py-5 rounded-xl text-lg hover:opacity-90 hover:shadow-2xl hover:shadow-cyan-400/25 transition-all cursor-pointer mx-auto"
            >
              Enter Sandbox Console
              <ArrowRight size={20} />
            </button>
            <span className="block text-slate-500 text-xs font-mono mt-3">NO INSTALLED API KEYS OR SECRETS REQUIRED TO TEST OUT THE SIMULATED DEPLOYMENT</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center">
              <span className="font-display font-bold text-xs text-slate-950">M</span>
            </div>
            <span className="font-display font-bold text-slate-300">Market<span className="text-cyan-400">OS</span></span>
          </div>
          <p>© 2026 MarketOS. Strictly for design-demonstration and Senior Product Manager candidate interview modeling.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-300 transition-colors">v4.1.2</span>
            <span className="text-slate-800">|</span>
            <span className="hover:text-slate-300 transition-colors">Enterprise Level SLA</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
