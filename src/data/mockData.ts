import { Recommendation, Agent, Driver, Customer, DemandForecastPoint, Experiment, ZoneData } from '../types';

export const INITIAL_MARKETPLACE_STATS = {
  activeCustomers: 142520,
  activeDrivers: 26410,
  totalTripsMTD: 2410500,
  gmvMTD: 48210000,
  netRevenueMTD: 9642000,
  healthScore: 88,
  fulfillmentRate: 94.2,
  averageWaitTime: 4.2, // in minutes
  averageSurge: 1.24,
  cancellationRate: 3.8, // %
  activeOrders: 1480,
  activeDriversOnline: 3820,
};

export const INITIAL_AGENTS: Agent[] = [
  {
    id: 'health',
    name: 'Marketplace Health Agent',
    role: 'Liquidity & Core Liquidity Monitoring',
    status: 'active',
    healthScore: 88,
    description: 'Monitors real-time supply-demand gaps, cancel ratios, and ETA violations across all metropolitan sectors.',
    metricName: 'Liquidity Index',
    metricValue: '91.4%',
    metricTrend: 'up'
  },
  {
    id: 'pricing',
    name: 'Dynamic Pricing Agent',
    role: 'Surge & Incentive Optimization',
    status: 'optimizing',
    healthScore: 92,
    description: 'Dynamically balances pricing and driver-side dispatch multipliers to absorb regional demand spikes.',
    metricName: 'Gross Margin Lift',
    metricValue: '+6.4%',
    metricTrend: 'up'
  },
  {
    id: 'ranking',
    name: 'Ranking & Matching Agent',
    role: 'Search & Dispatch Personalization',
    status: 'active',
    healthScore: 95,
    description: 'Utilizes deep graph models to match drivers to riders and rank restaurants based on fulfillment probability.',
    metricName: 'Match Rate (10s)',
    metricValue: '86.5%',
    metricTrend: 'stable'
  },
  {
    id: 'demand',
    name: 'Demand Forecast Agent',
    role: 'Predictive Spatial Modeling',
    status: 'active',
    healthScore: 94,
    description: 'Ingests climate, regional telemetry, and localized events to predict hourly demand up to 72 hours in advance.',
    metricName: 'Prediction Accuracy',
    metricValue: '94.8%',
    metricTrend: 'up'
  },
  {
    id: 'supply',
    name: 'Supply Optimization Agent',
    role: 'Incentives & Dispatch Control',
    status: 'warning',
    healthScore: 78,
    description: 'Detects active driver shortages, fleet idling, and high-turnover hubs to recommend shift adjustments.',
    metricName: 'Idle Drivers Ratio',
    metricValue: '18.2%',
    metricTrend: 'down'
  },
  {
    id: 'personalization',
    name: 'Personalization Agent',
    role: 'Targeted Offers & Engagement',
    status: 'active',
    healthScore: 89,
    description: 'Analyzes user behavioral footprints to offer contextual promos and personalized restaurant recommendations.',
    metricName: 'Conversion Rate',
    metricValue: '14.2%',
    metricTrend: 'up'
  },
  {
    id: 'fraud',
    name: 'Fraud & Policy Agent',
    role: 'Risk Mitigation & Shielding',
    status: 'monitoring',
    healthScore: 97,
    description: 'Detects voucher-abuse, GPS injection spoofing, driver-rider collusion, and credit chargeback patterns.',
    metricName: 'Fraud Incidents/10k',
    metricValue: '0.12',
    metricTrend: 'down'
  },
  {
    id: 'experimentation',
    name: 'Experimentation Agent',
    role: 'Auto-A/B Design & Guardrails',
    status: 'active',
    healthScore: 91,
    description: 'Automates sample sizing, controls selection, and guardrail validation for pricing and search model tests.',
    metricName: 'Active A/B Tests',
    metricValue: '14 Live',
    metricTrend: 'stable'
  }
];

