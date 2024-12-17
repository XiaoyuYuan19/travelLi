import React from 'react';
import { useTranslation } from 'react-i18next';
import { Luggage } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Header() {
  const { t } = useTranslation();

  return (
    <div className="text-center mb-8">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1" />
        <div className="flex justify-center flex-1">
          <Luggage className="h-12 w-12 text-blue-600" />
        </div>
        <div className="flex-1 flex justify-end">
          <LanguageSwitcher />
        </div>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        {t('app.title')}
      </h1>
      <p className="text-lg text-gray-600">
        {t('app.subtitle')}
      </p>
    </div>
  );
}