# Frontend Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Open Browser
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Home Dashboard
│   │   ├── layout.tsx          # Root layout with sidebar/header
│   │   ├── vehicles/[id]/      # Vehicle detail page
│   │   ├── scheduling/         # Scheduling interface
│   │   ├── voice-agent/        # Voice agent transcripts
│   │   ├── manufacturer/       # RCA/CAPA dashboard
│   │   └── security/           # UEBA security console
│   │
│   └── components/
│       ├── layout/             # Sidebar, Header
│       └── dashboard/          # Dashboard components
│
├── public/                     # Static assets
├── package.json
├── tailwind.config.js
└── next.config.js
```

## 🎨 Completed Pages

### ✅ 1. Home Dashboard (`/`)
- KPI cards (Total Vehicles, Predictions, Alerts, Agents)
- Vehicle health cards (grid layout)
- Live alerts panel
- AI agent activity monitor
- UEBA security indicator

### ✅ 2. Vehicle Detail Page (`/vehicles/[id]`)
- Vehicle header with health score
- AI recommendation box
- Voice call trigger & transcript
- Live sensor readings (charts)
- Predicted failures
- DTC codes
- Maintenance history

### ⏳ 3. Scheduling Interface (`/scheduling`)
- Calendar view with time slots
- Service center selection
- AI-recommended slots
- Appointment booking

### ⏳ 4. Voice Agent Page (`/voice-agent`)
- Call transcripts
- Call history
- Success/failure metrics

### ⏳ 5. Manufacturing Dashboard (`/manufacturer`)
- RCA reports
- Recurring failure analysis
- Batch heatmaps
- CAPA recommendations

### ⏳ 6. UEBA Security Console (`/security`)
- Agent behavior timeline
- Anomaly alerts
- Audit logs
- Threat blocking

## 🎨 Design System

### Colors
- **Primary**: Blue (#3b82f6)
- **Success**: Green (#22c55e)
- **Warning**: Yellow (#eab308)
- **Danger**: Red (#ef4444)

### Components
- Cards with hover effects
- Status badges (success, warning, danger)
- Responsive grid layouts
- Clean typography

## 📦 Dependencies

- **Next.js 14**: React framework
- **React 18**: UI library
- **TailwindCSS**: Styling
- **Recharts**: Data visualization
- **Lucide React**: Icons
- **TypeScript**: Type safety

## 🔧 Configuration

### Environment Variables
Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🚀 Build for Production

```bash
npm run build
npm start
```

## 📝 Notes

- TypeScript errors are expected before running `npm install`
- The app uses Next.js 14 App Router
- All components are client-side rendered (`'use client'`)
- Mock data is used for demo purposes

## 🎯 Next Steps

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Complete remaining pages (scheduling, voice-agent, manufacturer, security)
4. Connect to backend API
5. Add real-time WebSocket updates
