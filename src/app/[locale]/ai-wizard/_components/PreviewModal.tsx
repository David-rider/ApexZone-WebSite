'use client';

import { useState, useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { X, Monitor, Smartphone, ArrowRight, ExternalLink } from 'lucide-react';
import styles from '../page.module.css';

interface PreviewModalProps {
  isOpen:      boolean;
  onClose:     () => void;
  html:        string;
  companyName: string;
}

export default function PreviewModal({ isOpen, onClose, html, companyName }: PreviewModalProps) {
  const locale = useLocale();
  const [device, setDevice]   = useState<'desktop' | 'mobile'>('desktop');
  const [visible, setVisible] = useState(false);
  const overlayRef            = useRef<HTMLDivElement>(null);

  const isZh = locale.startsWith('zh');

  // Animate in/out
  useEffect(() => {
    if (isOpen) {
      // tiny delay so CSS transition fires
      requestAnimationFrame(() => setVisible(true));
      document.body.style.overflow = 'hidden';
    } else {
      setVisible(false);
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Keyboard close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const slug = (companyName || 'yoursite').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const fakeUrl = `${slug}.com`;

  const label = {
    desktop:   isZh ? '桌面端' : 'Desktop',
    mobile:    isZh ? '移动端' : 'Mobile',
    close:     isZh ? '关闭预览' : 'Close Preview',
    previewOf: isZh ? '网站预览' : 'Website Preview',
    hint:      isZh
      ? '这是根据您的需求规划生成的网站预览，实际成品将更加精细。'
      : 'This preview is generated from your project plan. The final build will be even more refined.',
    startProject: isZh ? '开始我的项目' : 'Start My Project',
    backBlueprint: isZh ? '返回方案' : 'Back to Blueprint',
  };

  return (
    <div
      ref={overlayRef}
      className={`${styles.previewOverlay} ${visible ? styles.previewOverlayVisible : ''}`}
      onClick={e => { if (e.target === overlayRef.current) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={label.previewOf}
    >
      <div className={`${styles.previewModal} ${visible ? styles.previewModalVisible : ''}`}>

        {/* ── Browser Chrome Top Bar ── */}
        <div className={styles.browserChrome}>
          {/* Traffic lights */}
          <div className={styles.trafficLights}>
            <button
              className={`${styles.tl} ${styles.tlRed}`}
              onClick={onClose}
              aria-label={label.close}
              title={label.close}
            />
            <div className={`${styles.tl} ${styles.tlYellow}`} />
            <div className={`${styles.tl} ${styles.tlGreen}`}  />
          </div>

          {/* Fake URL bar */}
          <div className={styles.urlBar}>
            <span className={styles.lockIcon}>🔒</span>
            <span className={styles.urlText}>{fakeUrl}</span>
          </div>

          {/* Device toggle */}
          <div className={styles.deviceToggle}>
            <button
              className={`${styles.deviceBtn} ${device === 'desktop' ? styles.deviceBtnActive : ''}`}
              onClick={() => setDevice('desktop')}
              title={label.desktop}
              aria-label={label.desktop}
            >
              <Monitor size={14} />
            </button>
            <button
              className={`${styles.deviceBtn} ${device === 'mobile' ? styles.deviceBtnActive : ''}`}
              onClick={() => setDevice('mobile')}
              title={label.mobile}
              aria-label={label.mobile}
            >
              <Smartphone size={14} />
            </button>
          </div>

          {/* Close button (right) */}
          <button className={styles.chromeClose} onClick={onClose} aria-label={label.close}>
            <X size={16} />
          </button>
        </div>

        {/* ── iframe Viewport ── */}
        <div className={styles.iframeWrap}>
          <div className={device === 'mobile' ? styles.mobileFrame : styles.desktopFrame}>
            {device === 'mobile' && (
              <>
                <div className={styles.phoneNotch} />
                <div className={styles.phoneHome} />
              </>
            )}
            <iframe
              srcDoc={html}
              className={styles.previewIframe}
              sandbox="allow-same-origin allow-scripts"
              title={label.previewOf}
            />
          </div>
        </div>

        {/* ── Footer Bar ── */}
        <div className={styles.previewFooter}>
          <p className={styles.previewHint}>
            <ExternalLink size={13} style={{ flexShrink: 0 }} />
            {label.hint}
          </p>
          <div className={styles.previewFooterActions}>
            <button className="btn btn-secondary btn-sm" onClick={onClose}>
              {label.backBlueprint}
            </button>
            <Link
              href={`/${locale}/contact`}
              className="btn btn-primary"
            >
              {label.startProject} <ArrowRight size={16} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
