import React from 'react';
import { MapPin, Calendar, CloudSun, Activity } from 'lucide-react';
import { WeatherForecast } from './WeatherForecast';
import type { TravelDetails } from '../types';
import { useTranslation } from 'react-i18next';

interface TripSummaryProps {
  details: TravelDetails;
  onEdit: () => void;
}

export function TripSummary({ details, onEdit }: TripSummaryProps) {

  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                {details.destination}
              </h2>
            </div>
            
            <div className="flex flex-wrap gap-4 text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{t(details.days)}</span>
              </div>
              
              {details.activities && details.activities.length > 0 && (
                <div className="flex items-center gap-1">
                  <Activity className="w-4 h-4" />
                  <span>{details.activities.map(a => a.name).join(', ')}</span>
                </div>
              )}
            </div>
          </div>
          
          <button
            onClick={onEdit}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            {t('edit')}
          </button>
        </div>
      </div>

      <WeatherForecast city={details.destination} />
    </div>
  );
}