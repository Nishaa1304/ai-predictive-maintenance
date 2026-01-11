'use client';

import { useState, useEffect } from 'react';

interface Agent {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

interface Vehicle {
  vehicle_id: string;
  model: string;
  year: number;
  owner: string;
  type: string;
  phone?: string;
}

interface Props {
  agent: Agent;
  vehicle: Vehicle;
  onClose: () => void;
}

export default function AgentReportModal({ agent, vehicle, onClose }: Props) {
  const [report, setReport] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceInput, setVoiceInput] = useState('');
  const [conversation, setConversation] = useState<Array<{role: string, text: string}>>([]);

  useEffect(() => {
    fetchAgentReport();
  }, [agent, vehicle]);

  const fetchAgentReport = () => {
    setLoading(true);
    
    setTimeout(() => {
      let reportText = '';
      
      switch (agent.id) {
        case 'data_analysis':
          reportText = `DATA ANALYSIS REPORT
Vehicle: ${vehicle.model} (${vehicle.vehicle_id})
Owner: ${vehicle.owner}

SENSOR READINGS:
- Battery Voltage: 12.2V (⚠️ LOW - Normal: 13.5V+)
- Engine Temperature: 105°C (⚠️ HIGH - Normal: 85-95°C)
- Oil Pressure: 35 PSI (⚠️ LOW - Normal: 40-60 PSI)
- Brake Wear: 78% (🔴 CRITICAL - Replace immediately)

ANOMALIES DETECTED:
1. Critical brake pad wear - Immediate attention required
2. Battery charging system showing degradation
3. Oil pressure below optimal range

Overall Health Score: 45/100`;
          break;

        case 'diagnosis':
          reportText = `DIAGNOSTIC REPORT
Vehicle: ${vehicle.model}

PRIMARY DIAGNOSIS:
Component: Front & Rear Brake Pads
Status: 🔴 CRITICAL - 78% Wear
Failure Probability: 90%
Time to Failure: 7-10 days
Estimated Cost: ₹5,000 - 8,000
Safety Risk: HIGH
Urgency: IMMEDIATE ACTION REQUIRED

TOTAL ESTIMATED COST: ₹10,000 - 17,000`;
          break;

        case 'customer_engagement':
          reportText = `CUSTOMER CALL SCRIPT
Customer: ${vehicle.owner}
Vehicle: ${vehicle.model}

Opening:
"Hello ${vehicle.owner}! This is Maya from your vehicle's AI assistant."

Issue:
"Your ${vehicle.model} has critical brake wear at 78%."

Cost:
"Estimated cost: ₹5,000-8,000"

Appointment:
"Available slots: Tomorrow 10 AM, 2 PM"`;
          break;

        case 'scheduling':
          reportText = `SCHEDULING REPORT
Vehicle: ${vehicle.model}

AVAILABLE APPOINTMENTS:
📅 Tomorrow 10:00 AM - AutoCare Center
📅 Tomorrow 2:00 PM - QuickFix Garage

ESTIMATED SERVICE TIME: 3-4 hours`;
          break;

        case 'feedback':
          reportText = `POST-SERVICE FEEDBACK
Vehicle: ${vehicle.model}

Satisfaction survey questions ready.
Awaiting service completion.`;
          break;

        case 'manufacturing':
          reportText = `MANUFACTURING INSIGHTS
Model: ${vehicle.model}

RECURRING DEFECTS:
- Brake pad wear: 45% of fleet
- Battery issues: 32% of fleet

Data sent to OEM for quality improvement.`;
          break;

        default:
          reportText = 'Report not available';
      }

      setReport(reportText);
      setLoading(false);
    }, 1500);
  };

  const speakText = (text: string) => {
    if (typeof window === 'undefined') return;
    
    const synth = window.speechSynthesis;
    if (synth.speaking) {
      synth.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    synth.speak(utterance);
  };

  const handleVoiceQuery = (query: string) => {
    const lowerQuery = query.toLowerCase();
    let response = '';

    setConversation(prev => [...prev, { role: 'user', text: query }]);

    if (lowerQuery.includes('summary')) {
      response = `Summary for ${vehicle.model}: ${report.split('\n').slice(0, 3).join('. ')}`;
    } else if (lowerQuery.includes('problem')) {
      response = `Main issues: Critical brake wear at 78%, low battery voltage.`;
    } else if (lowerQuery.includes('cost')) {
      response = `Estimated cost: ₹10,000 to 17,000 rupees.`;
    } else if (lowerQuery.includes('urgent')) {
      response = `Yes, urgent. Brake pads could fail within 7-10 days.`;
    } else {
      response = `Based on the ${agent.name}, the main concern is brake pad wear.`;
    }

    setConversation(prev => [...prev, { role: 'assistant', text: response }]);
    speakText(response);
  };

  const quickAsk = (question: string) => {
    handleVoiceQuery(question);
  };

  const startListening = () => {
    alert('Voice recognition will work in Chrome browser. For now, use the quick question buttons below!');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className={`p-6 ${agent.color} text-white`}>
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{agent.icon}</span>
                <h2 className="text-3xl font-bold">{agent.name}</h2>
              </div>
              <p className="text-white/90">{vehicle.model} ({vehicle.vehicle_id})</p>
              <p className="text-white/80 text-sm">Owner: {vehicle.owner}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Agent Report</h3>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <span className="ml-4 text-gray-600">Generating report...</span>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-blue-500">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                  {report}
                </pre>
              </div>
            )}
          </div>

          {/* Voice Assistant */}
          <div className="border-t pt-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              🎤 Voice Assistant
              {isSpeaking && <span className="text-sm text-green-600 ml-2 animate-pulse">Speaking...</span>}
            </h3>

            {/* Quick Questions */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => quickAsk('Give me a summary')} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200">
                  📝 Summary
                </button>
                <button onClick={() => quickAsk('What are the problems?')} className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm hover:bg-orange-200">
                  ⚠️ Problems
                </button>
                <button onClick={() => quickAsk('How much will it cost?')} className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200">
                  💰 Cost
                </button>
                <button onClick={() => quickAsk('Is it urgent?')} className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm hover:bg-red-200">
                  🚨 Urgency
                </button>
              </div>
            </div>

            {/* Conversation */}
            {conversation.length > 0 && (
              <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                {conversation.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg ${
                      msg.role === 'user' ? 'bg-blue-100 ml-8' : 'bg-gray-100 mr-8'
                    }`}
                  >
                    <p className="text-xs font-bold mb-1">
                      {msg.role === 'user' ? '👤 You' : '🤖 AI'}
                    </p>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={startListening}
              className="w-full py-4 rounded-xl font-bold text-white bg-blue-500 hover:bg-blue-600 transition"
            >
              🎤 Ask About This Report
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t flex gap-4">
          <button onClick={fetchAgentReport} className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600">
            🔄 Refresh
          </button>
          <button onClick={onClose} className="flex-1 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600">
            ✅ Done
          </button>
        </div>
      </div>
    </div>
  );
}