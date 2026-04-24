'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const locale = useLocale();

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
        {locale === 'zh' ? '出了点问题' : 'Something Went Wrong'}
      </h1>
      <p className="md-body-large text-muted" style={{ marginBottom: '2rem', maxWidth: '480px' }}>
        {locale === 'zh'
          ? '我们遇到了一个意外错误，请稍后重试。'
          : 'We encountered an unexpected error. Please try again.'}
      </p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={reset} className="btn btn-primary">
          {locale === 'zh' ? '重试' : 'Try Again'}
        </button>
        <Link href={`/${locale}`} className="btn btn-elevated">
          {locale === 'zh' ? '返回首页' : 'Go Home'}
        </Link>
      </div>
    </div>
  );
}
