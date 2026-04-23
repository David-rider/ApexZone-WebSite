'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Globe, Smartphone, Palette, TrendingUp } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const t     = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'zh', label: '中文' },
    { code: 'es', label: 'Español' },
    { code: 'ko', label: '한국어' },
    { code: 'ja', label: '日本語' },
    { code: 'ru', label: 'Русский' },
    { code: 'it', label: 'Italiano' }
  ];

  const currentLang = languages.find(l => l.code === locale)?.label || 'English';

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Alternate locale path
  const altLocale = locale === 'en' ? 'zh' : 'en';
  const altPath   = pathname.replace(`/${locale}`, `/${altLocale}`);

  const navLinks = [
    { href: `/${locale}`,           label: t('home') },
    { href: `/${locale}/services`,  label: t('services') },
    { href: `/${locale}/portfolio`, label: t('portfolio') },
    { href: `/${locale}/ai-wizard`, label: t('aiWizard'), highlight: true },
    { href: `/${locale}/blog`,      label: t('blog') },
    { href: `/${locale}/about`,     label: t('about') },
  ];

  const serviceLinks = [
    { href: `/${locale}/services/web-design`,    label: t('servicesDropdown.webDesign'),    icon: <Globe size={16} /> },
    { href: `/${locale}/services/app-dev`,       label: t('servicesDropdown.appDev'),       icon: <Smartphone size={16} /> },
    { href: `/${locale}/services/brand-design`,  label: t('servicesDropdown.brandDesign'),  icon: <Palette size={16} /> },
    { href: `/${locale}/services/seo-marketing`, label: t('servicesDropdown.seoMarketing'), icon: <TrendingUp size={16} /> },
  ];

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link href={`/${locale}`} className={styles.logo}>
          <Image
            src="/images/logo/ApexZone_LOG_002.png"
            alt="Apex Zone"
            width={160}
            height={55}
            style={{ height: '48px', width: 'auto', objectFit: 'contain' }}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${link.highlight ? styles.highlight : ''} ${
                (link.href === `/${locale}` && pathname === `/${locale}`) || 
                (link.href !== `/${locale}` && pathname.startsWith(link.href)) 
                ? styles.active : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>


        {/* Right side actions */}
        <div className={styles.actions}>
          {/* Lang Dropdown */}
          <div className={styles.langDropdown} ref={langRef}>
            <button className={styles.langTrigger} onClick={() => setLangOpen(!langOpen)}>
              <Globe size={14} />
              <span>{currentLang}</span>
              <ChevronDown size={14} className={langOpen ? styles.chevronOpen : ''} />
            </button>
            {langOpen && (
              <div className={styles.langMenu}>
                {languages.map(lang => (
                  <Link 
                    key={lang.code}
                    href={pathname.replace(`/${locale}`, `/${lang.code}`) || `/${lang.code}`} 
                    className={`${styles.langItem} ${locale === lang.code ? styles.langActive : ''}`}
                    onClick={() => { setLangOpen(false); setMobileOpen(false); }}
                  >
                    {lang.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href={`/${locale}/contact`} className="btn btn-primary btn-sm">
            {t('freeConsult')}
          </Link>
          <button
            className={styles.mobileToggle}
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileLinks}>
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className={styles.mobileLink}
                    onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}
            <div className={styles.mobileDivider}>{t('services')}</div>
            {serviceLinks.map(s => (
              <Link key={s.href} href={s.href} className={`${styles.mobileLink} ${styles.mobileSub}`}
                    onClick={() => setMobileOpen(false)}>
                {s.icon} {s.label}
              </Link>
            ))}
            <div className={styles.mobileDivider}>Language</div>
            <div className={styles.mobileLangs}>
              {languages.map(lang => (
                <Link
                  key={lang.code}
                  href={pathname.replace(`/${locale}`, `/${lang.code}`) || `/${lang.code}`}
                  className={`${styles.mobileLang} ${locale === lang.code ? styles.mobileLangActive : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {lang.label}
                </Link>
              ))}
            </div>
            <div className={styles.mobileCTA}>
              <Link href={`/${locale}/contact`} className="btn btn-primary" onClick={() => setMobileOpen(false)}>
                {t('freeConsult')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
