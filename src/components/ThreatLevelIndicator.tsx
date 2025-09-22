import React from 'react';
import { AlertTriangle, Shield, AlertCircle } from 'lucide-react';

interface ThreatLevelIndicatorProps {
  level: 'green' | 'yellow' | 'red';
  region: string;
  description: string;
  lastUpdated: string;
  size?: 'small' | 'medium' | 'large';
}

export const ThreatLevelIndicator: React.FC<ThreatLevelIndicatorProps> = ({
  level,
  region,
  description,
  lastUpdated,
  size = 'medium'
}) => {
  const getColorClasses = () => {
    switch (level) {
      case 'green':
        return {
          bg: 'bg-green-100 dark:bg-green-900/20',
          border: 'border-green-500',
          text: 'text-green-800 dark:text-green-200',
          icon: 'text-green-600',
          badge: 'bg-green-500'
        };
      case 'yellow':
        return {
          bg: 'bg-yellow-100 dark:bg-yellow-900/20',
          border: 'border-yellow-500',
          text: 'text-yellow-800 dark:text-yellow-200',
          icon: 'text-yellow-600',
          badge: 'bg-yellow-500'
        };
      case 'red':
        return {
          bg: 'bg-red-100 dark:bg-red-900/20',
          border: 'border-red-500',
          text: 'text-red-800 dark:text-red-200',
          icon: 'text-red-600',
          badge: 'bg-red-500'
        };
    }
  };

  const getIcon = () => {
    switch (level) {
      case 'green':
        return <Shield className={`${colors.icon} ${iconSize}`} />;
      case 'yellow':
        return <AlertCircle className={`${colors.icon} ${iconSize}`} />;
      case 'red':
        return <AlertTriangle className={`${colors.icon} ${iconSize}`} />;
    }
  };

  const getStatusText = () => {
    switch (level) {
      case 'green':
        return 'SAFE';
      case 'yellow':
        return 'MODERATE RISK';
      case 'red':
        return 'EXTREME RISK';
    }
  };

  const colors = getColorClasses();
  const iconSize = size === 'large' ? 'w-8 h-8' : size === 'medium' ? 'w-6 h-6' : 'w-4 h-4';
  const cardSize = size === 'large' ? 'p-6' : size === 'medium' ? 'p-4' : 'p-3';

  return (
    <div className={`${colors.bg} ${colors.border} border-2 rounded-lg ${cardSize} transition-all duration-300 hover:shadow-lg`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          {getIcon()}
          <div>
            <div className={`flex items-center space-x-2 ${size === 'large' ? 'mb-2' : 'mb-1'}`}>
              <span className={`${colors.badge} w-3 h-3 rounded-full animate-pulse`}></span>
              <span className={`font-bold ${colors.text} ${size === 'large' ? 'text-lg' : 'text-sm'}`}>
                {getStatusText()}
              </span>
            </div>
            <h3 className={`font-semibold ${colors.text} ${size === 'large' ? 'text-xl' : size === 'medium' ? 'text-lg' : 'text-base'}`}>
              {region}
            </h3>
            <p className={`${colors.text} opacity-80 ${size === 'large' ? 'text-base mt-2' : 'text-sm mt-1'}`}>
              {description}
            </p>
          </div>
        </div>
      </div>
      <div className={`${size === 'large' ? 'mt-4' : 'mt-2'} text-xs ${colors.text} opacity-60`}>
        Last updated: {lastUpdated}
      </div>
    </div>
  );
};