export const INITIAL_RECOMMENDATIONS: Recommendation[] = [
  {
    id: 'rec-1',
    title: 'Increase Driver Incentives in Downtown Core by 12%',
    category: 'supply',
    description: 'Severe supply deficits detected in Downtown. Real-time active ride requests outpace online drivers by 32% due to the Oracle Park evening baseball game concluding.',
    priority: 'critical',
    businessImpact: 'Reduce average ETA from 9.4 mins to 4.5 mins; recapture an estimated 420 cancelled bookings.',
    confidence: 94,
    expectedRevenueImpact: '+$14,200 (tonight)',
    evidence: [
      'Demand peak: 180 requests/min',
      'Available supply: 122 drivers',
      'Average ride cancellation rate spiked to 14.8% over the past 20 minutes.',
      'Previous similar event yield: +15% supply conversion at 1.2x incentive modifier.'
    ],
    status: 'pending',
    date: 'June 27, 2026'
  },
  {
    id: 'rec-2',
    title: 'Apply 1.4x Surge Multiplier in Financial District',
    category: 'pricing',
    description: 'Incoming storm forecast (80% heavy rain starting in 30 mins) will trigger massive ride requests. Pre-emptive surge pricing will suppress non-essential demand and attract transit-bound supply.',
    priority: 'high',
    businessImpact: 'Keep fulfillment rates above 90% and prevent structural supply gridlock during rush hour.',
    confidence: 91,
    expectedRevenueImpact: '+$28,500',
    evidence: [
      'Radar data: Storm cell arriving at 17:15 PST',
      'Financial District PM rush hour starting load: 240 active trips',
      'Expected demand spike: +160% over historical baseline.'
    ],
    status: 'pending',
    date: 'June 27, 2026'
  },
  {
    id: 'rec-3',
    title: 'De-prioritize High-Cancellation Restaurants in Ranking',
    category: 'ranking',
    description: 'Marketplace health is suffering from several downtown food partners accepting orders but cancelling after 10+ minutes due to kitchen backlogs.',
    priority: 'medium',
    businessImpact: 'Improve marketplace NPS by 4 points and eliminate useless delivery courier travel time.',
    confidence: 88,
    expectedRevenueImpact: '+$6,800 (reduced customer compensation)',
    evidence: [
      'Partner cancellation rate for "Gourmet Burgers Ltd" hit 18.4% today.',
      'Average delay before cancellation: 11.2 minutes.',
      'Decreases matching efficiency for 15+ couriers who are turned away.'
    ],
    status: 'pending',
    date: 'June 27, 2026'
  },
  {
    id: 'rec-4',
    title: 'Target "At-Risk Promo-Driven" cohort with $5 off Friday rush hour',
    category: 'personalization',
    description: 'We observe a 14% drop in weekly active sessions among our price-sensitive customer cohort. Localized targeted promotions during high-supply periods can win back transaction frequency.',
    priority: 'medium',
    businessImpact: 'Re-engage 4,500 at-risk customers with an estimated LTV lift of $120/customer over 90 days.',
    confidence: 85,
    expectedRevenueImpact: '+$18,900 net margin lift',
    evidence: [
      'Target cohort size: 32,400 customers.',
      'Cohort churn warning signal: inactive for >14 days.',
      'Historical discount redemption rate: 21.4%.'
    ],
    status: 'pending',
    date: 'June 27, 2026'
  },
  {
    id: 'rec-5',
    title: 'Flag Driver Account "ID-9082" for instant verification check',
    category: 'fraud',
    description: 'Unusual telemetry signals detected. Driver account logged trips matching 100% of GPS coordinates of a simulated ride generator app over multiple sequential trips.',
    priority: 'high',
    businessImpact: 'Halt ongoing promo payout exploitation of up to $1,400/day.',
    confidence: 97,
    expectedRevenueImpact: '+$1,400 (fraud loss avoided)',
    evidence: [
      'Zero variance in speed vectors across 3 rides (perfectly straight lines at exactly 35.0 km/h).',
      'Co-occurrence of rider and driver GPS coordinate feeds from same IP address.',
      'Telemetry bypass score: 99.8% outlier confidence.'
    ],
    status: 'pending',
    date: 'June 27, 2026'
  }
];

