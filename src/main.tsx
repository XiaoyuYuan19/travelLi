import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { validateEnv } from './config/env';
import './i18n';
import './index.css';

// 验证环境变量
validateEnv();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);