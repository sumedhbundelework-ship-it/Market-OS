import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus, HelpCircle } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'stable';
  subtitle?: string;
  category?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  tooltip?: string;
}

export default function MetricCard({ title, value, change, trend, subtitle, category = 'neutral', tooltip }: MetricCardProps) {
  
  const getTrendIcon = () => {
    if (trend === 'up') return <ArrowUpRight size={14} className="text-emerald-500" />;
    if (trend === 'down') return <ArrowDownRight size={14} className="text-rose-500" />;
    return <Minus size={14} className="text-slate-500" />;
  };

  const getTrendBadgeColor = () => {
    if (trend === 'up') return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/15';
    if (trend === 'down') return 'bg-rose-500/10 text-rose-400 border border-rose-500/15';
    return 'bg-slate-900 text-slate-500 border border-slate-800';
  };

  return (
    <div className="bg-slate-900/40 border border-slate-900 hover:border-slate-800/80 rounded-2xl p-5 space-y-3 transition-all">
      <div className="flex justify-between items-start">
        <span className="text-xs text-slate-500 font-mono tracking-wider uppercase">{title}</span>
        {tooltip && (
          <div className="group relative">
            <HelpCircle size={12} className="text-slate-600 hover:text-slate-400 cursor-help" />
            <div className="hidden group-hover:block absolute right-0 top-5 bg-slate-950 text-slate-300 text-[10px] p-2 rounded border border-slate-800 w-48 z-20 font-sans shadow-xl">
              {tooltip}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between">
        <span className="text-2xl font-display font-bold text-white tracking-tight font-mono">{value}</span>
        {change && (
          <div className={`flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded ${getTrendBadgeColor()}`}>
            {getTrendIcon()}
            <span>{change}</span>
          </div>
        )}
      </div>

      {(subtitle || category) && (
        <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-900/85">
          <span className="text-slate-500 truncate">{subtitle || 'Monitoring active'}</span>
          <span className={`w-2 h-2 rounded-full ${
            category === 'success' ? 'bg-emerald-500' :
            category === 'warning' ? 'bg-amber-500' :
            category === 'danger' ? 'bg-rose-500' :
            category === 'info' ? 'bg-cyan-400 animate-pulse' : 'bg-slate-600'
          }`} />
        </div>
      )}
    </div>
  );
}
