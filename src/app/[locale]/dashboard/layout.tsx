'use client';

import { useDashboardAuth } from '@/hooks/useDashboard';
import { useTranslations } from 'next-intl';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardLogin from '@/components/dashboard/DashboardLogin';
import LanguageToggle from '@/components/layout/LanguageToggle';

// Dashboard has its own layout — sidebar nav, no main site header/footer.
// Protected by a simple PIN gate (prototype, no real auth).
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { authed, login, logout } = useDashboardAuth();
  const tCommon = useTranslations('common');

  if (!authed) {
    return <DashboardLogin onLogin={login} />;
  }

  // Uses fixed positioning to overlay the parent layout's Header/Footer
  return (
    <div className="fixed inset-0 z-50 flex bg-warm-50">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="h-14 border-b border-border bg-white px-6 flex items-center justify-end gap-4">
          <LanguageToggle />
          <button
            onClick={logout}
            className="text-xs text-muted hover:text-foreground transition-colors"
          >
            {tCommon('logout')}
          </button>
        </div>
        {/* Page content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
