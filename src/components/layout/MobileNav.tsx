'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

interface MobileNavProps {
  links: { href: string; label: string }[];
  onClose: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function MobileNav({ links, onClose }: MobileNavProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Focus the first focusable element when dialog opens
    const focusableEls = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE));
    focusableEls[0]?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || focusableEls.length === 0) return;

      const first = focusableEls[0];
      const last = focusableEls[focusableEls.length - 1];

      if (e.shiftKey) {
        // Shift+Tab: if on first element, wrap to last
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        // Tab: if on last element, wrap to first
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-label="Navigation menu"
      aria-modal="true"
      className="md:hidden border-t border-white/10 bg-[#2a2520]/98 backdrop-blur-xl animate-fade-up"
    >
      <nav className="flex flex-col py-2 px-2">
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="px-3 py-2.5 rounded-md text-[14px] text-white/50 hover:text-white hover:bg-white/8 transition-colors focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
