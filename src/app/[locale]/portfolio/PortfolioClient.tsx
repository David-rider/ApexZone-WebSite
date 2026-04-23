'use client';

import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Search, SlidersHorizontal } from 'lucide-react';
import { portfolioItems, type PortfolioItem } from '@/data/portfolio';
import styles from './page.module.css';

import PortfolioHero from './_components/PortfolioHero';

type CategoryFilter = 'all' | PortfolioItem['category'];
type IndustryFilter = 'all' | PortfolioItem['industry'];

const CATEGORIES: CategoryFilter[] = ['all', 'brandSite', 'platform', 'app', 'brandDesign', 'ecommerce', 'miniProgram'];
const INDUSTRIES: IndustryFilter[] = ['all', 'tech', 'finance', 'retail', 'healthcare', 'realEstate', 'education'];

export default function PortfolioClient() {
  const t = useTranslations();
  const locale = useLocale();
  const isZh = locale === 'zh';
  
  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [activeIndustry, setActiveIndustry] = useState<IndustryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return portfolioItems.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesIndustry = activeIndustry === 'all' || item.industry === activeIndustry;
      
      const getField = (obj: any, base: string) => {
        if (locale === 'en') return obj[base];
        const key = `${base}${locale.charAt(0).toUpperCase() + locale.slice(1)}`;
        return obj[key] || obj[base];
      };

      const searchLower = searchQuery.toLowerCase();
      const title = getField(item, 'title').toLowerCase();
      const client = getField(item, 'client').toLowerCase();
      const matchesSearch = searchQuery === '' || title.includes(searchLower) || client.includes(searchLower);

      return matchesCategory && matchesIndustry && matchesSearch;
    });
  }, [activeCategory, activeIndustry, searchQuery, locale]);

  // Reset page when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [activeCategory, activeIndustry, searchQuery]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const labelMap: Record<string, any> = {
    en: { search: 'Search cases...', serviceType: 'Service Type', industry: 'Industry', noFound: 'No cases found', noDesc: 'Try adjusting filters', reset: 'Reset All', view: 'View Project', prev: 'Prev', next: 'Next' },
    zh: { search: '搜索案例...', serviceType: '服务类型', industry: '所属行业', noFound: '未找到案例', noDesc: '请调整筛选条件', reset: '重置全部', view: '查看项目', prev: '上一页', next: '下一页' },
    es: { search: 'Buscar casos...', serviceType: 'Tipo de servicio', industry: 'Industria', noFound: 'No se encontraron casos', noDesc: 'Ajuste los filtros', reset: 'Restablecer', view: 'Ver proyecto', prev: 'Ant.', next: 'Sig.' },
    ko: { search: '사례 검색...', serviceType: '서비스 유형', industry: '산업분야', noFound: '결과 없음', noDesc: '필터를 조정해 보세요', reset: '초기화', view: '프로젝트 보기', prev: '이전', next: '다음' },
    ja: { search: '事例検索...', serviceType: 'サービス種別', industry: '業界', noFound: '見つかりません', noDesc: '条件を変更してください', reset: 'リセット', view: '詳細を見る', prev: '前へ', next: '次へ' },
    ru: { search: 'Поиск...', serviceType: 'Тип услуги', industry: 'Отрасль', noFound: 'Не найдено', noDesc: 'Измените фильтры', reset: 'Сбросить', view: 'Смотреть', prev: 'Пред.', next: 'След.' },
    it: { search: 'Cerca...', serviceType: 'Tipo di servizio', industry: 'Settore', noFound: 'Nessun caso', noDesc: 'Cambia i filtri', reset: 'Resetta', view: 'Vedi', prev: 'Prec.', next: 'Succ.' }
  };
  const labels = labelMap[locale] || labelMap.en;

  return (
    <div className={styles.page}>
      <PortfolioHero />

      {/* Filters Container */}
      <div className={styles.filterBar}>
        <div className="container">
          <div className={styles.controls}>
            {/* Search */}
            <div className={styles.searchWrapper}>
              <Search className={styles.searchIcon} size={20} />
              <input
                type="text"
                className={styles.searchInput}
                placeholder={labels.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className={styles.filterGroups}>
              <div className={styles.filterGroup}>
                <div className={styles.filterLabel}>{labels.serviceType}</div>
                <div className={styles.filterList}>
                  {CATEGORIES.map(c => (
                    <button
                      key={c}
                      className={`filter-tab ${activeCategory === c ? 'active' : ''}`}
                      onClick={() => setActiveCategory(c)}
                    >
                      {t(`portfolio.filters.${c}`)}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.filterGroup}>
                <div className={styles.filterLabel}>{labels.industry}</div>
                <div className={styles.filterList}>
                  {INDUSTRIES.map(i => (
                    <button
                      key={i}
                      className={`badge ${activeIndustry === i ? 'badge-primary' : 'badge-sage'}`}
                      style={{ cursor: 'pointer', border: 'none', padding: '6px 16px', fontSize: '14px' }}
                      onClick={() => setActiveIndustry(i)}
                    >
                      {t(`portfolio.industries.${i}`)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Grid */}
          {filteredItems.length === 0 ? (
            <div className={styles.empty}>
              <span>🔎</span>
              <h3>{labels.noFound}</h3>
              <p>{labels.noDesc}</p>
              <button 
                className="btn btn-outline btn-sm mt-4" 
                onClick={() => { setActiveCategory('all'); setActiveIndustry('all'); setSearchQuery(''); }}
              >
                {labels.reset}
              </button>
            </div>
          ) : (
            <>
              <div className={styles.grid}>
                {paginatedItems.map(item => {
                  const getField = (obj: any, base: string) => {
                    if (locale === 'en') return obj[base];
                    const key = `${base}${locale.charAt(0).toUpperCase() + locale.slice(1)}`;
                    return obj[key] || obj[base];
                  };
                  const title = getField(item, 'title');
                  const client = getField(item, 'client');
                  const location = getField(item, 'location');

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
                            {labels.view} <ArrowRight size={14} />
                          </span>
                        </div>
                      </div>
                      <div className="portfolio-card__body">
                        <div className="portfolio-card__tags">
                          <span className="badge badge-sage">{t(`portfolio.filters.${item.category}`)}</span>
                          <span className="badge badge-outline">{t(`portfolio.industries.${item.industry}`)}</span>
                        </div>
                        <div className="portfolio-card__title">
                          {title}
                        </div>
                        <div className="portfolio-card__client">
                          {client} · {item.year} · {location}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Pagination UI */}
              {totalPages > 1 && (
                <div className={styles.pagination}>
                  <button 
                    className="btn btn-outline btn-sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                  >
                    {labels.prev}
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
                    {labels.next}
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
