import React from 'react';
import { CheckCircle2, Circle, Package } from 'lucide-react';
import type { ChecklistItem } from '../types';
import { useTranslation } from 'react-i18next';

interface StatisticsProps {
  items: ChecklistItem[];
}

export function Statistics({ items }: StatisticsProps) {
  const { t } = useTranslation();
  const totalItems = items.length;
  const packedItems = items.filter(item => item.checked).length;
  const progress = Math.round((packedItems / totalItems) * 100) || 0;

  return (
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="text-lg font-medium text-gray-900">{t('statistics.progress')}</h3>
              <p className="text-sm text-gray-600">
                {t('statistics.packedItems', { packedItems, totalItems })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-20 h-20 relative">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="#E5E7EB"
                    strokeWidth="8"
                    fill="none"
                />
                <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="#2563EB"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 36}`}
                    strokeDashoffset={`${2 * Math.PI * 36 * (1 - progress / 100)}`}
                    className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-gray-900">
                {progress} {t('statistics.percent')}
              </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span className="text-sm text-gray-600">
            {t('statistics.packed')} {packedItems}
          </span>
          </div>
          <div className="flex items-center gap-2">
            <Circle className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">
            {t('statistics.pending')} {totalItems - packedItems}
          </span>
          </div>
        </div>
      </div>
  );
}
