import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('nav');
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
        fontSize: '6rem',
        fontWeight: 800,
        background: 'linear-gradient(135deg, var(--md-primary) 0%, var(--md-tertiary) 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        lineHeight: 1,
        marginBottom: '1rem',
      }}>
        404
      </div>
      <h1 className="md-headline-medium" style={{ marginBottom: '0.5rem' }}>
        {locale === 'zh-CN' ? '页面未找到' :
         locale === 'zh-TW' ? '頁面未找到' :
         locale === 'es' ? 'Página no encontrada' :
         locale === 'it' ? 'Pagina non trovata' :
         locale === 'ru' ? 'Страница не найдена' :
         locale === 'ja' ? 'ページが見つかりません' :
         locale === 'ko' ? '페이지를 찾을 수 없습니다' :
         'Page Not Found'}
      </h1>
      <p className="md-body-large text-muted" style={{ marginBottom: '2rem', maxWidth: '480px' }}>
        {locale === 'zh-CN' ? '您访问的页面不存在或已被移除。' :
         locale === 'zh-TW' ? '您訪問的頁面不存在或已被移除。' :
         locale === 'es' ? 'La página que buscas no existe o ha sido eliminada.' :
         locale === 'it' ? 'La pagina che stai cercando non esiste o è stata rimossa.' :
         locale === 'ru' ? 'Запрашиваемая страница не существует или была удалена.' :
         locale === 'ja' ? 'お探しのページは存在しないか、削除されました。' :
         locale === 'ko' ? '요청하신 페이지가 존재하지 않거나 삭제되었습니다.' :
         "The page you are looking for does not exist or has been removed."}
      </p>
      <Link href={`/${locale}`} className="btn btn-primary">
        {t('home')}
      </Link>
    </div>
  );
}