export const INITIAL_ZONES: ZoneData[] = [
  {
    id: 'zone-1',
    name: 'Downtown Core',
    demandIntensity: 96,
    supplyDensity: 72,
    currentSurge: 1.15,
    recommendedSurge: 1.35,
    cancellations: 8.2,
    driversCount: 450,
    activeOrders: 680,
    alerts: ['Oracle Park egress event active', 'Supply deficit: -120 drivers', 'Average ETA: 9.2 mins']
  },
  {
    id: 'zone-2',
    name: 'Financial District',
    demandIntensity: 82,
    supplyDensity: 88,
    currentSurge: 1.0,
    recommendedSurge: 1.25,
    cancellations: 3.1,
    driversCount: 620,
    activeOrders: 410,
    alerts: ['Incoming light rain', 'Corporate commuting surge detected']
  },
  {
    id: 'zone-3',
    name: 'SOMA / Tech Hub',
    demandIntensity: 78,
    supplyDensity: 74,
    currentSurge: 1.1,
    recommendedSurge: 1.1,
    cancellations: 4.5,
    driversCount: 380,
    activeOrders: 290,
    alerts: ['Balanced equilibrium']
  },
  {
    id: 'zone-4',
    name: 'Mission District',
    demandIntensity: 89,
    supplyDensity: 52,
    currentSurge: 1.2,
    recommendedSurge: 1.45,
    cancellations: 9.8,
    driversCount: 190,
    activeOrders: 340,
    alerts: ['Severe supply deficit: -150 drivers', 'ETA breach: 12.4 mins average']
  },
  {
    id: 'zone-5',
    name: 'Marina District',
    demandIntensity: 64,
    supplyDensity: 71,
    currentSurge: 1.0,
    recommendedSurge: 1.0,
    cancellations: 2.2,
    driversCount: 220,
    activeOrders: 110,
    alerts: []
  },
  {
    id: 'zone-6',
    name: 'Sunset District',
    demandIntensity: 45,
    supplyDensity: 58,
    currentSurge: 1.0,
    recommendedSurge: 1.0,
    cancellations: 1.9,
    driversCount: 150,
    activeOrders: 65,
    alerts: []
  },
  {
    id: 'zone-7',
    name: 'Richmond Sector',
    demandIntensity: 55,
    supplyDensity: 48,
    currentSurge: 1.0,
    recommendedSurge: 1.15,
    cancellations: 5.4,
    driversCount: 110,
    activeOrders: 95,
    alerts: ['Low courier availability', 'Order wait times increasing']
  },
  {
    id: 'zone-8',
    name: 'San Francisco Int Airport (SFO)',
    demandIntensity: 91,
    supplyDensity: 95,
    currentSurge: 1.3,
    recommendedSurge: 1.3,
    cancellations: 1.4,
    driversCount: 840,
    activeOrders: 720,
    alerts: ['High arrivals volume flight cluster']
  }
];

