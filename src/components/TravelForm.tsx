import React from 'react';
import { Plane, Calendar, Briefcase, Hotel, Bus } from 'lucide-react';
import { LocationSearch } from './LocationSearch';
import type { TravelDetails, TravelPurpose, Activity, Location } from '../types';
import { useTranslation } from 'react-i18next';


interface TravelFormProps {
  onSubmit: (details: TravelDetails) => void;
  initialDetails?: TravelDetails | null;
  isLoading?: boolean;
}

const DEFAULT_DETAILS: TravelDetails = {
  destination: '',
  days: 1,
  purpose: {
    type: 'leisure',
  },
  activities: [],
  accommodation: 'hotel',
  transportation: ['public'],
};



export function TravelForm({ onSubmit, initialDetails, isLoading }: TravelFormProps) {
  const [details, setDetails] = React.useState<TravelDetails>(
    initialDetails || DEFAULT_DETAILS
  );

  // 在组件内调用 useTranslation
  const { t } = useTranslation();

  const TRAVEL_PURPOSES = {
    business: t('form.purpose.types.business'),
    leisure: t('form.purpose.types.leisure'),
    study: t('form.purpose.types.study'),
    family: t('form.purpose.types.family'),
    adventure: t('form.purpose.types.adventure'),
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(details);
  };

  const handleLocationSelect = (location: Location) => {
    setDetails(prev => ({
      ...prev,
      destination: `${location.name}, ${location.country}`
    }));
  };

  const handleActivityAdd = () => {
    setDetails(prev => ({
      ...prev,
      activities: [
        ...prev.activities,
        {
          name: '',
          description: '',
          duration: 2,
        },
      ],
    }));
  };

  const handleActivityChange = (index: number, field: keyof Activity, value: string | number) => {
    setDetails(prev => ({
      ...prev,
      activities: prev.activities.map((activity, i) =>
        i === index ? { ...activity, [field]: value } : activity
      ),
    }));
  };

  const handleActivityRemove = (index: number) => {
    setDetails(prev => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== index),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="flex items-center gap-2 text-lg font-medium text-gray-700">
          <Plane className="w-5 h-5" />
          {t('form.destination.label')}
        </label>
        <div className="mt-1">
          <LocationSearch onSelect={handleLocationSelect} />
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 text-lg font-medium text-gray-700">
          <Calendar className="w-5 h-5" />
          {t('form.days.label')}
        </label>
        <input
          type="number"
          min="1"
          value={details.days}
          onChange={(e) => setDetails(prev => ({ ...prev, days: Math.max(1, parseInt(e.target.value) || 1) }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-lg font-medium text-gray-700">
          <Briefcase className="w-5 h-5" />
          {t('form.purpose.label')}
        </label>
        <select
          value={details.purpose.type}
          onChange={(e) => setDetails(prev => ({
            ...prev,
            purpose: { type: e.target.value as TravelPurpose['type'] }
          }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {Object.entries(TRAVEL_PURPOSES).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        <textarea
          value={details.purpose.description || ''}
          onChange={(e) => setDetails(prev => ({
            ...prev,
            purpose: { ...prev.purpose, description: e.target.value }
          }))}
          placeholder={t('form.purpose.placeholder')}
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-lg font-medium text-gray-700">
          <Hotel className="w-5 h-5" />
          {t('form.accommodation.label')}
        </label>
        <select
          value={details.accommodation}
          onChange={(e) => setDetails(prev => ({
            ...prev,
            accommodation: e.target.value as TravelDetails['accommodation']
          }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="hotel">{t('form.accommodation.types.hotel')} </option>
          <option value="hostel">{t('form.accommodation.types.hostel')}</option>
          <option value="apartment">{t('form.accommodation.types.apartment')}</option>
          <option value="camping">{t('form.accommodation.types.camping')}</option>
          <option value="other">{t('form.accommodation.types.other')}</option>
        </select>
      </div>

      <div>
        <label className="flex items-center gap-2 text-lg font-medium text-gray-700">
          <Bus className="w-5 h-5" />
          {t('form.transportation.label')}
        </label>
        <div className="mt-2 space-y-2">
          {['walk', 'public', 'car', 'bike'].map((mode) => (
            <label key={mode} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                checked={details.transportation.includes(mode)}
                onChange={(e) => {
                  const newTransportation = e.target.checked
                    ? [...details.transportation, mode]
                    : details.transportation.filter(t => t !== mode);
                  setDetails(prev => ({ ...prev, transportation: newTransportation }));
                }}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2">{
                {
                  walk: t('form.transportation.types.walk'),
                  public: t('form.transportation.types.public'),
                  car: t('form.transportation.types.car'),
                  bike: t('form.transportation.types.bike'),
                }[mode]
              }</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-lg font-medium text-gray-700">
            {t('form.activities.label')}
          </label>
          <button
            type="button"
            onClick={handleActivityAdd}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {t('form.activities.add')}
          </button>
        </div>
        <div className="space-y-4">
          {details.activities.map((activity, index) => (
            <div key={index} className="border rounded-md p-4">
              <div className="flex justify-between mb-2">
                <input
                  type="text"
                  value={activity.name}
                  onChange={(e) => handleActivityChange(index, 'name', e.target.value)}
                  placeholder={t('form.activities.name')}
                  className="w-2/3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => handleActivityRemove(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  {t('form.activities.delete')}
                </button>
              </div>
              <textarea
                value={activity.description}
                onChange={(e) => handleActivityChange(index, 'description', e.target.value)}
                placeholder={t('form.activities.description')}
                className="mt-2 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={2}
              />
              <div className="mt-2">
                <label className="text-sm text-gray-600">
                  {t('form.activities.duration')}
                </label>
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={activity.duration}
                  onChange={(e) => handleActivityChange(index, 'duration', parseFloat(e.target.value))}
                  className="ml-2 w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || !details.destination}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? t('form.generating') : t('form.submit')}
      </button>
    </form>
  );
}