import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  Send, 
  Radio, 
  ShieldAlert, 
  CheckCircle2, 
  X, 
  Layers, 
  BellRing,
  Info,
  Clock,
  Check,
  Flame,
  Gauge
} from 'lucide-react';
import { GeohashCell } from '../data/mockData';

interface ActionPanelProps {
  selectedCell: GeohashCell;
  onDispatchAlert: (cell: GeohashCell) => void;
  isDispatching: boolean;
  alertDispatched: boolean;
}

export const ActionPanel: React.FC<ActionPanelProps> = ({
  selectedCell,
  onDispatchAlert,
  isDispatching,
  alertDispatched
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const isCritical = selectedCell.status === 'critical';

  return (
    <div className="absolute top-16 right-6 z-20 w-84 sm:w-96 font-mono pointer-events-auto">
      <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-[0_0_35px_rgba(0,0,0,0.7)] flex flex-col gap-4">
        
        {/* Panel Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <div className="text-[10px] text-cyan-400 uppercase tracking-widest font-semibold">
              Tactical Zone Lockdown
            </div>
            <div className="text-sm sm:text-base font-bold text-slate-100 flex items-center gap-1.5 mt-0.5">
              <span>Cell Inspection:</span>
              <span className="text-red-400 font-mono tracking-wider">{selectedCell.id}</span>
            </div>
          </div>

          <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase ${
            isCritical
              ? 'bg-red-500/20 text-red-400 border border-red-500/40 shadow-[0_0_10px_rgba(239,68,68,0.2)]'
              : selectedCell.status === 'warning'
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
              : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
          }`}>
            {selectedCell.status}
          </span>
        </div>

        {/* Location Subtext */}
        <div className="text-xs text-slate-300 font-sans font-medium -mt-1">
          {selectedCell.name}
        </div>

        {/* Risk Score Gauge Bar */}
        <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 flex items-center gap-1.5 font-sans">
              <Gauge className="w-3.5 h-3.5 text-cyan-400" />
              Dynamic Fused Risk Score
            </span>
            <div className="flex items-baseline gap-1">
              <span className={`text-2xl font-bold font-mono ${
                selectedCell.riskScore >= 80 ? 'text-red-400' : selectedCell.riskScore >= 50 ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {selectedCell.riskScore}
              </span>
              <span className="text-xs text-slate-500">/100</span>
            </div>
          </div>

          {/* Segmented Gradient Gauge */}
          <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                selectedCell.riskScore >= 80
                  ? 'bg-gradient-to-r from-amber-500 via-red-500 to-rose-600 shadow-[0_0_12px_rgba(239,68,68,0.8)]'
                  : selectedCell.riskScore >= 50
                  ? 'bg-gradient-to-r from-yellow-500 to-amber-500'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-400'
              }`}
              style={{ width: `${selectedCell.riskScore}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span>Threshold: 75.0</span>
            <span className={selectedCell.riskScore >= 75 ? 'text-red-400 font-semibold' : 'text-emerald-400'}>
              {selectedCell.riskScore >= 75 ? 'CRITICAL THRESHOLD BREACHED' : 'WITHIN NORMAL ENVELOPE'}
            </span>
          </div>
        </div>

        {/* AWS Step Functions Corroboration Engine Box */}
        <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-sans">Step Functions Corroboration:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              PASS (Dual-Source)
            </span>
          </div>

          <div className="text-xs text-slate-200 bg-slate-900/90 p-2.5 rounded-lg border border-slate-800/80 leading-relaxed font-sans">
            <span className="text-emerald-400 font-mono font-semibold">{selectedCell.sensorsVerified}</span>
            <span className="text-slate-400"> + </span>
            <span className="text-cyan-300 font-mono font-semibold">{selectedCell.citizenReportsCount} citizen reports</span>
            <span className="text-slate-400"> logged via mobile app within last 15 mins.</span>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60">
            <span>Target Population:</span>
            <span className="text-slate-200 font-semibold font-mono">
              ~{selectedCell.estimatedCitizens.toLocaleString()} residents
            </span>
          </div>
        </div>

        {/* Action Button: Dispatch Alert */}
        <div>
          {alertDispatched ? (
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/50 rounded-xl text-center flex flex-col items-center gap-1">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Check className="w-4 h-4" />
                Alert Broadcast Dispatched!
              </div>
              <div className="text-[11px] text-slate-300 font-sans">
                SNS Fan-Out to geohash topic <span className="font-mono text-cyan-300">sns-cell-{selectedCell.id}</span> initiated.
              </div>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowConfirmModal(true)}
              className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-xl flex items-center justify-center gap-2 ${
                isCritical
                  ? 'bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] border border-red-400/40'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
              }`}
            >
              <BellRing className="w-4 h-4 animate-bounce" />
              <span>Dispatch Geo-Targeted Alert</span>
            </motion.button>
          )}

          <div className="text-center mt-2 text-[10px] text-slate-500 font-sans">
            Delivers via Amazon Pinpoint Push + SMS Fallback + Cell Broadcast
          </div>
        </div>

      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-slate-900 border border-red-500/50 rounded-2xl p-6 max-w-md w-full shadow-[0_0_50px_rgba(239,68,68,0.3)] font-mono"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-red-400 font-bold text-base">
                  <ShieldAlert className="w-5 h-5 text-red-500 animate-pulse" />
                  CONFIRM EMERGENCY BROADCAST
                </div>
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-xs text-slate-300 font-sans">
                <p>
                  You are about to trigger an official Level-4 Public Safety Notification for:
                </p>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-[11px] space-y-1">
                  <div><strong className="text-slate-400">Target Cell:</strong> <span className="text-red-400 font-bold">{selectedCell.id}</span> ({selectedCell.name})</div>
                  <div><strong className="text-slate-400">Target Audience:</strong> ~{selectedCell.estimatedCitizens.toLocaleString()} Citizens</div>
                  <div><strong className="text-slate-400">Fan-out:</strong> Amazon SNS Geohash Topic + Cell Broadcast Towers</div>
                  <div><strong className="text-slate-400">Corroboration:</strong> Verified by 2 Sensors & 14 Citizen Reports</div>
                </div>
                <p className="text-amber-400 text-[11px]">
                  ⚠️ This action will immediately override offline feature phones in proximity via Cell Broadcast without requiring app installation.
                </p>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3 font-mono">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  disabled={isDispatching}
                  onClick={() => {
                    setShowConfirmModal(false);
                    onDispatchAlert(selectedCell);
                  }}
                  className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                >
                  {isDispatching ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Broadcasting...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Authorize & Broadcast Now
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