export const INITIAL_DEMAND_FORECAST: DemandForecastPoint[] = [
  { time: '08:00', actualDemand: 820, predictedDemand: 800, weatherImpact: 1.0, eventImpact: 1.0, surgePricing: 1.0 },
  { time: '09:00', actualDemand: 950, predictedDemand: 920, weatherImpact: 1.0, eventImpact: 1.0, surgePricing: 1.1 },
  { time: '10:00', actualDemand: 740, predictedDemand: 760, weatherImpact: 1.0, eventImpact: 1.0, surgePricing: 1.0 },
  { time: '11:00', actualDemand: 680, predictedDemand: 700, weatherImpact: 1.0, eventImpact: 1.0, surgePricing: 1.0 },
  { time: '12:00', actualDemand: 890, predictedDemand: 870, weatherImpact: 1.0, eventImpact: 1.05, surgePricing: 1.15 },
  { time: '13:00', actualDemand: 810, predictedDemand: 830, weatherImpact: 1.05, eventImpact: 1.0, surgePricing: 1.0 },
  { time: '14:00', actualDemand: 620, predictedDemand: 650, weatherImpact: 1.0, eventImpact: 1.0, surgePricing: 1.0 },
  { time: '15:00', actualDemand: 710, predictedDemand: 730, weatherImpact: 1.0, eventImpact: 1.0, surgePricing: 1.05 },
  { time: '16:00', actualDemand: 980, predictedDemand: 990, weatherImpact: 1.0, eventImpact: 1.1, surgePricing: 1.2 },
  { time: '17:00', actualDemand: 1240, predictedDemand: 1200, weatherImpact: 1.1, eventImpact: 1.2, surgePricing: 1.35 },
  { time: '18:00', predictedDemand: 1450, weatherImpact: 1.25, eventImpact: 1.3, surgePricing: 1.5 },
  { time: '19:00', predictedDemand: 1680, weatherImpact: 1.25, eventImpact: 1.4, surgePricing: 1.6 },
  { time: '20:00', predictedDemand: 1390, weatherImpact: 1.15, eventImpact: 1.3, surgePricing: 1.4 },
  { time: '21:00', predictedDemand: 1100, weatherImpact: 1.1, eventImpact: 1.1, surgePricing: 1.25 },
  { time: '22:00', predictedDemand: 980, weatherImpact: 1.0, eventImpact: 1.05, surgePricing: 1.15 },
  { time: '23:00', predictedDemand: 850, weatherImpact: 1.0, eventImpact: 1.0, surgePricing: 1.05 },
  { time: '00:00', predictedDemand: 620, weatherImpact: 1.0, eventImpact: 1.0, surgePricing: 1.0 },
  { time: '01:00', predictedDemand: 410, weatherImpact: 1.0, eventImpact: 1.0, surgePricing: 1.0 },
  { time: '02:00', predictedDemand: 280, weatherImpact: 1.0, eventImpact: 1.0, surgePricing: 1.0 },
  { time: '03:00', predictedDemand: 180, weatherImpact: 1.0, eventImpact: 1.0, surgePricing: 1.0 },
  { time: '04:00', predictedDemand: 150, weatherImpact: 1.0, eventImpact: 1.0, surgePricing: 1.0 },
  { time: '05:00', predictedDemand: 260, weatherImpact: 1.0, eventImpact: 1.0, surgePricing: 1.0 },
  { time: '06:00', predictedDemand: 490, weatherImpact: 1.0, eventImpact: 1.0, surgePricing: 1.0 },
  { time: '07:00', predictedDemand: 720, weatherImpact: 1.0, eventImpact: 1.0, surgePricing: 1.0 }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Sarah Jenkins',
    segment: 'Power User',
    ltv: 4210,
    repeatPurchases: 112,
    cancellationRate: 0.8,
    nps: 10,
    opportunities: [
      'Offer corporate loyalty multiplier',
      'Recommend premium vehicle tier upgrades during evening commute',
      'Target with specialized curated restaurant lists based on high-affinity sushi orders'
    ]
  },
  {
    id: 'cust-2',
    name: 'Marcus Vance',
    segment: 'At-Risk',
    ltv: 1480,
    repeatPurchases: 32,
    cancellationRate: 14.5,
    nps: 4,
    opportunities: [
      'Trigger 15% recovery promotion',
      'Automatically resolve cancellation fee disputes in client favor',
      'Improve route-matching preference to guarantee <5 min ETAs on SOMA trips'
    ]
  },
  {
    id: 'cust-3',
    name: 'Emily Chen',
    segment: 'Promo Driven',
    ltv: 850,
    repeatPurchases: 22,
    cancellationRate: 2.1,
    nps: 8,
    opportunities: [
      'Offer lunch bundle subscription to stabilize off-peak order volume',
      'Incentivize with mid-week discount streaks',
      'Cross-sell lower-tier delivery options'
    ]
  },
  {
    id: 'cust-4',
    name: 'David Kowalski',
    segment: 'Occasional',
    ltv: 490,
    repeatPurchases: 9,
    cancellationRate: 5.2,
    nps: 7,
    opportunities: [
      'Target with airport holiday-rush shuttle notifications',
      'Nudge during heavy rainfall events with dynamic notifications',
      'Introduce invite-a-friend promotion'
    ]
  },
  {
    id: 'cust-5',
    name: 'Elena Rostova',
    segment: 'New',
    ltv: 120,
    repeatPurchases: 2,
    cancellationRate: 0.0,
    nps: 9,
    opportunities: [
      'Deploy 30-day free delivery onboarding sequence',
      'Recommend popular top-rated community local venues',
      'Automate follow-up feedback check with micro-credit'
    ]
  }
];

