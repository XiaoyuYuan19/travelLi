import React from 'react';
import { Cloud, Droplets, Wind, Sun, Sunrise, Sunset, Thermometer, Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import { getWeatherForecast } from '../services/weather';
import { useTranslation } from 'react-i18next';

interface WeatherForecastProps {
  city: string;
}

export function WeatherForecast({ city }: WeatherForecastProps) {

  const { t } = useTranslation();
  const [forecast, setForecast] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedDay, setSelectedDay] = React.useState<number | null>(null);
  const [view, setView] = React.useState<'week' | 'full'>('week');

  React.useEffect(() => {
    async function fetchWeather() {
      try {
        setLoading(true);
        setError(null);
        const data = await getWeatherForecast(city);
        setForecast(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : t('errors.unknown'));
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [city]);

  const displayedForecast = view === 'week' ? forecast.slice(0, 7) : forecast;

  // 计算温度趋势
  const calculateTrends = () => {
    if (forecast.length === 0) return null;

    const temps = forecast.map(day => day.avgtemp_c);
    const maxTemp = Math.max(...temps);
    const minTemp = Math.min(...temps);
    const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;
    
    const rainDays = forecast.filter(day => day.daily_chance_of_rain > 50).length;
    
    return {
      maxTemp: Math.round(maxTemp),
      minTemp: Math.round(minTemp),
      avgTemp: Math.round(avgTemp),
      rainDays,
      rainPercentage: Math.round((rainDays / forecast.length) * 100)
    };
  };

  const trends = calculateTrends();

  if (loading) {
    return (
      <div className="animate-pulse bg-white rounded-lg p-6 shadow-sm">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
        {error}
      </div>
    );
  }

  const getUVLevel = (uv: number) => {
    if (uv <= 2) return { text: t('weather.details.uv.low'), color: 'text-green-500' };
    if (uv <= 5) return { text: t('weather.details.uv.moderate'), color: 'text-yellow-500' };
    if (uv <= 7) return { text: t('weather.details.uv.high'), color: 'text-orange-500' };
    return { text: t('weather.details.uv.extreme'), color: 'text-red-500' };
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">
          {view === 'week' ? t('weather.title.week') : t('weather.title.full')}
        </h3>

        <button
            onClick={() => setView(view === 'week' ? 'full' : 'week')}
            className="text-sm text-blue-600 hover:text-blue-800"
        >
          {view === 'week' ?  t('weather.showMore') : t('weather.showLess')}
        </button>
      </div>

      {trends && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 bg-blue-50 p-4 rounded-lg">
            <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">{t('weather.stats.avgTemp')}</div>
            <div className="text-2xl font-bold text-blue-600">{trends.avgTemp}°C</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">{t('weather.stats.tempRange')}</div>
            <div className="text-2xl font-bold text-blue-600">
              {trends.minTemp}° - {trends.maxTemp}°
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">{t('weather.stats.rainDays')}</div>
            <div className="text-2xl font-bold text-blue-600">{trends.rainDays}天</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">{t('weather.stats.rainChance')}</div>
            <div className="text-2xl font-bold text-blue-600">{trends.rainPercentage}%</div>
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <div className="inline-flex gap-4 pb-2">
          {displayedForecast.map((day, index) => (
            <div
              key={day.date}
              className={`flex flex-col items-center bg-gray-50 rounded-lg p-4 min-w-[140px] cursor-pointer transition-all
                ${selectedDay === index ? 'ring-2 ring-blue-500 shadow-md' : 'hover:bg-gray-100'}
              `}
              onClick={() => setSelectedDay(selectedDay === index ? null : index)}
            >
              <div className="text-sm text-gray-600 mb-2">
                {new Date(day.date).toLocaleDateString('zh-CN', {
                  month: 'short',
                  day: 'numeric',
                  weekday: 'short',
                })}
              </div>
              
              <img
                src={`https:${day.condition.icon}`}
                alt={day.condition.text}
                className="w-12 h-12 mb-2"
              />
              
              <div className="text-sm font-medium text-gray-900 mb-1">
                {day.condition.text}
              </div>
              
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {Math.round(day.avgtemp_c)}°C
              </div>
              
              <div className="text-sm text-gray-600 space-y-1">
                <div className="flex items-center gap-1">
                  <Thermometer className="w-4 h-4" />
                  {Math.round(day.mintemp_c)}° / {Math.round(day.maxtemp_c)}°
                </div>
                
                <div className="flex items-center gap-1">
                  <Droplets className="w-4 h-4" />
                  {day.daily_chance_of_rain}%
                </div>
                
                <div className="flex items-center gap-1">
                  <Wind className="w-4 h-4" />
                  {Math.round(day.maxwind_kph)} km/h
                </div>
              </div>

              {selectedDay === index && (
                <div className="mt-4 pt-4 border-t border-gray-200 w-full space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">湿度</span>
                    <span>{day.humidity}%</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">紫外线</span>
                    <span className={getUVLevel(day.uv).color}>
                      {getUVLevel(day.uv).text}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <Sunrise className="w-4 h-4 text-gray-600" />
                    <span>{day.sunrise}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <Sunset className="w-4 h-4 text-gray-600" />
                    <span>{day.sunset}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 mb-2">{t('weather.analysis.title')}</h4>

        <p className="text-sm text-gray-600">
          {t('weather.analysis.template', {
            city,
            days: view === 'week' ? '7' : '14',
            temp: trends?.avgTemp || 0 > 20 ? t('weather.warm') : t('weather.cool'),
            min: trends?.minTemp,
            max: trends?.maxTemp,
            rainDays: trends?.rainDays,
            extra: trends?.avgTemp > 25 ? t('weather.hot') : trends?.avgTemp < 10 ? t('weather.cold') : '',
          })}
        </p>

      </div>

      <div className="mt-4 text-sm text-gray-500">
        <p>{t('weather.tip')}</p>
      </div>
    </div>
  );
}