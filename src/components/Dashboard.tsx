import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ThreatLevelIndicator } from './ThreatLevelIndicator';
import { 
  Bell, 
  MapPin, 
  Phone, 
  Users, 
  FileText, 
  Activity,
  AlertTriangle,
  Shield,
  Waves,
  Radio
} from 'lucide-react';
import { format } from 'date-fns';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - in real app, this would come from Supabase
  const threatLevels = [
    {
      id: '1',
      level: 'red' as const,
      region: 'Coastal Zone A',
      type: 'tsunami' as const,
      description: 'High tsunami risk detected. Immediate evacuation recommended.',
      updated_at: new Date().toISOString(),
      updated_by: 'System',
      active: true
    },
    {
      id: '2',
      level: 'yellow' as const,
      region: 'Coastal Zone B',
      type: 'flood' as const,
      description: 'Moderate flood risk. Stay alert and avoid low-lying areas.',
      updated_at: new Date(Date.now() - 1800000).toISOString(),
      updated_by: 'Official',
      active: true
    },
    {
      id: '3',
      level: 'green' as const,
      region: 'Coastal Zone C',
      type: 'combined' as const,
      description: 'All clear. Normal conditions maintained.',
      updated_at: new Date(Date.now() - 3600000).toISOString(),
      updated_by: 'System',
      active: true
    }
  ];

  const recentReports = [
    {
      id: '1',
      title: 'Unusual wave patterns observed',
      location: 'Beach Point Alpha',
      severity: 'high' as const,
      status: 'verified' as const,
      created_at: new Date(Date.now() - 900000).toISOString()
    },
    {
      id: '2',
      title: 'Water level rising in harbor',
      location: 'Central Harbor',
      severity: 'medium' as const,
      status: 'pending' as const,
      created_at: new Date(Date.now() - 1800000).toISOString()
    }
  ];

  const emergencyContacts = [
    {
      id: '1',
      name: 'Emergency Operations Center',
      role: 'Primary Emergency Response',
      phone: '+1-800-TSUNAMI',
      region: 'All Zones',
      available_24_7: true,
      priority: 1
    },
    {
      id: '2',
      name: 'Regional Disaster Coordinator',
      role: 'Regional Coordination',
      phone: '+1-555-0199',
      region: 'Coastal Zones A-C',
      available_24_7: true,
      priority: 2
    }
  ];

  const getRoleSpecificActions = () => {
    switch (user?.role) {
      case 'official':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <button className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Issue Alert</span>
            </button>
            <button className="p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Update Threat Level</span>
            </button>
            <button className="p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Manage Personnel</span>
            </button>
            <button className="p-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Generate Report</span>
            </button>
          </div>
        );
      case 'volunteer':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <button className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Submit Report</span>
            </button>
            <button className="p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>Update Location</span>
            </button>
            <button className="p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
              <Radio className="w-5 h-5" />
              <span>Check In</span>
            </button>
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <button className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Report Observation</span>
            </button>
            <button className="p-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>Emergency Call</span>
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Waves className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Threat Detection System
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Welcome back, {user?.name} ({user?.role})
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <MapPin className="w-4 h-4" />
                <span>{user?.region}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-600">System Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Role-specific Actions */}
        {getRoleSpecificActions()}

        {/* Threat Level Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Current Threat Levels
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {threatLevels.map((threat) => (
              <ThreatLevelIndicator
                key={threat.id}
                level={threat.level}
                region={threat.region}
                description={threat.description}
                lastUpdated={format(new Date(threat.updated_at), 'PPp')}
                size="medium"
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Reports */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-blue-600" />
                Recent Reports
              </h3>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {report.title}
                        </h4>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600 dark:text-gray-300">
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {report.location}
                          </span>
                          <span>{format(new Date(report.created_at), 'PPp')}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          report.severity === 'high' ? 'bg-red-100 text-red-800' :
                          report.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {report.severity}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          report.status === 'verified' ? 'bg-green-100 text-green-800' :
                          report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {report.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full py-2 text-blue-600 hover:text-blue-800 font-medium">
                View All Reports
              </button>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-red-600" />
                Emergency Contacts
              </h3>
              <div className="space-y-4">
                {emergencyContacts.map((contact) => (
                  <div key={contact.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {contact.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {contact.role}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <a 
                            href={`tel:${contact.phone}`}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                          >
                            {contact.phone}
                          </a>
                          {contact.available_24_7 && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              24/7
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                System Status
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Active Buoys</span>
                  <span className="font-semibold text-gray-900 dark:text-white">12/12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Last Sensor Update</span>
                  <span className="font-semibold text-green-600">2 min ago</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Active Alerts</span>
                  <span className="font-semibold text-red-600">1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Connected Users</span>
                  <span className="font-semibold text-blue-600">247</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};