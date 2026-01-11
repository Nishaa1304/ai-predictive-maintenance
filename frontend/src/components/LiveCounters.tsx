'use client';

interface LiveCountersProps {
  counters: {
    vehiclesMonitored: number;
    activeAlerts: number;
    callsInProgress: number;
    todaysPredictions: number;
  };
}

export default function LiveCounters({ counters }: LiveCountersProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-black border-2 border-blue-500/50 rounded-xl p-6 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
        <div className="text-blue-400 text-lg font-bold mb-3">Vehicles Monitored</div>
        <div className="text-6xl font-bold text-blue-400 counter-animate">{counters.vehiclesMonitored}</div>
        <div className="flex items-center gap-1 mt-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-base text-green-400 font-bold">Live</span>
        </div>
      </div>

      <div className="bg-black border-2 border-red-500/50 rounded-xl p-6 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300">
        <div className="text-red-400 text-lg font-bold mb-3">Active Alerts</div>
        <div className="text-6xl font-bold text-red-400 counter-animate">{counters.activeAlerts}</div>
        <div className="flex items-center gap-1 mt-3">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-base text-red-400 font-bold">Monitoring</span>
        </div>
      </div>

      <div className="bg-black border-2 border-purple-500/50 rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
        <div className="text-purple-400 text-lg font-bold mb-3">Calls In Progress</div>
        <div className="text-6xl font-bold text-purple-400 counter-animate">{counters.callsInProgress}</div>
        <div className="flex items-center gap-1 mt-3">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
          <span className="text-base text-purple-400 font-bold">Active</span>
        </div>
      </div>

      <div className="bg-black border-2 border-green-500/50 rounded-xl p-6 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300">
        <div className="text-green-400 text-lg font-bold mb-3">Today's Predictions</div>
        <div className="text-6xl font-bold text-green-400 counter-animate">{counters.todaysPredictions}</div>
        <div className="flex items-center gap-1 mt-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-base text-green-400 font-bold">Real-time</span>
        </div>
      </div>
    </div>
  );
}
