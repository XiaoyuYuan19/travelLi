import React from 'react';
import { useTranslation } from 'react-i18next';
import type { ChecklistItem } from '../types';
import { ChecklistItem as ChecklistItemComponent } from './ChecklistItem';

interface CategoryListProps {
  category: string;
  items: ChecklistItem[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function CategoryList({ category, items, onToggle, onDelete }: CategoryListProps) {
  const { t } = useTranslation();
  const categoryItems = items.filter(item => item.category === category);
  const completedCount = categoryItems.filter(item => item.checked).length;
  const progress = (completedCount / categoryItems.length) * 100;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium text-gray-900">
          {t(`categories.${category}`)}
        </h3>
        <span className="text-sm text-gray-600">
          {t('categories.progress', { completed: completedCount, total: categoryItems.length })}
        </span>
      </div>
      
      <div className="h-2 bg-gray-200 rounded-full mb-4">
        <div 
          className="h-full bg-blue-600 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="space-y-1">
        {categoryItems.map((item) => (
          <ChecklistItemComponent
            key={item.id}
            item={item}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}