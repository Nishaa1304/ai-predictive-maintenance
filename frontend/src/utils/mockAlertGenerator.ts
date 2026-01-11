import { Alert, ActivityLogEntry } from '../components/AlertSystem';

const vehicleModels = [
  '2020 Maruti Swift',
  '2022 Tata Nexon EV',
  '2021 Hyundai Creta',
  '2023 Mahindra XUV700',
  '2019 Honda City',
  '2022 Kia Seltos',
  '2021 Toyota Fortuner',
  '2020 MG Hector',
  '2023 Tata Punch',
  '2021 Maruti Brezza'
];

const issueTypes = [
  'Brake temperature spike detected',
  'Battery degradation warning - 65% health',
  'Engine temperature above threshold',
  'Oil pressure dropping rapidly',
  'Brake pad wear critical - 90% worn',
  'Coolant level low',
  'Tire pressure abnormal - front left',
  'Transmission fluid temperature high',
  'Battery voltage fluctuation',
  'ABS sensor malfunction',
  'Oxygen sensor failure imminent',
  'Fuel pump pressure irregular'
];

const indianCities = [
  'Mumbai, Maharashtra',
  'Delhi, NCR',
  'Bangalore, Karnataka',
  'Hyderabad, Telangana',
  'Chennai, Tamil Nadu',
  'Pune, Maharashtra',
  'Kolkata, West Bengal',
  'Ahmedabad, Gujarat',
  'Jaipur, Rajasthan',
  'Lucknow, Uttar Pradesh',
  'Indore, Madhya Pradesh',
  'Chandigarh, Punjab'
];

const activityActions = {
  data: [
    'Data Agent scanning vehicle telemetry',
    'Sensor data analysis completed',
    'Real-time diagnostics running',
    'Predictive model evaluating data'
  ],
  diagnosis: [
    'Diagnosis Agent detected anomaly',
    'Component failure prediction generated',
    'Repair cost estimation calculated',
    'Maintenance recommendation created'
  ],
  customer: [
    'Customer Agent initiating call',
    'Personalized script generated',
    'Customer notification sent',
    'Follow-up scheduled'
  ],
  appointment: [
    'Scheduling Agent booking slot',
    'Workshop allocation confirmed',
    'Service appointment created',
    'Technician assigned'
  ],
  security: [
    'UEBA security check passed',
    'Manufacturing insight generated',
    'Data sent to OEM securely',
    'Anomaly pattern detected'
  ]
};

export function generateRandomId(): string {
  return `ALT${Date.now()}${Math.floor(Math.random() * 1000)}`;
}

export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function getRandomInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateMockAlert(): Alert {
  const alertTypes: Alert['alertType'][] = ['critical', 'medium', 'low'];
  const weights = [0.2, 0.4, 0.4]; // 20% critical, 40% medium, 40% low
  
  let alertType: Alert['alertType'];
  const rand = Math.random();
  if (rand < weights[0]) {
    alertType = 'critical';
  } else if (rand < weights[0] + weights[1]) {
    alertType = 'medium';
  } else {
    alertType = 'low';
  }

  return {
    id: generateRandomId(),
    vehicleId: `VEH${Math.floor(Math.random() * 900) + 100}`,
    vehicleModel: getRandomElement(vehicleModels),
    alertType,
    issue: getRandomElement(issueTypes),
    location: getRandomElement(indianCities),
    status: 'analyzing',
    timestamp: new Date()
  };
}

export function generateActivityLog(
  type: ActivityLogEntry['type'],
  customAction?: string
): ActivityLogEntry {
  return {
    id: generateRandomId(),
    timestamp: new Date(),
    action: customAction || getRandomElement(activityActions[type]),
    type
  };
}

export function formatTimestamp(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);

  if (diffSecs < 10) return 'just now';
  if (diffSecs < 60) return `${diffSecs}s ago`;
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
}
