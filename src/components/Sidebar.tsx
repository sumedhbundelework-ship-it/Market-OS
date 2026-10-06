import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  Bot, 
  CircleDollarSign, 
  ArrowUpDown, 
  LineChart, 
  Truck, 
  Users, 
  UserSquare2, 
  FlaskConical, 
  MessageSquare, 
  Settings, 
  LogOut,
  Sparkles,
  Zap,
  Activity
} from 'lucide-react';

export type ActiveTab = 
  | 'dashboard'
  | 'map'
  | 'agents'
  | 'pricing'
  | 'ranking'
  | 'demand'
  | 'supply'
  | 'customers'
  | 'drivers'
  | 'experiments'
  | 'chat'
  | 'settings';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onExit: () => void;
  pendingRecsCount: number;
}

export default function Sidebar({ activeTab, setActiveTab, onExit, pendingRecsCount }: SidebarProps) {
  
  const menuItems = [
    { id: 'dashboard', label: 'AI Executive Hub', icon: LayoutDashboard },
    { id: 'map', label: 'Spatial Health Map', icon: Map, alert: true },
    { id: 'agents', label: 'AI Agent Workspace', icon: Bot, badge: '8 Active' },
    { id: 'pricing', label: 'Dynamic Pricing', icon: CircleDollarSign },
    { id: 'ranking', label: 'Ranking Simulator', icon: ArrowUpDown },
    { id: 'demand', label: 'Demand Forecast', icon: LineChart },
    { id: 'supply', label: 'Supply Balancer', icon: Truck },
    { id: 'customers', label: 'Customer Cohorts', icon: Users },
    { id: 'drivers', label: 'Driver Analytics', icon: UserSquare2 },
    { id: 'experiments', label: 'Experimentation Lab', icon: FlaskConical },
    { id: 'chat', label: 'MarketOS Assistant', icon: MessageSquare, highlighted: true },
  ];

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-900 flex flex-col justify-between h-screen sticky top-0 shrink-0 select-none">
      {/* Upper Logo / Identity */}
      <div className="p-5 border-b border-slate-900">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center">
            <span className="font-display font-bold text-slate-950 text-base">M</span>
          </div>
          <div>
            <span className="font-display font-bold text-lg text-white tracking-tight">Market<span className="text-cyan-400">OS</span></span>
            <span className="block text-[8px] text-slate-500 font-mono tracking-widest uppercase">Decisions Agent v4.1</span>
          </div>
        </div>

        {/* Real-time sync notifier */}
        <div className="mt-4 flex items-center justify-between bg-slate-900/40 p-2 rounded-lg border border-slate-850 text-[10px] font-mono">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-400">SYNC_STATUS: ACTIVE</span>
          </div>
          <span className="text-[9px] text-slate-500">12ms</span>
        </div>
      </div>

      {/* Navigation menu list */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin">
        <span className="px-3 text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-2">WORKSPACES</span>
        
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as ActiveTab)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                isActive 
                  ? 'bg-slate-900 text-cyan-400 border-l-2 border-cyan-400 font-semibold' 
                  : item.highlighted 
                    ? 'text-violet-400 hover:text-violet-300 hover:bg-slate-900/50 bg-violet-500/5 border border-violet-500/10' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon size={16} className={isActive ? 'text-cyan-400' : item.highlighted ? 'text-violet-400' : 'text-slate-400'} />
                <span>{item.label}</span>
              </div>

              {/* Badges and notification overlays */}
              {item.badge && (
                <span className="text-[9px] bg-slate-900 text-cyan-400 border border-slate-800 px-1.5 py-0.5 rounded font-mono">
                  {item.badge}
                </span>
              )}
              {item.alert && pendingRecsCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-rose-500" />
              )}
            </button>
          );
        })}

        <div className="pt-4 border-t border-slate-900/80 mt-2 space-y-1">
          <span className="px-3 text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-2">ADMIN</span>
          
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
              activeTab === 'settings' ? 'bg-slate-900 text-cyan-400 border-l-2 border-cyan-400 font-semibold' : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <Settings size={16} />
            <span>Platform Settings</span>
          </button>
        </div>
      </nav>

      {/* Sidebar bottom profile and exits */}
      <div className="p-4 border-t border-slate-900 space-y-3">
        {/* User Card */}
        <div className="flex items-center gap-2.5 bg-slate-900/30 p-2 rounded-xl border border-slate-900">
          <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center font-mono text-xs text-slate-300 border border-slate-700">
            PM
          </div>
          <div className="overflow-hidden">
            <span className="block text-[11px] font-bold text-white leading-none truncate">Lead Growth PM</span>
            <span className="text-[9px] text-slate-500 font-mono">UBER_CORE_ORG</span>
          </div>
        </div>

        {/* Exit back to Landing */}
        <button
          onClick={onExit}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-500 hover:text-slate-300 transition-colors rounded-lg cursor-pointer"
        >
          <LogOut size={14} />
          <span>Exit App Sandbox</span>
        </button>
      </div>
    </aside>
  );
}
