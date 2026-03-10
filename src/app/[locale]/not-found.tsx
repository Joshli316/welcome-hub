import Link from 'next/link';

// Custom 404 page — shown when a route doesn't exist under this locale
export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-6xl font-light text-primary-500 mb-4">404</p>
        <h1 className="text-2xl mb-3">Page Not Found</h1>
        <p className="text-muted mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-foreground text-background rounded-lg text-sm font-semibold hover:bg-foreground/85 transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/resources"
            className="px-6 py-3 text-foreground rounded-lg text-sm font-semibold hover:bg-warm-100 transition-colors border border-border"
          >
            Browse Resources
          </Link>
        </div>
      </div>
    </div>
  );
}
