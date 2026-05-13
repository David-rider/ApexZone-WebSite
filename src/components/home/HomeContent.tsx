'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import {
  Globe, Smartphone, Palette, TrendingUp,
  ArrowRight, CheckCircle2, Star, Sparkles,
  ChevronRight, Mail
} from 'lucide-react';
import styles from '@/app/[locale]/page.module.css';

interface HomeContentProps {
  portfolioItems: any[];
  serviceKeys: string[];
  servicePaths: string[];
  serviceColors: string[];
  stats: any[];
  processKeys: string[];
  processIcons: string[];
}

export default function HomeContent({
  portfolioItems,
  serviceKeys,
  servicePaths,
  serviceColors,
  stats,
  processKeys,
  processIcons
}: HomeContentProps) {
  const t      = useTranslations('home');
  const c      = useTranslations('common');
  const pt     = useTranslations('portfolio');
  const locale = useLocale();

  const serviceIcons = [Globe, Smartphone, Palette, TrendingUp];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" as const }
  };

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.1
      }
    },
    viewport: { once: true }
  };

  return (
    <>
      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <div className={styles.heroParticles} aria-hidden>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className={styles.particle}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.07 + (i % 4) * 0.025, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 1 }}
              style={{
                left:              `${10 + i * 8}%`,
                top:               `${15 + (i % 5) * 15}%`,
                animationDuration: `${5 + i * 0.7}s`,
                animationDelay:    `${i * 0.4}s`,
                fontSize:          `${16 + (i % 3) * 8}px`,
              }}
            >
              {['🌿', '🍃', '✦', '◆', '∘', '·'][i % 6]}
            </motion.div>
          ))}
        </div>

        <div className="container">
          <div className={styles.heroGrid}>
            {/* Left */}
            <motion.div 
              className={styles.heroContent}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className={styles.heroBadge}>
                <Sparkles size={12} />
                {t('hero.badge')}
              </div>
              <h1 className={`md-display-large ${styles.heroTitle}`}>
                {t('hero.title')}
              </h1>
              <p className={`md-body-large ${styles.heroSubtitle}`}>
                {t('hero.subtitle')}
              </p>
              <div className={styles.heroCtas}>
                <Link href={`/${locale}/portfolio`} className="btn btn-primary btn-lg">
                  {t('hero.cta1')}
                  <ArrowRight size={18} />
                </Link>
                <Link href={`/${locale}/contact`} className="btn btn-secondary btn-lg">
                  {t('hero.cta2')}
                </Link>
              </div>
              <div className={styles.heroTrust}>
                <div className={styles.heroStars}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="var(--amber)" color="var(--amber)" />
                  ))}
                </div>
                <span className="md-body-small text-muted">{c('trustLabel')}</span>
              </div>
            </motion.div>

            {/* Right visual */}
            <motion.div 
              className={styles.heroVisual}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className={styles.heroCard}>
                <div className={styles.heroCardMock}>
                  <div className={styles.mockBar}>
                    <div className={styles.mockDots}>
                      <span style={{ background: 'var(--error)' }} />
                      <span style={{ background: 'var(--warning)' }} />
                      <span style={{ background: 'var(--success)' }} />
                    </div>
                    <div className={styles.mockUrl}>apexzone.us</div>
                  </div>
                  <div className={styles.mockContent}>
                    <div className={styles.mockHero} />
                    <div className={styles.mockNav}>
                      {[...Array(4)].map((_, i) => <div key={i} className={styles.mockPill} />)}
                    </div>
                    <div className={styles.mockCards}>
                      {[...Array(3)].map((_, i) => <div key={i} className={styles.mockCardItem} />)}
                    </div>
                  </div>
                </div>
                <motion.div 
                  className={styles.heroCardBadge}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <CheckCircle2 size={14} color="var(--md-sys-color-primary)" />
                  <span>{t('hero.liveOptimized')}</span>
                </motion.div>
              </div>

              <motion.div 
                className={`${styles.floatCard} ${styles.floatCard1}`}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className={styles.floatCardIcon}>📈</div>
                <div>
                  <div className={styles.floatCardValue}>+240%</div>
                  <div className={styles.floatCardLabel}>{t('hero.organicTraffic')}</div>
                </div>
              </motion.div>
              <motion.div 
                className={`${styles.floatCard} ${styles.floatCard2}`}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <div className={styles.floatCardIcon}>⚡</div>
                <div>
                  <div className={styles.floatCardValue}>98</div>
                  <div className={styles.floatCardLabel}>{t('hero.lighthouseScore')}</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <motion.section 
        className={styles.statsBar}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <motion.div 
            className={styles.statsGrid}
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {stats.map(s => (
              <motion.div 
                key={s.key} 
                className={styles.statItem}
                variants={fadeInUp}
              >
                <div className="stat-number">{s.value}</div>
                <div className={styles.statLabel}>{t(`stats.${s.key}`)}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ===== SERVICES ===== */}
      <section className="section">
        <div className="container">
          <motion.div 
            className="section-title"
            {...fadeInUp}
          >
            <div className="section-title__label">{t('services.label')}</div>
            <h2 className="text-h2">{t('services.title')}</h2>
            <p>{t('services.subtitle')}</p>
          </motion.div>
          <motion.div 
            className="grid-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {serviceKeys.map((key, i) => {
              const Icon = serviceIcons[i];
              return (
                <motion.div key={key} variants={fadeInUp}>
                  <Link
                    href={`/${locale}/services#${servicePaths[i]}`}
                    className={styles.serviceCard}
                  >
                    <div className={`${styles.serviceIcon} ${styles[`serviceIcon_${serviceColors[i]}`]}`}>
                      <Icon size={24} />
                    </div>
                    <h3 className={styles.serviceTitle}>{t(`services.${key}.title`)}</h3>
                    <p className={styles.serviceDesc}>{t(`services.${key}.desc`)}</p>
                    <div className={styles.serviceArrow}>
                      <ChevronRight size={16} />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ===== PORTFOLIO PREVIEW ===== */}
      <section className={`section ${styles.portfolioSection}`}>
        <div className="container">
          <motion.div 
            className="section-title"
            {...fadeInUp}
          >
            <div className="section-title__label">{t('portfolio.label')}</div>
            <h2 className="text-h2">{t('portfolio.title')}</h2>
            <p>{t('portfolio.subtitle')}</p>
          </motion.div>
          <motion.div 
            className={styles.portfolioGrid}
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {portfolioItems.map(item => {
              const title    = pt(item.titleKey.replace('portfolio.', ''));
              const client   = pt(item.clientKey.replace('portfolio.', ''));
              const location = pt(item.locationKey.replace('portfolio.', ''));

              return (
                <motion.div key={item.id} variants={fadeInUp}>
                  <Link href={`/${locale}/portfolio/${item.slug}`} className={styles.portfolioItem}>
                    <div className={styles.portfolioImg}>
                      <Image 
                        src={item.image} 
                        alt={client} 
                        fill 
                        style={{ objectFit: 'cover' }}
                      />
                      <div className={styles.portfolioOverlay}>
                        <ArrowRight size={24} color="white" />
                      </div>
                    </div>
                    <div className={styles.portfolioBody}>
                      <div className={styles.portfolioTags}>
                        <span className="badge badge-sage">
                          {pt(`filters.${item.category}`)}
                        </span>
                        <span className="badge badge-sky">
                          {pt(`industries.${item.industry}`)}
                        </span>
                      </div>
                      <h3 className={styles.portfolioTitle}>
                        {title}
                      </h3>
                      <p className={styles.portfolioClient}>
                        {client} · {location}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}

            {/* CTA card */}
            <motion.div className={styles.portfolioCta} variants={fadeInUp}>
              <div className={styles.portfolioCtaIcon}>🎯</div>
              <h3 className="md-title-large">{t('portfolio.ctaTitle')}</h3>
              <p className="md-body-medium text-muted">{t('portfolio.ctaDesc')}</p>
              <Link href={`/${locale}/contact`} className="btn btn-primary">
                {t('portfolio.ctaBtn')}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            className={styles.portfolioViewAll}
            {...fadeInUp}
          >
            <Link href={`/${locale}/portfolio`} className="btn btn-secondary">
              {t('portfolio.viewAll')} <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="section">
        <div className="container">
          <motion.div 
            className="section-title"
            {...fadeInUp}
          >
            <div className="section-title__label">{t('process.label')}</div>
            <h2 className="text-h2">{t('process.title')}</h2>
            <p>{t('process.subtitle')}</p>
          </motion.div>
          <motion.div 
            className={styles.processGrid}
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {processKeys.map((key, i) => (
              <motion.div key={key} className={styles.processStep} variants={fadeInUp}>
                <div className={styles.processNum}>{processIcons[i]}</div>
                <h4 className={styles.processTitle}>{t(`process.${key}.title`)}</h4>
                <p className={styles.processDesc}>{t(`process.${key}.desc`)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <motion.section 
        className={styles.ctaSection}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.ctaBg} aria-hidden />
        <div className="container">
          <div className={styles.ctaInner}>
            <motion.div 
              className={styles.ctaBadge}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles size={14} />
              {t('cta.label')}
            </motion.div>
            <h2 className={`md-headline-large ${styles.ctaTitle}`}>{t('cta.title')}</h2>
            <p className={styles.ctaSubtitle}>{t('cta.subtitle')}</p>
            <div className={styles.ctaActions}>
              <Link href={`/${locale}/contact`} className={`btn btn-primary btn-lg ${styles.ctaBtn}`}>
                {t('cta.button')}
                <ArrowRight size={18} />
              </Link>
              <a href="mailto:hello@apexzone.us" className={styles.ctaPhone}>
                <Mail size={16} />
                hello@apexzone.us
              </a>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
