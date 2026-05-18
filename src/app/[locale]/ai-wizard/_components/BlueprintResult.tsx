'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowRight, Calendar, DollarSign, Layers, Palette, Code2, Search, RotateCcw, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWizard } from './WizardContext';
import { generateBlueprint, type Blueprint } from './blueprintGenerator';
import { generatePreviewHTML } from './previewGenerator';
import PreviewModal from './PreviewModal';
import styles from '../page.module.css';

export default function BlueprintResult() {
  const t      = useTranslations('aiWizard.blueprint');
  const locale = useLocale();
  const { answers, reset } = useWizard();

  const [blueprint, setBlueprint]       = useState<Blueprint | null>(null);
  const [loadingText, setLoadingText]   = useState('');
  const [previewOpen, setPreviewOpen]   = useState(false);
  const [previewHtml, setPreviewHtml]   = useState('');

  const isZh = locale.startsWith('zh');

  const loadingMessages = locale === 'zh-TW'
    ? ['分析行業競爭態勢...', '匹配最佳技術架構...', '優化頁面轉化路徑...', '生成個性化解決方案...']
    : isZh
    ? ['分析行业竞争态势...', '匹配最佳技术架构...', '优化页面转化路径...', '生成个性化解决方案...']
    : ['Analyzing industry trends...', 'Matching tech stack...', 'Optimizing conversion paths...', 'Finalizing your roadmap...'];

  useEffect(() => {
    let msgIdx = 0;
    const msgInterval = setInterval(() => {
      setLoadingText(loadingMessages[msgIdx % loadingMessages.length]);
      msgIdx++;
    }, 600);

    const timer = setTimeout(() => {
      const bp   = generateBlueprint(answers, locale);
      const html = generatePreviewHTML(answers, locale);
      setBlueprint(bp);
      setPreviewHtml(html);
      clearInterval(msgInterval);
    }, 2800);

    return () => { clearTimeout(timer); clearInterval(msgInterval); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers, locale]);

  // ── Loading state ──────────────────────────────────────────────────────────
  if (!blueprint) {
    return (
      <div className={styles.blueprintLoading}>
        <div className={styles.aiPulse} />
        <div className={styles.blueprintSpinner} />
        <p className="md-body-large" style={{ fontWeight: 500, marginTop: 24, minHeight: '1.5em' }}>
          {loadingText || t('generating')}
        </p>
      </div>
    );
  }

  // ── Blueprint sections config ──────────────────────────────────────────────
  const sections = [
    { icon: <Layers   size={18} />, key: 'pageStructure',  color: 'sage',    content: blueprint.pageStructure  },
    { icon: <Code2    size={18} />, key: 'featureModules', color: 'sky',     content: blueprint.featureModules },
    { icon: <Palette  size={18} />, key: 'designDirection',color: 'blossom', content: [blueprint.designDirection] },
    { icon: <Search   size={18} />, key: 'seoKeywords',    color: 'teal',    content: blueprint.seoKeywords    },
    { icon: <Calendar size={18} />, key: 'timeline',       color: 'amber',   content: [blueprint.timeline]     },
    { icon: <DollarSign size={18} />, key: 'investment',   color: 'sage',    content: [blueprint.investment]   },
  ] as const;

  const containerVariants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden:  { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
  };

  const companyName = answers.contact.company || answers.contact.name || '';

  const previewLabel = isZh ? '预览我的网站效果' : 'Preview My Website';
  const previewSub   = isZh ? '查看根据您的规划生成的网站视觉效果' : 'See what your website could look like';

  return (
    <>
      <motion.div
        className={styles.blueprint}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* ── Summary ── */}
        <motion.div className={styles.blueprintSummary} variants={itemVariants}>
          <div className={styles.blueprintCheckmark}>✅</div>
          <h3 className="md-headline-small">{t('sections.projectSummary')}</h3>
          <p className="md-body-large">{blueprint.projectSummary}</p>
        </motion.div>

        {/* ── Tech stack ── */}
        <motion.div className={styles.blueprintTech} variants={itemVariants}>
          <span className="md-label-medium">{t('sections.techStack')}</span>
          <div className={styles.techChips}>
            {blueprint.techStack.map(tech => (
              <span key={tech} className="badge badge-sage">{tech}</span>
            ))}
          </div>
        </motion.div>

        {/* ── Detail cards ── */}
        <div className={styles.blueprintGrid}>
          {sections.map(s => (
            <motion.div
              key={s.key}
              variants={itemVariants}
              className={`${styles.blueprintCard} ${styles[`blueprintCard_${s.color}` as keyof typeof styles]}`}
            >
              <div className={styles.blueprintCardHeader}>
                {s.icon}
                <span className="md-title-small">{t(`sections.${s.key}`)}</span>
              </div>
              <ul className={styles.blueprintList}>
                {s.content.map((item, i) => (
                  <li key={i} className="md-body-small">{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* ── CTA ── */}
        <motion.div className={styles.blueprintCta} variants={itemVariants}>
          {/* 🌟 Preview trigger — top of CTA box */}
          <button
            className={styles.previewTrigger}
            onClick={() => setPreviewOpen(true)}
            aria-label={previewLabel}
          >
            <span className={styles.previewTriggerPulse} />
            <Eye size={20} />
            <span>{previewLabel}</span>
            <span style={{ fontSize: '0.8em', opacity: 0.7, fontWeight: 400 }}>
              — {previewSub}
            </span>
          </button>

          <h3 className="md-headline-small">{t('cta.title')}</h3>
          <p className="md-body-medium text-muted">{t('cta.subtitle')}</p>
          <div className={styles.blueprintCtaActions}>
            <Link href={`/${locale}/contact`} className="btn btn-primary btn-lg">
              {t('cta.primary')} <ArrowRight size={18} />
            </Link>
            <button className="btn btn-secondary" onClick={reset} aria-label="Restart wizard">
              <RotateCcw size={16} />
              {t('cta.restart')}
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Preview Modal (portal-like, rendered outside wizard card) ── */}
      <PreviewModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        html={previewHtml}
        companyName={companyName}
      />
    </>
  );
}
