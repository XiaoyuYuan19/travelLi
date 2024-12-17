import { config } from '../config/env';

interface Location {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
}

interface WeatherForecast {
  date: string;
  maxtemp_c: number;
  mintemp_c: number;
  avgtemp_c: number;
  condition: {
    text: string;
    icon: string;
  };
  daily_chance_of_rain: number;
  maxwind_kph: number;
  humidity: number;
  uv: number;
  sunrise: string;
  sunset: string;
}

interface WeatherResponse {
  location: {
    name: string;
    country: string;
    localtime: string;
  };
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        avgtemp_c: number;
        condition: {
          text: string;
          icon: string;
        };
        daily_chance_of_rain: number;
        maxwind_kph: number;
        avghumidity: number;
        uv: number;
      };
      astro: {
        sunrise: string;
        sunset: string;
      };
    }>;
  };
}

export async function searchLocations(query: string): Promise<Location[]> {
  if (!query.trim()) return [];
  
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=${config.weather.apiKey}&q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error('Location search failed');
    }

    const data: Location[] = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to search locations:', error);
    throw new Error('搜索地点失败');
  }
}

export async function getWeatherForecast(city: string): Promise<WeatherForecast[]> {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${config.weather.apiKey}&q=${encodeURIComponent(city)}&days=14&aqi=no`
    );

    if (!response.ok) {
      throw new Error('Weather API request failed');
    }

    const data: WeatherResponse = await response.json();
    
    return data.forecast.forecastday.map(day => ({
      date: day.date,
      maxtemp_c: day.day.maxtemp_c,
      mintemp_c: day.day.mintemp_c,
      avgtemp_c: day.day.avgtemp_c,
      condition: day.day.condition,
      daily_chance_of_rain: day.day.daily_chance_of_rain,
      maxwind_kph: day.day.maxwind_kph,
      humidity: day.day.avghumidity,
      uv: day.day.uv,
      sunrise: day.astro.sunrise,
      sunset: day.astro.sunset
    }));
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    throw new Error('获取天气数据失败');
  }
}