import React from 'react';
import { useTranslation } from 'react-i18next';
import { Trash2 } from 'lucide-react';
import type { ChecklistItem as ChecklistItemType } from '../types';

interface ChecklistItemProps {
  item: ChecklistItemType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ChecklistItem({ item, onToggle, onDelete }: ChecklistItemProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center space-x-3 py-2">
      <input
        type="checkbox"
        checked={item.checked}
        onChange={() => onToggle(item.id)}
        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        aria-label={t('common.toggleItem')}
      />
      <div className="flex-1">
        <span className={`${item.checked ? 'line-through text-gray-500' : ''}`}>
          {item.name}
        </span>
        {item.description && (
          <p className="text-sm text-gray-500 mt-1">{item.description}</p>
        )}
        {item.notes && (
          <p className="text-xs text-blue-600 mt-1">{item.notes}</p>
        )}
      </div>
      <button
        onClick={() => onDelete(item.id)}
        className="text-red-500 hover:text-red-700 focus:outline-none"
        aria-label={t('common.delete')}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}