'use client';

import styles from '../page.module.css';

interface ShareButtonsProps {
  title: string;
  url: string;
  locale: string;
}

export default function ShareButtons({ title, url, locale }: ShareButtonsProps) {
  const handleCopy = () => {
    navigator.clipboard?.writeText(url);
    const msg = locale === 'zh-TW' ? '連結已複製！' : locale === 'zh-CN' ? '链接已复制！' : 'Link copied to clipboard!';
    alert(msg);
  };

  return (
    <div className={styles.shareLinks}>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank" rel="noopener noreferrer"
        className={styles.shareBtn}
      >
        𝕏
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`}
        target="_blank" rel="noopener noreferrer"
        className={styles.shareBtn}
      >
        in
      </a>
      <button
        className={styles.shareBtn}
        onClick={handleCopy}
        aria-label="Copy link"
      >
        🔗
      </button>
    </div>
  );
}
