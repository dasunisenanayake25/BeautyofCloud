import React from 'react';
import { 
  Server, 
  Activity, 
  Cpu, 
  HardDrive, 
  Zap, 
  AlertTriangle, 
  CheckCircle,
  Radio,
  ArrowUpRight,
  TrendingDown
} from 'lucide-react';

export const CloudWatchPage: React.FC = () => {
  return (
    <div className="w-full h-full p-6 overflow-y-auto cyber-grid font-mono">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 backdrop-blur-xl p-5 rounded-2xl border border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <Server className="w-4 h-4" />
              <span>Amazon CloudWatch & X-Ray Observability</span>
            </div>
            <h1 className="text-xl font-bold text-slate-100 font-display mt-1">
              End-to-End Pipeline Telemetry & Latency Profiling
            </h1>
            <p className="text-xs text-slate-400 font-sans mt-0.5">
              Live service health, Kinesis pipeline lag, DynamoDB read/write capacity units, and X-Ray trace spans.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              CloudWatch Alarms: OK (0 In Alarm)
            </span>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 mb-1">Kinesis Ingestion Lag</div>
            <div className="text-2xl font-bold text-cyan-300">112 ms</div>
            <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> Within 500ms SLA
            </div>
          </div>

          <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 mb-1">DynamoDB Global Replication</div>
            <div className="text-2xl font-bold text-emerald-400">48 ms</div>
            <div className="text-[10px] text-slate-400 mt-1">ap-southeast-1 ➔ ap-south-1</div>
          </div>

          <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 mb-1">Lambda Invocation Concurrency</div>
            <div className="text-2xl font-bold text-slate-100">420 / 1,000</div>
            <div className="text-[10px] text-amber-400 mt-1">Burst ready (elastic scale)</div>
          </div>

          <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 mb-1">SMS Fan-Out Failure Rate</div>
            <div className="text-2xl font-bold text-emerald-400">0.02%</div>
            <div className="text-[10px] text-emerald-400 mt-1">Alarm threshold: &gt; 1.0%</div>
          </div>
        </div>

        {/* Synthetic X-Ray Trace Graph Preview */}
        <div className="bg-slate-900/70 backdrop-blur-xl p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="font-bold text-sm text-slate-200">
                AWS X-Ray Trace Latency Breakdown (Critical Path: Ingestion ➔ Fan-Out)
              </span>
            </div>
            <span className="text-xs text-slate-400 font-mono">Total Trace Time: 342ms</span>
          </div>

          {/* Trace Steps Bar */}
          <div className="space-y-3 font-sans text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span className="font-mono text-cyan-300">1. AWS IoT Core MQTT Ingest</span>
                <span className="font-mono text-slate-400">18 ms</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                <div className="bg-cyan-500 h-full rounded-full" style={{ width: '8%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span className="font-mono text-cyan-300">2. Amazon Kinesis Buffer Shard</span>
                <span className="font-mono text-slate-400">45 ms</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                <div className="bg-cyan-500 h-full rounded-full" style={{ width: '15%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span className="font-mono text-cyan-300">3. Kinesis Data Analytics (Geohash Risk Scorer)</span>
                <span className="font-mono text-slate-400">142 ms</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full rounded-full" style={{ width: '45%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span className="font-mono text-cyan-300">4. AWS Step Functions State Machine Corroboration</span>
                <span className="font-mono text-slate-400">92 ms</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full" style={{ width: '28%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span className="font-mono text-cyan-300">5. Amazon SNS Topic Fan-Out + Pinpoint Dispatch</span>
                <span className="font-mono text-slate-400">45 ms</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                <div className="bg-red-500 h-full rounded-full" style={{ width: '14%' }} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
