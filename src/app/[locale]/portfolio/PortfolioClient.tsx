'use client';

import { useState, useMemo, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Search } from 'lucide-react';
import { portfolioItems, type PortfolioItem } from '@/data/portfolio';
import styles from './page.module.css';

import PortfolioHero from './_components/PortfolioHero';

type CategoryFilter = 'all' | PortfolioItem['category'];
type IndustryFilter = 'all' | PortfolioItem['industry'];

const CATEGORIES: CategoryFilter[] = ['all', 'brandSite', 'platform', 'app', 'brandDesign', 'ecommerce', 'miniProgram'];
const INDUSTRIES: IndustryFilter[] = ['all', 'tech', 'finance', 'retail', 'healthcare', 'realEstate', 'education'];

export default function PortfolioClient() {
  const t      = useTranslations();
  const locale = useLocale();

  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage]       = useState(1);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [activeIndustry, setActiveIndustry] = useState<IndustryFilter>('all');
  const [searchQuery, setSearchQuery]       = useState('');

  // Reset page whenever filters change
  useEffect(() => { setCurrentPage(1); }, [activeCategory, activeIndustry, searchQuery]);

  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return portfolioItems.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesIndustry = activeIndustry === 'all' || item.industry === activeIndustry;

      if (!matchesCategory || !matchesIndustry) return false;
      if (!q) return true;

      // Search against the resolved translation strings
      const title  = t(item.titleKey  as any).toLowerCase();
      const client = t(item.clientKey as any).toLowerCase();
      return title.includes(q) || client.includes(q);
    });
  }, [activeCategory, activeIndustry, searchQuery, t]);

  const totalPages     = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className={styles.page}>
      <PortfolioHero />

      {/* ── Filters ──────────────────────────────────────────── */}
      <div className={styles.filterBar}>
        <div className="container">
          <div className={styles.controls}>
            {/* Search */}
            <div className={styles.searchWrapper}>
              <Search className={styles.searchIcon} size={20} />
              <input
                type="text"
                className={styles.searchInput}
                placeholder={t('portfolio.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className={styles.filterGroups}>
              {/* Category filter */}
              <div className={styles.filterGroup}>
                <div className={styles.filterLabel}>{t('portfolio.filterLabels.serviceType')}</div>
                <div className={styles.filterList}>
                  {CATEGORIES.map(c => (
                    <button
                      key={c}
                      className={`filter-tab ${activeCategory === c ? 'active' : ''}`}
                      onClick={() => setActiveCategory(c)}
                    >
                      {t(`portfolio.filters.${c}` as any)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Industry filter */}
              <div className={styles.filterGroup}>
                <div className={styles.filterLabel}>{t('portfolio.filterLabels.industry')}</div>
                <div className={styles.filterList}>
                  {INDUSTRIES.map(i => (
                    <button
                      key={i}
                      className={`badge ${activeIndustry === i ? 'badge-primary' : 'badge-sage'}`}
                      style={{ cursor: 'pointer', border: 'none', padding: '6px 16px', fontSize: '14px' }}
                      onClick={() => setActiveIndustry(i)}
                    >
                      {t(`portfolio.industries.${i}` as any)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Grid ─────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          {filteredItems.length === 0 ? (
            <div className={styles.empty}>
              <span>🔎</span>
              <h3>{t('portfolio.empty.noFound')}</h3>
              <p>{t('portfolio.empty.noDesc')}</p>
              <button
                className="btn btn-outline btn-sm mt-4"
                onClick={() => {
                  setActiveCategory('all');
                  setActiveIndustry('all');
                  setSearchQuery('');
                }}
              >
                {t('portfolio.empty.reset')}
              </button>
            </div>
          ) : (
            <>
              <div className={styles.grid}>
                {paginatedItems.map(item => {
                  const title    = t(item.titleKey    as any);
                  const client   = t(item.clientKey   as any);
                  const location = t(item.locationKey as any);

                  return (
                    <Link
                      key={item.id}
                      href={`/${locale}/portfolio/${item.slug}`}
                      className="portfolio-card reveal"
                    >
                      <div className="portfolio-card__image">
                        <Image
                          src={item.image}
                          alt={client}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          style={{ objectFit: 'cover' }}
                        />
                        <div className="portfolio-card__overlay">
                          <span className="btn btn-primary btn-sm">
                            {t('portfolio.viewProject')} <ArrowRight size={14} />
                          </span>
                        </div>
                      </div>
                      <div className="portfolio-card__body">
                        <div className="portfolio-card__tags">
                          <span className="badge badge-sage">{t(`portfolio.filters.${item.category}` as any)}</span>
                          <span className="badge badge-outline">{t(`portfolio.industries.${item.industry}` as any)}</span>
                        </div>
                        <div className="portfolio-card__title">{title}</div>
                        <div className="portfolio-card__client">
                          {client} · {item.year} · {location}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className={styles.pagination}>
                  <button
                    className="btn btn-outline btn-sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                  >
                    {t('portfolio.pagination.prev')}
                  </button>

                  <div className={styles.pageNumbers}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        className={`${styles.pageBtn} ${currentPage === page ? styles.activePage : ''}`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    className="btn btn-outline btn-sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => p + 1)}
                  >
                    {t('portfolio.pagination.next')}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
