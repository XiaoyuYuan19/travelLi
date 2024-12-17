import React from 'react';
import { Plus } from 'lucide-react';
import { ChecklistItem as ChecklistItemComponent } from './ChecklistItem';
import type { ChecklistItem } from '../types';
import { useTranslation } from 'react-i18next';

interface ChecklistProps {
  items: ChecklistItem[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: (item: Omit<ChecklistItem, 'id'>) => void;
}

export function Checklist({ items, onToggle, onDelete, onAdd }: ChecklistProps) {
  const [newItemName, setNewItemName] = React.useState('');
  const [newItemCategory, setNewItemCategory] = React.useState('essentials');
  const { t } = useTranslation();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItemName.trim()) {
      onAdd({
        name: newItemName.trim(),
        category: newItemCategory,
        checked: false,
        isCustom: true,
      });
      setNewItemName('');
    }
  };

  const categories = Array.from(new Set(items.map((item) => item.category)));

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Add new item..."
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <select
          value={newItemCategory}
          onChange={(e) => setNewItemCategory(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add
        </button>
      </form>

      {categories.map((category) => (
        <div key={category} className="space-y-2">
          <h3 className="font-medium text-lg text-gray-900 capitalize">
            {category}
          </h3>
          <div className="space-y-1">
            {items
              .filter((item) => item.category === category)
              .map((item) => (
                <ChecklistItemComponent
                  key={item.id}
                  item={item}
                  onToggle={onToggle}
                  onDelete={onDelete}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}