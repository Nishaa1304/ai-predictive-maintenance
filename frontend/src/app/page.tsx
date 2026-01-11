'use client';

import { useState, useEffect } from 'react';
import { BarChart3, Zap, MessageSquare, Calendar, ThumbsUp, Factory } from 'lucide-react';
import AgentReportModal from '../components/AgentReportModal';
import AlertSystem from '../components/AlertSystem';
import Sidebar from '../components/Sidebar';
import UEBASecurityView from '../components/UEBASecurityView';
import VehicleOwnerDashboard from '../components/VehicleOwnerDashboard';

interface Vehicle {
  vehicle_id: string;
  model: string;
  year: number;
  owner: string;
  type: string;
  phone: string;
}

interface Agent {
  id: string;
  name: string;
  Icon: any;
  color: string;
  borderColor: string;
  glowColor: string;
  description: string;
}

export default function Home() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showVehicleSelector, setShowVehicleSelector] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showVoiceAssistant, setShowVoiceAssistant] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showOwnerDashboard, setShowOwnerDashboard] = useState(false);
  const [selectedOwnerVehicle, setSelectedOwnerVehicle] = useState('VEH001');

  const agents: Agent[] = [
    {
      id: 'data_analysis',
      name: 'Data Analysis Agent',
      Icon: BarChart3,
      color: 'from-orange-500 to-amber-500',
      borderColor: 'border-orange-500/50',
      glowColor: 'shadow-orange-500/50',
      description: 'Analyzes vehicle telemetry and sensor data in real-time'
    },
    {
      id: 'diagnosis',
      name: 'Diagnosis Agent',
      Icon: Zap,
      color: 'from-orange-500 to-red-500',
      borderColor: 'border-orange-500/50',
      glowColor: 'shadow-orange-500/50',
      description: 'Predicts component failures and estimates repair costs'
    },
    {
      id: 'customer_engagement',
      name: 'Customer Engagement Agent',
      Icon: MessageSquare,
      color: 'from-orange-500 to-yellow-500',
      borderColor: 'border-orange-500/50',
      glowColor: 'shadow-orange-500/50',
      description: 'Generates personalized customer call scripts with AI'
    },
    {
      id: 'scheduling',
      name: 'Scheduling Agent',
      Icon: Calendar,
      color: 'from-orange-500 to-pink-500',
      borderColor: 'border-orange-500/50',
      glowColor: 'shadow-orange-500/50',
      description: 'Manages service appointments and workshop allocation'
    },
    {
      id: 'feedback',
      name: 'Feedback Agent',
      Icon: ThumbsUp,
      color: 'from-orange-500 to-yellow-500',
      borderColor: 'border-orange-500/50',
      glowColor: 'shadow-orange-500/50',
      description: 'Collects and analyzes customer satisfaction data'
    },
    {
      id: 'manufacturing',
      name: 'Manufacturing Insights',
      Icon: Factory,
      color: 'from-orange-400 to-orange-600',
      borderColor: 'border-orange-500/50',
      glowColor: 'shadow-orange-500/50',
      description: 'Identifies recurring defects and sends insights to OEMs'
    }
  ];

  useEffect(() => {
    // Mock vehicle data
    setVehicles([
      {
        vehicle_id: 'VEH001',
        model: '2020 Maruti Swift',
        year: 2020,
        owner: 'Mr. Rajesh Sharma',
        type: 'ICE',
        phone: '+91-9876543210'
      },
      {
        vehicle_id: 'VEH002',
        model: '2022 Tata Nexon EV',
        year: 2022,
        owner: 'Ms. Priya Patel',
        type: 'EV',
        phone: '+91-9876543211'
      },
      {
        vehicle_id: 'VEH003',
        model: '2021 Hyundai Creta',
        year: 2021,
        owner: 'Mr. Amit Kumar',
        type: 'ICE',
        phone: '+91-9876543212'
      }
    ]);
  }, []);

  const handleAgentClick = (agent: Agent) => {
    setSelectedAgent(agent);
    setShowVehicleSelector(true);
  };

  const handleVehicleSelect = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setShowVehicleSelector(false);
    setShowReport(true);
  };

  const closeReport = () => {
    setShowReport(false);
    setSelectedAgent(null);
    setSelectedVehicle(null);
  };

  const handleVoiceAssistantClick = () => {
    setShowVoiceAssistant(true);
  };

  const closeVoiceAssistant = () => {
    setShowVoiceAssistant(false);
    stopListening();
    stopSpeaking();
    setTranscript('');
    setResponse('');
  };

  // Speech Recognition Setup
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setResponse('❌ Speech recognition not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('Listening...');
      setResponse('');
    };

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      processVoiceCommand(text);
    };

    recognition.onerror = (event: any) => {
      setIsListening(false);
      setTranscript('');
      setResponse(`❌ Error: ${event.error}. Please try again.`);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
  };

  // Text to Speech
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Process Voice Commands
  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    let responseText = '';

    // Vehicle-related commands
    if (lowerCommand.includes('show') && (lowerCommand.includes('vehicle') || lowerCommand.includes('car'))) {
      responseText = `You have ${vehicles.length} vehicles in your fleet: ${vehicles.map(v => v.model).join(', ')}`;
      setActiveView('vehicles');
    }
    // Alert commands
    else if (lowerCommand.includes('alert') || lowerCommand.includes('critical')) {
      responseText = 'Showing critical alerts. You have 2 active alerts: Brake temperature spike on vehicle VEH001 and Battery degradation on vehicle VEH002.';
      setActiveView('dashboard');
    }
    // Schedule/Appointment commands
    else if (lowerCommand.includes('schedule') || lowerCommand.includes('appointment')) {
      responseText = 'Opening scheduling system. You can book maintenance appointments here.';
      setActiveView('scheduling');
    }
    // Analytics commands
    else if (lowerCommand.includes('analytics') || lowerCommand.includes('report')) {
      responseText = 'Opening analytics dashboard with comprehensive vehicle performance metrics.';
      setActiveView('analytics');
    }
    // Car Owner View commands
    else if (lowerCommand.includes('car owner') || lowerCommand.includes('my car') || lowerCommand.includes('owner dashboard') || lowerCommand.includes('my vehicle dashboard')) {
      responseText = 'Opening car owner dashboard. Access your personalized vehicle information and maintenance schedule.';
      setActiveView('car_owner');
    }
    // Security commands
    else if (lowerCommand.includes('security') || lowerCommand.includes('ueba')) {
      responseText = 'Opening UEBA security monitoring system. All security parameters are normal.';
      setActiveView('ueba');
    }
    // Manufacturing commands
    else if (lowerCommand.includes('manufacturing') || lowerCommand.includes('defect')) {
      responseText = 'Opening manufacturing insights dashboard. Analyzing recurring defects and patterns.';
      setActiveView('manufacturing');
    }
    // Feedback commands
    else if (lowerCommand.includes('feedback') || lowerCommand.includes('customer')) {
      responseText = 'Opening customer feedback system. Current satisfaction rate is 94%.';
      setActiveView('feedback');
    }
    // Dashboard commands
    else if (lowerCommand.includes('dashboard') || lowerCommand.includes('home')) {
      responseText = 'Returning to main dashboard. All systems operational.';
      setActiveView('dashboard');
    }
    // Specific vehicle queries
    else if (lowerCommand.includes('veh001') || lowerCommand.includes('swift')) {
      responseText = '2020 Maruti Swift - Vehicle ID VEH001. Owner: Mr. Rajesh Sharma. Status: Active with one critical alert about brake temperature.';
    }
    else if (lowerCommand.includes('veh002') || lowerCommand.includes('nexon')) {
      responseText = '2022 Tata Nexon EV - Vehicle ID VEH002. Owner: Ms. Priya Patel. Status: Active with battery degradation warning.';
    }
    else if (lowerCommand.includes('veh003') || lowerCommand.includes('creta')) {
      responseText = '2021 Hyundai Creta - Vehicle ID VEH003. Owner: Mr. Amit Kumar. Status: All systems normal.';
    }
    // Help command
    else if (lowerCommand.includes('help') || lowerCommand.includes('what can you do')) {
      responseText = 'I can help you with: viewing vehicles, checking alerts, scheduling appointments, viewing analytics, security monitoring, manufacturing insights, and customer feedback. Just ask!';
    }
    // Default response
    else {
      responseText = `I heard: "${command}". I can help you navigate the system. Try saying "show vehicles", "check alerts", "schedule appointment", or "show analytics".`;
    }

    setResponse(responseText);
    speak(responseText);
    setShowVoiceAssistant(true);
  };

  const handleViewChange = (view: string) => {
    setActiveView(view);
    // Close any open modals when switching views
    setShowVehicleSelector(false);
    setShowReport(false);
    setShowVoiceAssistant(false);
  };

  // Render different views based on activeView
  const renderContent = () => {
    switch (activeView) {
      case 'ueba':
        return <UEBASecurityView />;
      
      case 'car_owner':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-black">
                🚗 Car Owner Dashboard
              </h1>
              <div className="flex gap-3">
                <select 
                  value={selectedOwnerVehicle}
                  onChange={(e) => setSelectedOwnerVehicle(e.target.value)}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none font-semibold"
                >
                  <option value="VEH001">2020 Maruti Swift</option>
                  <option value="VEH002">2022 Tata Nexon EV</option>
                  <option value="VEH003">2021 Hyundai Creta</option>
                </select>
                <button
                  onClick={() => setShowOwnerDashboard(true)}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg font-bold hover:shadow-lg hover:shadow-green-500/50 transition-all"
                >
                  Open Car Dashboard
                </button>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-100 to-green-50 border-2 border-green-300 rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="inline-block p-4 bg-green-500 rounded-full mb-4">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-green-900 mb-2">Welcome, Vehicle Owner!</h2>
                <p className="text-green-700 text-lg">Access your personalized car dashboard with real-time insights</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-xl p-6 border-2 border-green-200 shadow-lg">
                  <div className="text-4xl mb-3">🚗</div>
                  <h3 className="font-bold text-xl text-black mb-2">Vehicle Health</h3>
                  <p className="text-gray-700">Monitor your car's overall health score and component status</p>
                </div>
                <div className="bg-white rounded-xl p-6 border-2 border-green-200 shadow-lg">
                  <div className="text-4xl mb-3">🔧</div>
                  <h3 className="font-bold text-xl text-black mb-2">Service Schedule</h3>
                  <p className="text-gray-700">Track service history and upcoming maintenance</p>
                </div>
                <div className="bg-white rounded-xl p-6 border-2 border-green-200 shadow-lg">
                  <div className="text-4xl mb-3">🔮</div>
                  <h3 className="font-bold text-xl text-black mb-2">AI Predictions</h3>
                  <p className="text-gray-700">Get AI-powered maintenance predictions and cost estimates</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-green-200">
                <h3 className="font-bold text-xl text-black mb-4">✨ Features Included:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-green-500 text-2xl">✓</span>
                    <span className="text-gray-700 font-semibold">Real-time vehicle health monitoring</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-green-500 text-2xl">✓</span>
                    <span className="text-gray-700 font-semibold">Active issue alerts & notifications</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-green-500 text-2xl">✓</span>
                    <span className="text-gray-700 font-semibold">Predictive maintenance insights</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-green-500 text-2xl">✓</span>
                    <span className="text-gray-700 font-semibold">Service history & cost tracking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-green-500 text-2xl">✓</span>
                    <span className="text-gray-700 font-semibold">Driving behavior analysis</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-green-500 text-2xl">✓</span>
                    <span className="text-gray-700 font-semibold">Quick access to service centers</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-green-500 text-2xl">✓</span>
                    <span className="text-gray-700 font-semibold">Emergency roadside assistance</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-green-500 text-2xl">✓</span>
                    <span className="text-gray-700 font-semibold">Personalized recommendations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'vehicles':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold !text-black">
              Vehicle Fleet Management
            </h1>
            <div className="bg-white border border-gray-300 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 !text-black">
                Your Vehicle Fleet
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {vehicles.map((vehicle) => (
                  <div
                    key={vehicle.vehicle_id}
                    className="bg-white border border-gray-300 rounded-xl p-5 hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-xl text-black">{vehicle.model}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-bold text-black ${
                        vehicle.type === 'EV' 
                          ? 'bg-green-200 border border-green-400' 
                          : 'bg-orange-200 border border-orange-400'
                      }`}>
                        {vehicle.type}
                      </span>
                    </div>
                    <p className="text-base text-black mb-1 font-semibold">Year: {vehicle.year}</p>
                    <p className="text-base text-black mb-1 font-semibold">Owner: {vehicle.owner}</p>
                    <p className="text-sm text-black mt-3 font-mono font-bold">{vehicle.vehicle_id}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'scheduling':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-orange-600 mb-6">
              📅 Scheduling & Appointments
            </h1>
            
            {/* Upcoming Appointments */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-black mb-4 flex items-center gap-2">
                <Calendar className="text-orange-500" size={24} />
                Upcoming Appointments
              </h2>
              <div className="space-y-3">
                {[
                  { vehicle: '2020 Maruti Swift', owner: 'Mr. Rajesh Sharma', date: 'Jan 15, 2026', time: '10:00 AM', service: 'Brake Inspection', status: 'Confirmed' },
                  { vehicle: '2022 Tata Nexon EV', owner: 'Ms. Priya Patel', date: 'Jan 16, 2026', time: '2:30 PM', service: 'Battery Check', status: 'Pending' },
                  { vehicle: '2021 Hyundai Creta', owner: 'Mr. Amit Kumar', date: 'Jan 18, 2026', time: '11:00 AM', service: 'Regular Service', status: 'Confirmed' },
                ].map((apt, idx) => (
                  <div key={idx} className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4 hover:shadow-lg transition-all">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-black">{apt.vehicle}</h3>
                        <p className="text-gray-700 text-sm">👤 {apt.owner}</p>
                        <p className="text-gray-700 text-sm mt-2">🔧 {apt.service}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-orange-600 font-bold">{apt.date}</p>
                        <p className="text-orange-600 font-semibold">{apt.time}</p>
                        <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${
                          apt.status === 'Confirmed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                        }`}>
                          {apt.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Book New Appointment */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-black mb-4">📝 Book New Appointment</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Select Vehicle</label>
                  <select className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none">
                    <option>2020 Maruti Swift - VEH001</option>
                    <option>2022 Tata Nexon EV - VEH002</option>
                    <option>2021 Hyundai Creta - VEH003</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Service Type</label>
                  <select className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none">
                    <option>Regular Maintenance</option>
                    <option>Brake Service</option>
                    <option>Battery Check</option>
                    <option>Engine Diagnostic</option>
                    <option>Tire Replacement</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Preferred Date</label>
                  <input type="date" className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Preferred Time</label>
                  <input type="time" className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none" />
                </div>
              </div>
              <button className="mt-4 w-full md:w-auto px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all">
                📅 Book Appointment
              </button>
            </div>

            {/* Calendar View */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-black mb-4">📆 January 2026</h2>
              <div className="grid grid-cols-7 gap-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center font-bold text-gray-600 text-sm py-2">{day}</div>
                ))}
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                  <div key={day} className={`text-center py-3 rounded-lg font-semibold ${
                    [15, 16, 18].includes(day) 
                      ? 'bg-orange-500 text-white' 
                      : day === 11 
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-black hover:bg-gray-200'
                  } cursor-pointer transition-all`}>
                    {day}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'voice_agent':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-orange-600 mb-6">
              🎙️ Voice Agent Management
            </h1>

            {/* Voice Assistant Quick Access */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">AI Voice Assistant</h2>
                  <p className="text-orange-100">Voice-powered navigation and vehicle diagnostics</p>
                </div>
                <button 
                  onClick={handleVoiceAssistantClick}
                  className="px-8 py-4 bg-white text-orange-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105"
                >
                  🎤 Launch Voice Assistant
                </button>
              </div>
            </div>

            {/* Recent Voice Interactions */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-black mb-4">📞 Recent Voice Interactions</h2>
              <div className="space-y-3">
                {[
                  { time: '2 mins ago', query: 'Show vehicles', action: 'Opened vehicle fleet', status: 'Success' },
                  { time: '15 mins ago', query: 'Check alerts', action: 'Displayed critical alerts', status: 'Success' },
                  { time: '1 hour ago', query: 'Schedule appointment', action: 'Opened scheduling', status: 'Success' },
                  { time: '2 hours ago', query: 'VEH001 status', action: 'Provided vehicle details', status: 'Success' },
                ].map((interaction, idx) => (
                  <div key={idx} className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-bold text-black">👤 "{interaction.query}"</p>
                        <p className="text-sm text-gray-700 mt-1">🤖 {interaction.action}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">{interaction.time}</p>
                        <span className="inline-block mt-1 px-3 py-1 bg-green-200 text-green-800 rounded-full text-xs font-bold">
                          ✓ {interaction.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Voice Commands Reference */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-black mb-4">💡 Supported Voice Commands</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { category: '🚗 Vehicle Commands', commands: ['Show vehicles', 'Check VEH001', 'Swift status'] },
                  { category: '🚨 Alert Commands', commands: ['Check alerts', 'Critical issues', 'Show warnings'] },
                  { category: '📅 Scheduling', commands: ['Schedule appointment', 'Book service', 'View calendar'] },
                  { category: '📊 Analytics', commands: ['Show analytics', 'Performance report', 'Statistics'] },
                  { category: '🔒 Security', commands: ['Open security', 'UEBA status', 'Check threats'] },
                  { category: '🏭 Manufacturing', commands: ['Manufacturing insights', 'Defect analysis', 'Quality data'] },
                ].map((section, idx) => (
                  <div key={idx} className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h3 className="font-bold text-black mb-2">{section.category}</h3>
                    <ul className="space-y-1">
                      {section.commands.map((cmd, i) => (
                        <li key={i} className="text-sm text-gray-700">• "{cmd}"</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Voice Settings */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-black mb-4">⚙️ Voice Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-black">Voice Feedback Enabled</span>
                  <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-black">Auto-Navigate on Command</span>
                  <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-black">Speech Rate</span>
                  <input type="range" min="0.5" max="2" step="0.1" defaultValue="0.9" className="w-48" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'feedback':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-orange-600 mb-6">
              ⭐ Customer Feedback & Satisfaction
            </h1>

            {/* Overall Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Overall Rating', value: '4.7/5', icon: '⭐', color: 'orange' },
                { label: 'Total Reviews', value: '2,847', icon: '📝', color: 'blue' },
                { label: 'Satisfaction Rate', value: '94%', icon: '😊', color: 'green' },
                { label: 'Response Time', value: '2.3h', icon: '⏱️', color: 'purple' },
              ].map((stat, idx) => (
                <div key={idx} className={`bg-white border-2 border-${stat.color}-200 rounded-xl p-6 text-center hover:shadow-lg transition-all`}>
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-black">{stat.value}</div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Recent Feedback */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-black mb-4">📋 Recent Customer Feedback</h2>
              <div className="space-y-4">
                {[
                  { customer: 'Mr. Rajesh Sharma', vehicle: 'VEH001 - Maruti Swift', rating: 5, comment: 'Excellent service! The brake issue was diagnosed perfectly and fixed quickly.', date: 'Jan 10, 2026' },
                  { customer: 'Ms. Priya Patel', vehicle: 'VEH002 - Tata Nexon EV', rating: 4, comment: 'Good experience. Battery check was thorough. Would recommend!', date: 'Jan 9, 2026' },
                  { customer: 'Mr. Amit Kumar', vehicle: 'VEH003 - Hyundai Creta', rating: 5, comment: 'Very professional team. Regular maintenance done perfectly on time.', date: 'Jan 8, 2026' },
                  { customer: 'Ms. Deepa Singh', vehicle: 'VEH004 - Honda City', rating: 4, comment: 'Great AI-powered diagnostics. Saved me time and money!', date: 'Jan 7, 2026' },
                ].map((feedback, idx) => (
                  <div key={idx} className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-black">{feedback.customer}</h3>
                        <p className="text-sm text-gray-600">{feedback.vehicle}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex gap-1 mb-1">
                          {Array.from({ length: feedback.rating }).map((_, i) => (
                            <span key={i} className="text-yellow-500 text-lg">⭐</span>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500">{feedback.date}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 italic">"{feedback.comment}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-black mb-4">📊 Rating Distribution</h2>
              <div className="space-y-3">
                {[
                  { stars: 5, count: 1847, percentage: 65 },
                  { stars: 4, count: 683, percentage: 24 },
                  { stars: 3, count: 228, percentage: 8 },
                  { stars: 2, count: 57, percentage: 2 },
                  { stars: 1, count: 32, percentage: 1 },
                ].map((rating, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-20 text-sm font-bold text-black">{rating.stars} ⭐</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${rating.percentage}%` }}
                      >
                        <span className="text-white text-xs font-bold">{rating.percentage}%</span>
                      </div>
                    </div>
                    <div className="w-20 text-sm text-gray-600 text-right">{rating.count} reviews</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Categories */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-black mb-4">🔧 Top Service Categories</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { service: 'Brake Service', rating: 4.8, reviews: 485 },
                  { service: 'Battery Check', rating: 4.7, reviews: 392 },
                  { service: 'Engine Diagnostic', rating: 4.9, reviews: 567 },
                  { service: 'Regular Maintenance', rating: 4.6, reviews: 821 },
                ].map((service, idx) => (
                  <div key={idx} className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
                    <h3 className="font-bold text-black mb-2">{service.service}</h3>
                    <div className="text-2xl font-bold text-orange-600">{service.rating} ⭐</div>
                    <p className="text-sm text-gray-600 mt-1">{service.reviews} reviews</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'manufacturing':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-orange-600 mb-6">
              🏭 Manufacturing Insights & Defect Analysis
            </h1>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Defects Detected', value: '127', icon: '⚠️', color: 'red', change: '-12%' },
                { label: 'Quality Score', value: '96.8%', icon: '✅', color: 'green', change: '+3%' },
                { label: 'Vehicles Analyzed', value: '3,542', icon: '🚗', color: 'blue', change: '+8%' },
                { label: 'OEM Reports Sent', value: '23', icon: '📤', color: 'purple', change: '+5' },
              ].map((metric, idx) => (
                <div key={idx} className={`bg-white border-2 border-${metric.color}-200 rounded-xl p-6 hover:shadow-lg transition-all`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-3xl">{metric.icon}</div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      metric.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-black">{metric.value}</div>
                  <div className="text-sm text-gray-600 mt-1">{metric.label}</div>
                </div>
              ))}
            </div>

            {/* Recurring Defects */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-black mb-4">🔍 Top Recurring Defects</h2>
              <div className="space-y-4">
                {[
                  { defect: 'Brake Pad Premature Wear', model: 'Maruti Swift 2020-2022', occurrences: 45, severity: 'High', trend: 'Increasing' },
                  { defect: 'Battery Capacity Degradation', model: 'Tata Nexon EV 2021-2023', occurrences: 38, severity: 'Medium', trend: 'Stable' },
                  { defect: 'Suspension Spring Fatigue', model: 'Hyundai Creta 2020-2022', occurrences: 31, severity: 'Medium', trend: 'Decreasing' },
                  { defect: 'Engine Oil Leak', model: 'Honda City 2019-2021', occurrences: 24, severity: 'High', trend: 'Stable' },
                  { defect: 'Tire Tread Uneven Wear', model: 'Multiple Models', occurrences: 19, severity: 'Low', trend: 'Decreasing' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-red-50 border-2 border-red-200 rounded-xl p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-black">{item.defect}</h3>
                        <p className="text-sm text-gray-600 mt-1">📋 {item.model}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-red-600">{item.occurrences}</div>
                        <p className="text-xs text-gray-500">occurrences</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.severity === 'High' ? 'bg-red-200 text-red-800' : 
                        item.severity === 'Medium' ? 'bg-yellow-200 text-yellow-800' : 
                        'bg-green-200 text-green-800'
                      }`}>
                        {item.severity} Severity
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        item.trend === 'Increasing' ? 'bg-red-200 text-red-800' : 
                        item.trend === 'Decreasing' ? 'bg-green-200 text-green-800' : 
                        'bg-gray-200 text-gray-800'
                      }`}>
                        📈 {item.trend}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Defect Analysis by Category */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-black mb-4">📊 Defects by Component Category</h2>
              <div className="space-y-3">
                {[
                  { category: 'Brake System', count: 58, percentage: 32, color: 'red' },
                  { category: 'Electrical/Battery', count: 47, percentage: 26, color: 'blue' },
                  { category: 'Suspension', count: 39, percentage: 22, color: 'purple' },
                  { category: 'Engine/Powertrain', count: 28, percentage: 15, color: 'orange' },
                  { category: 'Tires/Wheels', count: 9, percentage: 5, color: 'green' },
                ].map((cat, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-40 font-bold text-black text-sm">{cat.category}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r from-${cat.color}-400 to-${cat.color}-600 rounded-full flex items-center justify-between px-3`}
                        style={{ width: `${cat.percentage}%` }}
                      >
                        <span className="text-white text-xs font-bold">{cat.percentage}%</span>
                      </div>
                    </div>
                    <div className="w-16 text-sm font-bold text-gray-600 text-right">{cat.count}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* OEM Reports */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-black mb-4">📤 Recent OEM Reports Sent</h2>
              <div className="space-y-3">
                {[
                  { oem: 'Maruti Suzuki', report: 'Brake System Analysis Q4 2025', date: 'Jan 10, 2026', status: 'Delivered', defects: 45 },
                  { oem: 'Tata Motors', report: 'EV Battery Performance Report', date: 'Jan 8, 2026', status: 'Acknowledged', defects: 38 },
                  { oem: 'Hyundai Motor', report: 'Suspension Component Review', date: 'Jan 5, 2026', status: 'Under Review', defects: 31 },
                  { oem: 'Honda Cars', report: 'Engine Quality Assessment', date: 'Jan 3, 2026', status: 'Delivered', defects: 24 },
                ].map((report, idx) => (
                  <div key={idx} className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-bold text-black">{report.oem}</h3>
                        <p className="text-sm text-gray-700 mt-1">📄 {report.report}</p>
                        <p className="text-xs text-gray-500 mt-2">🔍 {report.defects} defects analyzed</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500 mb-2">{report.date}</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          report.status === 'Delivered' ? 'bg-green-200 text-green-800' : 
                          report.status === 'Acknowledged' ? 'bg-blue-200 text-blue-800' : 
                          'bg-yellow-200 text-yellow-800'
                        }`}>
                          {report.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality Trends */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-black mb-4">📈 Quality Trend Analysis</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { period: 'This Month', quality: '96.8%', defects: 127, change: 'Improved' },
                  { period: 'Last Month', quality: '93.9%', defects: 145, change: 'Stable' },
                  { period: 'Average (6M)', quality: '94.2%', defects: 139, change: 'Trending Up' },
                ].map((trend, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-300 rounded-xl p-5 text-center">
                    <h3 className="font-bold text-black mb-3">{trend.period}</h3>
                    <div className="text-3xl font-bold text-orange-600 mb-1">{trend.quality}</div>
                    <p className="text-sm text-gray-700">{trend.defects} defects</p>
                    <span className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-bold ${
                      trend.change === 'Improved' ? 'bg-green-200 text-green-800' : 
                      trend.change === 'Trending Up' ? 'bg-blue-200 text-blue-800' : 
                      'bg-gray-200 text-gray-800'
                    }`}>
                      {trend.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Items */}
            <div className="bg-orange-50 border-2 border-orange-300 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-black mb-4">⚡ Recommended Actions</h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 font-bold">•</span>
                  <span className="text-gray-800"><strong>Urgent:</strong> Investigate brake pad supplier quality for 2020-2022 Swift models</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 font-bold">•</span>
                  <span className="text-gray-800"><strong>Follow-up:</strong> Monitor Nexon EV battery degradation patterns with Tata Motors</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-600 font-bold">•</span>
                  <span className="text-gray-800"><strong>Review:</strong> Schedule quality audit for suspension components across all models</span>
                </li>
              </ul>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-orange-600 mb-6">
              📊 Analytics Dashboard
            </h1>

            {/* Key Performance Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Vehicles', value: '3,542', icon: '🚗', change: '+12%', trend: 'up' },
                { label: 'Avg. Vehicle Age', value: '3.2 yrs', icon: '📅', change: '+0.3', trend: 'neutral' },
                { label: 'Maintenance Cost', value: '₹24.5L', icon: '💰', change: '-8%', trend: 'down' },
                { label: 'System Uptime', value: '99.7%', icon: '⚡', change: '+0.2%', trend: 'up' },
              ].map((kpi, idx) => (
                <div key={idx} className="bg-white border-2 border-orange-200 rounded-xl p-6 hover:shadow-lg transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-3xl">{kpi.icon}</div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      kpi.trend === 'up' ? 'bg-green-100 text-green-700' : 
                      kpi.trend === 'down' ? 'bg-red-100 text-red-700' : 
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {kpi.change}
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-black">{kpi.value}</div>
                  <div className="text-sm text-gray-600 mt-1">{kpi.label}</div>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Maintenance Trends */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-black mb-4">📈 Maintenance Trends (6 Months)</h2>
                <div className="space-y-2">
                  {[
                    { month: 'July 2025', preventive: 85, reactive: 45, total: 130 },
                    { month: 'August 2025', preventive: 92, reactive: 38, total: 130 },
                    { month: 'September 2025', preventive: 88, reactive: 41, total: 129 },
                    { month: 'October 2025', preventive: 95, reactive: 32, total: 127 },
                    { month: 'November 2025', preventive: 98, reactive: 28, total: 126 },
                    { month: 'December 2025', preventive: 102, reactive: 25, total: 127 },
                  ].map((data, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-semibold text-black">{data.month}</span>
                        <span className="text-gray-600">{data.total} services</span>
                      </div>
                      <div className="flex gap-1 h-8">
                        <div 
                          className="bg-green-500 rounded flex items-center justify-center text-white text-xs font-bold"
                          style={{ width: `${(data.preventive / data.total) * 100}%` }}
                        >
                          {data.preventive}
                        </div>
                        <div 
                          className="bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold"
                          style={{ width: `${(data.reactive / data.total) * 100}%` }}
                        >
                          {data.reactive}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-6 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-gray-700">Preventive</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-gray-700">Reactive</span>
                  </div>
                </div>
              </div>

              {/* Cost Analysis */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-black mb-4">💰 Cost Breakdown (This Month)</h2>
                <div className="space-y-4">
                  {[
                    { category: 'Parts & Materials', amount: '₹8.5L', percentage: 35, color: 'blue' },
                    { category: 'Labor Costs', amount: '₹6.2L', percentage: 25, color: 'purple' },
                    { category: 'Diagnostic & Testing', amount: '₹4.8L', percentage: 20, color: 'orange' },
                    { category: 'Emergency Repairs', amount: '₹3.1L', percentage: 13, color: 'red' },
                    { category: 'Other Expenses', amount: '₹1.9L', percentage: 7, color: 'gray' },
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-black">{item.category}</span>
                        <span className="text-sm font-bold text-black">{item.amount}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div 
                          className={`h-full bg-${item.color}-500 rounded-full flex items-center justify-end pr-2`}
                          style={{ width: `${item.percentage}%` }}
                        >
                          <span className="text-white text-xs font-bold">{item.percentage}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t-2 border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-black">Total Monthly Cost</span>
                    <span className="text-2xl font-bold text-orange-600">₹24.5L</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-black mb-4">⚡ Vehicle Performance Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { metric: 'Average Response Time', value: '2.3 hours', target: '< 3 hours', status: 'good' },
                  { metric: 'First-Time Fix Rate', value: '87%', target: '> 85%', status: 'good' },
                  { metric: 'Customer Satisfaction', value: '4.7/5', target: '> 4.5', status: 'excellent' },
                  { metric: 'Mean Time to Repair', value: '4.2 hours', target: '< 5 hours', status: 'good' },
                  { metric: 'Preventive Maintenance Rate', value: '80%', target: '> 75%', status: 'excellent' },
                  { metric: 'Equipment Utilization', value: '92%', target: '> 90%', status: 'good' },
                ].map((perf, idx) => (
                  <div key={idx} className={`border-2 rounded-xl p-4 ${
                    perf.status === 'excellent' ? 'bg-green-50 border-green-300' : 'bg-blue-50 border-blue-300'
                  }`}>
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm font-semibold text-black flex-1">{perf.metric}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        perf.status === 'excellent' ? 'bg-green-200 text-green-800' : 'bg-blue-200 text-blue-800'
                      }`}>
                        {perf.status === 'excellent' ? '✓ Excellent' : '✓ Good'}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-black mb-1">{perf.value}</div>
                    <div className="text-xs text-gray-600">Target: {perf.target}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Performing Vehicles */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-black mb-4">🏆 Top Performing Vehicles</h2>
                <div className="space-y-3">
                  {[
                    { vehicle: '2022 Tata Nexon EV', id: 'VEH002', score: 98, uptime: '99.8%', maintenance: 'Low' },
                    { vehicle: '2021 Hyundai Creta', id: 'VEH003', score: 95, uptime: '99.5%', maintenance: 'Low' },
                    { vehicle: '2020 Maruti Swift', id: 'VEH001', score: 92, uptime: '98.9%', maintenance: 'Medium' },
                  ].map((veh, idx) => (
                    <div key={idx} className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-black">{veh.vehicle}</h3>
                          <p className="text-sm text-gray-600">{veh.id}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">{veh.score}</div>
                          <p className="text-xs text-gray-600">Health Score</p>
                        </div>
                      </div>
                      <div className="flex gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Uptime:</span>
                          <span className="text-black font-semibold ml-1">{veh.uptime}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Maintenance:</span>
                          <span className="text-black font-semibold ml-1">{veh.maintenance}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-black mb-4">⚠️ Vehicles Needing Attention</h2>
                <div className="space-y-3">
                  {[
                    { vehicle: '2019 Honda City', id: 'VEH004', score: 68, issue: 'Engine oil leak', priority: 'High' },
                    { vehicle: '2020 Toyota Innova', id: 'VEH005', score: 72, issue: 'Brake wear detected', priority: 'Medium' },
                    { vehicle: '2018 Maruti Dzire', id: 'VEH006', score: 75, issue: 'Battery degradation', priority: 'Medium' },
                  ].map((veh, idx) => (
                    <div key={idx} className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-black">{veh.vehicle}</h3>
                          <p className="text-sm text-gray-600">{veh.id}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-red-600">{veh.score}</div>
                          <p className="text-xs text-gray-600">Health Score</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-800">🔧 {veh.issue}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          veh.priority === 'High' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'
                        }`}>
                          {veh.priority} Priority
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-300 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-black mb-4">🤖 AI-Powered Insights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-orange-200 rounded-xl p-4">
                  <div className="text-2xl mb-2">💡</div>
                  <h3 className="font-bold text-black mb-2">Predictive Recommendation</h3>
                  <p className="text-sm text-gray-700">Based on current trends, schedule preventive maintenance for 8 vehicles in the next 2 weeks to avoid potential breakdowns.</p>
                </div>
                <div className="bg-white border border-orange-200 rounded-xl p-4">
                  <div className="text-2xl mb-2">📉</div>
                  <h3 className="font-bold text-black mb-2">Cost Optimization</h3>
                  <p className="text-sm text-gray-700">Increasing preventive maintenance by 12% could reduce emergency repair costs by ₹4.2L annually.</p>
                </div>
                <div className="bg-white border border-orange-200 rounded-xl p-4">
                  <div className="text-2xl mb-2">⏰</div>
                  <h3 className="font-bold text-black mb-2">Peak Performance Times</h3>
                  <p className="text-sm text-gray-700">Service efficiency is 23% higher between 9 AM - 2 PM. Consider scheduling complex repairs during this window.</p>
                </div>
                <div className="bg-white border border-orange-200 rounded-xl p-4">
                  <div className="text-2xl mb-2">🎯</div>
                  <h3 className="font-bold text-black mb-2">Target Achievement</h3>
                  <p className="text-sm text-gray-700">On track to achieve 95% customer satisfaction target by Q2 2026. Current rate: 94.7%</p>
                </div>
              </div>
            </div>
          </div>
        );

      default: // dashboard
        return (
          <>
            {/* Header */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-black mb-3">
                    AI Predictive Maintenance System
                  </h1>
                  <p className="text-lg text-black">
                    Click any AI agent → Select vehicle → Get voice-enabled report
                  </p>
                </div>
                
                {/* Voice Assistant Button - Speaking Person Icon */}
                <button 
                  onClick={handleVoiceAssistantClick}
                  className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-500 rounded-lg shadow-lg hover:shadow-xl hover:shadow-orange-600/50 transition-all duration-300 hover:scale-105 group font-bold text-lg !text-white"
                >
                  <svg className="w-7 h-7 !text-white fill-white stroke-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="8" r="3" stroke="white" strokeWidth="2" />
                    <path d="M6 21V19C6 16.7909 7.79086 15 10 15H14C16.2091 15 18 16.7909 18 19V21" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <path d="M19 10C19.5 10.5 20 11.5 20 12.5C20 13.5 19.5 14.5 19 15" stroke="white" strokeWidth="2" strokeLinecap="round" className="animate-pulse" />
                    <path d="M5 10C4.5 10.5 4 11.5 4 12.5C4 13.5 4.5 14.5 5 15" stroke="white" strokeWidth="2" strokeLinecap="round" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
                  </svg>
                  <span className="font-bold !text-white hidden md:inline">Voice Assistant</span>
                </button>
              </div>

              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white border-2 border-orange-500/30 rounded-xl p-5 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300">
                  <div className="text-black text-sm mb-1 font-semibold">Active Agents</div>
                  <div className="text-3xl font-bold text-black">{agents.length}</div>
                </div>
                <div className="bg-white border-2 border-orange-500/30 rounded-xl p-5 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300">
                  <div className="text-black text-sm mb-1 font-semibold">Total Vehicles</div>
                  <div className="text-3xl font-bold text-black">{vehicles.length}</div>
                </div>
                <div className="bg-white border-2 border-orange-500/30 rounded-xl p-5 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300">
                  <div className="text-black text-sm mb-1 font-semibold">System Health</div>
                  <div className="text-3xl font-bold text-black flex items-center gap-2">
                    98% <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Agent Grid - Dark Theme with Glowing Effects */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-6 text-orange-600">
                AI Agent Activity Monitor
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agents.map((agent, index) => (
                  <div
                    key={agent.id}
                    onClick={() => handleAgentClick(agent)}
                    className="group relative cursor-pointer"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Glowing Border Effect on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${agent.color} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 rounded-2xl`}></div>
                    
                    {/* Card Content */}
                    <div className="relative bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-2xl">
                      
                      {/* Agent Icon */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${agent.color} flex items-center justify-center text-2xl shadow-lg transform group-hover:rotate-12 transition-transform duration-300`}>
                          {agent.Icon && <agent.Icon size={28} className="text-white" />}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-black">
                            {agent.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-xs text-green-600 font-semibold">Active</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-black text-sm mb-4 line-clamp-2">
                        {agent.description}
                      </p>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${agent.color} transition-all duration-1000`}
                          style={{ width: '85%' }}
                        ></div>
                      </div>

                      {/* Action Button */}
                      <button className={`w-full py-2.5 rounded-lg bg-gradient-to-r ${agent.color} text-white font-semibold hover:shadow-lg ${agent.glowColor} transition-all duration-300 transform hover:scale-105`}>
                        View Report →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Alert System - Full Width Landscape Layout */}
            <div className="mb-8">
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <h2 className="text-2xl font-bold text-orange-600">
                    Live Alert Feed & System Monitor
                  </h2>
                </div>
                <AlertSystem />
              </div>
            </div>

            {/* Vehicle Fleet Overview - Dark Theme */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6 !text-black">
                Your Vehicle Fleet
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {vehicles.map((vehicle) => (
                  <div
                    key={vehicle.vehicle_id}
                    className="bg-white border-2 border-gray-300 rounded-xl p-5 hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-xl text-black">{vehicle.model}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-bold text-black ${
                        vehicle.type === 'EV' 
                          ? 'bg-green-200 border border-green-400' 
                          : 'bg-orange-200 border border-orange-400'
                      }`}>
                        {vehicle.type}
                      </span>
                    </div>
                    <p className="text-base text-black mb-1 font-semibold">Year: {vehicle.year}</p>
                    <p className="text-base text-black mb-1 font-semibold">Owner: {vehicle.owner}</p>
                    <p className="text-sm text-black mt-3 font-mono font-bold">{vehicle.vehicle_id}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Sidebar */}
      <Sidebar activeView={activeView} onViewChange={handleViewChange} />

      {/* Main Content with left padding for sidebar */}
      <div className="pl-64 transition-all duration-300">
        <div className="p-6 md:p-8 bg-white text-black">
          {renderContent()}
        </div>
      </div>

      {/* Vehicle Selector Modal - Dark Theme */}
      {showVehicleSelector && selectedAgent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border-2 border-gray-300 rounded-2xl shadow-2xl max-w-3xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${selectedAgent.color} flex items-center justify-center text-3xl shadow-lg`}>
                  {selectedAgent.Icon && <selectedAgent.Icon size={36} className="text-white" />}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-black">
                    {selectedAgent.name}
                  </h2>
                  <p className="text-black font-semibold">Select a vehicle to analyze</p>
                </div>
              </div>
              <button
                onClick={() => setShowVehicleSelector(false)}
                className="text-gray-400 hover:text-black transition-colors"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle.vehicle_id}
                  onClick={() => handleVehicleSelect(vehicle)}
                  className="relative group bg-white border-2 border-gray-300 rounded-xl p-6 cursor-pointer hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/20 transition-all hover:scale-105"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-xl text-black">{vehicle.model}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      vehicle.type === 'EV' 
                        ? 'bg-green-500/20 text-green-700 border border-green-500/50' 
                        : 'bg-orange-500/20 text-orange-700 border border-orange-500/50'
                    }`}>
                      {vehicle.type}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-1">Year: {vehicle.year}</p>
                  <p className="text-gray-700 mb-1">Owner: {vehicle.owner}</p>
                  <p className="text-gray-600 text-sm font-mono mt-2">{vehicle.vehicle_id}</p>
                  <div className="mt-4 text-orange-600 font-semibold flex items-center gap-2 group-hover:text-orange-700 transition-colors">
                    View Report <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Voice Assistant Modal */}
      {showVoiceAssistant && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border-2 border-orange-500/50 rounded-2xl shadow-2xl shadow-orange-500/20 max-w-2xl w-full p-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-3xl shadow-lg animate-pulse">
                  🎙️
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-black">Voice Assistant</h2>
                  <p className="text-black font-semibold">Speak or type your query</p>
                </div>
              </div>
              <button
                onClick={closeVoiceAssistant}
                className="text-black hover:text-gray-700 transition-colors"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {/* Voice Status */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className={`w-3 h-3 rounded-full animate-pulse ${isListening ? 'bg-red-500' : isSpeaking ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                  <span className={`font-semibold ${isListening ? 'text-red-600' : isSpeaking ? 'text-blue-600' : 'text-green-600'}`}>
                    {isListening ? '🎤 Listening...' : isSpeaking ? '🔊 Speaking...' : 'Voice Assistant Ready'}
                  </span>
                </div>
                <div className="flex justify-center gap-4">
                  <button 
                    onClick={startListening}
                    disabled={isListening || isSpeaking}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                      isListening || isSpeaking 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg hover:shadow-orange-500/50'
                    }`}
                  >
                    🎤 {isListening ? 'Listening...' : 'Start Speaking'}
                  </button>
                  <button 
                    onClick={() => {
                      stopListening();
                      stopSpeaking();
                    }}
                    disabled={!isListening && !isSpeaking}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                      !isListening && !isSpeaking
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-red-500 text-white hover:bg-red-600'
                    }`}
                  >
                    ⏹️ Stop
                  </button>
                </div>
              </div>

              {/* Transcript Display */}
              {transcript && (
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">👤</div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-blue-900 mb-1">You said:</h3>
                      <p className="text-blue-800 font-medium">{transcript}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Response Display */}
              {response && (
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">🤖</div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-green-900 mb-1">Assistant:</h3>
                      <p className="text-green-800 font-medium">{response}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Commands */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
                <h3 className="text-sm font-bold text-black mb-3">💡 Try These Commands:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    '"Show vehicles"',
                    '"Car owner dashboard"',
                    '"Check alerts"',
                    '"Schedule appointment"',
                    '"Show analytics"',
                    '"Open security"',
                    '"Manufacturing insights"',
                    '"Customer feedback"',
                    '"What can you do?"'
                  ].map((cmd, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setTranscript(cmd.replace(/"/g, ''));
                        processVoiceCommand(cmd.replace(/"/g, ''));
                      }}
                      className="bg-gradient-to-r from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 border border-orange-300 px-4 py-2 rounded-lg text-sm text-orange-900 font-semibold cursor-pointer transition-all text-left"
                    >
                      {cmd}
                    </button>
                  ))}
                </div>
              </div>

              {/* Browser Compatibility Note */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-xs text-yellow-800">
                  💡 <strong>Note:</strong> Voice recognition works best in Chrome and Edge browsers. Make sure to allow microphone access.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Agent Report Modal with Voice */}
      {showReport && selectedAgent && selectedVehicle && (
        <AgentReportModal
          agent={{
            id: selectedAgent.id,
            name: selectedAgent.name,
            icon: selectedAgent.id,
            color: selectedAgent.color,
            description: selectedAgent.description
          }}
          vehicle={selectedVehicle}
          onClose={closeReport}
        />
      )}

      {/* Vehicle Owner Dashboard */}
      {showOwnerDashboard && (
        <VehicleOwnerDashboard
          vehicleId={selectedOwnerVehicle}
          onClose={() => setShowOwnerDashboard(false)}
        />
      )}
    </main>
  );
}