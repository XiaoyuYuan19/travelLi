// 环境变量配置
export const config = {
  openai: {
    apiKey: import.meta.env.VITE_OPENAI_API_KEY as string,
  },
  weather: {
    apiKey: import.meta.env.VITE_WEATHER_API_KEY as string,
  }
} as const;

// 验证环境变量
export function validateEnv() {
  if (!config.openai.apiKey) {
    throw new Error('OpenAI API key is required');
  }
  if (!config.weather.apiKey) {
    throw new Error('Weather API key is required');
  }
}