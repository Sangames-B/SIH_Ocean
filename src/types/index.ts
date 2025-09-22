export interface User {
  id: string;
  email: string;
  role: 'volunteer' | 'official' | 'ngo' | 'citizen';
  name: string;
  region: string;
  phone?: string;
  organization?: string;
  created_at: string;
}

export interface ThreatLevel {
  id: string;
  level: 'green' | 'yellow' | 'red';
  region: string;
  type: 'tsunami' | 'flood' | 'combined';
  description: string;
  updated_at: string;
  updated_by: string;
  active: boolean;
}

export interface Report {
  id: string;
  user_id: string;
  type: 'observation' | 'buoy_data' | 'citizen_report' | 'official_assessment';
  title: string;
  description: string;
  location: string;
  coordinates?: { lat: number; lng: number };
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'verified' | 'dismissed' | 'escalated';
  created_at: string;
  verified_by?: string;
  images?: string[];
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  type: 'warning' | 'watch' | 'advisory' | 'emergency';
  regions: string[];
  created_at: string;
  expires_at: string;
  issued_by: string;
  active: boolean;
}

export interface EmergencyContact {
  id: string;
  name: string;
  role: string;
  phone: string;
  email?: string;
  region: string;
  available_24_7: boolean;
  priority: number;
}