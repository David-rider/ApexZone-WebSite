import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'zh', 'es', 'ko', 'ja', 'ru', 'it'],
  defaultLocale: 'en',
});
