export interface GeohashCell {
  id: string; // e.g. 'tc1x2e'
  name: string;
  lat: number;
  lng: number;
  status: 'safe' | 'warning' | 'critical';
  riskScore: number;
  waterLevelPct: number;
  rainfallRateMmH: number;
  estimatedCitizens: number;
  sensorsVerified: string;
  citizenReportsCount: number;
  lastUpdated: string;
}

export const INITIAL_GEOHASH_CELLS: GeohashCell[] = [
  {
    id: 'tc1x2e',
    name: 'Nilwala River Basin (Zone A)',
    lat: 6.042,
    lng: 80.536,
    status: 'critical',
    riskScore: 92,
    waterLevelPct: 94,
    rainfallRateMmH: 140,
    estimatedCitizens: 8420,
    sensorsVerified: '2 of 2 sensors verified',
    citizenReportsCount: 14,
    lastUpdated: '12s ago'
  },
  {
    id: 'tc1x2d',
    name: 'Akuressa Floodplain Lower',
    lat: 6.098,
    lng: 80.478,
    status: 'warning',
    riskScore: 68,
    waterLevelPct: 76,
    rainfallRateMmH: 82,
    estimatedCitizens: 4150,
    sensorsVerified: '2 of 2 sensors verified',
    citizenReportsCount: 7,
    lastUpdated: '24s ago'
  },
  {
    id: 'tc1x2f',
    name: 'Kamburupitiya Valley Slope',
    lat: 6.075,
    lng: 80.569,
    status: 'warning',
    riskScore: 64,
    waterLevelPct: 71,
    rainfallRateMmH: 78,
    estimatedCitizens: 3890,
    sensorsVerified: '1 of 2 sensors verified',
    citizenReportsCount: 5,
    lastUpdated: '40s ago'
  },
  {
    id: 'tc1x29',
    name: 'Matara Urban Coastal Delta',
    lat: 5.949,
    lng: 80.542,
    status: 'safe',
    riskScore: 28,
    waterLevelPct: 42,
    rainfallRateMmH: 22,
    estimatedCitizens: 12500,
    sensorsVerified: '3 of 3 sensors verified',
    citizenReportsCount: 1,
    lastUpdated: '1m ago'
  },
  {
    id: 'tc1x28',
    name: 'Mirissa Estuary Discharge',
    lat: 5.945,
    lng: 80.458,
    status: 'safe',
    riskScore: 22,
    waterLevelPct: 35,
    rainfallRateMmH: 18,
    estimatedCitizens: 5200,
    sensorsVerified: '2 of 2 sensors verified',
    citizenReportsCount: 0,
    lastUpdated: '2m ago'
  },
  {
    id: 'tc1x2c',
    name: 'Hakmana Highland Ridge',
    lat: 6.152,
    lng: 80.645,
    status: 'safe',
    riskScore: 19,
    waterLevelPct: 31,
    rainfallRateMmH: 14,
    estimatedCitizens: 2900,
    sensorsVerified: '2 of 2 sensors verified',
    citizenReportsCount: 0,
    lastUpdated: '3m ago'
  },
  {
    id: 'tc1x2b',
    name: 'Deniyaya Upper Catchment',
    lat: 6.342,
    lng: 80.561,
    status: 'safe',
    riskScore: 34,
    waterLevelPct: 49,
    rainfallRateMmH: 38,
    estimatedCitizens: 1840,
    sensorsVerified: '2 of 2 sensors verified',
    citizenReportsCount: 2,
    lastUpdated: '45s ago'
  }
];

export interface TelemetryMetric {
  title: string;
  value: string;
  subtext: string;
  status: 'critical' | 'warning' | 'normal' | 'info';
  sparkline: number[];
}

export const TELEMETRY_METRICS: TelemetryMetric[] = [
  {
    title: 'Active Critical Cells',
    value: '01',
    subtext: 'Cell tc1x2e triggering alarm',
    status: 'critical',
    sparkline: [0, 0, 0, 1, 1, 1, 1]
  },
  {
    title: 'Citizens in Hazard Zone',
    value: '8,420',
    subtext: 'Nilwala High-Risk Delta corridor',
    status: 'warning',
    sparkline: [2100, 4300, 6200, 7800, 8100, 8420]
  },
  {
    title: 'Ingestion Stream Rate',
    value: '12.4k /s',
    subtext: 'Amazon Kinesis Healthy (Shard 1-8)',
    status: 'normal',
    sparkline: [9.2, 10.1, 11.4, 12.0, 12.4, 12.4]
  },
  {
    title: 'SMS Gateway Dispatch Readiness',
    value: '99.8%',
    subtext: 'Pinpoint + Dialog/Mobitel Carrier',
    status: 'normal',
    sparkline: [99.9, 99.7, 99.8, 99.9, 99.8, 99.8]
  }
];

export interface AuditLog {
  id: string;
  timestamp: string;
  type: 'CORROBORATION' | 'THRESHOLD_EXCEEDED' | 'INGESTION_BURST' | 'DISPATCH' | 'FAILOVER_TEST';
  message: string;
  source: string;
  severity: 'critical' | 'warning' | 'info';
}

export const AUDIT_LOGS: AuditLog[] = [
  {
    id: 'AUD-8821',
    timestamp: '13:43:10 UTC',
    type: 'THRESHOLD_EXCEEDED',
    message: 'Geohash tc1x2e river gauge crossed 90% threshold (Current: 94.2%)',
    source: 'AWS Kinesis Data Analytics',
    severity: 'critical'
  },
  {
    id: 'AUD-8820',
    timestamp: '13:42:58 UTC',
    type: 'CORROBORATION',
    message: 'Step Functions state machine corroboration: 2 IoT river sensors verified + 14 citizen reports',
    source: 'AWS Step Functions (arn:aws:states:ap-southeast-1:risk-decision)',
    severity: 'warning'
  },
  {
    id: 'AUD-8818',
    timestamp: '13:41:20 UTC',
    type: 'INGESTION_BURST',
    message: 'Ingestion stream traffic spiked 3.4x over baseline (12,410 records/sec). Shard auto-scaled.',
    source: 'Amazon Kinesis Data Streams',
    severity: 'info'
  },
  {
    id: 'AUD-8815',
    timestamp: '13:38:00 UTC',
    type: 'FAILOVER_TEST',
    message: 'Multi-Region Health Check passed: DynamoDB Global Tables replication latency 48ms',
    source: 'Amazon Route 53 / DynamoDB',
    severity: 'info'
  }
];