export const INITIAL_DRIVERS: Driver[] = [
  {
    id: 'drv-1',
    name: 'Jose Ramirez',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    earnings: 2450,
    acceptanceRate: 94.5,
    completionRate: 98.2,
    idleTimeMin: 4.5,
    churnRisk: 'low',
    status: 'online',
    recommendations: [
      'Send Mission District shift bonuses during late hours',
      'Qualify for Gold Tier premier matching priority'
    ]
  },
  {
    id: 'drv-2',
    name: 'Amina Al-Jamil',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    earnings: 1890,
    acceptanceRate: 72.0,
    completionRate: 94.0,
    idleTimeMin: 18.1,
    churnRisk: 'high',
    status: 'online',
    recommendations: [
      'Recommend downtown airport staging lots to decrease idle times',
      'Nudge with personalized $100 "Complete 20 trips" weekend guarantee'
    ]
  },
  {
    id: 'drv-3',
    name: 'Robert Henderson',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
    earnings: 3100,
    acceptanceRate: 91.0,
    completionRate: 99.1,
    idleTimeMin: 3.2,
    churnRisk: 'low',
    status: 'busy',
    recommendations: [
      'Incentivize with Electric Vehicle (EV) public fast-charger discounts',
      'Promote as top-rated trainer for new onboarding cohorts'
    ]
  },
  {
    id: 'drv-4',
    name: 'Michael Chang',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    earnings: 1120,
    acceptanceRate: 58.5,
    completionRate: 88.0,
    idleTimeMin: 22.4,
    churnRisk: 'critical',
    status: 'offline',
    recommendations: [
      'Deploy customer support outreach to discuss high cancel rates',
      'Provide direct subsidy compensation for low earnings in SOMA zone'
    ]
  },
  {
    id: 'drv-5',
    name: 'Sofia Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    earnings: 2150,
    acceptanceRate: 88.0,
    completionRate: 96.5,
    idleTimeMin: 8.4,
    churnRisk: 'medium',
    status: 'online',
    recommendations: [
      'Recommend shift positioning on morning commute routes',
      'Offer targeted surcharge fuel discounts'
    ]
  }
];

export const INITIAL_EXPERIMENTS: Experiment[] = [
  {
    id: 'exp-1',
    name: 'Dynamic ETA Buffer Smoothing v2',
    hypothesis: 'Adding a dynamic 2-minute buffer during rain events will reduce customer cancellations by aligning real ETA with displayed expectations.',
    expectedLift: '-15% customer cancellations, +3% marketplace NPS',
    primaryMetric: 'Ride Completion Rate',
    guardrailMetrics: ['Driver Acceptance Rate', 'Customer Session Length'],
    sampleSize: '45,000 customers',
    rolloutStrategy: '50/50 randomized split testing in SOMA and Downtown sectors for 14 days.',
    status: 'running'
  },
  {
    id: 'exp-2',
    name: 'Dynamic Surge Peak Caps (Oracle Park)',
    hypothesis: 'Limiting surge caps to 2.2x but boosting baseline driver hourly guarantees to $42/hr during baseball games will attract larger driver cohorts and improve overall GMV volume.',
    expectedLift: '+12% Completed Rides, +8% Gross GMV',
    primaryMetric: 'Marketplace Volume (Completed Rides)',
    guardrailMetrics: ['Gross Margin Percentage', 'Driver Churn Rate'],
    sampleSize: '12,000 driver-hours',
    rolloutStrategy: 'Geofenced randomized multi-cluster experiment across sports arenas.',
    status: 'completed',
    results: {
      metricChange: '+14.1% Rides, +9.6% GMV',
      pValue: 0.012,
      conclusion: 'Hypothesis validated. Higher driver retention from hourly floors easily offsets margin lost from capping astronomical surge peaks.'
    }
  },
  {
    id: 'exp-3',
    name: 'Personalized Loyalty Streak Rewards',
    hypothesis: 'Offering high-propensity lunch-order customers a "3 orders in 1 week gets $10 back" streak reward will boost average customer frequency from 1.4 to 1.9 orders/week.',
    expectedLift: '+35% order frequency, +18% revenue lift in promo segment',
    primaryMetric: 'Weekly Order Count',
    guardrailMetrics: ['Voucher Cost/GMV Ratio', 'Average Order Value'],
    sampleSize: '25,000 users',
    rolloutStrategy: 'User-id randomized cohort A/B split.',
    status: 'draft'
  }
];
