'use client';

import { useState } from 'react';
import MobileNav from './MobileNav';

interface MobileMenuToggleProps {
  links: { href: string; label: string }[];
}

// Client island — only this component ships JS to the browser.
// Renders the hamburger button inline and the nav overlay via a
// portal-style absolute position so it appears below the header bar.
export default function MobileMenuToggle({ links }: MobileMenuToggleProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="p-2.5 -mr-2 rounded-md hover:bg-warm-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Overlay positioned below the sticky header bar */}
      {open && (
        <div className="absolute top-full left-0 right-0">
          <MobileNav links={links} onClose={() => setOpen(false)} />
        </div>
      )}
    </>
  );
}
