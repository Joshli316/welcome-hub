'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface DashboardLoginProps {
  onLogin: (pin: string) => boolean;
}

// Simple PIN-based login gate for the dashboard prototype
export default function DashboardLogin({ onLogin }: DashboardLoginProps) {
  const t = useTranslations('dashboard');
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(pin);
    if (!success) {
      setError(true);
      setPin('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-warm-50">
      <div className="bg-white rounded-xl border border-border p-8 shadow-sm w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">🔒</div>
          <h1 className="text-xl font-bold mb-1">{t('title')}</h1>
          <p className="text-sm text-muted">{t('loginSubtitle')}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={pin}
            onChange={e => { setPin(e.target.value); setError(false); }}
            placeholder={t('pinPlaceholder')}
            className="w-full px-4 py-3 border border-border rounded-lg text-center text-lg tracking-widest mb-3 focus:outline-none focus:ring-2 focus:ring-primary-300"
            maxLength={8}
            autoFocus
          />
          {error && (
            <p className="text-red-500 text-sm text-center mb-3">{t('wrongPin')}</p>
          )}
          <button
            type="submit"
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            {t('login')}
          </button>
        </form>

        <p className="text-xs text-muted text-center mt-4">{t('defaultPinHint')}</p>
      </div>
    </div>
  );
}
