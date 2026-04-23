'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowRight, Calendar, DollarSign, Layers, Palette, Code2, Search, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWizard } from './WizardContext';
import { generateBlueprint, type Blueprint } from './blueprintGenerator';
import styles from '../page.module.css';

export default function BlueprintResult() {
  const t      = useTranslations('aiWizard.blueprint');
  const locale = useLocale() as 'en' | 'zh';
  const { answers, reset } = useWizard();

  const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
  const [loadingText, setLoadingText] = useState('');
  
  const loadingMessages = locale === 'zh' 
    ? ['分析行业竞争态势...', '匹配最佳技术架构...', '优化页面转化路径...', '生成个性化解决方案...']
    : ['Analyzing industry trends...', 'Matching tech stack...', 'Optimizing conversion paths...', 'Finalizing your roadmap...'];

  useEffect(() => {
    let msgIdx = 0;
    const msgInterval = setInterval(() => {
      setLoadingText(loadingMessages[msgIdx % loadingMessages.length]);
      msgIdx++;
    }, 600);

    const timer = setTimeout(() => {
      const bp = generateBlueprint(answers, locale);
      setBlueprint(bp);
      clearInterval(msgInterval);
    }, 2800);

    return () => {
      clearTimeout(timer);
      clearInterval(msgInterval);
    };
  }, [answers, locale]);

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

  const sections = [
    {
      icon: <Layers size={18} />,
      key:  'pageStructure',
      color: 'sage',
      content: blueprint.pageStructure,
    },
    {
      icon: <Code2 size={18} />,
      key:  'featureModules',
      color: 'sky',
      content: blueprint.featureModules,
    },
    {
      icon: <Palette size={18} />,
      key:  'designDirection',
      color: 'blossom',
      content: [blueprint.designDirection],
    },
    {
      icon: <Search size={18} />,
      key:  'seoKeywords',
      color: 'teal',
      content: blueprint.seoKeywords,
    },
    {
      icon: <Calendar size={18} />,
      key:  'timeline',
      color: 'amber',
      content: [blueprint.timeline],
    },
    {
      icon: <DollarSign size={18} />,
      key:  'investment',
      color: 'sage',
      content: [blueprint.investment],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <motion.div
      className={styles.blueprint}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Summary */}
      <motion.div className={styles.blueprintSummary} variants={itemVariants}>
        <div className={styles.blueprintCheckmark}>✅</div>
        <h3 className="md-headline-small">{t('sections.projectSummary')}</h3>
        <p className="md-body-large">{blueprint.projectSummary}</p>
      </motion.div>

      {/* Tech Stack banner */}
      <motion.div className={styles.blueprintTech} variants={itemVariants}>
        <span className="md-label-medium">{t('sections.techStack')}</span>
        <div className={styles.techChips}>
          {blueprint.techStack.map(t => (
            <span key={t} className="badge badge-sage">{t}</span>
          ))}
        </div>
      </motion.div>

      {/* Detail cards */}
      <div className={styles.blueprintGrid}>
        {sections.map((s, idx) => (
          <motion.div
            key={s.key}
            variants={itemVariants}
            className={`${styles.blueprintCard} ${styles[`blueprintCard_${s.color}`]}`}
          >
            <div className={styles.blueprintCardHeader}>
              {s.icon}
              <span className="md-title-small">{t(`sections.${s.key as Parameters<typeof t>[0]}`)}</span>
            </div>
            <ul className={styles.blueprintList}>
              {s.content.map((item, i) => (
                <li key={i} className="md-body-small">{item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div className={styles.blueprintCta} variants={itemVariants}>
        <h3 className="md-headline-small">{t('cta.title')}</h3>
        <p className="md-body-medium text-muted">{t('cta.subtitle')}</p>
        <div className={styles.blueprintCtaActions}>
          <Link
            href={`/${locale}/contact`}
            className="btn btn-primary btn-lg"
          >
            {t('cta.primary')} <ArrowRight size={18} />
          </Link>
          <button className="btn btn-secondary" onClick={reset} aria-label="Restart wizard">
            <RotateCcw size={16} />
            {t('cta.restart')}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
