# Member 4: Agency Dashboard & Observability
**Team:** Neural Ninja  
**Author:** Dasuni Tharakie (Member 4)  
**Project:** Disaster Early Warning System (DEWS) — AWS Architecture  

---

## 📁 Directory Structure
```text
agency-dashboard/
├── src/
│   ├── components/
│   │   ├── NavbarHUD.tsx         # Tactical Situation Room Top Glassmorphic Navigation HUD
│   │   ├── GeospatialMap.tsx     # Full-screen 1km Geohash Dark Canvas Map with radar ripple
│   │   ├── TelemetryDrawer.tsx   # Live Kinesis & system telemetry with mini sparklines
│   │   └── ActionPanel.tsx       # Zone inspection, risk score gauge & SNS fan-out trigger
│   ├── pages/
│   │   ├── AuditTrailPage.tsx    # Step Functions corroboration & immutable decision ledger
│   │   └── CloudWatchPage.tsx    # Pipeline latency, X-Ray critical path traces, service SLAs
│   ├── data/
│   │   └── mockData.ts           # Geohash cell models, real-time river gauges & sensor data
│   ├── App.tsx                   # Main React Situation Room container
│   ├── index.css                 # Cyber-grid styling, tactical HUD typography & scanlines
│   └── main.tsx                  # React 18 DOM mount
├── cognito-auth/
│   ├── cognito-user-pool.json    # Cognito User Pool config with custom attributes & MFA
│   └── rbac-policies.json        # RBAC roles (Level 4 Commander, Relief Coordinator, Observer)
├── observability/
│   ├── cloudwatch-dashboard.json # CloudWatch Dashboard JSON definition (Kinesis lag, SNS fail rate)
│   └── xray-sampling-rules.json  # AWS X-Ray critical-path tracing configuration
├── package.json                  # Dependencies: React, Tailwind CSS, Lucide-react, Framer Motion
├── tailwind.config.js            # Tactical color palette & radar keyframe animations
├── tsconfig.json                 # TypeScript compiler setup
└── vite.config.ts                # Vite dev/build configuration
```

---

## 🚀 Running the Dashboard Locally

```bash
cd agency-dashboard
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the National Emergency Situation Room HUD.
