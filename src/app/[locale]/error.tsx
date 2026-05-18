'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const locale = useLocale();
  const tc = useTranslations('common');

  return (
    <div style={{
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem',
    }}>
      <div style={{
        fontSize: '4rem',
        marginBottom: '1rem',
      }}>
        ⚠️
      </div>
      <h1 className="md-headline-medium" style={{ marginBottom: '0.5rem' }}>
        {tc('errorTitle')}
      </h1>
      <p className="md-body-large text-muted" style={{ marginBottom: '2rem', maxWidth: '480px' }}>
        {tc('error')}
      </p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={reset} className="btn btn-primary">
          {tc('tryAgain')}
        </button>
        <Link href={`/${locale}`} className="btn btn-elevated">
          {tc('goHome')}
        </Link>
      </div>
    </div>
  );
}
