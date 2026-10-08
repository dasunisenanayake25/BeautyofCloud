import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Activity, 
  Clock, 
  Radio, 
  Wifi, 
  UserCheck, 
  Layers, 
  Eye, 
  Server,
  FileText
} from 'lucide-react';

interface NavbarHUDProps {
  activeTab: 'situation' | 'audit' | 'cloudwatch';
  onTabChange: (tab: 'situation' | 'audit' | 'cloudwatch') => void;
  ingestionLagMs: number;
}

export const NavbarHUD: React.FC<NavbarHUDProps> = ({ 
  activeTab, 
  onTabChange,
  ingestionLagMs 
}) => {
  const [utcTime, setUtcTime] = useState('');
  const [colomboTime, setColomboTime] = useState('');

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setUtcTime(
        now.toUTCString().slice(17, 25) + ' UTC'
      );
      setColomboTime(
        now.toLocaleTimeString('en-GB', { 
          timeZone: 'Asia/Colombo',
          hour12: false 
        }) + ' SLST'
      );
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative z-30 w-full bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/90 px-4 py-2.5 shadow-2xl">
      <div className="flex flex-col xl:flex-row items-center justify-between gap-3">
        
        {/* Brand & System Identifier */}
        <div className="flex items-center gap-3 w-full xl:w-auto justify-between xl:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-red-950/60 border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.35)]">
              <ShieldAlert className="w-5 h-5 text-red-500 animate-pulse" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold tracking-widest text-slate-100 text-sm">
                  NEURAL NINJA
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 font-semibold tracking-wider">
                  AWS DEWS
                </span>
              </div>
              <div className="text-[11px] font-mono text-slate-400 tracking-wider">
                National Situation Room HUD • v2.4-Production
              </div>
            </div>
          </div>

          {/* Navigation view switchers */}
          <div className="flex items-center bg-slate-950/70 p-1 rounded-lg border border-slate-800 text-xs font-mono ml-4">
            <button
              onClick={() => onTabChange('situation')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded transition-all ${
                activeTab === 'situation'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/40 shadow-[0_0_10px_rgba(239,68,68,0.2)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Situation HUD</span>
            </button>
            <button
              onClick={() => onTabChange('audit')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded transition-all ${
                activeTab === 'audit'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Audit Trail</span>
            </button>
            <button
              onClick={() => onTabChange('cloudwatch')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded transition-all ${
                activeTab === 'cloudwatch'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              <span>CloudWatch Telemetry</span>
            </button>
          </div>
        </div>

        {/* Status Indicators & Metadata */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs font-mono">
          
          {/* Multi-Region Active/Active Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.15)]">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
              <span>Multi-Region:</span>
              <span className="text-slate-200">ap-southeast-1 [ACTIVE]</span>
              <span className="text-emerald-500 font-bold">•</span>
              <span className="text-emerald-300">ap-south-1 [SYNCED]</span>
            </div>
          </div>

          {/* Ingestion Stream Lag Pulse */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-slate-950/70 border border-slate-800 text-slate-300">
            <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="text-[11px] text-slate-400">Stream Lag:</span>
            <span className="text-[11px] text-cyan-300 font-bold tracking-tight">
              {ingestionLagMs}ms
            </span>
          </div>

          {/* Dual Digital Clock (UTC & Colombo) */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-950/80 border border-slate-800 text-slate-200">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[11px] font-semibold text-slate-300">{colomboTime}</span>
            <span className="text-slate-600">|</span>
            <span className="text-[11px] text-slate-400">{utcTime}</span>
          </div>

          {/* Cognito Role Indicator */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-gradient-to-r from-slate-900 to-indigo-950/50 border border-indigo-500/40 text-indigo-300 shadow-[0_0_10px_rgba(99,102,241,0.15)]">
            <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
            <div className="flex items-center gap-1 text-[11px]">
              <span className="text-slate-400">Role:</span>
              <span className="font-semibold text-indigo-200">National Incident Commander</span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-mono">
                L4 Clearance
              </span>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};
