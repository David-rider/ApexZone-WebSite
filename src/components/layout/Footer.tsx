import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const t      = useTranslations();
  const locale  = useLocale();
  const year    = new Date().getFullYear();

  const quickLinks = [
    { href: `/${locale}`,           label: t('nav.home') },
    { href: `/${locale}/services`,  label: t('nav.services') },
    { href: `/${locale}/portfolio`, label: t('nav.portfolio') },
    { href: `/${locale}/blog`,      label: t('nav.blog') },
    { href: `/${locale}/about`,     label: t('nav.about') },
    { href: `/${locale}/contact`,   label: t('nav.contact') },
  ];

  const serviceLinks = [
    { href: `/${locale}/services/web-design`,    label: t('nav.servicesDropdown.webDesign') },
    { href: `/${locale}/services/app-dev`,       label: t('nav.servicesDropdown.appDev') },
    { href: `/${locale}/services/brand-design`,  label: t('nav.servicesDropdown.brandDesign') },
    { href: `/${locale}/services/seo-marketing`, label: t('nav.servicesDropdown.seoMarketing') },
    { href: `/${locale}/ai-wizard`,              label: t('nav.aiWizard') },
  ];

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <Link href={`/${locale}`}>
            <Image
              src="/images/logo/ApexZone_LOG_002.png"
              alt="Apex Zone"
              width={160}
              height={55}
              style={{ height: '52px', width: 'auto', objectFit: 'contain' }}
            />
          </Link>
          <p className={styles.tagline}>{t('footer.tagline')}</p>
          <div className={styles.socials}>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
               aria-label="LinkedIn" className={styles.social}>in</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
               aria-label="X / Twitter" className={styles.social}>𝕏</a>
            <a href="#wechat" aria-label="WeChat" className={styles.social}>💬</a>
          </div>
        </div>

        {/* Quick Links */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>{t('footer.quickLinks')}</h4>
          <ul className={styles.linkList}>
            {quickLinks.map(l => (
              <li key={l.href}><Link href={l.href} className={styles.link}>{l.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>{t('footer.coreServices')}</h4>
          <ul className={styles.linkList}>
            {serviceLinks.map(l => (
              <li key={l.href}><Link href={l.href} className={styles.link}>{l.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Contact info */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>{t('footer.contact')}</h4>
          <ul className={styles.contactList}>
            <li className={styles.contactItem}>
              <MapPin size={14} className={styles.contactIcon} />
              <span>{t('contact.info.addressVal')}</span>
            </li>
            <li className={styles.contactItem}>
              <Phone size={14} className={styles.contactIcon} />
              <a href="tel:+1929364xxxx" className={styles.link}>+1 (929) 364-XXXX</a>
            </li>
            <li className={styles.contactItem}>
              <Mail size={14} className={styles.contactIcon} />
              <a href="mailto:hello@apexzone.us" className={styles.link}>hello@apexzone.us</a>
            </li>
            <li className={styles.contactItem}>
              <Clock size={14} className={styles.contactIcon} />
              <span>{t('contact.info.hoursVal')}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <div className="container">
          <div className={styles.bottomInner}>
            <span>© {year} Apex Zone. {t('footer.rights')}</span>
            <div className={styles.bottomLinks}>
              <Link href={`/${locale}/privacy`} className={styles.bottomLink}>{t('footer.privacy')}</Link>
              <Link href={`/${locale}/terms`}   className={styles.bottomLink}>{t('footer.terms')}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
