import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  Droplets, 
  CloudRain, 
  Activity, 
  MapPin, 
  Compass, 
  Maximize2, 
  Layers, 
  ZoomIn, 
  ZoomOut,
  Radio,
  Crosshair,
  ShieldCheck,
  Info
} from 'lucide-react';
import { GeohashCell } from '../data/mockData';

interface GeospatialMapProps {
  cells: GeohashCell[];
  selectedCell: GeohashCell;
  onSelectCell: (cell: GeohashCell) => void;
}

export const GeospatialMap: React.FC<GeospatialMapProps> = ({
  cells,
  selectedCell,
  onSelectCell
}) => {
  const [hoveredCell, setHoveredCell] = useState<GeohashCell | null>(null);
  const [mapZoom, setMapZoom] = useState(1);
  const [activeLayer, setActiveLayer] = useState<'all' | 'hydrology' | 'geohash'>('all');

  // Convert lat/lng to visual SVG coordinate projection centered on Southern Basin
  const minLat = 5.90, maxLat = 6.40;
  const minLng = 80.40, maxLng = 80.70;

  const projectX = (lng: number) => {
    return ((lng - minLng) / (maxLng - minLng)) * 800 + 100;
  };

  const projectY = (lat: number) => {
    return (1 - (lat - minLat) / (maxLat - minLat)) * 500 + 50;
  };

  return (
    <div className="relative w-full h-full bg-[#070A11] overflow-hidden cyber-grid flex items-center justify-center">
      
      {/* Top Map Layer Bar */}
      <div className="absolute top-4 left-6 z-20 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono shadow-xl">
        <Compass className="w-3.5 h-3.5 text-cyan-400" />
        <span className="text-slate-300 font-semibold">BASIN: Nilwala & Southern Watershed</span>
        <span className="text-slate-600">|</span>
        <span className="text-slate-400">Projection: EPSG:4326 / 1km Geohash</span>
        
        <div className="flex items-center gap-1 ml-4 pl-3 border-l border-slate-800">
          <button 
            onClick={() => setActiveLayer('all')}
            className={`px-2 py-0.5 rounded text-[11px] ${activeLayer === 'all' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400'}`}
          >
            Composite
          </button>
          <button 
            onClick={() => setActiveLayer('geohash')}
            className={`px-2 py-0.5 rounded text-[11px] ${activeLayer === 'geohash' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400'}`}
          >
            Geohashes (1km)
          </button>
        </div>
      </div>

      {/* Map Tools Controls */}
      <div className="absolute top-4 right-6 z-20 flex flex-col gap-2">
        <div className="flex items-center bg-slate-900/80 backdrop-blur-md p-1 rounded-lg border border-slate-800 shadow-xl">
          <button 
            onClick={() => setMapZoom(prev => Math.min(prev + 0.15, 1.6))}
            className="p-1.5 hover:bg-slate-800 text-slate-300 rounded hover:text-cyan-400 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setMapZoom(prev => Math.max(prev - 0.15, 0.8))}
            className="p-1.5 hover:bg-slate-800 text-slate-300 rounded hover:text-cyan-400 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setMapZoom(1)}
            className="p-1.5 hover:bg-slate-800 text-slate-300 rounded hover:text-cyan-400 transition-colors"
            title="Reset View"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-6 left-6 z-20 flex items-center gap-4 bg-slate-900/80 backdrop-blur-md px-3.5 py-2 rounded-lg border border-slate-800 text-xs font-mono shadow-xl">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm border border-emerald-400/80 bg-emerald-500/20" />
          <span className="text-emerald-400 font-semibold">Safe (4 cells)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm border border-amber-400/80 bg-amber-500/20" />
          <span className="text-amber-400 font-semibold">Warning (2 cells)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm border border-red-500 bg-red-500/40 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
          <span className="text-red-400 font-bold">Critical Hazard (tc1x2e)</span>
        </div>
      </div>

      {/* Scaled Tactical Map Canvas (SVG Vector + Interactive Grids) */}
      <motion.div 
        className="w-full h-full flex items-center justify-center origin-center cursor-grab active:cursor-grabbing"
        animate={{ scale: mapZoom }}
        transition={{ type: 'spring', damping: 20 }}
      >
        <svg 
          viewBox="0 0 1000 620" 
          className="w-full h-full max-w-[1200px] select-none"
        >
          <defs>
            {/* Critical Radar Pulse Filter */}
            <radialGradient id="criticalGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#dc2626" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#991b1b" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
            </linearGradient>

            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.5" />
            </pattern>
          </defs>

          {/* Background subgrid */}
          <rect width="1000" height="620" fill="url(#smallGrid)" />

          {/* Topographic elevation contours (tactical lines) */}
          <g stroke="rgba(51, 65, 85, 0.35)" strokeWidth="1" fill="none" strokeDasharray="3 3">
            <ellipse cx="500" cy="300" rx="420" ry="240" />
            <ellipse cx="520" cy="310" rx="340" ry="190" />
            <ellipse cx="510" cy="320" rx="260" ry="140" />
            <ellipse cx="490" cy="330" rx="160" ry="90" />
          </g>

          {/* River Basin Hydrological Veins (Nilwala River Network) */}
          <g fill="none">
            {/* Main river channel */}
            <path 
              d="M 520,70 Q 480,140 510,210 T 470,300 T 500,410 T 470,520 T 465,580" 
              stroke="url(#riverGradient)" 
              strokeWidth="6" 
              strokeLinecap="round"
              className="drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]"
            />
            {/* Tributaries */}
            <path 
              d="M 330,160 Q 400,200 480,240" 
              stroke="#0284c7" 
              strokeWidth="2.5" 
              strokeOpacity="0.6" 
            />
            <path 
              d="M 660,190 Q 580,250 500,280" 
              stroke="#0284c7" 
              strokeWidth="2.5" 
              strokeOpacity="0.6" 
            />
            <path 
              d="M 380,380 Q 430,370 470,410" 
              stroke="#0284c7" 
              strokeWidth="2.5" 
              strokeOpacity="0.6" 
            />
          </g>

          {/* Geohash Grid Cells */}
          {cells.map((cell) => {
            const cx = projectX(cell.lng);
            const cy = projectY(cell.lat);
            const isCritical = cell.status === 'critical';
            const isWarning = cell.status === 'warning';
            const isSelected = selectedCell.id === cell.id;

            // Colors based on status
            const strokeColor = isCritical 
              ? '#ef4444' 
              : isWarning 
              ? '#f59e0b' 
              : '#10b981';

            const fillColor = isCritical
              ? 'rgba(239, 68, 68, 0.25)'
              : isWarning
              ? 'rgba(245, 158, 11, 0.15)'
              : 'rgba(16, 185, 129, 0.08)';

            const cellSize = 80;

            return (
              <g 
                key={cell.id} 
                className="cursor-pointer transition-all duration-300"
                onClick={() => onSelectCell(cell)}
                onMouseEnter={() => setHoveredCell(cell)}
                onMouseLeave={() => setHoveredCell(null)}
              >
                {/* Critical Radar Pulse Effect for tc1x2e */}
                {isCritical && (
                  <g transform={`translate(${cx}, ${cy})`}>
                    <circle 
                      r="40" 
                      fill="none" 
                      stroke="#ef4444" 
                      strokeWidth="2" 
                      className="animate-radar-pulse" 
                    />
                    <circle 
                      r="65" 
                      fill="none" 
                      stroke="#ef4444" 
                      strokeWidth="1.5" 
                      opacity="0.6" 
                      className="animate-radar-pulse"
                      style={{ animationDelay: '0.8s' }} 
                    />
                    <circle 
                      r="95" 
                      fill="none" 
                      stroke="#ef4444" 
                      strokeWidth="1" 
                      opacity="0.3" 
                      className="animate-radar-pulse"
                      style={{ animationDelay: '1.6s' }} 
                    />
                    {/* Radial background glow */}
                    <circle r="60" fill="url(#criticalGlow)" />
                  </g>
                )}

                {/* Geohash 1km bounding box */}
                <rect 
                  x={cx - cellSize / 2} 
                  y={cy - cellSize / 2} 
                  width={cellSize} 
                  height={cellSize} 
                  rx="6"
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={isSelected ? '2.5' : isCritical ? '2' : '1.2'}
                  strokeDasharray={isWarning ? '4 2' : 'none'}
                  className={isSelected ? 'drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]' : ''}
                />

                {/* Cell Corner Crosshairs */}
                <path 
                  d={`
                    M ${cx - cellSize / 2} ${cy - cellSize / 2 + 10} L ${cx - cellSize / 2} ${cy - cellSize / 2} L ${cx - cellSize / 2 + 10} ${cy - cellSize / 2}
                    M ${cx + cellSize / 2 - 10} ${cy - cellSize / 2} L ${cx + cellSize / 2} ${cy - cellSize / 2} L ${cx + cellSize / 2} ${cy - cellSize / 2 + 10}
                    M ${cx + cellSize / 2} ${cy + cellSize / 2 - 10} L ${cx + cellSize / 2} ${cy + cellSize / 2} L ${cx + cellSize / 2 - 10} ${cy + cellSize / 2}
                    M ${cx - cellSize / 2 + 10} ${cy + cellSize / 2} L ${cx - cellSize / 2} ${cy + cellSize / 2} L ${cx - cellSize / 2} ${cy + cellSize / 2 - 10}
                  `} 
                  stroke={strokeColor} 
                  strokeWidth="1.2" 
                  fill="none" 
                  opacity="0.7"
                />

                {/* Geohash Identifier Label */}
                <text 
                  x={cx} 
                  y={cy - cellSize / 2 + 18} 
                  textAnchor="middle" 
                  fill={strokeColor} 
                  fontSize="10" 
                  fontFamily="JetBrains Mono" 
                  fontWeight="bold"
                  letterSpacing="1"
                >
                  {cell.id}
                </text>

                {/* Risk score pill badge */}
                <g transform={`translate(${cx}, ${cy + 5})`}>
                  <rect 
                    x="-18" 
                    y="-9" 
                    width="36" 
                    height="18" 
                    rx="4" 
                    fill="rgba(11, 17, 30, 0.85)" 
                    stroke={strokeColor} 
                    strokeWidth="0.8" 
                  />
                  <text 
                    x="0" 
                    y="4" 
                    textAnchor="middle" 
                    fill="#f1f5f9" 
                    fontSize="11" 
                    fontWeight="700" 
                    fontFamily="JetBrains Mono"
                  >
                    {cell.riskScore}
                  </text>
                </g>

                {/* Critical Center Beacon */}
                {isCritical && (
                  <circle 
                    cx={cx} 
                    cy={cy + 24} 
                    r="3.5" 
                    fill="#ef4444" 
                    className="animate-ping" 
                  />
                )}
              </g>
            );
          })}
        </svg>
      </motion.div>

      {/* Interactive River Gauge Popover on Cell Hover / Inspection */}
      <AnimatePresence>
        {hoveredCell && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-20 z-30 pointer-events-none bg-slate-950/90 backdrop-blur-xl border border-slate-700/80 rounded-xl p-4 shadow-[0_0_30px_rgba(0,0,0,0.8)] w-80 font-mono"
            style={{
              left: `${Math.min(Math.max(projectX(hoveredCell.lng) * 0.9, 120), 600)}px`
            }}
          >
            {/* Popover Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${hoveredCell.status === 'critical' ? 'bg-red-500 animate-pulse' : hoveredCell.status === 'warning' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                <span className="font-bold text-slate-100 text-sm">{hoveredCell.id}</span>
                <span className="text-[10px] text-slate-400 uppercase">1km Geohash</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded font-bold uppercase ${
                hoveredCell.status === 'critical' 
                  ? 'bg-red-500/20 text-red-400 border border-red-500/40' 
                  : hoveredCell.status === 'warning' 
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' 
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
              }`}>
                {hoveredCell.status}
              </span>
            </div>

            {/* Cell Basin Name */}
            <div className="text-xs text-slate-300 font-sans font-medium mt-2">
              {hoveredCell.name}
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 mt-3">
              {/* River Gauge Level */}
              <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                <div className="flex items-center gap-1.5 text-[11px] text-cyan-400 mb-1">
                  <Droplets className="w-3.5 h-3.5" />
                  <span>River Gauge</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className={`text-lg font-bold ${hoveredCell.waterLevelPct >= 90 ? 'text-red-400' : 'text-slate-100'}`}>
                    {hoveredCell.waterLevelPct}%
                  </span>
                  <span className="text-[10px] text-slate-500">of capacity</span>
                </div>
                {/* Level progress bar */}
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${hoveredCell.waterLevelPct >= 90 ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]' : hoveredCell.waterLevelPct >= 70 ? 'bg-amber-400' : 'bg-emerald-400'}`}
                    style={{ width: `${hoveredCell.waterLevelPct}%` }}
                  />
                </div>
              </div>

              {/* Live Rainfall Rate */}
              <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                <div className="flex items-center gap-1.5 text-[11px] text-blue-400 mb-1">
                  <CloudRain className="w-3.5 h-3.5" />
                  <span>Rainfall Rate</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className={`text-lg font-bold ${hoveredCell.rainfallRateMmH >= 100 ? 'text-red-400' : 'text-slate-100'}`}>
                    {hoveredCell.rainfallRateMmH}
                  </span>
                  <span className="text-[10px] text-slate-500">mm/h</span>
                </div>
                {/* Rain progress bar */}
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${hoveredCell.rainfallRateMmH >= 100 ? 'bg-red-500' : hoveredCell.rainfallRateMmH >= 60 ? 'bg-amber-400' : 'bg-blue-400'}`}
                    style={{ width: `${Math.min(hoveredCell.rainfallRateMmH / 1.5, 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Verification Tag */}
            <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                {hoveredCell.sensorsVerified}
              </span>
              <span>Updated {hoveredCell.lastUpdated}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
