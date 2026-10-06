export interface Recommendation {
  id: string;
  title: string;
  category: 'health' | 'pricing' | 'ranking' | 'demand' | 'supply' | 'fraud' | 'personalization' | 'experiment';
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  businessImpact: string;
  confidence: number; // e.g. 94 for 94%
  expectedRevenueImpact: string;
  evidence: string[];
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'monitoring' | 'optimizing' | 'idle' | 'warning';
  healthScore: number;
  description: string;
  metricName: string;
  metricValue: string | number;
  metricTrend: 'up' | 'down' | 'stable';
}

export interface Driver {
  id: string;
  name: string;
  avatar: string;
  earnings: number;
  acceptanceRate: number; // %
  completionRate: number; // %
  idleTimeMin: number;
  churnRisk: 'critical' | 'high' | 'medium' | 'low';
  status: 'online' | 'offline' | 'busy';
  recommendations: string[];
}

export interface Customer {
  id: string;
  name: string;
  segment: 'Power User' | 'At-Risk' | 'Promo Driven' | 'Occasional' | 'New';
  ltv: number;
  repeatPurchases: number;
  cancellationRate: number; // %
  nps: number;
  opportunities: string[];
}

export interface DemandForecastPoint {
  time: string;
  actualDemand?: number;
  predictedDemand: number;
  weatherImpact: number; // multiplier, e.g. 1.15
  eventImpact: number; // multiplier
  surgePricing: number;
}

export interface Experiment {
  id: string;
  name: string;
  hypothesis: string;
  expectedLift: string;
  primaryMetric: string;
  guardrailMetrics: string[];
  sampleSize: string;
  rolloutStrategy: string;
  status: 'running' | 'completed' | 'draft';
  results?: {
    metricChange: string;
    pValue: number;
    conclusion: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  chartData?: any[];
  chartKeys?: string[];
  chartType?: 'line' | 'bar' | 'area';
  recommendations?: Recommendation[];
}

export interface ZoneData {
  id: string;
  name: string;
  demandIntensity: number; // 0-100
  supplyDensity: number; // 0-100
  currentSurge: number; // e.g. 1.4
  recommendedSurge: number;
  cancellations: number; // %
  driversCount: number;
  activeOrders: number;
  alerts: string[];
}
