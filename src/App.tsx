import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Sidebar, { ActiveTab } from './components/Sidebar';
import InteractiveMap from './components/InteractiveMap';
import DashboardView from './components/DashboardView';
import AgentsView from './components/AgentsView';
import PricingAgentView from './components/PricingAgentView';
import RankingAgentView from './components/RankingAgentView';
import DemandAgentView from './components/DemandAgentView';
import SupplyAgentView from './components/SupplyAgentView';
import PersonalizationView from './components/PersonalizationView';
import DriverView from './components/DriverView';
import ExperimentView from './components/ExperimentView';
import ChatView from './components/ChatView';
import SettingsView from './components/SettingsView';

import { 
  INITIAL_MARKETPLACE_STATS, 
  INITIAL_AGENTS, 
  INITIAL_RECOMMENDATIONS, 
  INITIAL_ZONES 
} from './data/mockData';
import { ZoneData, Recommendation } from './types';
import { Sparkles, Activity, AlertTriangle, HelpCircle } from 'lucide-react';

export default function App() {
  const [showConsole, setShowConsole] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  // Mutable Stats State
  const [stats, setStats] = useState(INITIAL_MARKETPLACE_STATS);
  const [recommendations, setRecommendations] = useState<Recommendation[]>(INITIAL_RECOMMENDATIONS);
  const [agents, setAgents] = useState(INITIAL_AGENTS);
  const [zones, setZones] = useState<ZoneData[]>(INITIAL_ZONES);
  const [selectedZone, setSelectedZone] = useState<ZoneData | null>(INITIAL_ZONES[0]);

  // Handle recommendation approvals and simulate immediate visual feedback in KPIs
  const handleApproveRecommendation = (id: string) => {
    setRecommendations((prev) => 
      prev.map((rec) => (rec.id === id ? { ...rec, status: 'approved' as const } : rec))
    );

    // Provide visual statistical rewards based on what recommendation was accepted
    setStats((prev) => {
      const match = recommendations.find((r) => r.id === id);
      if (!match) return prev;

      if (match.category === 'supply') {
        return {
          ...prev,
          averageWaitTime: Math.max(2.1, Math.round((prev.averageWaitTime - 0.6) * 10) / 10),
          fulfillmentRate: Math.min(100, Math.round((prev.fulfillmentRate + 1.2) * 10) / 10),
          activeDriversOnline: prev.activeDriversOnline + 120,
        };
      } else if (match.category === 'pricing') {
        return {
          ...prev,
          gmvMTD: prev.gmvMTD + 28500,
          netRevenueMTD: prev.netRevenueMTD + 5700,
          averageSurge: Math.round((prev.averageSurge + 0.05) * 100) / 100,
        };
      } else if (match.category === 'ranking') {
        return {
          ...prev,
          cancellationRate: Math.max(0.8, Math.round((prev.cancellationRate - 0.4) * 10) / 10),
          healthScore: Math.min(100, prev.healthScore + 2),
        };
      } else if (match.category === 'personalization') {
        return {
          ...prev,
          activeCustomers: prev.activeCustomers + 1420,
          gmvMTD: prev.gmvMTD + 18900,
        };
      } else if (match.category === 'fraud') {
        return {
          ...prev,
          netRevenueMTD: prev.netRevenueMTD + 1400,
          healthScore: Math.min(100, prev.healthScore + 1),
        };
      }
      return prev;
    });
  };

  const handleRejectRecommendation = (id: string) => {
    setRecommendations((prev) => 
      prev.map((rec) => (rec.id === id ? { ...rec, status: 'rejected' as const } : rec))
    );
  };

  // Adjust surge multiplier for a physical district zone
  const handleApplyOverrideSurge = (zoneId: string, value: number) => {
    setZones((prev) => 
      prev.map((zone) => {
        if (zone.id === zoneId) {
          return {
            ...zone,
            currentSurge: value,
            recommendedSurge: value // align recommendation as resolved
          };
        }
        return zone;
      })
    );

    // Also update overall stats avg surge
    setStats((prev) => ({
      ...prev,
      averageSurge: Math.round((zones.reduce((acc, curr) => acc + (curr.id === zoneId ? value : curr.currentSurge), 0) / zones.length) * 100) / 100
    }));

    // Update selectedZone reference if active
    if (selectedZone && selectedZone.id === zoneId) {
      setSelectedZone((prev) => prev ? { ...prev, currentSurge: value, recommendedSurge: value } : null);
    }
  };

  const pendingRecsCount = recommendations.filter((r) => r.status === 'pending').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {!showConsole ? (
        // Spectacular value-proposition Landing Page
        <LandingPage onLaunch={() => setShowConsole(true)} />
      ) : (
        // Enterprise SaaS Console
        <div className="flex h-screen overflow-hidden">
          
          {/* Vertical Sidebar */}
          <Sidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            onExit={() => setShowConsole(false)} 
            pendingRecsCount={pendingRecsCount}
          />

          {/* Core Content Area */}
          <main className="flex-1 overflow-y-auto bg-slate-950 p-6 sm:p-8 relative">
            
            {/* Ambient Background Glow inside console */}
            <div className="absolute top-0 right-10 w-[400px] h-[400px] bg-cyan-400/[0.03] rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-violet-500/[0.02] rounded-full blur-[80px] pointer-events-none" />

            <div className="max-w-7xl mx-auto space-y-6">
              
              {/* Active Tab Router */}
              {activeTab === 'dashboard' && (
                <DashboardView 
                  stats={stats}
                  recommendations={recommendations}
                  onApproveRecommendation={handleApproveRecommendation}
                  onRejectRecommendation={handleRejectRecommendation}
                  agents={agents}
                  zones={zones}
                  onSelectZone={setSelectedZone}
                  onNavigateToTab={setActiveTab}
                />
              )}

              {activeTab === 'map' && (
                <div className="space-y-6">
                  <div className="border-b border-slate-900 pb-5">
                    <span className="text-xs font-mono text-cyan-400 tracking-wider">GEOGRAPHIC COORDINATION OVERVIEW</span>
                    <h2 className="font-display font-bold text-2xl text-white">Spatial Health Map</h2>
                    <p className="text-xs text-slate-500">Visualizes physical driver and passenger supply-demand deficits in real-time across SF metropolitan clusters.</p>
                  </div>

                  <InteractiveMap 
                    zones={zones}
                    selectedZone={selectedZone}
                    onSelectZone={setSelectedZone}
                    onApplyOverrideSurge={handleApplyOverrideSurge}
                  />
                </div>
              )}

              {activeTab === 'agents' && (
                <AgentsView agents={agents} />
              )}

              {activeTab === 'pricing' && (
                <PricingAgentView 
                  stats={stats}
                  zones={zones}
                  onApplyOverrideSurge={handleApplyOverrideSurge}
                />
              )}

              {activeTab === 'ranking' && (
                <RankingAgentView />
              )}

              {activeTab === 'demand' && (
                <DemandAgentView />
              )}

              {activeTab === 'supply' && (
                <SupplyAgentView />
              )}

              {activeTab === 'customers' && (
                <PersonalizationView />
              )}

              {activeTab === 'drivers' && (
                <DriverView />
              )}

              {activeTab === 'experiments' && (
                <ExperimentView />
              )}

              {activeTab === 'chat' && (
                <ChatView onApproveRecommendation={handleApproveRecommendation} />
              )}

              {activeTab === 'settings' && (
                <SettingsView />
              )}

            </div>
          </main>
        </div>
      )}
    </div>
  );
}
