import React from 'react';
import { Search, MapPin, AlertCircle, Globe } from 'lucide-react';
import { searchLocations } from '../services/weather';
import { POPULAR_CITIES } from '../constants/cities';
import type { Location } from '../types';
import {useTranslation} from "react-i18next";

interface LocationSearchProps {
  onSelect: (location: Location) => void;
}

export function LocationSearch({ onSelect }: LocationSearchProps) {
  const { t } = useTranslation();
  const [query, setQuery] = React.useState('');
  const [locations, setLocations] = React.useState<Location[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [selectedLocation, setSelectedLocation] = React.useState<Location | null>(null);

  const searchTimeout = React.useRef<number>();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSearch = React.useCallback(async (searchQuery: string) => {
    try {
      setLoading(true);
      setError(null);
      const results = await searchLocations(searchQuery || '北京'); // 默认搜索北京
      setLocations(results);
      setShowDropdown(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('common.searchError'));
      setLocations([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedLocation(null);

    if (searchTimeout.current) {
      window.clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = window.setTimeout(() => {
      handleSearch(value);
    }, 300);
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setQuery(`${location.name}${location.region ? `, ${location.region}` : ''}, ${location.country}`);
    setShowDropdown(false);
    onSelect(location);
  };

  // 处理输入框获得焦点
  const handleInputFocus = () => {
    setShowDropdown(true);
    if (!locations.length) {
      handleSearch('');
    }
  };

  // 点击外部关闭下拉框
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
        if (!selectedLocation) {
          setQuery('');
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [selectedLocation]);

  return (
    <div className="relative" ref={inputRef}>
      <div className="relative">
        <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder={t('form.destination.placeholder')}
            className={`w-full rounded-md pl-10 pr-4 shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                selectedLocation ? 'border-green-500' : 'border-gray-300'
            }`}
            autoComplete="off"
        />


        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
      </div>

      {!selectedLocation && query && !showDropdown && (
          <div className="mt-1 flex items-center gap-1 text-sm text-amber-600">
            <AlertCircle className="w-4 h-4"/>
            <span>{t('common.selectLocation')}</span>
          </div>
      )}

      {error && (
          <div className="mt-1 text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      {showDropdown && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200">
          {loading ? (
            <div className="p-4 text-center text-gray-500">
              <div className="flex items-center justify-center gap-2">
                <Globe className="w-5 h-5 animate-spin" />
                {t('common.searching')}
              </div>
            </div>
          ) : (
            <>
              {!query && (
                <div className="p-3 border-b border-gray-100">
                  <div className="text-sm font-medium text-gray-700 mb-2">{t('common.popularCities')}</div>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_CITIES.map((city) => (
                      <button
                        key={city.name}
                        onClick={() => handleLocationSelect(city)}
                        className="px-3 py-1 text-sm bg-gray-50 hover:bg-gray-100 rounded-full"
                      >
                        {city.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <ul className="max-h-60 overflow-auto">
                {locations.map((location) => (
                  <li
                    key={`${location.lat}-${location.lon}`}
                    className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2"
                    onClick={() => handleLocationSelect(location)}
                  >
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="font-medium">{location.name}</div>
                      <div className="text-sm text-gray-500">
                        {location.region && `${location.region}, `}{location.country}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}