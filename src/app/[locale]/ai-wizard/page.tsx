import { useTranslations, useLocale } from 'next-intl';
import { Sparkles } from 'lucide-react';
import { WizardProvider } from './_components/WizardContext';
import WizardShell from './_components/WizardShell';
import styles from './page.module.css';

export default function AIWizardPage() {
  const t      = useTranslations('aiWizard');
  const locale = useLocale();

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div className={styles.headerBadge}>
              <Sparkles size={14} />
              {t('label')}
            </div>
            <h1 className={`md-display-small ${styles.headerTitle}`}>
              {t('title')}
            </h1>
            <p className={`md-body-large ${styles.headerSubtitle}`}>
              {t('subtitle')}
            </p>
          </div>
        </div>
        <div className={styles.headerDeco} aria-hidden />
      </div>

      {/* Wizard card */}
      <div className="container">
        <div className={styles.wizardCard}>
          <WizardProvider>
            <WizardShell locale={locale} />
          </WizardProvider>
        </div>
      </div>
    </div>
  );
}
