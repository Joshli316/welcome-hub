'use client';

import Link from 'next/link';

interface MobileNavProps {
  links: { href: string; label: string }[];
  onClose: () => void;
}

export default function MobileNav({ links, onClose }: MobileNavProps) {
  return (
    <div className="md:hidden border-t border-border bg-background">
      <nav className="flex flex-col p-4 gap-1">
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="px-4 py-3 rounded-lg text-sm font-medium text-muted hover:text-foreground hover:bg-warm-50 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
