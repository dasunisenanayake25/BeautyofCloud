import React from 'react';
import { 
  FileText, 
  ShieldCheck, 
  AlertTriangle, 
  Activity, 
  Clock, 
  Layers, 
  Search, 
  Filter,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { AUDIT_LOGS, AuditLog } from '../data/mockData';

export const AuditTrailPage: React.FC = () => {
  return (
    <div className="w-full h-full p-6 overflow-y-auto cyber-grid font-mono">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 backdrop-blur-xl p-5 rounded-2xl border border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <FileText className="w-4 h-4" />
              <span>Immutable Ledger & Decision Trace</span>
            </div>
            <h1 className="text-xl font-bold text-slate-100 font-display mt-1">
              AWS Step Functions & DynamoDB Audit Trail
            </h1>
            <p className="text-xs text-slate-400 font-sans mt-0.5">
              Auditable record of every threshold crossing, multi-source sensor corroboration, and alert dispatch event.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Audit Integrity: Verified
            </span>
          </div>
        </div>

        {/* Audit Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400">Filter Event Type:</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-400 font-semibold cursor-pointer">All (4)</span>
            <span className="px-2 py-0.5 rounded hover:bg-slate-800 text-slate-400 cursor-pointer">Corroborations</span>
            <span className="px-2 py-0.5 rounded hover:bg-slate-800 text-slate-400 cursor-pointer">Dispatches</span>
          </div>

          <div className="text-slate-500 text-[11px]">
            Target Table: <span className="text-slate-300">dews-audit-log-global (ap-southeast-1)</span>
          </div>
        </div>

        {/* Audit Records Table */}
        <div className="bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 text-[11px] uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Event ID</th>
                  <th className="py-3.5 px-4 font-semibold">Timestamp</th>
                  <th className="py-3.5 px-4 font-semibold">Classification</th>
                  <th className="py-3.5 px-4 font-semibold">Event Description</th>
                  <th className="py-3.5 px-4 font-semibold">AWS Pipeline Origin</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {AUDIT_LOGS.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-cyan-300">
                      {log.id}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {log.timestamp}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.severity === 'critical'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                          : log.severity === 'warning'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                      }`}>
                        {log.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-200 font-sans max-w-md">
                      {log.message}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                      {log.source}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="text-emerald-400 font-semibold text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        AUDITED
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
