import React from 'react';
import { motion } from 'framer-motion';
import { 
  AlertOctagon, 
  Users, 
  Zap, 
  Radio, 
  ChevronRight, 
  Flame, 
  Server,
  TrendingUp,
  Activity
} from 'lucide-react';
import { TelemetryMetric } from '../data/mockData';

interface TelemetryDrawerProps {
  metrics: TelemetryMetric[];
  isOpen: boolean;
  onToggle: () => void;
}

export const TelemetryDrawer: React.FC<TelemetryDrawerProps> = ({
  metrics,
  isOpen,
  onToggle
}) => {
  return (
    <aside
      className={`absolute top-16 left-6 z-20 w-80 transition-all duration-300 pointer-events-auto ${
        isOpen ? 'translate-x-0 opacity-100' : '-translate-x-[340px] opacity-0'
      }`}
    >
      <div className="bg-slate-900/75 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-4 shadow-[0_0_30px_rgba(0,0,0,0.6)] flex flex-col gap-3 font-mono">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="font-display text-xs uppercase tracking-wider text-slate-200 font-bold">
              Live AWS Telemetry
            </span>
          </div>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono font-medium">
            KINESIS PIPELINE
          </span>
        </div>

        {/* Telemetry Cards */}
        <div className="flex flex-col gap-2.5">
          {metrics.map((metric, idx) => {
            const isCritical = metric.status === 'critical';
            const isWarning = metric.status === 'warning';

            return (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
                className={`p-3 rounded-xl border transition-all ${
                  isCritical
                    ? 'bg-red-950/20 border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.15)] hover:border-red-400/60'
                    : isWarning
                    ? 'bg-amber-950/15 border-amber-500/30 hover:border-amber-400/50'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-cyan-500/30'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-slate-400 tracking-wide font-sans font-medium">
                    {metric.title}
                  </span>
                  
                  {isCritical ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-red-400 bg-red-500/20 border border-red-500/40 px-1.5 py-0.5 rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                      CRITICAL
                    </span>
                  ) : isWarning ? (
                    <span className="text-[10px] text-amber-400 bg-amber-500/20 border border-amber-500/40 px-1.5 py-0.5 rounded font-bold">
                      ELEVATED
                    </span>
                  ) : (
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                      HEALTHY
                    </span>
                  )}
                </div>

                <div className="flex items-baseline justify-between mt-1">
                  <div className={`text-2xl font-bold font-mono tracking-tight ${
                    isCritical ? 'text-red-400 text-shadow-red' : isWarning ? 'text-amber-300' : 'text-slate-100'
                  }`}>
                    {metric.value}
                  </div>

                  {/* Visual SVG Mini Sparkline */}
                  <div className="w-20 h-6 flex items-end">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30">
                      <polyline
                        fill="none"
                        stroke={isCritical ? '#ef4444' : isWarning ? '#f59e0b' : '#06b6d4'}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={metric.sparkline.map((val, i) => {
                          const min = Math.min(...metric.sparkline);
                          const max = Math.max(...metric.sparkline);
                          const range = max - min || 1;
                          const x = (i / (metric.sparkline.length - 1)) * 100;
                          const y = 30 - ((val - min) / range) * 25;
                          return `${x},${y}`;
                        }).join(' ')}
                      />
                    </svg>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400/90 font-mono mt-1.5 pt-1.5 border-t border-slate-800/60 truncate">
                  {metric.subtext}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Live Ingestion Pipeline Mini Footer */}
        <div className="mt-1 p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>AWS Step Functions</span>
          </div>
          <span className="text-emerald-400 font-semibold">Corroborating</span>
        </div>

      </div>
    </aside>
  );
};
