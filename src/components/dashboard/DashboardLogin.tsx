'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';

interface DashboardLoginProps {
  onLogin: (pin: string) => boolean;
}

// Max failed attempts before temporary lockout
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 30_000; // 30 seconds

// Simple PIN-based login gate for the dashboard prototype
export default function DashboardLogin({ onLogin }: DashboardLoginProps) {
  const t = useTranslations('dashboard');
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [locked, setLocked] = useState(false);
  const attemptsRef = useRef(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (locked) return;

    const success = onLogin(pin);
    if (!success) {
      attemptsRef.current += 1;
      setError(true);
      setPin('');
      // Lock out after too many failed attempts
      if (attemptsRef.current >= MAX_ATTEMPTS) {
        setLocked(true);
        setTimeout(() => {
          setLocked(false);
          attemptsRef.current = 0;
        }, LOCKOUT_MS);
      }
    } else {
      attemptsRef.current = 0;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-warm-50">
      <div className="bg-white rounded-xl border border-border p-8 shadow-sm w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="text-4xl mb-3" aria-hidden="true">🔒</div>
          <h1 className="text-xl font-bold mb-1">{t('title')}</h1>
          <p className="text-sm text-muted">{t('loginSubtitle')}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="dashboard-pin" className="sr-only">{t('pinPlaceholder')}</label>
          <input
            id="dashboard-pin"
            type="password"
            value={pin}
            onChange={e => { setPin(e.target.value); setError(false); }}
            placeholder={t('pinPlaceholder')}
            className="w-full px-4 py-3 border border-border rounded-lg text-center text-lg tracking-widest mb-3 focus:outline-none focus:ring-2 focus:ring-primary-300"
            maxLength={8}
            autoFocus
            aria-describedby={error ? 'pin-error' : undefined}
          />
          {error && !locked && (
            <p id="pin-error" role="alert" className="text-red-500 text-sm text-center mb-3">{t('wrongPin')}</p>
          )}
          {locked && (
            <p role="alert" className="text-red-500 text-sm text-center mb-3">
              Too many attempts. Please wait 30 seconds.
            </p>
          )}
          <button
            type="submit"
            disabled={locked}
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t('login')}
          </button>
        </form>

        <p className="text-xs text-muted text-center mt-4">{t('defaultPinHint')}</p>
      </div>
    </div>
  );
}
