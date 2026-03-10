'use client';

import Link from 'next/link';

interface MobileNavProps {
  links: { href: string; label: string }[];
  onClose: () => void;
}

export default function MobileNav({ links, onClose }: MobileNavProps) {
  return (
    <div className="md:hidden border-t border-border bg-background animate-fade-up">
      <nav className="flex flex-col py-2 px-2">
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="px-3 py-2.5 rounded-md text-[14px] text-muted hover:text-foreground hover:bg-warm-50 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
