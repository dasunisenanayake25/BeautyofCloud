import React, { useState, useEffect } from 'react';
import { NavbarHUD } from './components/NavbarHUD';
import { GeospatialMap } from './components/GeospatialMap';
import { TelemetryDrawer } from './components/TelemetryDrawer';
import { ActionPanel } from './components/ActionPanel';
import { AuditTrailPage } from './pages/AuditTrailPage';
import { CloudWatchPage } from './pages/CloudWatchPage';
import { 
  INITIAL_GEOHASH_CELLS, 
  TELEMETRY_METRICS, 
  GeohashCell, 
  TelemetryMetric 
} from './data/mockData';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'situation' | 'audit' | 'cloudwatch'>('situation');
  const [cells, setCells] = useState<GeohashCell[]>(INITIAL_GEOHASH_CELLS);
  const [selectedCell, setSelectedCell] = useState<GeohashCell>(INITIAL_GEOHASH_CELLS[0]); // default tc1x2e
  const [metrics, setMetrics] = useState<TelemetryMetric[]>(TELEMETRY_METRICS);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [isDispatching, setIsDispatching] = useState(false);
  const [alertDispatched, setAlertDispatched] = useState(false);
  const [ingestionLag, setIngestionLag] = useState(112);

  // Live simulation jitter to make HUD feel alive
  useEffect(() => {
    const lagInterval = setInterval(() => {
      setIngestionLag(Math.floor(105 + Math.random() * 18));
    }, 3000);

    return () => clearInterval(lagInterval);
  }, []);

  const handleDispatchAlert = (cell: GeohashCell) => {
    setIsDispatching(true);
    setTimeout(() => {
      setIsDispatching(false);
      setAlertDispatched(true);
    }, 1800);
  };

  const handleCellSelect = (cell: GeohashCell) => {
    setSelectedCell(cell);
    setAlertDispatched(false);
  };

  return (
    <div className="relative w-screen h-screen bg-[#070A11] text-slate-100 flex flex-col overflow-hidden select-none">
      
      {/* 1. Top Glassmorphic Navigation HUD */}
      <NavbarHUD 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        ingestionLagMs={ingestionLag}
      />

      {/* Main Viewport */}
      <main className="relative flex-1 w-full h-[calc(100vh-60px)] overflow-hidden">
        {activeTab === 'situation' && (
          <div className="relative w-full h-full">
            {/* 2. Central Command Stage: Full-Screen Geospatial Canvas */}
            <GeospatialMap 
              cells={cells}
              selectedCell={selectedCell}
              onSelectCell={handleCellSelect}
            />

            {/* 3. Left Floating Telemetry Drawer */}
            <TelemetryDrawer 
              metrics={metrics}
              isOpen={isDrawerOpen}
              onToggle={() => setIsDrawerOpen(!isDrawerOpen)}
            />

            {/* 4. Right Floating Action Panel (Lockdown & Fan-Out Broadcast) */}
            <ActionPanel 
              selectedCell={selectedCell}
              onDispatchAlert={handleDispatchAlert}
              isDispatching={isDispatching}
              alertDispatched={alertDispatched}
            />
          </div>
        )}

        {activeTab === 'audit' && (
          <AuditTrailPage />
        )}

        {activeTab === 'cloudwatch' && (
          <CloudWatchPage />
        )}
      </main>

    </div>
  );
};

export default App;
